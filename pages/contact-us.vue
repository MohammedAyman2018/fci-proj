<template>
  <div>
    <div class="container mx-2">
      <div class="columns is-centered">
        <div class="column is-half">
          <h3 class="is-size-4 has-text-weight-bold">الشكاوى والمقترحات</h3>
          <div class="columns is-multiline">
            <b-field class="column is-12" label="الاسم">
              <b-input v-model="name" value="اسم المتجر" />
            </b-field>
            <b-field class="column is-12" label="رقم هاتف للتواصل">
              <b-input v-model="phone" value="رقم هاتف للتواصل" />
            </b-field>
            <b-field class="column is-12" label="ما هو نوع الرسالة">
              <b-select
                v-model="msgType"
                expanded
                placeholder="اختر نوع الرسالة"
              >
                <option
                  v-for="option in ['سؤال', 'شكوى', 'اقتراح']"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </b-select>
            </b-field>
            <b-field class="column is-12" label="الرسالة">
              <b-input v-model="msg" maxlength="200" type="textarea"></b-input>
            </b-field>

            <b-button
              type="is-primary"
              :disabled="!valid"
              expanded
              @click="sendContactForm"
            >
              إرسال
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUsPage',
  data() {
    return {
      msgType: '',
      name: '',
      phone: '',
      msg: '',
    }
  },
  computed: {
    valid() {
      return !!this.msgType && !!this.name && !!this.phone && !!this.msg
    },
  },
  methods: {
    async sendContactForm() {
      try {
        await this.$axios.post('/contactUs', {
          msgType: this.msgType,
          name: this.name,
          phone: this.phone,
          msg: this.msg,
        })
        this.msgType = ''
        this.name = ''
        this.phone = ''
        this.msg = ''
        this.$router.push('/')
        this.$store.dispatch('showToast', {
          message: 'وصلتنا رسالتك. سيتم التواصل معك قريبا',
          type: 'success',
        })
      } catch (error) {
        this.$store.dispatch('showToast', {
          message: error,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style></style>
