<template>
  <header class="site-header">
    <div class="scroll-banner">

    </div>
    <div class="grid full nav">
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
              <a href="/about#history">Our History</a>
              <a href="/about#executive-board">Executive Board</a>
              <a href="/about#committee-chairs">Committee Chairs</a>
              <a href="/about#newsletters">Newsletters</a>
              <a href="/gallery">Gallery</a>
            </div>
          </div>
          
          <div class="dropdown">
            <NuxtLink to="/events" class="dropbtn">
              Events
            </NuxtLink>
            <div class="dropdown-content">
              <a href="/events#current-events">Current Events</a>
              <a href="/events#all-events">All Events</a>
            </div>
          </div>

          <div class="dropdown">
            <NuxtLink to="/fundraising" class="dropbtn">
              Fundraising
            </NuxtLink>
            <div class="dropdown-content">
              <a href="/fundraising#how-to-donate">How to Donate</a>
              <a href="/fundraising#who-can-donate">Who Can Donate</a>
              <a href="/fundraising#sponsors">Sponors/Grants</a>
            </div>
          </div>

          <div class="dropdown">
            <NuxtLink to="/contact" class="dropbtn">
              Contact
            </NuxtLink>
            <div class="dropdown-content">
              <a href="/rentals">Rentals</a>
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
    <MobileNav
      class="mobile-nav"
      :items="mobileItems"></MobileNav>
  </header>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import SiteLogo from '@/components/svgs/logo'
import MobileNav from '@/components/hamburger-nav.vue'

// ====================================================================== Export
export default {
  name: 'SiteHeader',

  components: {
    SiteLogo,
    MobileNav
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
    },
    mobileItems () {
      return this.siteContent.general.header.mobile
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  padding: 1rem 4rem 0;
  @include medium {
    padding: 1rem 2rem 0;
  }
  .scroll-banner {
    background-color: $color_Secondary;
  }
  .mobile-nav {
    z-index: 50;
    display: none;
    @include small {
      display: block;
    }
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
      &:hover {
        &:before {
          width: 0%;
        }
      }
    }
    .logo {
      width: toRem(60);
      display: block;
    }
    .join-cta {
      position: absolute;
      right: 2rem;
      z-index: 13;
      @include small {
        display: none;
      }
    }
    .join {
      color: black;
      &:hover {
        font-weight: bold;
      }
    }
  }

  .dropdown {
    position: relative;
    transition: ease all 0.25s;
    &:hover {
      .dropdown-content {
        display: block;
      }
      .dropbtn {
        font-weight: bold;
        transform: scale (1.2);
        &:after {
          transform: rotate(180deg);
        }
      }
    }
    @include small {
      display: none;
    }
  }

  .dropbtn {
    transition: all font-weight 0.15s;
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
    min-width: 12rem;
    background-color: #f1f1f1;
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
