---
title: Slate Issue Report
subtitle: Something broken? Tell me exactly what happened.
webhook: SLATE
active: true
style: slate
fonts: mono, nunito, excali
default_font: nunito
---

## Page 1 | Who Filed This

> The more detail you give, the faster it gets fixed. No detail is too small.

[short | required]
id: name
label: Your name
placeholder: First name or username

[short | optional]
id: email
label: Email — if you want an update when it's fixed
placeholder: Optional, but helpful

[short | required]
id: issue_title
label: Give this issue a short title
placeholder: e.g. "Code blocks lose formatting on paste"

---

## Page 2 | What Happened

> Describe the bug as if you're explaining it to someone who's never seen it.

[choice | required]
id: issue_area
label: Where in Slate does the issue live?
- Editor / typing experience
- Markdown rendering
- Formatting toolbar
- Exporting or saving
- File / document management
- Performance or loading
- UI / visual glitch
- Keyboard shortcuts
- Something else

[large | required]
id: description
label: What actually went wrong?
placeholder: Describe what you saw — the more specific, the better

[large | required]
id: steps_to_reproduce
label: Steps to reproduce — walk me through it
placeholder: "1. Open a new document\n2. Paste in a code block\n3. Switch to preview mode\n4. The block loses its language tag"

[large | optional]
id: expected_vs_actual
label: What did you expect to happen vs. what actually happened?
placeholder: Expected: X — Actual: Y

---

## Page 3 | Severity & Context

> Helps me prioritize what to fix first.

[scale | required]
id: severity
label: How bad is this on a scale of 1–5?
min: 1
max: 5
min_label: Minor annoyance
max_label: Completely blocks me

[choice | required]
id: frequency
label: How often does it happen?
- Every time, reliably
- Often, but not always
- Happened once or twice
- Not sure

[choice | optional]
id: workaround
label: Did you find any workaround?
- Yes, I found one
- Kind of, but it's annoying
- No workaround at all

[multiselect | optional]
id: environment
label: Any context about your setup that might matter?
- On a school / managed machine
- Using a browser extension that might interfere
- Large or complex document when it happened
- Just started using Slate (within the week)
- Was in the middle of an edit when it happened

---

## Page 4 | Anything Else

[large | optional]
id: other_thoughts
label: Anything else that might help — or just want to say something?
placeholder: Extra context, related bugs, or anything else on your mind