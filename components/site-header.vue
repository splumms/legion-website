<template>
  <header class="site-header">
    <div class="scroll-banner">

    </div>
    <div class="grid full">
      <div class="col-8">
        <nav>
          <NuxtLink to="/" class="logo">
            <SiteLogo />
          </NuxtLink>

          <div class="dropdown">
            <NuxtLink to="/about" class="dropbtn">
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
            <NuxtLink to="/fundraising" class="dropbtn">
              Fundraising
            </NuxtLink>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>

          <div class="dropdown">
            <NuxtLink to="/contact" class="dropbtn">
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
          <NuxtLink to="/join" class="join">
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
  padding: 1rem 4rem 0;
  @include medium {
    padding: 1rem 2rem 0;
  }
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
      position: absolute;
      right: 2rem;
      z-index: 13;
    }
    .join {
      color: black;
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
          transform: rotate(180deg);
        }
      }
    }
  }

  .dropbtn {
    transition: all ease 0.15s;
    position: relative;
    color: black;
    &:after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid black;
      position: absolute;
      right: -1.25rem;
      top: 0.5rem;
      transition: ease all 0.35s;
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
