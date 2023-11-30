<template>
  <div>
    <h5 v-if="block.heading" v-html="block.heading"></h5>
    <VueSlickCarousel
      :arrows="true"
      :dots="true"
      v-bind="settings"
      class="carousel">
      <div class="slidewrapper">
        <div class="icon">
          <img :src="'/images/poppy-flower.svg'">
        </div>
        <div class="text-wrapper">
          <h6>New Horizons for Seniors Program</h6>
          <p class="description">Structural, sports bar and Accessible washroom upgrades</p>
        </div>
      </div>
      <div class="slidewrapper">
        <div class="icon">
          <img :src="'/images/poppy-flower.svg'">
        </div>
        <div class="text-wrapper">
          <h6>Legion Capital Assistance Program</h6>
          <p class="description">Structural Re-enforcement</p>
        </div>
      </div>
      <div class="slidewrapper">
        <div class="icon">
          <img :src="'/images/poppy-flower.svg'">
        </div>
        <div class="text-wrapper">
          <h6>Access-Ability Program, NS</h6>
          <p class="description">Accessible entryway and elevator-well</p>
        </div>
      </div>
      <div class="slidewrapper">
        <div class="icon">
          <img :src="'/images/poppy-flower.svg'">
        </div>
        <div class="text-wrapper">
          <h6>Kings Vision Grant</h6>
          <p class="description">Structural Upgrades</p>
        </div>
      </div>
      <div class="slidewrapper">
        <div class="icon">
          <img :src="'/images/poppy-flower.svg'">
        </div>
        <div class="text-wrapper">
          <h6>Town of Wolfville</h6>
          <p class="description">Structural Re-enforcement</p>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>
 
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
 

export default {
  name: 'SliderBlock',
  
  data() {
    return {
      settings: {
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        mobileFirst: true,
        responsive: [{
          breakpoint: 850,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            centerMode: false
          }
        },
        {
          breakpoint: 415,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            centerMode: false
          }
        }]
      }
    }
  },

  components: {
    VueSlickCarousel
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    slides () {
      return this.block.slides
    }
  }
}
</script>

<style lang="scss" scoped>
h5 {
  font-weight: bold;
  text-align: center;
  padding-bottom: 2rem;
}
.carousel {
  margin-bottom: 6rem;
}
.icon {
  margin: 0 auto;
  max-width: 10rem;
}
.text-wrapper {
  text-align: center;
}
</style>
