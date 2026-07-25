/** @type {import("stylelint").Config} */
export default {
  defaultSeverity: 'warning',
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
    'value-keyword-case': ['lower', { ignoreKeywords: ['currentColor'] }],
    'lightness-notation': 'number',
    'hue-degree-notation': 'number',
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['theme', 'custom-variant', 'apply'] },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
  },
}
