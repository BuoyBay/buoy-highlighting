# Contributing to buoy-highlighting

This repository owns `@buoybay/buoy-highlighting` at the repository root. It supplies TextMate/Monarch lexical grammars and
editor integration, not a `.buipkg`, compiler or language server. Keep authored
vocabulary and generated grammar behavior aligned.

## Development conventions

Use the package's pinned development dependencies and source guide. Verify syntax
claims against the installed Buoy language reference and compiler when changing
language examples or highlighting rules.

## Build context

Read the [highlighting source guide](docs/API.md).
Use its lockfile and pinned development dependencies; from the package directory:

```sh
pnpm install --frozen-lockfile --ignore-scripts
node generate.mjs
npm pack --dry-run
```

Review the generated grammar diff and exercise the changed tokenization in a real
consumer. The package remains `private: true`; a source contribution does not
authorize an npm release. Buoy language syntax claims should be checked against
the installed compiler and primary language documentation.

## Verification and pull requests

Build the changed native assets and exercise the affected behavior using the
source guide. Compiler or generator success alone does not prove runtime behavior.

Include your compiler/tool versions, host/target, exact build and
reproduction commands, expected behavior and observed output in the pull request.
Do not commit generated builds, caches, credentials or machine
configuration. Keep the patch focused and note any unverified platforms or runtime
prerequisites. Inventory checks alone are not build or test acceptance.

## License of contributions

Original contributions are accepted under the existing license for the files you
change: `MIT OR Apache-2.0` for first-party code and `CC-BY-4.0` for documentation
prose. Code samples follow their code's license. No CLA or DCO signing step is
required. Keep your own authorship and copyright attribution.

Read [LICENSE](LICENSE) and [LICENSING.md](LICENSING.md). Preserve upstream license,
copyright, attribution and provenance files for third-party material, and identify
its source in the pull request. Submit only material you have the right to license.
Reusable packages and tools keep their permissive licensing boundary; changes to
Studio's AGPL application code belong in its separate repository.
