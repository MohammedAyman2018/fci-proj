<template>
  <div class="container mx-auto px-2">
    <div
      class="is-justify-content-space-between is-flex is-align-items-center my-3"
    >
      <h2 class="is-size-3 has-text-weight-bold">كل الفئات</h2>
      <b-button
        type="is-primary"
        class="btn btn-primary btn-sm"
        @click="$router.push('/dashboard/stores/requests')"
      >
        طلبات انشاء متجر
      </b-button>
    </div>
    <modal name="delete-store" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">حذف المتجر</h2>
        <p>هل انت واثق انك تريد حذف المتجر؟</p>

        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="removeStore">نعم</button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('delete-store')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>

    <vue-good-table
      :columns="[
        { label: 'اسم', field: 'title' },
        { label: 'وصف', field: 'desc' },
        { label: 'البلد', field: 'location.name' },
        { label: 'البريد', field: 'contacts.email' },
        { label: 'رقم الهاتف', field: 'contacts.phone', sortable: false },
        {
          label: 'تاريخ الانشاء',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`,
          dateOutputFormat: 'yyyy-MM-dd',
        },
        {
          label: 'العمليات المتاحة',
          field: 'operations',
          sortable: false,
          globalSearchDisabled: true,
        },
      ]"
      :rows="stores"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operations'" class="flex">
          <b-tooltip label="تعديل">
            <b-button
              tag="router-link"
              icon-left="pen"
              type="is-warning"
              :to="`/dashboard/${props.row.title}/edit`"
            />
          </b-tooltip>
          <b-tooltip label="حذف">
            <b-button
              icon-left="delete"
              type="is-danger"
              @click="openModal('delete-store', props.row)"
            />
          </b-tooltip>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IStore from '@/interfaces/store'

export default Vue.extend({
  name: 'StorePage',
  layout: 'admin',
  data() {
    return {
      stores: [] as IStore[],
      store: {} as IStore,
    }
  },
  mounted() {
    this.getStores()
  },
  methods: {
    async getStores() {
      this.stores = await this.$axios
        .$get('/stores?approved=true')
        .catch((err) => {
          this.$store.dispatch('showToast', {
            message: err.response.data.msg,
            type: 'error',
          })
        })
    },
    openModal(modalName, store) {
      this.store = store
      this.$modal.show(modalName)
    },
    async removeStore() {
      try {
        await this.$axios.$delete(`/stores/${this.store._id}`)
        await this.getStores()
        this.closeModal('delete-store')
        this.$store.dispatch('showToast', {
          message: 'تم حذف المتجر بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },

    closeModal(modalName) {
      this.store = {} as IStore
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style></style>
