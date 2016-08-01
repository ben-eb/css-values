import camelCase from 'camelcase';
import fs from 'fs';
import {join} from 'path';
import {inspect} from 'util';
import HtmlEntities from 'html-entities';
import completed from '../completed';

const encode = new HtmlEntities.AllHtmlEntities().encode;

const entries = [];

export function pass (property, syntax, parsed) {
    // Don't log properties that we completed
    if (~completed.indexOf(property)) {
        return;
    }
    entries.push(`
    <h1 id="${camelCase(property)}"><a href="#${camelCase(property)}">${property}</a></h1>
    <p>${encode(syntax)}</p>
    <pre><code>${inspect(parsed, false, null)}</code></pre>
    `);
}

export function fail () {}

export function total () {
    let stats = fs.createWriteStream(join(__dirname, `../../output/stats.html`));
    stats.write(`
    <html>
        <head>
            <style>
                body {
                    color: #f1f1f1;
                    background: #3f5c69;
                    max-width: 1024px;
                    margin: 20px auto;
                }

                body, pre code {
                    font-family: monospace, monospace;
                }

                h1 {
                    font-size: 1rem;
                    font-weight: normal;
                }

                h1, h1 a {
                    color: #fc3;
                }

                h1, p {
                    border-bottom: 1px solid #527889;
                    padding: 10px 0;
                    margin: 0;
                }

                pre {
                    margin-bottom: 40px;
                }
            </style>
        </head>
        <body>
            ${entries.join('\n')}
        </body>
    </html>
    `);
    stats.end();
}
