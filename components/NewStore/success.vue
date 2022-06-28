<template>
  <div class="container">
    <div
      class="is-flex is-justify-content-center is-align-items-center is-flex-direction-column"
    >
      <img width="150px" src="~/assets/star.png" alt="أهلا بك" />
      <p class="mx-auto is-size-5 has-text-weight-bold has-text-centerd">
        أهلاً بك ضمن منصة السوق الإلكتروني،<br />
        نتشرف بقبول متجرك معنا هل أنت جاهز لبداية جديدة مع السوق الإلكتروني؟
        <br />
        لا نستطيع الانتظار لرؤية ما سوف تحققه معنا
        <nuxt-link
          :to="`/dashboard/${$store.state.stores.store.title}`"
          class="btn btn-primary"
        >
          إنطلق
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'StoreValidatedAndValid',
})
</script>
