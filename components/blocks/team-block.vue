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
        class="col-3">

        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div v-if="block.icon" class="icon">
                <img :src="block.icon" :alt="block.alt">
              </div>

              <h4 v-if="member.name" class="name" v-html="member.name"></h4>
            </div>
            <div class="flip-card-back">
              <div class="text-wrapper">
                <div v-if="member.position" class="position" v-html="member.position">
                </div>
              </div>
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
.team-block {

}
.label {
  padding-bottom: 2.5rem;
}

.flip-card {
  background-color: transparent;
  width: 100%;
  height: 150px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.75s;
  transform-style: preserve-3d;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  margin: 0.5rem 0.25rem;
  padding: 1rem 1.75rem;
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
}

.flip-card-back {
  text-align: center;
  transform: rotateY(180deg);
}
.name {
  font-family: $font_Secondary;
  font-size: 1.25rem;
  padding-bottom: 1rem;
}

.position {
  font-size: 1rem;
  line-height: 1.2;
}
</style>