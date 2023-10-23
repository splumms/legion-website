<template>
  <footer class="site-footer">
    <div class="grid-center">
      <div class="col-4_sm-6_mi-12 contact">
        <a href="">Tel: 902-542-5869</a>
        <a href="">wolfvillelegion@gmail.com</a>
        <a href="">Facebook</a>
        <a class="address" href="">310 Main St, <br>Wolfville, NS B4P 1C4</a>
      </div>
      <div class="col-4_sm-6_mi-12 footer-nav">
        <a href="/rentals">Rentals</a>
        <a href="">By-laws</a>
        <a href="">Newsletter</a>
      </div>
      <div class="col-4_sm-12 ctas">
        <Button v-for="(cta, index) in footerData.ctas"
          :key="index"
          :button="cta" />
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
import SiteLogo from '@/components/svgs/logo'
import IconLinkedIn from '@/components/svgs/social-linkedIn'
import IconTwitter from '@/components/svgs/social-twitter'
import IconYoutube from '@/components/svgs/social-youtube'
import IconFacebook from '@/components/svgs/social-facebook'
import Button from '@/components/button'

export default {
  name: 'SiteFooter',

  components: {
    SiteLogo,
    Button,
    IconLinkedIn,
    IconTwitter,
    IconYoutube,
    IconFacebook
  },

  props: {
    footer: {
      type: Array,
      required: false,
      default: () => { }
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    footerData () {
      return this.footer ? this.footer : this.siteContent.general.footer
    }
  },

  methods: {
    getButtonIcon (network) {
      let tag
      switch (network) {
        case 'linkedin': tag = 'IconLinkedIn'; break
        case 'twitter': tag = 'IconTwitter'; break
        case 'facebook': tag = 'IconFacebook'; break
        case 'youtube': tag = 'IconYoutube'; break
        default: tag = 'div'; break
      }
      return tag
    },
    getTag (url) {
      return url ? this.$GetTagBasedOnUrl(url) : 'div'
    },
    getTarget (url) {
      return url ? this.$GetTargetBasedOnUrl(url) : false
    },
    getTo (url) {
      return url ? this.$GetTagBasedOnUrl(url) === 'nuxt-link' ? url : false : false
    },
    getHref (url) {
      return url ? this.$GetTagBasedOnUrl(url) === 'a' ? url : false : false
    }
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #8D3434;
  color: white;
  z-index: 5;
  a {
    color: white;
  }
}
.contact, .ctas, .footer-nav {
  display: flex;
  flex-direction: column;
  .address {
    padding-top: 1.5rem;
    justify-content: flex-end;
  }
  .button {
    margin-bottom: 2rem;
  }
}
.footer-nav {
  a {
    padding-bottom: 1rem;
  }
}
.ctas {
  .button {
    background-color: $color_Accent;
  }
}
</style>
