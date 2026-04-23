---
title: Slate Feedback
subtitle: Tell me what's working, what's not, and what's next.
webhook: SLATE
active: true
style: slate
fonts: mono, nunito, excali
default_font: nunito
---

## Page 1 | Who's Talking

> Takes about 3 minutes. Honest answers only — sugar-coating helps no one.

[short | required]
id: name
label: What's your name?
placeholder: First name, username, whatever you go by

[short | optional]
id: email
label: Email address — if you want a follow-up
placeholder: Totally optional, no spam ever

[choice | required]
id: user_type
label: How would you describe yourself?
- CS / engineering student
- Math or science student
- Other technical student
- Non-technical student
- Just checking it out

---

## Page 2 | The Real Talk

> This is the important part. Be brutal if you need to be.

[scale | required]
id: overall_satisfaction
label: How satisfied are you with Slate overall?
min: 1
max: 10
min_label: Genuinely painful
max_label: It's my new home

[choice | required]
id: would_continue
label: Would you keep using Slate going forward?
- Yes, already using it regularly
- Probably yes
- Not sure yet
- Probably not
- Definitely not

[multiselect | required]
id: missing_features
label: What would push you toward using it more? Pick everything that applies.
- Better export options (PDF, LaTeX, etc.)
- Real-time collaboration
- More markdown / formatting shortcuts
- Code block improvements (syntax highlighting, languages)
- File and image attachments
- Mobile support
- Offline mode
- Custom themes or appearance settings
- Something else (tell me below)

[scale | required]
id: ease_of_use
label: How easy is it to actually use day-to-day?
min: 1
max: 10
min_label: I'm constantly fighting it
max_label: Second nature already

---

## Page 3 | Under the Hood

> The stuff that's harder to notice but matters a lot.

[scale | required]
id: performance
label: How does it feel in terms of speed and reliability?
min: 1
max: 10
min_label: Sluggish and buggy
max_label: Fast and rock solid

[choice | required]
id: vs_alternatives
label: Compared to tools you've used before (Notion, Obsidian, Google Docs, etc.) — where does Slate land?
- Much better
- Somewhat better
- About the same
- Somewhat worse
- Much worse

[multiselect | optional]
id: best_parts
label: What do you actually like about it? Pick any.
- The markdown feel
- The speed / lightweight-ness
- The editor experience
- The Discord-style formatting
- The focus — no bloat
- The aesthetics / UI

---

## Page 4 | Last Call

> Almost done. One open field to say the thing the form didn't think to ask.

[large | optional]
id: one_change
label: If you could change or add one thing, what would it be?
placeholder: Feature request, design tweak, missing shortcut — anything goes

[large | optional]
id: other_thoughts
label: Anything else on your mind?
placeholder: Bugs, praise, random thoughts... the floor is yours