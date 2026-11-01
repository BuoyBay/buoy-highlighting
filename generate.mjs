import { writeFile } from 'node:fs/promises';
import { declarations, control, operators, types, constants, directives } from './vocabulary.mjs';
import { configuration } from './monaco.mjs';

const word = (words) => `(?i:\\b(?:${words.join('|')})\\b)`;
const grammar = {
  name: 'Buoy', scopeName: 'source.buoy', fileTypes: ['bui'],
  patterns: [
    { name: 'comment.line.documentation.buoy', match: "^\\s*'''.*$" },
    { name: 'comment.line.buoy', match: "(?:'|//).*$" },
    { name: 'comment.block.buoy', begin: '/\\*', end: '\\*/' },
    { name: 'string.quoted.double.buoy', begin: '"', end: '"|$', patterns: [
      { name: 'constant.character.escape.buoy', match: '\\\\[nrt"\\\\]' },
      { name: 'invalid.illegal.escape.buoy', match: '\\\\.' }
    ] },
    { name: 'keyword.control.directive.buoy', match: `(?i:^\\s*#(?:${directives.join('|')})\\b)` },
    { name: 'constant.numeric.buoy', match: '\\b[0-9]+(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b' },
    { match: '(?i:\\b(Function|Sub)\\s+([A-Za-z_][A-Za-z0-9_]*))', captures: {
      1: { name: 'keyword.declaration.buoy' }, 2: { name: 'entity.name.function.buoy' }
    } },
    { match: '(?i:\\b(Class|Interface|Structure|Enum)\\s+([A-Za-z_][A-Za-z0-9_]*))', captures: {
      1: { name: 'keyword.declaration.buoy' }, 2: { name: 'entity.name.type.buoy' }
    } },
    { name: 'constant.language.buoy', match: word(constants) },
    { name: 'storage.type.buoy', match: word(types) },
    { name: 'keyword.control.buoy', match: word(control) },
    { name: 'keyword.declaration.buoy', match: word(declarations) },
    { name: 'keyword.operator.buoy', match: word(operators) },
    { name: 'keyword.operator.symbol.buoy', match: '[+*/=<>\\\\-]+' }
  ]
};
await writeFile(new URL('./buoy.tmLanguage.json', import.meta.url), JSON.stringify(grammar, null, 2) + '\n');
await writeFile(new URL('./language-configuration.json', import.meta.url), JSON.stringify(configuration, null, 2) + '\n');
