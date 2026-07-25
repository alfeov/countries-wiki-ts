import pxtorom from '@minko-fe/postcss-pxtorem'

export default {
  plugins: [
    pxtorom({
      rootValue: 16,
      selectorBlackList: ['some-class'],
      propList: ['*'],
      atRules: ['media'],
      // ...
    }),
  ],
}
