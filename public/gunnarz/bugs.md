---
title: Gunnarz Bug Report
subtitle: Something's broken. Let's fix it.
webhook: GUNNARZ
active: true
style: gunnarz
fonts: mono, nunito, orbitron
default_font: mono
---

## Page 1 | Who Filed This

> The more detail you give, the faster this gets squashed.

[short | required]
id: name
label: Your name or in-game username
placeholder: So we know who to follow up with

[short | optional]
id: contact
label: Discord tag or email — if you want an update
placeholder: Optional, but helpful

[short | required]
id: issue_title
label: One-line title for the bug
placeholder: e.g. "Medkit spawns inside a wall on DOM map"

---

## Page 2 | What Kind of Bug

[choice | required]
id: bug_category
label: What category does this fall under?
- Gameplay bug (shooting, movement, collision, hitboxes)
- Perk / ability bug (wrong behavior, not activating, wrong cooldown)
- Weapon bug (damage, reload, bullet behavior)
- UI / HUD bug (wrong display, elements missing, overlapping)
- Server / networking bug (lag, desyncs, disconnects, rubberbanding)
- Map bug (clipping, invisible walls, broken cover)
- Audio bug
- Other

[multiselect | optional]
id: affected_loadout
label: What were you running when it happened? (pick all that apply)
- Pistol
- SMG
- Shotgun
- Assault Rifle
- Sniper
- LMG
- No armor
- Light armor
- Medium armor
- Heavy armor
- Shield perk
- Medkit perk
- Dash perk
- Grenade perk
- Knife perk
- Landmine perk
- Gas perk
- Build perk
- No Recoil
- Binoculars
- Kevlar
- Camo
- Other perk

[choice | optional]
id: game_mode
label: Which mode were you in?
- FFA
- TDM
- DOM
- Custom server
- Not sure / doesn't matter

---

## Page 3 | Reproduce It

> This is the most important part. If I can't reproduce it, I can't fix it.

[large | required]
id: description
label: What went wrong? Describe exactly what you saw.
placeholder: Don't hold back — specific details are everything

[large | required]
id: steps_to_reproduce
label: Steps to reproduce — walk me through it
placeholder: "1. Pick shotgun + dash\n2. Dash into a corner block\n3. Press space again immediately\n4. Player clips through the wall"

[large | optional]
id: expected_vs_actual
label: What should have happened vs. what actually happened?
placeholder: Expected: X — Actual: Y

[choice | required]
id: reproducible
label: Can you reproduce it consistently?
- Yes, happens every time
- Usually, but not always
- Happened once and I'm not sure how
- Happened a few times under specific conditions

---

## Page 4 | Severity & Impact

[scale | required]
id: severity
label: How bad is this? Rate the impact on gameplay.
min: 1
max: 5
min_label: Cosmetic / barely noticeable
max_label: Breaks the game completely

[choice | required]
id: impact_type
label: What does this bug actually affect?
- Gives an unfair advantage (exploitable)
- Blocks normal gameplay
- Causes crashes or disconnects
- Visual or cosmetic only
- Just annoying, not game-breaking

[large | optional]
id: other_thoughts
label: Anything else — extra context, related bugs, a clip link?
placeholder: Discord clips, screenshots, or extra notes welcome here