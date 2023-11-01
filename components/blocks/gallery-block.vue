<template>
  <div class="block gallery-block">
    <div class="grid-middle-equalHeight">
      <div
        v-for="(image, index) in block.images"
        :key="`image-${index}`"
        class="col-2_sm-4_mi-10" data-push-left="off-0_mi-1">
        <div class="image-wrapper">
          <img
          :src="image.src"
          :alt="image.alt ? image.alt : $GetPrettyNameFromUrl(image.src)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GalleryBlock',

  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery-block {
  position: relative;

  img {
    height: 100%;
    object-fit: cover;
    user-select: none;
  }
}
</style>