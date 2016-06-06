import got from 'got';
import cheerio from 'cheerio';

const url = 'https://developer.mozilla.org/en-US/docs/Template:CSSData';

got(url).then(({body}) => {
    const $ = cheerio.load(body);

    const result = $('#wikiArticle pre').text().replace(/[\r\t]/g, '');
    const data = JSON.parse(result);
    process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
}).catch(error => console.log('errored: ', error.response.body));
