# nuxt-hammer

Hammer.js wrapper for NuxtJS to support some operation in the mobile with SSR.

This is a directive wrapper for Hammer.js 2.x. And this repo'inspiration is from v-touch.

If you want to find a same wrapper for Angular4+, you can have a look at [ngx-hammer](https://github.com/bsdfzzzy/ngx-hammer)

## Install

> This plugin supports NuxtJS >= 2.0.

### npm

Available through npm as `nuxt-hammer`.

```bash
npm install nuxt-hammer
```

```Javascript
import { NuxtHammer } from 'nuxt-hammer'
Vue.use(NuxtHammer)
```

### As a plugin
Create a plugin named `plugins/nuxt-hammer.js` and add follow content.

```Javascript
import Vue from 'vue'
import NuxtHammer from 'nuxt-hammer'

Vue.use(NuxtHammer)
```

And on `nuxt.config.js` add plugin configuration.

```Javascript
  plugins: ['~/plugins/nuxt-hammer.js'],
```

Now you are ready for usage.

## Usage

#### Using the `v-hammer` directive

```html
<a v-hammer:tap="onTap">Tap me!</a>

<div v-hammer:swipe.left="onSwipeLeft">Swipe me!</div>

<div v-hammer:swipe.left="(event)=> onSwipeLeft(event, item, i)">Swipe me!</div>
```

#### Configuring Recognizer Options

There are two ways to customize recognizer options such as `direction` and `threshold`. The first one is setting global options:

```js
// change the threshold for all swipe recognizers
NuxtHammer.config.swipe = {
  threshold: 200
};
```

```html
<a
  v-hammer:tap="onTap"
  v-hammer:pan.horizontal="onPanHorizontal"
  v-hammer:panstart="onPanStart"
  v-hammer:panend="onPanEnd"
  v-hammer:press="onPress"
  v-hammer:pressup="onPressup"
></a>
<a ></a>
<a ></a>
```

See [Hammer.js documentation](http://hammerjs.github.io/getting-started/) for all available events.

### Supported gestures and directions

#### gestures

tap, pan, pinch, press, rotate, swipe

#### directions

up, down, left, right, horizontal, vertical, all

#### Note

Users can use both the gesture and the direction like `v-hammer:swipe.left`. But if your combination is not exist in the hammer, it is not support.

## Run the Example

- Run `yarn` or `npm i`
- Run `yarn build` or `npm run build`
- Open the index.html in the example directory.

## License

[MIT](http://opensource.org/licenses/MIT)
