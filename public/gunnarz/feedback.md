---
title: Gunnarz Feedback
subtitle: How's the game feeling?
webhook: GUNNARZ
active: true
style: gunnarz
fonts: mono, nunito, orbitron
default_font: orbitron
---

## Page 1 | Who's Talking

> Takes about 3 minutes. Your answers directly shape the game.

[short | required]
id: name
label: Your name or username
placeholder: In-game name works fine

[choice | required]
id: playtime
label: How much have you played Gunnarz?
- Just a match or two
- A few sessions
- Playing regularly
- I've lost track of the hours

[multiselect | required]
id: modes_played
label: Which modes have you actually played?
- FFA
- TDM
- DOM
- Custom servers

---

## Page 2 | The Feel of the Game

> The gut-check questions.

[scale | required]
id: overall_feel
label: How does Gunnarz feel overall right now?
min: 1
max: 10
min_label: Rough and unpolished
max_label: Tight and satisfying

[scale | required]
id: perk_balance
label: How balanced do the perks feel? (1 = totally broken, 10 = well-tuned)
min: 1
max: 10
min_label: Some perks feel useless or overpowered
max_label: Every perk feels like a real choice

[multiselect | optional]
id: overpowered_perks
label: Any perks that feel overtuned or too dominant right now?
- Shield
- Medkit
- Dash
- Grenade
- Knife (one-shot)
- Landmine
- Gas
- Build
- No Recoil
- Binoculars
- Kevlar
- Camo
- None, feels good

[multiselect | optional]
id: underused_perks
label: Any perks that feel weak or not worth picking?
- Shield
- Medkit
- Dash
- Grenade
- Knife
- Landmine
- Gas
- Build
- No Recoil
- Binoculars
- Kevlar
- Camo
- None, feels good

---

## Page 3 | Weapons & Movement

[scale | required]
id: weapon_balance
label: How balanced do the weapons feel against each other?
min: 1
max: 10
min_label: One weapon dominates everything
max_label: All six feel viable

[choice | optional]
id: strongest_weapon
label: Which weapon feels the strongest right now?
- Pistol
- SMG
- Shotgun
- Assault Rifle
- Sniper
- LMG
- It's actually balanced

[scale | required]
id: movement_feel
label: How does movement feel? Armor weight, speed, dash responsiveness?
min: 1
max: 10
min_label: Clunky and unresponsive
max_label: Fluid and fun

[scale | required]
id: server_performance
label: How stable and lag-free have your sessions been?
min: 1
max: 10
min_label: Constant lag and disconnects
max_label: Rock solid every time

---

## Page 4 | The Big Picture

[choice | required]
id: would_return
label: Would you keep playing Gunnarz?
- Already am, regularly
- Yes, I'll be back
- Maybe — depends on updates
- Probably not
- Definitely not

[multiselect | optional]
id: missing_most
label: What's missing that would make you play more?
- More maps
- Ranked / competitive mode
- More weapons
- More perks or perk tiers
- Better server stability
- Mobile support
- Stat tracking / profiles
- Clans or teams
- Cosmetics / customization
- Something I'll describe below

[large | optional]
id: other_thoughts
label: Anything else — praise, criticism, random thoughts?
placeholder: The floor is yours