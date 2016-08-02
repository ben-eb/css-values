import fs from 'fs';
import {join} from 'path';
import {inspect} from 'util';
import camelCase from 'camelcase';
import HtmlEntities from 'html-entities';
import completed from '../completed';

const encode = new HtmlEntities.AllHtmlEntities().encode;

const passes = [];
const progressing = [];
const fails = [];

export function pass (property, syntax, parsed) {
    if (~completed.indexOf(property)) {
        passes.push(`
        <h2 id="${camelCase(property)}"><a href="#${camelCase(property)}">${property}</a></h2>
        <p>${encode(syntax)}</p>
        <pre><code>${inspect(parsed, false, null)}</code></pre>
        `);
        return;
    }
    progressing.push(`
    <h2 id="${camelCase(property)}"><a href="#${camelCase(property)}">${property}</a></h2>
    <p>${encode(syntax)}</p>
    <pre><code>${inspect(parsed, false, null)}</code></pre>
    `);
}

export function fail (property, syntax, parsed) {
    fails.push(`
    <h2 id="${camelCase(property)}"><a href="#${camelCase(property)}">${property}</a></h2>
    <p>${encode(syntax)}</p>
    <pre><code>${inspect(parsed, false, null)}</code></pre>
    `);
}

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

                h2 {
                    font-size: 1rem;
                    font-weight: normal;
                }

                h2, h2 a {
                    color: #fc3;
                }

                h2, p {
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
            <h1>In progress</h1>
            <p>These properties are parsed by the parser, but are not marked
            as <em>completed</em>; so their implementation may be missing or
            incomplete.</p>
            ${progressing.join('\n')}
            <h1>Missing</h1>
            <p>Either parsing or creating validators for these properties
            <em>may</em> be incomplete. You can add them to the "in progress"
            list by broadening the "known" function in <em>src/run.js</em>.</p>
            ${fails.join('\n')}
            <h1>Complete</h1>
            <p>These properties have been fully implemented.</p>
            ${passes.join('\n')}
        </body>
    </html>
    `);
    stats.end();
}
