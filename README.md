# css-values [![Build Status](https://travis-ci.org/ben-eb/css-values.svg?branch=master)][ci] [![NPM version](https://badge.fury.io/js/css-values.svg)][npm] [![Coverage Status](https://coveralls.io/repos/github/ben-eb/css-values/badge.svg?branch=master)](https://coveralls.io/github/ben-eb/css-values?branch=master)

> A work in progress CSS grammar parser & code generator.

*This project is in very early alpha stages. At present, around half of the
existing CSS specification is covered in a very limited capacity. Please feel
free to improve the functionality of this module, and test it out,* ***but don't
yet rely on it in production!***

The eventual aim of this project is to generate whole modules that can consume
CSS property/value pairs and validate them based on the actual CSS specification.
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
syntax. This is to ensure that tools generated with css-values can let these
values pass through as valid, even though they are not to specification.

css-values is *parser agnostic* which means that it doesn't matter what parser
you use for the output module. In practice though, you should be using
[PostCSS].

Currently, there is no exposed API for templating a project - you will have to
change the templates in the `run.js` file. This is because we would like to
cover 100% of CSS properties, i.e. the primary functionality, first and then
complete any auxiliary functionality afterwards.

[Autoprefixer]: https://github.com/postcss/autoprefixer
[PostCSS]:      https://github.com/postcss/postcss


## Install

With [npm](https://npmjs.org/package/css-values) do:

```
npm install css-values --save-dev
```


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it.


## License

[Template:CSSData] by Mozilla Contributors is licensed under [CC-BY-SA 2.5].

[Template:CSSData]: https://developer.mozilla.org/en-US/docs/Template:CSSData
[CC-BY-SA 2.5]: http://creativecommons.org/licenses/by-sa/2.5/

MIT © [Ben Briggs](http://beneb.info)


[ci]:      https://travis-ci.org/ben-eb/css-values
[npm]:     http://badge.fury.io/js/css-values
