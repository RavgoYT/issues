---
# ─────────────────────────────────────────────────────────────────────
#  ISSUES — Form Template / Documentation
#  This file is the canonical reference for all supported features.
#  Copy it and rename to build your own form.
#
#  Set active: false to disable a form (returns a "not available" page)
# ─────────────────────────────────────────────────────────────────────

title: Template
subtitle: A reference form showing every question type.

# Set your webhook as an env variable in the format "WEBHOOK_<NAME>_URL", and set <NAME> here, like so:
webhook: NAME

# active: true | false
# false = the route will show a "form not available" page
active: false

# Style to use. Must match a key in src/styles/index.js
# Available: slate
style: slate

# Fonts shown in the radial palette (max 4). Options: excali, nunito, crimson, mono
fonts: excali, nunito

# Font selected on first load
default_font: excali
---

## Page 1 | Short & Large Answers

> Free-text input types — single line and multi-line.

# ── SHORT ANSWER ───────────────────────────────────────────────────────
# Single-line text input. Good for names, emails, short responses.
# required → user cannot advance without filling it in
# optional → shown with an "optional" tag, never blocks progress
[short | required]
id: name
label: What should we call you?
placeholder: A name, alias, or handle

[short | optional]
id: contact
label: How can we reach you?
placeholder: Email, Discord, or anything else

# ── LARGE ANSWER ───────────────────────────────────────────────────────
# Multi-line textarea. Good for detailed feedback, bug descriptions, etc.
[large | optional]
id: freeform
label: Anything you'd like to say?
placeholder: The floor is yours...

---

## Page 2 | Choice & Multi-Select

> Pick-one and pick-many input types.

# ── SINGLE CHOICE (radio) ──────────────────────────────────────────────
# User picks exactly one option. Submitting changes selection.
# Options are defined as bullet points below the properties.
[choice | required]
id: single_pick
label: Pick one of these.
- Option A
- Option B
- Option C
- Option D

# ── MULTI-SELECT (checkboxes) ──────────────────────────────────────────
# User can pick any number of options, including none (if optional).
[multiselect | required]
id: multi_pick
label: Pick everything that applies.
- Feature one
- Feature two
- Feature three
- Feature four
- Feature five

---

## Page 3 | Scale

> Numeric rating scales with optional endpoint labels.

# ── SCALE ──────────────────────────────────────────────────────────────
# Renders a row of numbered tiles. User taps a number.
# min and max define the range. min_label / max_label are optional captions.
[scale | required]
id: scale_5
label: Rate something out of 5.
min: 1
max: 5
min_label: Not at all
max_label: Absolutely

[scale | required]
id: scale_10
label: Rate something out of 10.
min: 0
max: 10
min_label: Terrible
max_label: Perfect

[scale | optional]
id: scale_3
label: A simple 3-point scale also works.
min: 1
max: 3
min_label: Bad
max_label: Good