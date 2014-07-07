# mtg-list
A node extension for listing out existing Magic the Gathering&trade; (&copy; WotC) expansions and cards.

This is backed by [magiccards.info](http://magiccards.info/). If you're looking for specific card info / stats / ruling / type / text search, this won't do what you want - try [tutor](https://github.com/davidchambers/tutor) instead (that's backed by the official Gatherer. The only advantage this has over it is that this includes promo sets and alternate art (and potentially later, tokens).

## Installing
```
npm install mtg-list
```

## API

```
var mtg = require("mtg-list");
```

Each of these methods takes an optional `language` parameter, defaulting to "en". The full set of options are "en", "de", "fr", "it", "es", "pt", "jp", "cn", "ru", and "tw" (*theoretically* all of those work, but the tests for this only cover English).

### expansions([language], callback)
Expects a callback in the form `function(error, result)`. The `result` passed back is an object with set abbreviations (e.g. "ths" = Theros) as keys and the full set name as values.

```
   { jou: 'Journey into Nyx',
     bng: 'Born of the Gods',
     ths: 'Theros',
     dgm: 'Dragon\'s Maze',
     gtc: 'Gatecrash',
     rtr: 'Return to Ravnica',
     avr: 'Avacyn Restored',
     dka: 'Dark Ascension',
     isd: 'Innistrad',
     ...
```

### cardsInExpansion(expansion, [language,] callback)
Expects a callback in the form `function(error, results)`. The `results` passed back is an array containing all cards found in that set.

Each card contains the following properties:

* `number` - The number of the card within the set.
* `name` - The full name.
* `type` - The card's type, _as printed_.
* `mana` - The mana cost, or null if it doesn't have one.
* `rarity` - The rarity, fully spelled out. The possible values are "Common", "Uncommon", "Rare", "Mythic Rare", "Land", and "Special".
* `artist` - The artist's name.

```
   [ { number: '1',
       name: 'Cao Cao, Lord of Wei',
       type: 'Legendary Creature — Human Soldier 3/3',
       mana: '3BB',
       rarity: 'Mythic Rare',
       artist: 'Gao Jianzhang' },
     { number: '2',
       name: 'Captain Sisay',
       type: 'Legendary Creature — Human Soldier 2/2',
       mana: '2WG',
       rarity: 'Mythic Rare',
       artist: 'Ray Lago' },
     { number: '3',
       name: 'Doran, the Siege Tower',
       type: 'Legendary Creature — Treefolk Shaman 0/5',
       mana: 'WBG',
       rarity: 'Mythic Rare',
       artist: 'Mark Zug' },
     { number: '4',
       name: 'Kiki-Jiki, Mirror Breaker',
       type: 'Legendary Creature — Goblin Shaman 2/2',
       mana: '2RRR',
       rarity: 'Mythic Rare',
       artist: 'Steven Belledin' },
     ...
```

### cardImageURL(expansion, number[, language])
Returns a URL that (hopefully*) points to a scan of that card, hosted by magiccards.info. As this is hosted by them, please cache it locally if you need it more than once to avoid putting undue strain on their servers.

(* Hopefully = They have some dead links)

## License
MIT
