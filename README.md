# css-values [![Build Status](https://travis-ci.org/ben-eb/css-values.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/css-values.svg)][npm] [![Coverage Status](https://coveralls.io/repos/github/ben-eb/css-values/badge.svg?branch=master)](https://coveralls.io/github/ben-eb/css-values?branch=master)

> Validate CSS property value pairs.

_This project is in very early alpha stages. At present, around half of the
existing CSS specification is covered in a very limited capacity. Please feel
free to improve the functionality of this module, and test it out,_ **_but don't
yet rely on it in production!_**

The aim of this project is to produce a module that can consume CSS
property/value pairs and validate them based on the actual CSS specification.
This is useful because it brings what is traditionally hidden away in online
documentation to automated tools such as linters. Indeed, with this data we can
cover all of these use cases (and others):

* Remove invalid declarations which would be dropped by the browser.
* Lint properties to ensure correct syntax was being used.
* Enable text editor autocomplete for CSS values.
* Compute the Levenshtein distance between valid/invalid property values
  (did you mean yellow? you entered yrllow).
* Automatically generate a skeleton W3C specification document based on grammar.

css-values uses specification data gathered from Mozilla, with some overrides
that make it easier for the parser to operate smoothly. In addition, css-values
uses [Autoprefixer] to supplement values from the spec with proprietary browser
syntax. This is to ensure that css-values can let these values pass through as
valid, even though they are not to specification.

[autoprefixer]: https://github.com/postcss/autoprefixer


## Property support

We support 249 of 361 CSS properties (68.98%).

* `-ms-overflow-style`
* `-moz-appearance`
* `-moz-binding`
* `-moz-float-edge`
* `-moz-force-broken-image-icon`
* `-moz-orient`
* `-moz-stack-sizing`
* `-moz-text-blink`
* `-moz-user-focus`
* `-moz-user-input`
* `-moz-user-modify`
* `-moz-window-shadow`
* `-webkit-border-before-color`
* `-webkit-border-before-style`
* `-webkit-border-before-width`
* `-webkit-mask-attachment`
* `-webkit-mask-repeat`
* `-webkit-mask-repeat-x`
* `-webkit-mask-repeat-y`
* `-webkit-tap-highlight-color`
* `-webkit-text-fill-color`
* `-webkit-text-stroke-color`
* `-webkit-text-stroke-width`
* `-webkit-touch-callout`
* `align-content`
* `align-items`
* `align-self`
* `all`
* `animation-delay`
* `animation-direction`
* `animation-duration`
* `animation-fill-mode`
* `animation-name`
* `animation-play-state`
* `animation-timing-function`
* `animation-iteration-count`
* `appearance`
* `backdrop-filter`
* `background-blend-mode`
* `backface-visibility`
* `background-attachment`
* `background-color`
* `background-clip`
* `background-image`
* `background-origin`
* `background-position`
* `background-repeat`
* `background-size`
* `border-block-end-color`
* `border-block-end-style`
* `border-block-end-width`
* `border-bottom-left-radius`
* `border-bottom-right-radius`
* `border-block-start-color`
* `border-block-start-style`
* `border-block-start-width`
* `border-bottom-color`
* `border-bottom-style`
* `border-bottom-width`
* `border-collapse`
* `border-color`
* `border-image-source`
* `border-inline-end-color`
* `border-inline-end-style`
* `border-inline-end-width`
* `border-inline-start-color`
* `border-inline-start-style`
* `border-inline-start-width`
* `border-left-color`
* `border-left-style`
* `border-left-width`
* `border-right-color`
* `border-right-style`
* `border-right-width`
* `border-style`
* `border-top-color`
* `border-top-left-radius`
* `border-top-right-radius`
* `border-top-style`
* `border-top-width`
* `border-width`
* `bottom`
* `box-align`
* `box-decoration-break`
* `box-direction`
* `box-flex`
* `box-flex-group`
* `box-lines`
* `box-ordinal-group`
* `box-orient`
* `box-pack`
* `box-sizing`
* `box-suppress`
* `break-after`
* `break-before`
* `break-inside`
* `caption-side`
* `clear`
* `color`
* `column-count`
* `column-fill`
* `column-gap`
* `column-rule-color`
* `column-rule-style`
* `column-rule-width`
* `column-span`
* `column-width`
* `direction`
* `display`
* `display-inside`
* `display-list`
* `display-outside`
* `empty-cells`
* `filter`
* `flex-direction`
* `flex-grow`
* `flex-shrink`
* `flex-wrap`
* `float`
* `font-kerning`
* `font-language-override`
* `font-size`
* `font-size-adjust`
* `font-stretch`
* `font-style`
* `font-variant-caps`
* `font-variant-position`
* `font-weight`
* `grid-auto-columns`
* `grid-auto-rows`
* `grid-column-gap`
* `grid-row-gap`
* `grid-template-areas`
* `hyphens`
* `image-rendering`
* `ime-mode`
* `initial-letter-align`
* `isolation`
* `justify-content`
* `left`
* `letter-spacing`
* `line-break`
* `line-height`
* `list-style-image`
* `list-style-position`
* `list-style-type`
* `margin-block-end`
* `margin-block-start`
* `margin-bottom`
* `margin-inline-end`
* `margin-inline-start`
* `margin-left`
* `margin-right`
* `margin-top`
* `marker-offset`
* `mask-composite`
* `mask-mode`
* `mask-origin`
* `mask-position`
* `mask-repeat`
* `mask-size`
* `mask-type`
* `max-block-size`
* `max-height`
* `max-inline-size`
* `max-width`
* `min-block-size`
* `min-height`
* `min-inline-size`
* `min-width`
* `mix-blend-mode`
* `motion-offset`
* `object-fit`
* `object-position`
* `offset-block-end`
* `offset-block-start`
* `offset-inline-end`
* `offset-inline-start`
* `opacity`
* `order`
* `orphans`
* `outline-color`
* `outline-offset`
* `outline-style`
* `outline-width`
* `overflow`
* `overflow-clip-box`
* `overflow-wrap`
* `overflow-x`
* `overflow-y`
* `padding-block-end`
* `padding-block-start`
* `padding-bottom`
* `padding-inline-end`
* `padding-inline-start`
* `padding-left`
* `padding-right`
* `padding-top`
* `page-break-after`
* `page-break-before`
* `page-break-inside`
* `perspective`
* `perspective-origin`
* `pointer-events`
* `position`
* `resize`
* `right`
* `ruby-align`
* `ruby-merge`
* `ruby-position`
* `scroll-behavior`
* `scroll-snap-coordinate`
* `scroll-snap-destination`
* `scroll-snap-type`
* `scroll-snap-type-x`
* `scroll-snap-type-y`
* `shape-image-threshold`
* `shape-margin`
* `tab-size`
* `table-layout`
* `text-align`
* `text-align-last`
* `text-decoration-color`
* `text-decoration-style`
* `text-emphasis-color`
* `text-orientation`
* `text-rendering`
* `text-shadow`
* `text-size-adjust`
* `text-transform`
* `top`
* `transform`
* `transform-box`
* `transform-style`
* `transition-delay`
* `transition-duration`
* `transition-timing-function`
* `unicode-bidi`
* `user-select`
* `vertical-align`
* `visibility`
* `white-space`
* `widows`
* `will-change`
* `word-break`
* `word-spacing`
* `word-wrap`
* `writing-mode`
* `z-index`



## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/1282980?v=3" width="100px;"/><br /><sub>Ben Briggs</sub>](http://beneb.info)<br />[💻](https://github.com/ben-eb/css-values/commits?author=ben-eb) [📖](https://github.com/ben-eb/css-values/commits?author=ben-eb) 👀 [⚠️](https://github.com/ben-eb/css-values/commits?author=ben-eb) | [<img src="https://avatars.githubusercontent.com/u/13777538?v=3" width="100px;"/><br /><sub>Ivan Serniaev</sub>](https://github.com/delorge)<br />[💻](https://github.com/ben-eb/css-values/commits?author=delorge) [⚠️](https://github.com/ben-eb/css-values/commits?author=delorge) | [<img src="https://avatars.githubusercontent.com/u/11515852?v=3" width="100px;"/><br /><sub>Oleg-docent</sub>](https://github.com/Oleg-docent)<br />[💻](https://github.com/ben-eb/css-values/commits?author=Oleg-docent) [⚠️](https://github.com/ben-eb/css-values/commits?author=Oleg-docent) |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors] specification. Contributions of
any kind welcome!


## License

[Template:CSSData] by Mozilla Contributors is licensed under [CC-BY-SA 2.5].

[template:cssdata]: https://developer.mozilla.org/en-US/docs/Template:CSSData

[cc-by-sa 2.5]: http://creativecommons.org/licenses/by-sa/2.5/

MIT © [Ben Briggs](http://beneb.info)

[all-contributors]: https://github.com/kentcdodds/all-contributors

[ci]: https://travis-ci.org/ben-eb/css-values

[npm]: http://badge.fury.io/js/css-values
