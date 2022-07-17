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
    <template #empty>
      <div class="has-text-centered">لا يوجد شكاوى او مقترحات بعد</div>
    </template>
    <b-table-column v-slot="props" field="msgType" sortable label="نوع الرسالة">
      {{ props.row.msgType }}
    </b-table-column>
    <b-table-column v-slot="props" field="name" label="اسم العميل">
      {{ props.row.name }}
    </b-table-column>
    <b-table-column v-slot="props" field="phone" sortable label="رقم التواصل">
      {{ props.row.phone }}
    </b-table-column>
    <b-table-column v-slot="props" field="state" sortable label="حالة الرساة">
      {{ props.row.state }}
    </b-table-column>
    <b-table-column v-slot="props" field="msg" label="الرسالة">
      {{ props.row.msg }}
    </b-table-column>
    <b-table-column
      v-if="$auth && $auth.loggedIn && $auth.user.role === 'admin'"
      v-slot="props"
      field="msg"
      label="العمليات المتاحة"
    >
      <b-button
        type="is-warning"
        size="is-small"
        @click="
          changeState(
            props.row._id,
            props.row.state === 'بانتظار المراجعة'
              ? 'تم الرد'
              : 'بانتظار المراجعة'
          )
        "
      >
        تغيير حالة الشكوى
      </b-button>
    </b-table-column>
  </b-table>
</template>

<script>
export default {
  name: 'ComplainsTable',
  props: {
    rates: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async changeState(id, state) {
      try {
        await this.$axios.patch(`/contactUs/${id}`, { state })
        this.$emit('updateComplains')
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
