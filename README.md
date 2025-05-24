[![Latest Version](https://img.shields.io/github/v/release/dev7355608/vision-t20?display_name=tag&sort=semver&label=Latest%20Version)](https://github.com/dev7355608/vision-t20/releases/latest)
![Foundry Version](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https%3A%2F%2Fraw.githubusercontent.com%2Fdev7355608%2Fvision-5e%2Fmain%2Fmodule.json)
[![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fvision-5e&colorB=blueviolet)](https://forge-vtt.com/bazaar#package=vision-t20)
[![License](https://img.shields.io/github/license/dev7355608/vision-t20?label=License)](LICENSE)

# Vision 5e (Foundry VTT Module)

Additional and improved Vision/Detection modes for D&D 5e including automatic vision management based on the actor's senses, feats, and active effects.

The automation detects relevant feats and effects that affect the creatures senses and detection by their name (supported are English, German, French, Spanish, and Portuguese (Brazil)). No configuration is required unless you want to adjust the default hearing range formula (for example, turn hearing off entirely by default) or disable [Spectator Mode](#spectator-mode).

---

### Detection Modes

- **Blindsense _(Legacy)_** _(Class Feature: Rogue, SRD 5.1 / PHB'14 94)_
  - Detects PC/NPC actors that are not objects (e.g. [Item Piles](https://foundryvtt.com/packages/item-piles)).
  - Cannot detect actors that are _burrowing_, _defeated (dead)_, _ethereal_ (from the the material plane), or _petrified_.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _deafened_, _defeated_ (_dead_), _petrified_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically for PC actors with the `Blindsense`[\*](#translations) feat.
- **Blindsight** _(Sense, SRD 5.1 / PHB'14 183 / PHB'24 361)_
  - Detects tokens, notes, and door controls.
  - Cannot detect actors that are _burrowing_ or _ethereal_ (from the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise).
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_. Also disabled if _deafened_ and the actor is a NPC and has the `Echolocation`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 318)_ or `Blind Senses`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 175)_ feat.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically from the actor's _Blindsight_.
- **Blood Sense** _(Homebrew)_
  - Detects PC/NPC actors that are not constructs, elementals, oozes, plants, undead, or objects (e.g. [Item Piles](https://foundryvtt.com/packages/item-piles)), and any actor that is _bleeding_.
  - Cannot detect actors that are _ethereal_ (from the the material plane), _petrified_ and not _bleeding_, or immune to _bleeding_.
  - Does not reveal the identity of detected tokens.
  - Disabled while _defeated_ (_dead_), _petrified_, or _unconscious_.
  - Is not restricted by walls or blocked by darkness sources.
  - Configured automatically for NPC actors that have the `Blood Sense`[\*](#translations) feat.
- **Darkvision** _(Sense, SRD 5.1 / PHB'14 183 / PHB'24 260)_
  - Detects tokens, notes, and door controls.
  - Cannot detect actors that are _burrowing_, _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise), or _invisible_. Also cannot detect PC actors with the `Umbral Sight`[\*](#translations) _(Subclass Feature: Gloom Stalker Ranger, XGE 41 / PHB'24 126)_ feat.
  - Disabled while _blinded_, _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and is blocked by darkness sources unless the actor in a NPC with the `Devil's Sight`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 70)_ feat, in which case it is blocked by darkness sources with priority less than 100.
  - Configured automatically from the actor's _Darkvision_.
- **Detect Evil and Good** _(Spell, SRD 5.1 / PHB'14 231 / PHB'24 261)_
  - Detects aberrations, celestials, elementals, feys, fiends, undeads, and PC actors with the `Hollow One`[\*](#translations) _(Character Creation Option, EGW 182)_, `Supernatural Gift: Hollow One`, or `Supernatural Gifts: Hollow One` feat.
  - Cannot detect actors that are _burrowing_ or _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise). Also cannot detect actors with the `Mind Blank`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 259 / PHB'24 298)_ or `Nondetection`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 263 / PHB'24 302)_ effect.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically for actors that have the `Detect Evil and Good`[\*](#translations) effect.
- **Detect Magic** _(Spell, SRD 5.1 / PHB'14 231 / PHB'24 262)_
  - Detects actors that are carry a visible magic item (a magic item that is either not in a container or not equipped) or are affected by a spell effect.
  - Cannot detect anything on its own and requires another sense to see the target.
  - Cannot detect actors that are _burrowing_ or _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise). Also cannot detect actors with the `Mind Blank`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 259 / PHB'24 298)_ or `Nondetection`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 263 / PHB'24 302)_ effect.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically for actors with the `Detect Magic`[\*](#translations) effect, PC actors with the `Magic Awareness`[\*](#translations) _(Subclass Feature: Wild Magic Barbarian, TCE 25)_ feat, and NPC actors with the `Sense Magic`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 40)_ feat.
- **Detect Poison and Disease** _(Spell, SRD 5.1 / PHB'14 231 / PHB'24 262)_
  - Detects all actors that have a poisonous natural weapon attack or have the _poisoned_ or _diseased_ status effect.
  - Cannot detect actors that are _burrowing_ or _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise). Also cannot detect actors with the `Mind Blank`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 259 / PHB'24 298)_ or `Nondetection`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 263 / PHB'24 302)_ effect.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically for actors that have the `Detect Poison and Disease`[\*](#translations) effect.
  - _Note: Some poisonous creatures might not be detected, because the Versatile Damage of the natural weapon attack is missing the `[poison]` flavor, which you'll need to fix yourself._
- **Detect Thoughts** _(Spell, SRD 5.1 / PHB'14 231 / PHB'24 262)_
  - Detects all PC/NPC actors that speak at least one language or are telepathic (or, if legacy rules, have an Intelligence of 4 or higher and speak at least one language) and are not an object (e.g. [Item Piles](https://foundryvtt.com/packages/item-piles)).
  - Cannot detect actors that are _burrowing_ or _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise). Also cannot detect actors with the `Mind Blank`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 259 / PHB'24 298)_ or `Nondetection`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 263 / PHB'24 302)_ effect.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically for actors that have the `Detect Thoughts`[\*](#translations) effect.
- **Devil's Sight** _(Eldritch Invocation, SRD 5.1 / PHB'14 110 / PHB'24 155)_
  - Can detect tokens, notes, and door controls.
  - Cannot detect actors that are _burrowing_, _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise), or _invisible_.
  - Disabled while _blinded_, _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources with priority less than 100.
  - Configured automatically for PC actors that have the `Devil's Sight`[\*](#translations), `Invocation: Devil's Sight`, `Invocations: Devil's Sight`, `Eldritch Invocation: Devil's Sight`, `Eldritch Invocations: Devil's Sight`, or `Eldritch Adept: Devil's Sight` feat.
  - _Note: Remove the active effect that gives 120 feet Darkvision from the Invocation: Devil's Sight feat if it exists: Devil's Sight doesn't increase the range of Darkvision._
- **Divine Sense** _(Class Feature: Paladin, SRD 5.1 / PHB'14 82 / PHB'24 110)_
  - Detects celestials, fiends, undead, and PC actors with the `Hollow One`[\*](#translations) _(Character Creation Option, EGW 182)_, `Supernatural Gift: Hollow One`, or `Supernatural Gifts: Hollow One` feat.
  - Cannot detect actors that are _burrowing_, _ethereal_ (from the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise), or _petrified_.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls with legacy rules, otherwise not. Isn't blocked by darkness sources.
  - Configured automatically for PC actors with the `Divine Sense`[\*](#translations) effect.
- **Ethereal Sight** _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_
  - Allows detection _ethereal_ actors.
  - Cannot detect anything on its own and requires another sense to see the target without the _ethereal_ status.
  - Is not restricted by walls or blocked by darkness sources.
  - Configured automatically for NPC actors that have the `Ethereal Sight`[\*](#translations) feat and PC actors with the `The Third Eye: Ethereal Sight`[\*](#translations) feat.
- **Eyes of the Grave** _(Class Feature: Cleric, XGE 19)_
  - Detects undead, and PC actors with the `Hollow One`[\*](#translations) _(Character Creation Option, EGW 182)_, `Supernatural Gift: Hollow One`, or `Supernatural Gifts: Hollow One` feat.
  - Cannot detect actors that are _burrowing_, _ethereal_ (from the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise), or _petrified_. Also cannot detect actors with the `Nondetection`[\*](#translations) _(Spell, SRD 5.1 / PHB'14 263)_ effect.
  - Does not reveal the identity of detected tokens.
  - Disabled while _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources.
  - Configured automatically for PC actors with the `Eyes of the Grave`[\*](#translations) effect.
- **Hearing**
  - Detects PC/NPC actors that are not objects (e.g. [Item Piles](https://foundryvtt.com/packages/item-piles)).
  - Cannot detect actors that are _defeated (dead)_, _ethereal_ (from the the material plane), _inaudible_, or _petrified_.
  - Disabled while _deafened_, _defeated_ (_dead_), _petrified_, or _unconscious_.
  - Is restricted by sound-blocking walls with reversed direction.
  - By default all tokens have hearing range of 15 + 2.5 * (*Passive Perception* - 10) feet (`15 + 2.5 * (@skills.prc.passive - 10)`). The default hearing range can be configured in the module settings.
- **Life Sense** _(Monster Feature, e.g. MPMM'14 250 / MTF 246)_
  - Detects PC/NPC actors that are not undead, constructs, or objects (e.g. [Item Piles](https://foundryvtt.com/packages/item-piles)).
  - Cannot detect actors that are _defeated (dead)_, _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise), or _petrified_.
  - Does not reveal the identity of detected tokens.
  - Disabled while _defeated_ (_dead_), _petrified_, or _unconscious_.
  - Is not restricted by walls or blocked by darkness sources.
  - Configured automatically for NPC actors that have the `Life Sense`[\*](#translations) feat.
- **Light Perception**
  - Detects tokens, notes, and door controls that are illuminated a light source or are _burning_.
  - Cannot detect actors that are _burrowing_, _ethereal_ (from the the material plane unless the `Etherealness`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 147)_ NPC feat says otherwise), or _invisible_.
  - Disabled while _blinded_, _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and is blocked by darkness sources.
  - Infinite range by default.
- **See Invisibility** _(Spell, SRD 5.1 / PHB'14 274 / PHB'24 314)_
  - Allows detection of _invisible_ and _ethereal_ actors.
  - Cannot detect anything on its own and requires another sense to see the target without the _ethereal_ and _invisible_ status.
  - Is not restricted by walls or blocked by darkness sources.
  - Configured automatically for actors with the `See Invisibility`[\*](#translations) effect and PC actors with the `The Third Eye: See Invisibility`[\*](#translations) _(Class Feature: Wizard, PHB'14 116)_ feat.
- **Thermal Vision** _(Ancestry Feature: Ashka, Ember)_
  - Detects beasts, celestials, dragons, feys, fiends, giants, humanoids, monstrosities, and other warm-blooded creatures. Also detects any creature that is _burning_.
  - Cannot detect actors that are _burrowing_ or _ethereal_.
  - Disabled while _blinded_, _burrowing_, _defeated_ (_dead_), _incapacitated_, _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and is blocked by darkness sources.
  - Configured automatically for actors with the `Thermal Vision`[\*](#translations) _(Ancestry Feature: Ashka, Ember)_ feat.
- **Tremorsense** _(Sense, SRD 5.1 / MM'14 9 / PHB'24 377)_
  - Detects PC/NPC actors that are not objects (e.g. [Item Piles](https://foundryvtt.com/packages/item-piles)).
  - Cannot detect actors that are _burrowing_, _defeated (dead)_, _ethereal_ (from the the material plane), _flying_, _hovering_, or _petrified_.
  - Does not reveal the identity of detected tokens.
  - Disabled while _defeated_ (_dead_), _flying_, _hovering_, _petrified_, or _unconscious_.
  - Is not restricted by walls or blocked by darkness sources.
  - Configured automatically from the actor's _Tremorsense_.
- **Truesight** _(Sense, SRD 5.1 / PHB'14 183 / PHB'24 377)_
  - Detects tokens, notes, and door controls.
  - Cannot detect actors that are _burrowing_.
  - Disabled while _blinded_, _burrowing_, _defeated_ (_dead_), _petrified_, _sleeping_, or _unconscious_.
  - Is restricted by sight-blocking walls and isn't blocked by darkness sources with priority less than 100.
  - Configured automatically from the actor's _Truesight_.
- **Witch Sight _(Legacy)_** _(Eldritch Invocation, SRD 5.1 / PHB'14 111)_
  - Allows detection of PC/NPC actors that have has the `Shapechanger`[\*](#translations) creature subtype and NPC actors with the `Shapechanger`[\*](#translations) _(Monster Feature, e.g. SRD 5.1 / MM'14 220)_ feat.
  - Cannot detect anything on its own and requires another sense to see the target.
  - Is not restricted by walls or blocked by darkness sources.
  - Configured automatically for PC actor that have the `Witch Sight`[\*](#translations), `Invocation: Witch Sight`, `Invocations: Witch Sight`, `Eldritch Invocation: Witch Sight`, `Eldritch Invocations: Witch Sight`, or `Eldritch Adept: Witch Sight` feat.

PC actors that have the `Ghostly Gaze`[\*](#translations) _(Eldritch Invocation, XGE 56)_, `Invocation: Ghostly Gaze`, `Invocations: Ghostly Gaze`, `Eldritch Invocation: Ghostly Gaze`, `Eldritch Invocations: Ghostly Gaze`, or `Eldritch Adept: Ghostly Gaze` feat gain 30 feet _Darkvision_ and can see through walls within 30 feet.

---

### Vision Modes

This module restricts the available vision modes to _Blindsight_, _Darkvision_, _Devil's Sight_, and _Truesight_. The vision mode can be changed in token's HUD (<img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/regular/eye.svg" width="16px" height="16px" style="filter: invert(100%);">) if the token has at least two of these senses. Players can select their preferred vision mode for their owned tokens on their own this way.

---

### Spectator Mode

While a player owns/observes only tokens with vision that are _defeated_ (_dead_), _petrified_, or _unconscious_, tokens with vision owned by other players become a source of vision for this player if they have limited permission for the token's actor. This behavior aims to prevent players from missing out on all the fun when their character dies, is knocked unconscious, or is petrified, which are all conditions which make the token not perceive anything and are likely to affect the character more than one round of combat.

---

### Active Effects

| Detection Mode            | Attribute Key                                     |
| ------------------------- | ------------------------------------------------- |
| Blindsight                | `system.attributes.senses.blindsight`             |
| Darkvision                | `system.attributes.senses.darkvision`             |
| Thermal Vision            | `system.attributes.senses.thermalVision`          |
| Tremorsense               | `system.attributes.senses.tremorsense`            |
| Truesight                 | `system.attributes.senses.truesight`              |
