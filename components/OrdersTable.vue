<template>
  <b-table
    ref="table"
    :data="orders"
    paginated
    per-page="5"
    detailed
    detail-key="_id"
    aria-next-label="الصفحة التالية"
    aria-previous-label="الصفحة السابقة"
    aria-page-label="صفحة"
    aria-current-label="الصفحة الحالية"
  >
    <b-table-column v-slot="props" field="statr" label="حالة الأوردر" sortable>
      {{ props.row.state }}
    </b-table-column>

    <b-table-column
      v-slot="props"
      field="createdAt"
      label="تاريخ الطلب"
      sortable
      centered
    >
      <span class="tag is-success">
        {{ new Date(props.row.createdAt).toLocaleDateString() }}
      </span>
    </b-table-column>

    <b-table-column v-slot="props" label="طريقة الدفع">
      <span>
        {{ props.row.user.payment }}
      </span>
    </b-table-column>

    <b-table-column v-slot="props" label="العمليات المتاحة">
      <b-button
        type="is-danger"
        size="is-small"
        :disabled="props.row.state !== 'بانتظار المراجعة'"
        @click="cancleOrder(props.row._id)"
      >
        إلغاء الطلب
      </b-button>
    </b-table-column>

    <template #detail="props">
      <article
        v-for="product in props.row.items"
        :key="product._id"
        class="media"
      >
        <figure class="media-left">
          <p class="image is-64x64">
            <img width="128px" :src="product.img" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h3 class="is-size-4 has-text-weight-bold">
              {{ product.name }}
            </h3>
            <bdi>
              {{ product.amount }} X {{ product.price }} =
              {{ product.amount * product.price }} جنيه
            </bdi>
          </div>
        </div>
      </article>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'OrdersTable',
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async cancleOrder(id) {
      try {
        // TODO: show confirmatin first
        await this.$axios.$patch(`/orders/${id}`, { state: 'ملغي' })
        this.$emit('updateOrders')
        this.$store.dispatch('showToast', {
          message: 'تم إلغاء الطلبية',
          type: 'success',
        })
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
  },
}
</script>

<style></style>
