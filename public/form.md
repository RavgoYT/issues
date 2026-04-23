---
# ─────────────────────────────────────────────────────────────
#  ISSUES — Form Configuration
#  This file defines everything about your form.
#  Lines starting with # are comments and are ignored.
# ─────────────────────────────────────────────────────────────

title: Issues & Feedback
subtitle: Your thoughts help shape what gets built next.
webhook: https://discord.com/api/webhooks/1496735911181025362/J3Lf8Mr0P19cVO7qx-Qnyzi4G2YMbEwJaG9KYbfjgRl2GD_fJ91baNCb5YKfd8v6xPyJ

# Style to apply. Must match a key in src/styles/
# Available built-in styles: slate
style: slate
active: false
# Fonts available in the radial palette (max ~4 recommended)
# Available: excali, nunito, crimson, mono
fonts: excali, nunito

# Which font is selected by default
default_font: nunito
---

## Page 1 | About You

> This first section helps us understand who we're talking to.

# ── SHORT ANSWER ───────────────────────────────────────────────
# A single-line text input.
# required / optional controls validation before advancing.
[short | required]
id: name
label: What should we call you?
placeholder: A name, alias, or handle

[short | optional]
id: contact
label: How can we reach you? (optional)
placeholder: Email, Discord, or anything else

# ── SINGLE CHOICE (radio) ──────────────────────────────────────
# User picks exactly one option from a list.
[choice | required]
id: role
label: Which best describes you?
- Just browsing
- Power user
- Developer / Builder
- Found this by accident

---

## Page 2 | Your Experience

> Tell us about how things have been going.

# ── SCALE ──────────────────────────────────────────────────────
# Renders a row of numbered tiles from min to max.
# min_label and max_label are optional endpoint captions.
[scale | required]
id: overall_satisfaction
label: How satisfied are you overall?
min: 1
max: 10
min_label: Pretty rough
max_label: Absolutely love it

[scale | required]
id: ease_of_use
label: How easy is it to use?
min: 1
max: 5
min_label: Confusing
max_label: Effortless

# ── MULTI-SELECT (checkboxes) ───────────────────────────────────
# User can pick any number of options.
[multiselect | required]
id: used_features
label: Which features have you used?
- Core editor
- Export / sharing
- Keyboard shortcuts
- Themes & appearance
- Mobile / tablet
- Integrations

---

## Page 3 | Issues & Wishes

> The important stuff — what's broken or missing?

# ── LARGE ANSWER ───────────────────────────────────────────────
# A multi-line textarea. Good for freeform feedback.
[large | optional]
id: biggest_issue
label: What's the biggest issue you've run into?
placeholder: Describe what happened, steps to reproduce, or just vent...

[large | optional]
id: feature_request
label: If you could add one thing, what would it be?
placeholder: Dream big. No idea is too small or too wild.

[choice | optional]
id: priority
label: What matters most to fix first?
- Bugs & stability
- Performance / speed
- Missing features
- Design & polish
- Documentation

---

## Page 4 | Final Thoughts

> Almost done — just a couple more.

[scale | required]
id: recommendation
label: How likely are you to recommend this?
min: 0
max: 10
min_label: Not at all
max_label: Absolutely

[short | optional]
id: one_word
label: Describe this app in one word.
placeholder: Just one...

[large | optional]
id: anything_else
label: Anything else you'd like us to know?
placeholder: The floor is yours.