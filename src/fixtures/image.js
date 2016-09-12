const linear = ['linear-gradient', 'repeating-linear-gradient'];
const radial = ['radial-gradient', 'repeating-radial-gradient'];
const common = [...linear, ...radial];

export default {
    valid: [
        'url(cat.jpg)',
        'image(#fff)',
        'image("white.png", white)',
        'image(url(cat.jpg), rgb(255, 255, 255))',
        'image-set("cat.jpg" 1x, "large-cat.jpg" 2x, "huge-cat.jpg" 600dpi)',
        'element(#bar)',
        'cross-fade(url(cat.jpg) 50%, #fff)',
        'cross-fade(50% url(cat.jpg), #fff)',
        'cross-fade(url(cat.jpg), url(cat.jpg))',
        ...common.map(fn => `${fn}(red, blue)`),
        ...linear.map(fn => `${fn}(90deg, red, blue)`),
        ...linear.map(fn => `${fn}(90deg, red, red 50%, yellow 50%, yellow)`),
        ...linear.map(fn => `${fn}(to top, red, blue)`),
        ...linear.map(fn => `${fn}(to top left, red, blue)`),
        ...linear.map(fn => `${fn}(to right bottom, red, blue)`),
        ...linear.map(fn => `${fn}(to top, #fff 0%, #000 100%)`),
        ...radial.map(fn => `${fn}(5em, red, blue)`),
        ...radial.map(fn => `${fn}(circle, red, blue)`),
        ...radial.map(fn => `${fn}(circle 5em, red, blue)`),
        ...radial.map(fn => `${fn}(5em circle, red, blue)`),
        ...radial.map(fn => `${fn}(ellipse 10% 10%, red, blue)`),
        ...radial.map(fn => `${fn}(10% 10% ellipse, red, blue)`),
        ...radial.map(fn => `${fn}(circle closest-side, red, blue)`),
        ...radial.map(fn => `${fn}(closest-side circle, red, blue)`),
        ...radial.map(fn => `${fn}(at top, red, yellow, green)`),
        ...radial.map(fn => `${fn}(at top left, red, yellow, green)`),
        ...radial.map(fn => `${fn}(at top 250px left, red, yellow, green)`),
        ...radial.map(fn => `${fn}(at top 250px left 75px, red, yellow, green)`),
        ...radial.map(fn => `${fn}(8em at center, yellow 0%, green 100%)`),
        ...radial.map(fn => `${fn}(ellipse at center, yellow 0%, green 100%)`),
        ...radial.map(fn => `${fn}(farthest-corner at 50% 50%, yellow, green)`),
        ...radial.map(fn => `${fn}(50% 50% at top left, yellow, green)`),
        ...radial.map(fn => `${fn}(circle 50px at top left, yellow, green)`),
        ...radial.map(fn => `${fn}(ellipse 50% 50% at top left, yellow, green)`),
        ...radial.map(fn => `${fn}(50% 50% ellipse at top left, yellow, green)`),
        ...radial.map(fn => `${fn}(closest-corner circle at top 50% left 50%, yellow, green)`),
        ...radial.map(fn => `${fn}(circle closest-corner at top 50% left 50%, yellow, green)`),
    ],
    invalid: [
        'ur(cat.jpg)',
        'image(foo.png)',
        'image("white.png" white)',
        'image(#fff, #fff)',
        'image-set(foo bar)',
        'image-set("cat.jpg" "1x")',
        'image-set(baz quux bar)',
        'image-set("cat.jpg", "cat2.jpg")',
        'image-set(image-set("cat.jpg" 1x) 1x)',
        'element(bar)',
        'element("bar")',
        'element(#bar #bar)',
        'element(#111)',
        'cross-fade(50%, "cat.jpg")',
        'cross-fade(50%, #fff)',
        'cross-fade(foo, bar)',
        'cross-fade(50% url(cat.jpg), "bar")',
        ...common.map(fn => `${fn}(red)`),
        ...common.map(fn => `${fn}("foo", "bar")`),
        ...common.map(fn => `${fn}(foo bar baz)`),
        ...linear.map(fn => `${fn}(to top left right, red, blue)`),
        ...radial.map(fn => `${fn}(circle at, red, blue)`),
        ...radial.map(fn => `${fn}(circle 50%, red, blue)`),
        ...radial.map(fn => `${fn}(ellipse 10%, yellow, green)`),
        ...radial.map(fn => `${fn}(outer at 50% 75%, yellow, blue)`),
        ...radial.map(fn => `${fn}(circle outer at top 50% left 50%, yellow, blue)`),
        ...radial.map(fn => `${fn}(ellipse 50% 50% foo bar baz, yellow, green)`),
        ...radial.map(fn => `${fn}(50% 50% ellipse foo bar baz, yellow, green)`),
    ],
};
