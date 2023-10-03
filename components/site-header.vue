<template>
  <header class="site-header">
    <div class="scroll-banner">

    </div>
    <div class="grid">
      <div class="col-8">
        <nav>
          <NuxtLink to="/" class="logo">
            <SiteLogo />
          </NuxtLink>

          <div class="dropdown">
            <NuxtLink to="/" class="dropbtn">
              About
            </NuxtLink>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
          
          <div class="dropdown">
            <NuxtLink to="/" class="dropbtn">
              Events
            </NuxtLink>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>

          <div class="dropdown">
            <NuxtLink to="/" class="dropbtn">
              Fundraising
            </NuxtLink>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>

          <div class="dropdown">
            <NuxtLink to="/" class="dropbtn">
              Contact
            </NuxtLink>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>

        </nav>
      </div>
      <div class="col-4">
        <div class="join-cta">
          <NuxtLink to="/" class="">
            Join
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import SiteLogo from '@/components/svgs/logo'

// ====================================================================== Export
export default {
  name: 'SiteHeader',

  components: {
    SiteLogo
  },

  props: {
    header: {
      type: Array,
      required: false,
      default: () => { }
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      navigationOpen: 'global/navigationOpen'
    }),
    headerData () {
      return this.header ? this.header : this.siteContent.general.header
    }
  },

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    })
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  z-index: 10;
  padding: toRem(30) 0;
  .scroll-banner {
    background-color: $color_Secondary;
  }
  .grid {
    color: white;
    display: flex;
    justify-content: space-between;
    nav {
      display: flex;
      flex-direction: row;
      > * {
        margin-right: 7rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    a {
      line-height: 2.5;
    }
    .logo {
      width: toRem(60);
      display: block;
    }
    .join-cta {
      position: relative;
      // right: -40rem;
    }
  }

  .dropdown {
    position: relative;
    &:hover {
      .dropdown-content {
        display: block;
      }
      .dropbtn {
        color: #0F4E71;
        transform: scale (1.2);
        &:after {
          transform: scaleX(-1);
        }
      }
    }
  }

  .dropbtn {
    transition: all ease 0.15s;
    position: relative;
    &:after {
      content: "";
      display: block;
      background-image: url("static/arrow.jpg");
      background-repeat: no-repeat;
      height: 0.75rem;
      width: 0.75rem;
      position: absolute;
      right: -1.25rem;
      top: 0;
      transform: rotate(135deg);
      transition: ease all 0.25s;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 12;
    a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      &:hover {
        background-color: #ddd;
      }
    }
  }
}
</style>
