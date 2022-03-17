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
    <h2 class="text-center text-4xl font-extrabold mb-14">إحصائيات</h2>
    <div class="grid gap-10 row-gap-8 lg:grid-cols-3">
      <div v-for="card in cards" :key="card.number">
        <div class="flex">
          <h6
            class="
              mr-2
              text-4xl
              font-bold
              md:text-5xl
              text-deep-purple-accent-400
            "
          >
            {{ card.number }}
          </h6>
          <div
            class="
              flex
              items-center
              justify-center
              rounded-full
              bg-teal-accent-400
              w-7
              h-7
            "
          >
            <svg
              class="text-teal-900 w-7 h-7"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              ></polygon>
            </svg>
          </div>
        </div>
        <p class="mb-2 font-bold md:text-lg">{{ card.category }}</p>
        <p class="text-gray-700">
          {{ card.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      cards: [
        {
          number: '65 مليون',
          category: 'الزيارات الشهرية',
          desc: 'حقق عملائنا زيارات شهرية كبيرة نظراً لتوافق مواقعهم مع محركات البحث.',
        },
        {
          number: '1.3 الف',
          category: 'اشتراكات جديدة',
          desc: 'خدمت مواقع عملائنا أكثر من ألف مشترك جديد هذا الشهر فقط.',
        },
        {
          number: '3.2 الف',
          category: 'عملية بيع',
          desc: 'أتم العملاء أكر من ثلاثة آلاف عملية بيع ناجحة هذا الشهر.',
        },
      ],
    }
  },
})
</script>
