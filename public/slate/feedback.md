---
title: Feedback
subtitle: Tell me what you think.
webhook: SLATE
active: true
style: slate
fonts: excali, nunito
default_font: excali
---

## Page 1 | Quick Intro

> This takes about 2 minutes. No account needed.

[short | optional]
id: name
label: What should we call you?
placeholder: Name, alias, or leave blank

[choice | required]
id: context
label: How did you find this?
- You sent me the link
- Stumbled across it
- Someone shared it
- Other

---

## Page 2 | The Honest Part

[scale | required]
id: overall
label: Overall, how's your impression?
min: 1
max: 5
min_label: Not great
max_label: Really good

[multiselect | optional]
id: highlights
label: What stood out? (pick any)
- The design
- How fast it loads
- It just works
- Something specific I'll mention below

[large | optional]
id: highlight_detail
label: Want to expand on any of that?
placeholder: Totally optional, but appreciated...

---

## Page 3 | What Could Be Better

[large | optional]
id: friction
label: Was there anything confusing or frustrating?
placeholder: Even small things are worth knowing about.

[choice | optional]
id: return
label: Would you come back or recommend this?
- Definitely
- Probably
- Not sure
- Probably not

[short | optional]
id: one_thing
label: One thing you'd change or add?
placeholder: Dream freely.