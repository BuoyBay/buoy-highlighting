import { declarations, control, operators, types, constants } from './vocabulary.mjs';

export const language = {
  defaultToken: '', tokenPostfix: '.buoy', ignoreCase: true,
  keywords: [...new Set([...declarations, ...control, ...operators])],
  typeKeywords: types,
  constants,
  tokenizer: {
    root: [
      [/^\s*'''.*$/, 'comment.doc'],
      [/'[^\r\n]*|\/\/[^\r\n]*/, 'comment'],
      [/\/\*/, 'comment', '@blockComment'],
      [/"$/, 'string'],
      [/"/, 'string', '@string'],
      [/^\s*#(?:If|ElseIf|Else|End\s+If|Define|Undef|Error|Warning)\b/i, 'keyword.directive'],
      [/\b[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\b/, 'number'],
      [/[A-Za-z_][A-Za-z0-9_]*/, { cases: {
        '@constants': 'constant', '@typeKeywords': 'type', '@keywords': 'keyword', '@default': 'identifier'
      } }],
      [/[+*/=<>\\-]+/, 'operator'],
      [/[()[\]{},.:]/, 'delimiter'],
      [/\s+/, 'white']
    ],
    blockComment: [[/\*\//, 'comment', '@pop'], [/[^*]+/, 'comment'], [/\*/, 'comment']],
    string: [
      [/[^"\\]+$/, 'string', '@pop'],
      [/[^"\\]+/, 'string'],
      [/\\[nrt"\\]/, { cases: {
        '@eos': { token: 'string.escape', next: '@pop' }, '@default': 'string.escape'
      } }],
      [/\\./, { cases: {
        '@eos': { token: 'string.escape.invalid', next: '@pop' }, '@default': 'string.escape.invalid'
      } }],
      [/"/, 'string', '@pop'],
      [/\\$/, 'string.escape.invalid', '@pop'],
      [/$/, '', '@pop']
    ]
  }
};

export const configuration = {
  comments: { lineComment: "'", blockComment: ['/*', '*/'] },
  brackets: [['(', ')'], ['[', ']'], ['{', '}']],
  autoClosingPairs: [
    { open: '(', close: ')' }, { open: '[', close: ']' }, { open: '{', close: '}' },
    { open: '"', close: '"', notIn: ['string', 'comment'] }
  ]
};

export function registerBuoy(monaco) {
  const registration = monaco.languages.register({ id: 'buoy', extensions: ['.bui'], aliases: ['Buoy'] });
  const tokens = monaco.languages.setMonarchTokensProvider('buoy', language);
  const config = monaco.languages.setLanguageConfiguration('buoy', configuration);
  return { dispose() { tokens.dispose(); config.dispose(); registration.dispose(); } };
}
