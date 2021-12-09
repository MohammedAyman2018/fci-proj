<template>
  <div>
    <section class="container"></section>
    <div class="card shadow-lg">
      <div class="card-body">
        <h2 class="card-title">تسحيل دخول</h2>
        <form>
          <custom-input
            :attrs="{ placeholder: 'البريد الالكتروني' }"
            :classes="['input-info', 'input-bordered']"
            :label="'البريد الالكتروني'"
            :message="'ادخل بريدك الالكتروني'"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CustomInput from '~/components/utils/CustomInput.vue'

export default Vue.extend({
  components: { CustomInput },
})
</script>

<style scoped>
</style>
