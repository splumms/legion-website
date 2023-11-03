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
          :alt="image.alt ? image.alt : $GetPrettyNameFromUrl(image.src)"
          @click="openModal(image)" />
        </div>
      </div>
    </div>
    <Modal
      :image="selectedImage">
    </Modal>
  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/modal.vue'

export default {
  name: 'GalleryBlock',

  components: {
    Modal
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      selectedImage: false
    }
  },

  computed: {
    ...mapGetters({
      modal: 'global/modal'
    })
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal (selectedImage) {
      this.selectedImage = selectedImage
      this.setModal(true)
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