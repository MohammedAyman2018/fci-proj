<template>
  <b-table
    ref="table"
    :data="rates"
    paginated
    per-page="5"
    aria-next-label="الصفحة التالية"
    aria-previous-label="الصفحة السابقة"
    aria-page-label="صفحة"
    aria-current-label="الصفحة الحالية"
  >
    <b-table-column v-slot="props" field="userId.name" label="اسم العميل">
      {{ props.row.userId.name }}
    </b-table-column>
    <b-table-column v-slot="props" field="userId.phone" label="رقم التواصل">
      {{ props.row.userId.phone }}
    </b-table-column>
    <b-table-column v-slot="props" field="rate" sortable label="التقييم">
      {{ props.row.rate }}
    </b-table-column>
    <b-table-column v-slot="props" field="comment" label="الرسالة">
      {{ props.row.comment }}
    </b-table-column>
  </b-table>
</template>

<script>
export default {
  name: 'RatesTable',
  props: {
    rates: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style></style>
