
# Hexplode

This is a JavaScript implementation of the game
["Hexplode"](https://en.wikipedia.org/wiki/Hexplode).

## Layout

* `js/`: Game logic
* `css/board.css`: Necessary game styles
* `css/style.css`: Added aesthetics for game menus and game
* `index.html, choose.js`: Main menu
* `game.html, game_start.js`: Game page

## Creating Maps

The map system is modular, meaning you can add your own maps/layouts. Maps are
laid out in the following scheme:

Consider the small map below. `o` represents an open tile.

```
        o
    o       o
o       o       o
    o       o
        o
```

This layout can be considered "3x3" and is a two-player map. We can represent
this map in a simple 2D array by rotating it by 45 degrees and flattening it:

```
            c                               (2,0)
       b         f                    (1,0)       (2,1)
  a         e         i   (=)   (0,0)       (1,1)       (2,2)
       d         h                    (0,1)       (1,2)
            g                               (0,2)

                           |
                           |
                        (rotate)
                           |
                           |
                           V

        a                            (0,0)
        d   b                        (0,1)  (1,0)
        g   e   c         (=)        (0,2)  (1,1)  (2,0)
            h   f                           (1,2)  (2,1)
                i                                  (2,2)

                           |
                           |
                       (flatten)
                           |
                           |
                           V

        a   b   c                    (0,0)  (1,0)  (2,0)
        d   e   f         (=)        (0,1)  (1,1)  (2,1)
        g   h   i                    (0,2)  (1,2)  (2,2)
```

The y indices increase up and to the right, and the x indices increase down and
to the right. This way, we can represent our maps without wasting space.

In order to create this layout, we can look at `js/layouts.js`:

```
...
  'Small': {
    n: 2,
    template: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
...
```

Each layout is a property of the `LAYOUTS` object, with the key being the public
name of the layout. `n` represents the number of players for a given map, and
`template` is a 2D array. `1`s in the array will be converted to open tiles, and
`0`s will be converted to empty space (see "Triangle" layout).

