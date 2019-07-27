import {
  createGlobalStyle
} from 'styled-components'

const IconfontStyle = createGlobalStyle `
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1564214151398'); /* IE9 */
  src: url('./iconfont.eot?t=1564214151398#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./iconfont.woff?t=1564214151398') format('woff'),
  url('./iconfont.ttf?t=1564214151398') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1564214151398#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
export default IconfontStyle