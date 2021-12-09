<template>
  <VuePhoneNumberInput
    ref="VuePhoneNumberInput"
    v-model="phone"
    class="input"
    :border-radius="0"
    required
    :default-country-code="'EG'"
    :only-countries="['EG', 'SA']"
    :translations="{
      countrySelectorLabel: 'مفتاح الدولة',
      countrySelectorError: 'خطأ',
      phoneNumberLabel: 'رقم الهاتف',
      example: 'مثال :',
    }"
    @input="phoneEntered"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import VuePhoneNumberInput from 'vue-phone-number-input'
import 'vue-phone-number-input/dist/vue-phone-number-input.css'

export default Vue.extend({
  components: { VuePhoneNumberInput },
  data() {
    return {
      phone: '',
    }
  },
  methods: {
    phoneEntered() {
      const phoneInput: any = this.$refs.VuePhoneNumberInput
      if (phoneInput) {
        const phoneResult = phoneInput.results
        if (phoneResult.isValid) {
          this.$emit('change', {
            phone: phoneResult.formattedNumber,
            country: {
              code: phoneResult.countryCode,
              name: phoneResult.countryCode === 'EG' ? 'مصر' : 'السعودية',
            },
          })
        }
      }
    },
  },
})
</script>

<style scoped>
</style>
