<template>
  <section class="form">
    <h5 v-if="block.label" class="label">
      <span>{{ block.label }}</span>
    </h5>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider name="name" rules="required|max: 25" v-slot="{ errors }">
          <div class="field">
            <div class="control">
              <input
                name="name" 
                v-model="formData.name" 
                class="input" type="text"
                placeholder="Full name">
                <span>{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <div class="field">
            <div class="control">
              <input 
                name="email" 
                v-model="formData.email" 
                class="input"
                type="email" 
                placeholder="example@email.com">
                <span>{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider name="subject" rules="required|max:100" v-slot="{ errors }">
          <div class="field">
            <div class="control">
              <input
                name="subject" 
                v-model="formData.subject" 
                class="input" type="text" 
                placeholder="Subject">
                <span>{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>

        <ValidationProvider name="message" rules="required|max:500" v-slot="{ errors }">
          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Message"
                v-model="formData.message"></textarea>
              <span>{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>

        <input type="submit" value="Submit">
      </form>
    </ValidationObserver>
  

  </section>
</template>

<script>
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
  

export default {
  name: 'RentalsFormBlock',

  data() {
    return {
      formData : {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },

  components: {
    ValidationProvider,
    ValidationObserver
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

  methods: {
    onSubmit() {
      console.log(this.formData)
    }
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
