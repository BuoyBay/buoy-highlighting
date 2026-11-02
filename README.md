# TextMate and Monaco Monarch grammars plus editor configuration for .bui source

`@buoybay/buoy-highlighting` supplies an authored TextMate grammar, Monaco Monarch
rules and editor configuration for `.bui` source. It recognizes comments,
backslash-escaped strings, conditional directives, declarations and vocabulary.
It provides lexical highlighting rather than compiler diagnostics or completion.

## Use with Shiki

Load the generated grammar from `buoy.tmLanguage.json`:

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

Use `monaco.mjs` for the Monarch integration; the
[integration guide](docs/API.md) documents registration
and disposal. Monaco remains the host application's dependency.

## Generate the grammar

```sh
pnpm install --frozen-lockfile --ignore-scripts
node generate.mjs
npm pack --dry-run
```

The package remains `private: true` until an npm release is prepared. These
assets are JavaScript/editor integrations, not a Buoy compiler package. Current
numeric coverage is decimal integers, fractions and exponents; grammar coverage
does not establish that a program compiles.

## Local Buoy setup

On your own machine, install Buoy and run:

```sh
buoy ai init --both
```

[Contributing](CONTRIBUTING.md) · [License](LICENSE)
