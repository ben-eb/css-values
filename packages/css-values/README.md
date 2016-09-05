# css-values

See the [css-values homepage](https://github.com/ben-eb/css-values) for more
information.

## Install

With [npm](https://npmjs.org/package/css-values) do:

    npm install css-values

## API

### cssValues

The main entry point of this module takes a CSS property/value
pair, and validates it. It will return either `true` if valid,
or a message object if either invalid or unknown.

**Parameters**

-   `property` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The CSS property to validate.
-   `value` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | valueParser)** Either a string or an AST yielded
    by postcss-value-parser.

**Examples**

_Valid CSS_

```javascript
import cssValues from 'css-values';

cssValues('color', 'transparent');
//=> true
```

_Invalid CSS (recognised properties)_

```javascript
import cssValues from 'css-values';

cssValues('color', 'traansparent');
// => {type: 'invalid', message: '"traansparent" is not a valid value for "color".'}
```

_Invalid CSS (unknown properties)_

```javascript
import cssValues from 'css-values';

cssValues('colr', 'transparent');
// => {type: 'unknown', message: '"colr" is not a recognised property.'}
```

Returns **([boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** 

## License

[Template:CSSData] by Mozilla Contributors is licensed under [CC-BY-SA 2.5].

[template:cssdata]: https://developer.mozilla.org/en-US/docs/Template:CSSData

[cc-by-sa 2.5]: http://creativecommons.org/licenses/by-sa/2.5/

MIT © [Ben Briggs](http://beneb.info)
