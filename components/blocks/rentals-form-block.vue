<template>
  <section class="form">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="grid">
          <div class="col-4_sm-9">
            <ValidationProvider name="first name" rules="required|alpha" v-slot="{ errors }">
              <div class="field">
                <div class="control">
                  <input name="firstname" 
                    v-model="form.firstname" 
                    class="input" type="text" placeholder="First Name">
                    <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>

            <ValidationProvider name="last name" rules="required|alpha" v-slot="{ errors }">
              <div class="field">
                <div class="control">
                  <input name="lastname" 
                    v-model="form.lastname" 
                    class="input" type="text" placeholder="Last Name">
                    <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
              <div class="field">
                <div class="control">
                  <input name="email" 
                    v-model="form.email" 
                    class="input" type="text" placeholder="Email">
                    <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            <ValidationProvider name="phone number" rules="required|numeric" v-slot="{ errors }">
              <div class="field">
                <div class="control">
                  <input name="phone" 
                    v-model="form.phone" 
                    class="input" type="text" placeholder="Phone Number">
                    <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>

            <ValidationProvider name="rental type" rules="required" v-slot="{ errors }">
              <div class="field">
                <div class="control rentaltype">
                  <label>Rental Type</label>
                  <select v-model="form.rental_type">
                    <option disabled value=""></option>
                    <option v-for="option in options.inquiry" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                  <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-4_sm-9" data-push-left="off-1_sm-0">

            <div class="field">
              <label><strong>Liquor License Required?</strong></label>
              
              <div class="control radio-container">
                <label class="radio">
                  <input v-model="form.liquor_license" type="radio" value="None">
                  None
                </label>
                <label class="radio">
                  <input v-model="form.liquor_license" type="radio" value="Special Occasion - Private">
                  Special Occasion (private)
                </label>
                <label class="radio">
                  <input v-model="form.liquor_license" type="radio" value="Special Occasion - Open">
                  Special Occasion (open)
                </label>
              </div>
            </div>
            
            <ValidationProvider name="date field" rules="required" v-slot="{ errors }">
              <div class="field">
                <div class="control datepicker">
                  <label>Select a Date</label>
                  <date-picker v-model="time1" valueType="format"></date-picker>
                  <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
            
            <ValidationProvider name="time" rules="required" v-slot="{ errors }">
              <div class="field">
                <div class="control timepicker">
                  <label>Select a Time</label>
                  <select v-model="form.time">
                    <option disabled value="">Select Time</option>
                    <option v-for="option in options.time" v-bind:value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                  <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
          </div>

          <div class="col-9">
            <ValidationProvider name="message" rules="required|max:1000" v-slot="{ errors }">
              <div class="field">
                <div class="control">
                  <textarea class="textarea" placeholder="Message" v-model="form.message"></textarea>
                  <span>{{ errors[0] }}</span>
                </div>
              </div>
            </ValidationProvider>
          </div>

        </div>
        <input type="submit" value="Request a Quote">
      </form>
    </ValidationObserver>
    <p class="contact-number">For more information call our legion representative <a href="tel:(902) 681-6601">(902) 681-6601</a></p>
  </section>
</template>

<script>
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'RentalsFormBlock',

  components: {
    ValidationProvider,
    ValidationObserver,
    DatePicker
  },

  data() {
    return {
      time1: null,
      form : {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        message: '',
        rental_type: '',
        liquor_license: ''
      },
      options: {
        inquiry: [
          { value: 'hourly', text: "Hourly Rental - $50/hr"},
          { value: '6 hour', text: "6 Hour Rental - $150"},
          { value: 'kitchen', text: "Kitchen Equipment - $100"},
          { value: 'sound', text: "Sound System - $50"},
          { value: 'karaoke', text: "Karaoke - $100"},
        ],
        time: [
          { value: '10:00', text: "10:00 AM"},
          { value: '10:30', text: "10:30 AM"},
          { value: '11:00', text: "11:00 AM"},
          { value: '11:30', text: "11:30 AM"},
          { value: '12:00', text: "12:00 AM"},
          { value: '12:30', text: "12:30 AM"},
          { value: '13:00', text: "1:00 PM"},
          { value: '13:30', text: "1:30 PM"},
          { value: '14:00', text: "2:00 PM"},
          { value: '14:30', text: "2:30 PM"},
          { value: '15:00', text: "3:00 PM"},
          { value: '15:30', text: "3:30 PM"},
          { value: '16:00', text: "4:00 PM"},
          { value: '16:30', text: "4:30 PM"},
          { value: '17:00', text: "5:00 PM"},
          { value: '17:30', text: "5:30 PM"},
          { value: '18:00', text: "6:00 PM"},
          { value: '18:30', text: "6:30 PM"},
          { value: '19:00', text: "7:00 PM"},
          { value: '19:30', text: "7:30 PM"},
          { value: '20:00', text: "8:00 PM"},
        ]
      }
    }
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
.field {
  padding-bottom: 1.5rem;
}
.radio-container, .datepicker, .timepicker, .rentaltype {
  display: flex;
  flex-direction: column;
}
.rentaltype {
  padding-top: 1rem;
}
.contact-number{
  padding-top: 3rem;
}
</style>
