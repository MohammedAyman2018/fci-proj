<template>
  <div
    class="
      px-4
      py-16
      mx-auto
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-8 lg:py-20
    "
  >
    <h5 class="mb-14 text-6xl font-extrabold leading-none md:pl-2 text-center">
      لماذا السوق الإلكتروني؟
    </h5>
    <div class="grid gap-3 row-gap-3 lg:grid-cols-3">
      <ul v-for="(item, idx) in items" :key="'feat-ul' + idx" class="space-y-3">
        <li
          v-for="(text, i) in item"
          :key="'feat-item' + i"
          class="flex items-start"
        >
          <span class="mr-1">
            <svg
              class="w-5 h-5 mt-px text-deep-purple-accent-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              ></polygon>
            </svg>
          </span>
          {{ text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      items: {
        1: [
          'امتلك متجر بهويتك الخاصة وبأقل التكاليف',
          'انشئ تطبيق جوال لمتجرك باقل مجهود',
          'سهولة إدراج المنتجات وإدارة المخزون',
        ],
        2: [
          'مطورين لمساعدتك لانشاء متجرك حسب احتياجك',
          'أدوات تسويقية لزيادة مبيعاتك',
          'تقارير مفصلة لقياس أداء المتجر',
        ],
        3: [
          'تصاميم احترافية تناسب ذوقك',
          'دعم جميع وسائل الدفع',
          'دعم 24 ساعة طول الاسبوع',
        ],
      },
    }
  },
})
</script>
