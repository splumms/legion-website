<template>
  <div
    class="block team-block">

    <h5 v-if="block.label" class="label">
      <span>{{ block.label }}</span>
    </h5>

    <div class="grid">

      <div
        v-for="member in block.members"
        :key="member.name"
        class="col-3_md-4_mi-6_ti-12">

        <div class="flip-card">

          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div v-if="member.icon" class="icon">
                <img :src="member.icon" :alt="member.alt">
              </div>
              <h4 v-if="member.name" class="name" v-html="member.name"></h4>
            </div>
            <div class="flip-card-back">
              <div v-if="member.position" class="position" v-html="member.position"></div>
            </div>           
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import MarkdownParser from '@/components/markdown-parser'

export default {
  name: 'TeamBlock',

  components: {
    MarkdownParser
  },

  props: {
    block: {
      /**
       * align: String (left, right, center)
       * label: String
       * heading: String
       * description: String
       * ctas: [{Button}]
       */
      type: Object,
      required: true
    }
  },

  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
.label {
  color: $color_Accent;
  padding-bottom: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
}
.flip-card {
  background-color: transparent;
  width: 275px;
  height: 150px;
  perspective: 1000px;
  @include large {
    width: 215px;
  }
  @include small {
    width: 175px;
  }
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.75s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding: 0.75rem 1rem;
}

.flip-card-front {
  background-color: white;
  color: black;
}

.flip-card-back {
  background-color: white;
  color: black;
  transform: rotateY(180deg);
}
.icon {
  max-width: 5rem;
}
.name {
  font-family: $font_Secondary;
  font-size: 1.25rem;
  padding-bottom: 1rem;
}

.position {
  font-size: 1rem;
  line-height: 1.2;
  padding: 3rem 0.5rem;
}
</style>