/**
 * swiper.js v1 | https://github.com/xaoxuu/hexo-theme-stellar/
 * 格式与官方标签插件一致使用空格分隔，中括号内的是可选参数（中括号不需要写出来）
 *
 * {% swiper [width:max] [effect:cards] %}
 * ![> img](src)
 * {% endswiper %}
 */

'use strict'

module.exports = ctx => function(args, content) {
  args = ctx.args.map(args, ['width', 'effect'])
  var el = ''
  var empty = true
  function slide() {
    // Match images 
    const reg = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let result = null;
    while ((result = reg.exec(content)) !== null) {
      el += '<div class="swiper-slide">'
      el += '<img no-lazy="true" src="' + result[2] + '" alt="' + result[1] + '"/>'
      el += '</div>'
      empty = false
    }
  }
  el += '<div class="tag-plugin swiper"'
  el += ' ' + ctx.args.joinTags(args, ['width', 'effect']).join(' ')
  el += '>'
  el += '<div class="swiper-wrapper">'
  slide()
  el += '</div>'
  el += '<div class="swiper-pagination"></div>'
  el += '<div class="swiper-button-prev blur"></div>'
  el += '<div class="swiper-button-next blur"></div>'
  el += '</div>'
  if (empty) {
    console.warn('Found empty swiper tag, make sure you have added images using ![> img](src) syntax.')
    el = ''
  }
  return el
}