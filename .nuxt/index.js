import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_globalcomponents_0a8ab9a3 from 'nuxt_plugin_globalcomponents_0a8ab9a3' // Source: ./zero/core/global-components.js (mode: 'all')
import nuxt_plugin_nuxthammer_4db2895a from 'nuxt_plugin_nuxthammer_4db2895a' // Source: ./zero/core/nuxt-hammer.js (mode: 'all')
import nuxt_plugin_clickoutside_7789c4c3 from 'nuxt_plugin_clickoutside_7789c4c3' // Source: ./zero/core/click-outside.js (mode: 'all')
import nuxt_plugin_scrollto_75a59470 from 'nuxt_plugin_scrollto_75a59470' // Source: ./zero/core/scroll-to.js (mode: 'all')
import nuxt_plugin_getscrollspeed_37f1fa2d from 'nuxt_plugin_getscrollspeed_37f1fa2d' // Source: ./zero/core/get-scroll-speed.js (mode: 'client')
import nuxt_plugin_vuels_3fd9485d from 'nuxt_plugin_vuels_3fd9485d' // Source: ./zero/core/vue-ls.js (mode: 'client')
import nuxt_plugin_uuid_0cbf29b0 from 'nuxt_plugin_uuid_0cbf29b0' // Source: ./zero/core/uuid.js (mode: 'all')
import nuxt_plugin_toaster_3d914a8f from 'nuxt_plugin_toaster_3d914a8f' // Source: ./zero/core/toaster.js (mode: 'all')
import nuxt_plugin_seo_77ff08a6 from 'nuxt_plugin_seo_77ff08a6' // Source: ./zero/core/seo.js (mode: 'all')
import nuxt_plugin_helpers_82e65104 from 'nuxt_plugin_helpers_82e65104' // Source: ./zero/core/helpers.js (mode: 'all')
import nuxt_plugin_index_31f2f111 from 'nuxt_plugin_index_31f2f111' // Source: ./zero/core/index.js (mode: 'all')
import nuxt_plugin_pluginclient_c57e446c from 'nuxt_plugin_pluginclient_c57e446c' // Source: ./content/plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_02fa4f52 from 'nuxt_plugin_pluginserver_02fa4f52' // Source: ./content/plugin.server.js (mode: 'server')
import nuxt_plugin_gtm_10492d8c from 'nuxt_plugin_gtm_10492d8c' // Source: ./gtm.js (mode: 'all')
import nuxt_plugin_axios_6088cd38 from 'nuxt_plugin_axios_6088cd38' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_googleanalytics_1e66b842 from 'nuxt_plugin_googleanalytics_1e66b842' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_moment_366324b4 from 'nuxt_plugin_moment_366324b4' // Source: ./moment.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon\u002Ffavicon-96x96.png","sizes":"96x96"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_globalcomponents_0a8ab9a3 === 'function') {
    await nuxt_plugin_globalcomponents_0a8ab9a3(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxthammer_4db2895a === 'function') {
    await nuxt_plugin_nuxthammer_4db2895a(app.context, inject)
  }

  if (typeof nuxt_plugin_clickoutside_7789c4c3 === 'function') {
    await nuxt_plugin_clickoutside_7789c4c3(app.context, inject)
  }

  if (typeof nuxt_plugin_scrollto_75a59470 === 'function') {
    await nuxt_plugin_scrollto_75a59470(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_getscrollspeed_37f1fa2d === 'function') {
    await nuxt_plugin_getscrollspeed_37f1fa2d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuels_3fd9485d === 'function') {
    await nuxt_plugin_vuels_3fd9485d(app.context, inject)
  }

  if (typeof nuxt_plugin_uuid_0cbf29b0 === 'function') {
    await nuxt_plugin_uuid_0cbf29b0(app.context, inject)
  }

  if (typeof nuxt_plugin_toaster_3d914a8f === 'function') {
    await nuxt_plugin_toaster_3d914a8f(app.context, inject)
  }

  if (typeof nuxt_plugin_seo_77ff08a6 === 'function') {
    await nuxt_plugin_seo_77ff08a6(app.context, inject)
  }

  if (typeof nuxt_plugin_helpers_82e65104 === 'function') {
    await nuxt_plugin_helpers_82e65104(app.context, inject)
  }

  if (typeof nuxt_plugin_index_31f2f111 === 'function') {
    await nuxt_plugin_index_31f2f111(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_c57e446c === 'function') {
    await nuxt_plugin_pluginclient_c57e446c(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_02fa4f52 === 'function') {
    await nuxt_plugin_pluginserver_02fa4f52(app.context, inject)
  }

  if (typeof nuxt_plugin_gtm_10492d8c === 'function') {
    await nuxt_plugin_gtm_10492d8c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_6088cd38 === 'function') {
    await nuxt_plugin_axios_6088cd38(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_1e66b842 === 'function') {
    await nuxt_plugin_googleanalytics_1e66b842(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_366324b4 === 'function') {
    await nuxt_plugin_moment_366324b4(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
