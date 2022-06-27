<template>
  <div class="container mx-auto px-2">
    <h2 class="is-size-5 has-text-weight-bold">كل الفئات</h2>
    <div v-if="store" class="columns">
      <FormulateInput
        v-model="store.title"
        class="column is-3-desktop is-12-touch"
        type="text"
        name="title"
        label="اسم المتجر"
        placeholder="اسم المتجر"
        validation="required"
      />

      <FormulateInput
        v-model="store.desc"
        class="column is-3-desktop is-12-touch"
        type="textarea"
        name="desc"
        label="وصف المتجر"
        placeholder="وصف المتجر"
        validation="required"
      />
      <FormulateInput
        v-model="store.location"
        class="column is-3-desktop is-12-touch"
        name="location"
        type="select"
        :options="locations"
        label="عنوان المتجر"
        placeholder="عنوان المتجر"
        validation="required"
      />
    </div>

    <h3 class="is-size-5 has-text-weight-bold">وسائل التواصل</h3>
    <div v-if="store && store.contacts" class="columns is-multiline">
      <FormulateInput
        v-model="store.contacts.tel"
        type="tel"
        class="column is-3-desktop is-12-touch"
        name="tel"
        label="رقم تليفون"
        placeholder="رقم تليفون"
      />

      <FormulateInput
        v-model="store.workOn"
        :options="categories"
        class="column is-3-desktop is-12-touch"
        type="checkbox"
        label="ما المجالات التي تعمل بها"
      />

      <FormulateInput
        v-model="store.contacts.whats"
        type="tel"
        name="whats"
        class="column is-3-desktop is-12-touch"
        label="رقم واتس اب"
        placeholder="رقم واتس اب"
      />
      <FormulateInput
        v-model="store.contacts.phone"
        type="tel"
        name="phone"
        class="column is-3-desktop is-12-touch"
        label="رقم جوال"
        placeholder="رقم جوال"
      />
      <FormulateInput
        v-model="store.contacts.telegram"
        class="column is-3-desktop is-12-touch"
        type="text"
        name="telegram"
        label="قناة تيليجرام"
        placeholder="قناة تيليجرام"
      />
      <FormulateInput
        v-model="store.contacts.email"
        type="email"
        class="column is-3-desktop is-12-touch"
        name="email"
        label="بريد الكتروني"
        placeholder="بريد الكتروني"
        validations="email"
      />
    </div>

    <h3 class="is-size-5 has-text-weight-bold">مواقع تواصل اجتماعي</h3>
    <div v-if="store && store.social" class="columns is-multiline">
      <FormulateInput
        v-model="store.social.insta"
        type="text"
        class="column is-3-desktop is-12-touch"
        name="insta"
        label="حساب انستاجرام"
        placeholder="حساب انستاجرام"
      />
      <FormulateInput
        v-model="store.social.twitter"
        type="text"
        name="twitter"
        class="column is-3-desktop is-12-touch"
        label="حساب تويتر"
        placeholder="حساب تويتر"
      />
      <FormulateInput
        v-model="store.social.fb"
        type="text"
        name="fb"
        class="column is-3-desktop is-12-touch"
        label="حساب فيس بوك"
        placeholder="حساب فيس بوك"
      />
      <FormulateInput
        v-model="store.social.yt"
        type="text"
        name="yt"
        class="column is-3-desktop is-12-touch"
        label="حساب يوتيوب"
        placeholder="حساب يوتيوب"
      />
      <FormulateInput
        v-model="store.social.snap"
        type="text"
        name="snap"
        class="column is-3-desktop is-12-touch"
        label="حساب سناب تيوب"
        placeholder="حساب سناب تيوب"
      />
      <FormulateInput
        v-model="store.social.tiktok"
        type="text"
        name="tiktok"
        class="column is-3-desktop is-12-touch"
        label="حساب تيك توك"
        placeholder="حساب تيك توك"
      />
    </div>
    <h3 class="is-size-5 has-text-weight-bo">روابط أخرى</h3>
    <div v-if="store && store.otherLinks" class="columns is-multiline">
      <FormulateInput
        v-model="store.otherLinks.link"
        type="text"
        name="link"
        class="column is-3-desktop is-12-touch"
        label="رابط هام"
        placeholder="رابط هام"
      />
      <FormulateInput
        v-model="store.otherLinks.android"
        type="text"
        name="tiktok"
        class="column is-3-desktop is-12-touch"
        label="رابط تطبيق اندرويد"
        placeholder="رابط تطبيق اندرويد"
      />
      <FormulateInput
        v-model="store.otherLinks.apple"
        type="text"
        name="apple"
        class="column is-3-desktop is-12-touch"
        label="رابط تطبيق IOS"
        placeholder="رابط تطبيق IOS"
      />
    </div>

    <!-- <button class="btn btn-primary mb-36" @click="editStore">تعديل</button> -->
    <b-button
      type="is-primary"
      class="btn btn-primary btn-sm mb-3"
      @click="editStore"
    >
      تعديل
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EditStore',
  layout: 'admin',
  data() {
    return {
      locations: [],
      categories: [],
      store: {
        contacts: {},
        social: {},
        otherLinks: {},
      },
    }
  },
  head() {
    return {
      title: 'تعديل متجر',
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        `/stores/one/admin/${this.$route.params.storeName}`
      )
      const categories = await this.$axios.get('/categories')
      this.categories = categories.data.map((x) => {
        return { label: x.name, value: x._id }
      })
      const locations = await this.$axios.get('/locations')
      this.locations = locations.data.map((x) => {
        return { label: x.name, value: x._id }
      })
      this.store = res.data
    } catch (error: any) {
      this.$store.dispatch('showToast', {
        message: error.response.data.msg,
        type: 'error',
      })
    }
  },
  methods: {
    async editStore() {
      try {
        await this.$axios.patch(
          `/stores/${this.$route.params.storeName}?storeName=${this.$route.params.storeName}`,
          this.store
        )
        this.$store.dispatch('showToast', {
          message: 'تم تعديل بياناتك',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
  },
})
</script>

<style></style>
