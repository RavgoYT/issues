// src/pages/FormPage.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { parseForm } from '../utils/parseForm'
import { sendToDiscord } from '../utils/webhook'
import { applyStyle } from '../styles/index'
import { Question } from '../components/Questions'
import RadialPalette from '../components/RadialPalette'
import PageTransition from '../components/PageTransition'
import NotFound from './NotFound'

// Apply default styles immediately so NotFound always has CSS vars
applyStyle('slate', document.documentElement.getAttribute('data-theme') || 'dark')

function validatePage(page, answers) {
  const errors = {}
  for (const q of page.questions) {
    if (!q.required) continue
    const val = answers[q.id]
    if (val === undefined || val === '' || (Array.isArray(val) && val.length === 0)) {
      errors[q.id] = 'This field is required.'
    }
  }
  return errors
}

// Build the public path from route params
// /:formName        → /formName.md
// /:projectName/:formName → /projectName/formName.md
function mdPath(projectName, formName) {
  if (projectName) return `/${projectName}/${formName}.md`
  return `/${formName}.md`
}

export default function FormPage() {
  const { projectName, formName } = useParams()

  const [theme, setTheme]       = useState('dark')
  const [font, setFont]         = useState('excali')
  const [form, setForm]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [pageIndex, setPageIndex]   = useState(0)
  const [direction, setDirection]   = useState(1)
  const [answers, setAnswers]       = useState({})
  const [errors, setErrors]         = useState({})
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [shakeKey, setShakeKey]     = useState(0)
  const contentRef = useRef(null)

  // Apply theme variable
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Apply font variable
  useEffect(() => {
    const map = {
      excali:  "'Excalifont', sans-serif",
      nunito:  "'Nunito', sans-serif",
      crimson: "'Crimson Pro', serif",
      mono:    "'Space Mono', monospace",
    }
    document.documentElement.style.setProperty('--font', map[font] ?? map.excali)
  }, [font])

  // Load the .md file based on route
  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    setInactive(false)
    setForm(null)
    setPageIndex(0)
    setAnswers({})
    setErrors({})
    setSubmitted(false)

    const path = mdPath(projectName, formName)
    fetch(path)
      .then(r => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null }
        return r.text()
      })
      .then(raw => {
        if (!raw) return
        let parsed
        try {
          parsed = parseForm(raw)
        } catch (e) {
          setNotFound(true); setLoading(false); return
        }

        // If parsing produced no pages, the file is invalid
        if (!parsed.pages || parsed.pages.length === 0) {
          setNotFound(true); setLoading(false); return
        }

        // Check active flag
        if (parsed.meta.active === 'false') {
          setInactive(true)
          setLoading(false)
          return
        }

        setForm(parsed)
        applyStyle(parsed.meta.style || 'slate', theme)
        const defaultFont = parsed.meta.default_font || parsed.meta.fontList?.[0] || 'excali'
        setFont(defaultFont)
        setLoading(false)
      })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [projectName, formName])

  // Re-apply style when theme toggles
  useEffect(() => {
    if (!form) return
    applyStyle(form.meta.style || 'slate', theme)
  }, [theme, form])

  // Derived
  const totalPages = form?.pages.length ?? 0
  // Guard: never let pageIndex go out of bounds
  const safeIndex = Math.min(pageIndex, totalPages - 1)
  const page = form?.pages[safeIndex] ?? null
  const progress = totalPages ? (safeIndex / totalPages) * 100 : 0
  const isLastPage = safeIndex === totalPages - 1
  const fontList = form?.meta?.fontList ?? ['excali', 'nunito']

  const setAnswer = useCallback((id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }))
    setErrors(prev => { const e = { ...prev }; delete e[id]; return e })
  }, [])

  const goNext = () => {
    if (!page) return
    const errs = validatePage(page, answers)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setShakeKey(k => k + 1)
      return
    }
    setErrors({})
    if (safeIndex < totalPages - 1) {
      setDirection(1)
      setPageIndex(safeIndex + 1)
      setTimeout(() => contentRef.current?.scrollTo(0, 0), 50)
    } else {
      handleSubmit()
    }
  }

  const goBack = () => {
    if (safeIndex === 0) return
    setDirection(-1)
    setErrors({})
    setPageIndex(safeIndex - 1)
    setTimeout(() => contentRef.current?.scrollTo(0, 0), 50)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await sendToDiscord(form.meta.webhook, form.meta, form.pages, answers)
    } catch (e) {
      console.error('Webhook error:', e)
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  // ── Early exits ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="app">
        <div className="form-shell">
          <motion.div className="loading-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="spinner" />
            <span>Loading…</span>
          </motion.div>
        </div>
      </div>
    )
  }

  if (notFound) return <NotFound message="This form doesn't exist." />
  if (inactive) return <NotFound message="This form isn't currently active." />

  // ── Render ─────────────────────────────────────────────────
  return (
    <div className="app">
      <div className="form-shell">
        {/* Progress */}
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: submitted ? '100%' : `${progress}%` }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="submitted"
              className="submit-screen"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                className="submit-icon"
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                ✦
              </motion.div>
              <div className="submit-title">Submitted.</div>
              <div className="submit-subtitle">
                {form.meta.submit_message || "Thanks for taking the time — it genuinely helps."}
              </div>
              <button
                className="btn btn-ghost"
                style={{ marginTop: 12 }}
                onClick={() => { setAnswers({}); setPageIndex(0); setSubmitted(false) }}
              >
                Submit another
              </button>
            </motion.div>
          ) : page ? (
            <PageTransition key={safeIndex} pageKey={safeIndex} direction={direction}>
              <div className="page-content" ref={contentRef}>
                <motion.div
                  key={shakeKey}
                  animate={shakeKey > 0 && Object.keys(errors).length > 0
                    ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <div className="page-header">
                    <div className="page-eyebrow">
                      {form.meta.title} · {safeIndex + 1} of {totalPages}
                    </div>
                    <div className="page-title">{page.subtitle || page.title}</div>
                    {page.description && (
                      <div className="page-description">{page.description}</div>
                    )}
                  </div>

                  {page.questions.map(q => (
                    <Question
                      key={q.id}
                      q={q}
                      value={answers[q.id]}
                      onChange={val => setAnswer(q.id, val)}
                      error={errors[q.id]}
                    />
                  ))}
                </motion.div>
              </div>

              <div className="form-footer">
                <span className="page-indicator">{safeIndex + 1} / {totalPages}</span>
                <div className="nav-buttons">
                  {safeIndex > 0 && (
                    <button className="btn btn-ghost" onClick={goBack} disabled={submitting}>
                      ← Back
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={goNext} disabled={submitting}>
                    {submitting ? 'Sending…' : isLastPage ? 'Submit ✦' : 'Continue →'}
                  </button>
                </div>
              </div>
            </PageTransition>
          ) : null}
        </AnimatePresence>
        </div>
      </div>

      <RadialPalette
        theme={theme}
        setTheme={setTheme}
        font={font}
        setFont={setFont}
        fontList={fontList}
      />
    </div>
  )
}