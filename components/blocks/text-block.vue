<template>
  <div
    :class="['block text-block', `align__${block.align ? block.align : 'left'}`, `${block.class ? block.class : null}`]">

    <h5 v-if="block.label" class="label">
      <TriangleArrow v-if="block.showLabelIcon" class="icon" />
      <span>{{ block.label }}</span>
    </h5>

    <h1 v-if="block.heading" class="heading" v-html="block.heading"></h1>

    <div v-if="block.description" class="text-wrapper">
      <div class="description">
        <MarkdownParser :markdown="block.description" />
      </div>
    </div>

    <div class="list-wrapper">
      <div v-if="block.list" class="list">
        <h4 v-if="block.list.heading" v-html="block.list.heading"></h4>
        <ul>
          <li 
            v-for="(item, index) in block.list.items"
            :key="index">
            <a v-if="item.url" :href="item.url" target="_blank" v-html="item.text"></a>
            <span v-else v-html="item.text"></span>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="block.ctas" class="button-row">
      <div v-if="block.ctas && Array.isArray(block.ctas)">
        <Button v-for="(cta, index) in ctaData" :key="index" :button="cta" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/button'
import MarkdownParser from '@/components/markdown-parser'

export default {
  name: 'TextBlock',

  components: {
    Button,
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
    ctaData () {
      return this.block.ctas.map((object) => {
        return { ...object, disabled: object.url === undefined || object.url === '' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-block {
  position: relative;
  &.align__center {
    text-align: center;
    .label,
    .button-row {
      justify-content: center;
    }
  }
  &.align__right {
    text-align: right;
    .label,
    .button-row {
      justify-content: flex-end;
    }
  }
  &.quote {
    color: white;
    h1 {
      @include fontSize_ExtraLarge;
      font-family: $font_Secondary;
    }
  }
  > * {
    margin-bottom: toRem(30);
    position: relative;
  }
  .label {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: toRem(16);
  }
}
.list {
  h4 {
    padding: 1.5rem 0 1rem 0;
  }
}
.button-row {
  margin-bottom: 0;
  .button:first-child {
    margin-right: toRem(35);
    @include small {
      margin-bottom: 1.5rem;
    }
  }
  .button:only-child {
    margin-right: 0;
  }
}
</style>
