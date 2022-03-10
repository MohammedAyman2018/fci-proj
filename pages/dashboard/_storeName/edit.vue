<template>
  <div class="container mx-auto">
    <h2 class="mb-3 text-2xl">تعديل المتجر</h2>
    <div v-if="store" class="grid md:grid-cols-3">
      <FormulateInput
        v-model="store.title"
        type="text"
        name="title"
        label="اسم المتجر"
        placeholder="اسم المتجر"
        validation="required"
      />

      <FormulateInput
        v-model="store.desc"
        type="textarea"
        name="desc"
        label="وصف المتجر"
        placeholder="وصف المتجر"
        validation="required"
      />
      <FormulateInput
        v-model="store.location"
        type="text"
        name="location"
        label="عنوان المتجر"
        placeholder="عنوان المتجر"
      />
    </div>

    <h3 class="text-xl mb-3">وسائل التواصل</h3>
    <div v-if="store && store.contacts" class="grid md:grid-cols-3">
      <FormulateInput
        v-model="store.contacts.tel"
        type="tel"
        name="tel"
        label="رقم تليفون"
        placeholder="رقم تليفون"
      />
      <FormulateInput
        v-model="store.contacts.whats"
        type="tel"
        name="whats"
        label="رقم واتس اب"
        placeholder="رقم واتس اب"
      />
      <FormulateInput
        v-model="store.contacts.phone"
        type="tel"
        name="phone"
        label="رقم جوال"
        placeholder="رقم جوال"
      />
      <FormulateInput
        v-model="store.contacts.telegram"
        type="text"
        name="telegram"
        label="قناة تيليجرام"
        placeholder="قناة تيليجرام"
      />
      <FormulateInput
        v-model="store.contacts.email"
        type="email"
        name="email"
        label="بريد الكتروني"
        placeholder="بريد الكتروني"
        validations="email"
      />
    </div>

    <h3 class="text-xl mb-1">مواقع تواصل اجتماعي</h3>
    <div v-if="store && store.social" class="grid md:grid-cols-3">
      <FormulateInput
        v-model="store.social.insta"
        type="text"
        name="insta"
        label="حساب انستاجرام"
        placeholder="حساب انستاجرام"
      />
      <FormulateInput
        v-model="store.social.twitter"
        type="text"
        name="twitter"
        label="حساب تويتر"
        placeholder="حساب تويتر"
      />
      <FormulateInput
        v-model="store.social.fb"
        type="text"
        name="fb"
        label="حساب فيس بوك"
        placeholder="حساب فيس بوك"
      />
      <FormulateInput
        v-model="store.social.yt"
        type="text"
        name="yt"
        label="حساب يوتيوب"
        placeholder="حساب يوتيوب"
      />
      <FormulateInput
        v-model="store.social.snap"
        type="text"
        name="snap"
        label="حساب سناب تيوب"
        placeholder="حساب سناب تيوب"
      />
      <FormulateInput
        v-model="store.social.tiktok"
        type="text"
        name="tiktok"
        label="حساب تيك توك"
        placeholder="حساب تيك توك"
      />
    </div>
    <h3 class="text-xl mb-2">روابط أخرى</h3>
    <div v-if="store && store.otherLinks" class="grid md:grid-cols-3">
      <FormulateInput
        v-model="store.otherLinks.link"
        type="text"
        name="link"
        label="رابط هام"
        placeholder="رابط هام"
      />
      <FormulateInput
        v-model="store.otherLinks.android"
        type="text"
        name="tiktok"
        label="رابط تطبيق اندرويد"
        placeholder="رابط تطبيق اندرويد"
      />
      <FormulateInput
        v-model="store.otherLinks.apple"
        type="text"
        name="apple"
        label="رابط تطبيق IOS"
        placeholder="رابط تطبيق IOS"
      />
    </div>

    <button class="btn btn-primary" @click="editStore">تعديل</button>

    <!-- <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EditStore',
  layout: 'admin',
  data() {
    return {
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
      this.store = res.data
    } catch (error) {
      this.$notification('حدث خطأ ما', error)
    }
  },
  methods: {
    async editStore() {
      try {
        await this.$axios.patch(
          `/stores/${this.$route.params.storeName}?storeName=${this.$route.params.storeName}`,
          this.store
        )
      } catch (error) {
        this.$notification('حدث خطأ ما', error)
      }
    },
  },
})
</script>

<style>
</style>
