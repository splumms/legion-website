<template>
  <component
    :is="block.tag"
    :href="block.url"
    :target="block.target"
    class="card-wrapper">
    <div
      class="block card-block">

      <div v-if="block.icon" class="icon">
        <img :src="block.icon" :alt="block.alt">
      </div>

      <h4 v-if="block.heading" class="heading" v-html="block.heading"></h4>

      <div class="text-wrapper">
        <div v-if="block.description" class="description">
          <MarkdownParser :markdown="block.description" />
        </div>
        <div class="where" v-html="block.where"></div>
        <div class="when" v-html="block.when"></div>
      </div>

    </div>
  </component>
</template>

<script>
import MarkdownParser from '@/components/markdown-parser'

export default {
  name: 'CardBlock',

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
.card-wrapper {
  margin-bottom: 2rem;
  height: 100%;
  &:hover {
    .card-block {
      box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.5);

    }
  }
}
a {
  color: black;
  &:hover {
    &:before {
      width: 0;
    }
  }
}
.card-block {
  background-color: white;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  padding: 2rem 3.25rem;
  height: 100%;
  transition: ease all 0.25s;
}
.heading {
  padding-bottom: 1rem;
}
</style>
