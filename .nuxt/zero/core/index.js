/*
 *
 * 🔌 [Plugin | Core] Core
 *
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import core from '/Users/splummer/Documents/projects/legion-website/modules/zero/core/store/core.js'

// This resolves to <app_root>/.nuxt/middleware.js
import NuxtMiddleware from '../../middleware'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// /////////////////////////////////////////////////////////////// registerStore
const registerStore = (store, next) => {
    store.registerModule('core', Object.assign({
      namespaced: true
    }, core))

  if (next) { return next() }
}

// ////////////////////////////////////////////////////////// registerMiddleware
const registerMiddleware = (next) => {
    NuxtMiddleware['redirector'] = function _default(ctx) {
  const redirects = ctx.$config.redirects;
  if (redirects && redirects.length > 0) {
    let path = ctx.route.fullPath;
    const len = path.length;
    if (path.charAt(len - 1) === '/') {
      path = path.slice(0, len - 1);
    }
    redirects.forEach((redirect) => {
      if (redirect.from === path) {
        ctx.redirect(301, redirect.to);
      }
    });
  }
}

  if (next) { return next() }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default ({ store }) => {
  registerStore(store, () => {
    registerMiddleware(() => {
      // console.log(`🔌 [Plugin | Core] Core`)
    })
  })
}
