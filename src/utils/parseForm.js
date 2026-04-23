// src/utils/parseForm.js
// Parses form.md into a structured object.
// Lines starting with # (outside question blocks) are treated as comments.

const COMMENT_RE = /^\s*#(?!#)/;

export function parseForm(raw) {
  const lines = raw.split('\n').map(l =>
    COMMENT_RE.test(l) ? '' : l
  );

  let meta = {};
  let pages = [];
  let i = 0;

  if (lines[0].trim() === '---') {
    i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      const line = lines[i].trim();
      if (line) {
        const colonIdx = line.indexOf(':');
        if (colonIdx > -1) {
          const key = line.slice(0, colonIdx).trim();
          const val = line.slice(colonIdx + 1).trim();
          meta[key] = val;
        }
      }
      i++;
    }
    i++;
  }

  // Parse fonts list: "excali, nunito" → ['excali','nunito']
  meta.fontList = meta.fonts
    ? meta.fonts.split(',').map(f => f.trim()).filter(Boolean)
    : ['excali', 'nunito'];

  let currentPage = null;
  let currentQuestion = null;

  const pushQuestion = () => {
    if (currentQuestion && currentPage) {
      currentPage.questions.push(currentQuestion);
      currentQuestion = null;
    }
  };

  const pushPage = () => {
    pushQuestion();
    if (currentPage) pages.push(currentPage);
    currentPage = null;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    const pageMatch = trimmed.match(/^##\s+(.+?)(?:\s*\|\s*(.+))?$/);
    if (pageMatch) {
      pushPage();
      currentPage = {
        id: `page_${pages.length + 1}`,
        title: pageMatch[1].trim(),
        subtitle: pageMatch[2] ? pageMatch[2].trim() : '',
        description: '',
        questions: [],
      };
      i++; continue;
    }

    if (trimmed === '---') { pushPage(); i++; continue; }

    if (trimmed.startsWith('>') && currentPage) {
      const desc = trimmed.replace(/^>\s*/, '');
      if (!currentPage.description) currentPage.description = desc;
      i++; continue;
    }

    const qMatch = trimmed.match(/^\[([^\]]+)\]$/);
    if (qMatch && currentPage) {
      pushQuestion();
      const parts = qMatch[1].split('|').map(s => s.trim());
      currentQuestion = {
        type: parts[0], required: parts[1] === 'required',
        id: '', label: '', placeholder: '', options: [],
        min: 1, max: 5, min_label: '', max_label: '',
      };
      i++; continue;
    }

    if (currentQuestion) {
      const propMatch = trimmed.match(/^(\w+):\s*(.*)$/);
      if (propMatch) {
        const [, key, val] = propMatch;
        if      (key === 'id')          currentQuestion.id = val;
        else if (key === 'label')       currentQuestion.label = val;
        else if (key === 'placeholder') currentQuestion.placeholder = val;
        else if (key === 'min')         currentQuestion.min = parseInt(val, 10);
        else if (key === 'max')         currentQuestion.max = parseInt(val, 10);
        else if (key === 'min_label')   currentQuestion.min_label = val;
        else if (key === 'max_label')   currentQuestion.max_label = val;
        i++; continue;
      }
      if (trimmed.startsWith('- ')) {
        currentQuestion.options.push(trimmed.slice(2));
        i++; continue;
      }
    }
    i++;
  }

  pushPage();
  return { meta, pages };
}