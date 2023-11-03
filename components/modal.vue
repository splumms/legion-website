<template>
  <div
    id="modal"
    :class="{ active: modal }"
    @keyup.esc="closeModal">

    <section>

      <div class="toolbar">
        <button class="close-button" @click="closeModal">
          X
        </button>
      </div>

      <img :src="image.src" :alt="image.alt"/>
      <figcaption v-if="image.caption">
        {{ image.caption }}
      </figcaption>

    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

// ====================================================================== Export
export default {
  name: 'Modal',

  props: {
    image: {
      type: [Boolean, Object],
      required: false,
    }
  },

  data () {
    return {
      initialized: false
    }
  },

  computed: {
    ...mapGetters({
      modal: 'global/modal',
    }),
    action () {
      return this.modal.action
    },
    url () {
      return this.modal.url
    }
  },

  mounted () {
    window.addEventListener('keydown', (e) => {
      const key = e.key || e.keyCode
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        this.closeModal()
      }
    })
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal',
    }),
    closeModal () {
      if (this.modal) {
        this.setModal(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
#modal {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
  &:before {
    content: '';
    position: absolute;
    top: inherit;
    left: inherit;
    width: inherit;
    height: inherit;
    background: rgba(15, 78, 113, 0.5);
    opacity: 0;
    z-index: 5;
    transition: 250ms ease-out;
  }
  &.active {
    visibility: visible;
    pointer-events: all;
    z-index: 10000;
    &:before {
      transition: 250ms ease-in;
      opacity: 1;
    }
  }
}
// ///////////////////////////////////////////////////////////////////// Toolbar
.toolbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  z-index: 10000;
}
.close-button {
  @include fontWeight_Semibold;
  color: black;
  padding: 0.5rem 1rem;
}

img {
  position: relative;
  z-index: 10001;
  width: 50%;
  max-width: 90rem;
  margin: 0 auto;
}
</style>
