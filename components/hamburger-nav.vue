<template>
  <nav role="navigation">
    <div id="menuToggle">

      <input type="checkbox" />
      
      <span></span>
      <span></span>
      <span></span>

      <ul id="menu">
        <nuxt-link
          v-for="(item, index) in items"
          :key="index"
          :to="item.url">{{ item.text }}</nuxt-link>
      </ul>
    </div>
  </nav>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

// ====================================================================== Export
export default {
  name: 'HamburgerNav',

  components: {
  },

  props: {
    items: {
      type: Array,
      required: false,
      default: () => { }
    }
  }

}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Hamburger
#menuToggle {
  display: block;
  position: absolute;
  top: 25px;
  right: 15px;
  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s ease;
  }
  a:hover {
    color: black;
    &:before {
      width: 0;
    }
  }
  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0; 
    z-index: 2; 
    -webkit-touch-callout: none;
  }
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: $color_Accent;
    border-radius: 3px;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
    &:first-child {
      transform-origin: 0% 0%;
    }
    &:nth-last-child(2) {
      transform-origin: 0% 100%;
    }
  }
  input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
  }

  input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }
}

#menu {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: -51px 0 0 -200px;
  padding: 50px;
  padding-top: 50px;
  background: rgba(15, 78, 113, 0.85);
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  transform-origin: 0% 0%;
  transform: translate(100%, 0);
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
  li {
    padding: 10px 0;
    font-size: 22px;
  }
}

#menuToggle input:checked ~ ul
{
  transform: none;
}
</style>
