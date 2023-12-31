<template>
  <div class="sectionals">

    <div
      v-for="section in sections"
      :key="section.id"
      :class="section.background">

      <section v-if="!section.hide" :id="section.slug" :class="['sectional', section.id]">
        <!-- ============================================ [Section] Off Grid -->
        <div
          v-if="section.off_grid"
          :id="`${section.id}-background`">

          <template v-for="(component, i) in section.off_grid">
            <component
              :is="component.name"
              :key="`${section.id}-background-${i}`"
              v-bind="component.props" />
          </template>

        </div>

        <!-- ================================================ [Section] Grid -->
        <div :class="[getGridClasses(section.grid), section.classNames]">
          <template v-for="(block, blockId) in section">
            <div
              v-if="blockAllowed(blockId)"
              :key="blockId"
              :class="[getColumnCount(block)]"
              :data-block-id="blockId"
              :data-push-left="getColumnPushCount(block, 'left')"
              :data-push-right="getColumnPushCount(block, 'right')">
              <div class="column-content">
                <!-- ======================================== [Block] Custom -->
                <template v-if="block.type === 'custom'">
                  <component
                    :is="component.name"
                    v-for="(component, componentKey) in block.customizations"
                    :key="componentKey"
                    v-bind="component.props" />
                </template>

                <!-- ======================================= [Block] Dynamic -->
                <component
                  :is="getComponentName(block)"
                  v-else-if="block.type !== 'sectional'"
                  v-bind="{ block }" />

                <!-- ===================== Recursive Sectional/Block imports -->
                <BlockBuilder
                  v-else
                  :sections="block.sections" />

              </div>
            </div>
          </template>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import GalleryBlock from '@/components/blocks/gallery-block'
import SliderBlock from '@/components/blocks/slider-block'
import SliderBlock2 from '@/components/blocks/slider-block-2'
import RentalsFormBlock from '@/components/blocks/rentals-form-block'
import FormBlock from '@/components/blocks/form-block'
import TeamBlock from '@/components/blocks/team-block'
import CardBlock from '@/components/blocks/card-block'
import TextBlock from '@/components/blocks/text-block'
import ImageBlock from '@/components/blocks/image-block'
import MarkdownBlock from '@/components/blocks/markdown-block'
import BlockBuilder from '@/components/blocks/block-builder'

export default {
  name: 'BlockBuilder',

  components: {
    GalleryBlock,
    SliderBlock,
    SliderBlock2,
    RentalsFormBlock,
    FormBlock,
    TeamBlock,
    CardBlock,
    TextBlock,
    ImageBlock,
    BlockBuilder,
    MarkdownBlock
  },

  props: {
    sections: {
      type: Object,
      required: true
    }
  },

  methods: {
    getGridClasses (blockGrid) {
      const classList = ['grid']
      if (typeof blockGrid === 'object' && Array.isArray(blockGrid) && blockGrid.length > 0) {
        blockGrid.forEach(className => classList.push(`-${className}`))
      }
      return classList.join('')
    },
    blockAllowed (blockId) {
      return !['grid', 'classNames', 'off_grid', 'slug', 'hide', 'id'].includes(blockId)
    },
    getColumnCount (block) {
      return block.cols.num
    },
    getColumnPushCount (block, direction) {
      return block.cols.hasOwnProperty(`push_${direction}`) ? block.cols[`push_${direction}`] : undefined
    },
    getComponentName (block) {
      const type = block.type
      let name = ''
      switch (type) {
        case 'gallery_block': name = 'GalleryBlock'; break
        case 'slider_block' : name = 'SliderBlock'; break
        case 'slider_block_2' : name = 'SliderBlock2'; break
        case 'rentals_form_block' : name = 'RentalsFormBlock'; break
        case 'form_block' : name = 'FormBlock'; break
        case 'team_block' : name = 'TeamBlock'; break
        case 'card_block' : name = 'CardBlock'; break
        case 'text_block' : name = 'TextBlock'; break
        case 'image_block' : name = 'ImageBlock'; break
        case 'markdown_block': name = 'MarkdownBlock'; break
        case 'custom' : name = block.component; break
      }
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
.blue {
  background-color: $color_Secondary;
  color: white;
}
.red {
  background-color: #8D3434;
  color: white;
}
</style>

