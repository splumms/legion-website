<template>
  <footer class="site-footer">
    <div class="grid-center">
      <div class="col-4_sm-6_mi-12 contact">
        <a href="tel:902-542-5869">Tel: 902-542-5869</a>
        <a href="mailto:wolfvillelegion@gmail.com">wolfvillelegion@gmail.com</a>
        <a href="https://www.facebook.com/WolfvilleLegion/">Facebook</a>
        <a class="address" href="https://www.google.com/maps/place/Royal+Canadian+Legion+Branch+74/@45.0919997,-64.3599627,17z/data=!3m1!4b1!4m6!3m5!1s0x4b5855a0a4c92d8f:0x377436fca35ad7d9!8m2!3d45.0919959!4d-64.3573878!16s%2Fg%2F1tf6ls_y?entry=ttu">310 Main St, <br>Wolfville, NS B4P 1C4</a>
      </div>
      <div class="col-4_sm-6_mi-12 footer-nav">
        <a target="_blank" href="/rentals">Rentals</a>
        <a target="_blank" href="/branch-by-laws.pdf">Branch By-laws</a>
        <a target="_blank" href="/NS-NU_COMMAND_BY-LAWS_MASTER_Revs_up_to_April_2020.pdf">Provincial By-laws</a>
        <a target="_blank" href="/POLICY_AND_GUIDELINES_BOOK_-_25_Feb_20.pdf">Provincial Policy</a>
        <a target="_blank" href="/legion-quarterly-vol-1-issue-1-april-2023.pdf">Newsletter</a>
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
    &:hover {
      &:before {
        width: 0;
      }
    }
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
