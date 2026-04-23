// src/components/Questions.jsx
import { useState } from 'react';

/* ── Shared label ──────────────────────────────────────────── */
function QuestionLabel({ label, required }) {
  return (
    <div className="question-label">
      {label}
      {required
        ? <span className="required-star" title="Required">*</span>
        : <span className="optional-tag">optional</span>}
    </div>
  );
}

/* ── Short answer ──────────────────────────────────────────── */
export function ShortAnswer({ q, value, onChange, error }) {
  return (
    <div className="question-block">
      <QuestionLabel label={q.label} required={q.required} />
      <input
        type="text"
        className={`input-short ${error ? 'error' : ''}`}
        placeholder={q.placeholder || ''}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      />
      {error && <div className="field-error">⚠ {error}</div>}
    </div>
  );
}

/* ── Large answer ──────────────────────────────────────────── */
export function LargeAnswer({ q, value, onChange, error }) {
  return (
    <div className="question-block">
      <QuestionLabel label={q.label} required={q.required} />
      <textarea
        className={`input-large ${error ? 'error' : ''}`}
        placeholder={q.placeholder || ''}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        rows={5}
      />
      {error && <div className="field-error">⚠ {error}</div>}
    </div>
  );
}

/* ── Single choice ─────────────────────────────────────────── */
export function Choice({ q, value, onChange, error }) {
  return (
    <div className="question-block">
      <QuestionLabel label={q.label} required={q.required} />
      <div className="choices-grid">
        {q.options.map((opt, i) => (
          <div
            key={i}
            className={`choice-option ${value === opt ? 'selected' : ''}`}
            onClick={() => onChange(opt)}
            role="radio"
            aria-checked={value === opt}
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onChange(opt)}
          >
            <div className="choice-marker" />
            <span className="choice-label">{opt}</span>
          </div>
        ))}
      </div>
      {error && <div className="field-error">⚠ {error}</div>}
    </div>
  );
}

/* ── Multi-select ──────────────────────────────────────────── */
export function Multiselect({ q, value = [], onChange, error }) {
  const toggle = (opt) => {
    const next = value.includes(opt)
      ? value.filter(v => v !== opt)
      : [...value, opt];
    onChange(next);
  };

  return (
    <div className="question-block">
      <QuestionLabel label={q.label} required={q.required} />
      <div className="choices-grid">
        {q.options.map((opt, i) => {
          const checked = value.includes(opt);
          return (
            <div
              key={i}
              className={`choice-option ${checked ? 'selected' : ''}`}
              onClick={() => toggle(opt)}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && toggle(opt)}
            >
              <div className={`choice-marker multiselect-marker ${checked ? 'checked' : ''}`}>
                <span className="check-icon">✓</span>
              </div>
              <span className="choice-label">{opt}</span>
            </div>
          );
        })}
      </div>
      {error && <div className="field-error">⚠ {error}</div>}
    </div>
  );
}

/* ── Scale ─────────────────────────────────────────────────── */
export function Scale({ q, value, onChange, error }) {
  const count = q.max - q.min + 1;
  const dots = Array.from({ length: count }, (_, i) => q.min + i);

  return (
    <div className="question-block">
      <QuestionLabel label={q.label} required={q.required} />
      <div className="scale-wrap">
        <div className="scale-track">
          <div className="scale-dots">
            {dots.map(n => {
              const isActive = n === value;
              const isFilled = value !== undefined && n < value;
              return (
                <div
                  key={n}
                  className={`scale-dot ${isActive ? 'active' : ''} ${isFilled ? 'filled' : ''}`}
                  onClick={() => onChange(n)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${n}`}
                  onKeyDown={e => e.key === 'Enter' && onChange(n)}
                >
                  {n}
                </div>
              );
            })}
          </div>
          {value !== undefined && (
            <div className="scale-value-display">{value}</div>
          )}
        </div>
        {(q.min_label || q.max_label) && (
          <div className="scale-labels">
            <span>{q.min_label}</span>
            <span>{q.max_label}</span>
          </div>
        )}
      </div>
      {error && <div className="field-error">⚠ {error}</div>}
    </div>
  );
}

/* ── Dispatcher ────────────────────────────────────────────── */
export function Question({ q, value, onChange, error }) {
  const props = { q, value, onChange, error };
  switch (q.type) {
    case 'short':       return <ShortAnswer {...props} />;
    case 'large':       return <LargeAnswer {...props} />;
    case 'choice':      return <Choice {...props} />;
    case 'multiselect': return <Multiselect {...props} />;
    case 'scale':       return <Scale {...props} />;
    default:            return <div className="question-block" style={{color:'var(--text-tertiary)',fontSize:13}}>Unknown type: {q.type}</div>;
  }
}