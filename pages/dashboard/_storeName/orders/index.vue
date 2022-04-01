<template>
  <div class="container">
    <h1 class="my-3 text-2xl font-bold">طلبياتك:</h1>
    <vue-good-table
      :columns="[
        { label: 'حالة الطلب', field: 'state' },
        { label: 'اسم العميل', field: 'user.address' },
        { label: 'رقم العميل', field: 'user.tel', sortable: false },
        { label: 'طريقة الدفع', field: 'user.payment' },
        { label: 'حالة الطلب', field: 'state' },
        { label: 'تاريخ  الطلب', field: 'createdAt', type:'date',  dateInputFormat: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`, dateOutputFormat: 'MMM dd yyyy', },
        { label: 'العمليات المتاحة', field: 'operations', sortable: false, globalSearchDisabled: true, },
      ]"
      :rows="allOrders"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operations'" class="flex">
          <div data-tip="التفاصيل" class="tooltip mx-1">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="
                $router.push(
                  `/dashboard/${$route.params.storeName}/orders/one/${props.row._id}`
                )
              "
            >
              <i class="ri-file-chart-line"></i>
            </button>
          </div>
        </span>
      </template>

      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AllOrders',
  layout: 'admin',
  data() {
    return {
      allOrders: [],
    }
  },
  head() {
    return {
      title: 'الطلبيات',
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.$get(
        `/orders?storeName=${this.$route.params.storeName}`
      )
      this.allOrders = res
    } catch (error: any) {
      this.$store.dispatch('showToast', {
        message: error.response.data.msg,
        type: 'error',
      })
    }
  },
})
</script>
<style></style>
