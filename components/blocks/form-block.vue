<template>
  <section class="form">
    <h5 v-if="block.label" class="label">
      <span>{{ block.label }}</span>
    </h5>

    <div class="field">
      <div class="control">
        <input name="name" 
          v-model="form.name" 
          class="input" type="text" placeholder="Full name">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input name="email" 
          v-model="form.email" 
          class="input" type="text" placeholder="example@email.com">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input name="subject" 
          v-model="form.subject" 
          class="input" type="text" placeholder="Subject">
      </div>
    </div>
    
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Message" v-model="form.message"></textarea>
      </div>
    </div>
    
    <input type="submit" value="Submit">

  </section>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
  

export default {
  name: 'RentalsFormBlock',

  data() {
    return {
      form : {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },

  components: {
    ValidationProvider
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
h5 {
  font-weight: bold;
  text-transform: uppercase;
  padding-bottom: 3rem;
  color: $color_Accent;
}
.field {
  padding-bottom: 1.5rem;
}
</style>
