---
title: Issues
subtitle: Something broken? Tell me.
webhook: YOUR_DISCORD_WEBHOOK_URL_HERE
active: true
style: slate
fonts: excali, nunito
default_font: excali
---

## Page 1 | What Happened

[short | optional]
id: reporter
label: Who are you? (optional)
placeholder: Name or handle, in case I need to follow up

[choice | required]
id: type
label: What kind of issue is this?
- Bug / something broken
- Performance problem
- Visual / design glitch
- Missing feature
- Confusing UX
- Other

[large | required]
id: description
label: Describe the issue.
placeholder: What happened? What did you expect to happen?

---

## Page 2 | Details

[short | optional]
id: steps
label: How do I reproduce it?
placeholder: Step 1... Step 2... or just describe it

[choice | optional]
id: frequency
label: How often does this happen?
- Every time
- Most of the time
- Occasionally
- Happened once

[choice | optional]
id: severity
label: How much does it affect you?
- Blocks me completely
- Really annoying
- Minor inconvenience
- Mostly cosmetic

[large | optional]
id: extra
label: Anything else? Screenshots, links, context?
placeholder: Paste links, error messages, or anything helpful.