# Buoy editor highlighting

Independently authored lexical highlighting from the project's supplied Buoy
syntax reference. No grammar or source code is copied from the proprietary
installed VS Code extension. This directory is a JavaScript integration package,
not a `.buipkg` or a language server.

| File | Use |
| --- | --- |
| `buoy.tmLanguage.json` | TextMate grammar, VS Code contribution, Shiki snippet display |
| `language-configuration.json` | VS Code comment, bracket and quote configuration |
| `monaco.mjs` | Native Monarch grammar, editor configuration and registration helper |
| `vocabulary.mjs` | Shared language vocabulary |
| `generate.mjs` | Rebuild the TextMate JSON from the authored specification |

The installed Buoy 0.72.0 extension registers `.bui` as `source.buoy`. Its string
rule recognizes doubled quotes rather than Buoy's documented backslash escapes;
these definitions handle escaped quotes and backslashes. They also distinguish
apostrophe/slash comments, documentation comments, multiline block comments,
conditional directives, keywords, types and decimal numbers. The TextMate grammar
additionally colors declaration names. Unterminated strings recover at the next
line; block comments retain state across lines.

These files highlight **Buoy**, not RB source. RB needs a separate grammar,
especially for doubled-quote strings and `#tag` wrappers. Highlighting does not
validate source, recognize every compiler extension, supply completion, indent
blocks, or replace compiler diagnostics. Numeric coverage is currently decimal
integers/fractions/exponents. CodeMirror and Tree-sitter definitions are not yet
included.

## SvelteKit / Shiki display

Load the JSON as a custom Shiki language, then reuse one highlighter instance on
the server. Set `lang` to `Buoy`. The grammar object can be imported with Vite's
JSON support or read from a server-side file.

```js
import { createHighlighter } from 'shiki';
import buoy from './buoy.tmLanguage.json' with { type: 'json' };

const highlighter = await createHighlighter({
  langs: [buoy], themes: ['github-dark', 'github-light']
});
const html = highlighter.codeToHtml(source, {
  lang: 'Buoy', theme: 'github-dark'
});
```

Shiki accepts custom TextMate grammars:
https://shiki.style/guide/load-lang

## Monaco editing

Import Monaco inside the browser portion of the Svelte app (for example in
`onMount`), call `registerBuoy(monaco)` once, then create an editor with
`language: 'buoy'`. Retain its returned handle to dispose the providers when the
owning integration is destroyed. Monaco itself is provided by the host app; it
is a development dependency here solely to verify the grammar.

Alternatively, Shiki's Monaco integration can share the TextMate grammar and
themes between displayed and editable snippets:
https://shiki.style/packages/monaco

## Generate the grammar

Run from the repository root:

```sh
pnpm install --frozen-lockfile --ignore-scripts
node generate.mjs
npm pack --dry-run
```

Review the generated grammar and exercise changed tokenization in a consumer.
Generating package assets requires no browser or website deployment.
