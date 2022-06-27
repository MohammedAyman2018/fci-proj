<template>
  <div class="container mx-auto px-2">
    <div
      class="is-justify-content-space-between is-flex is-align-items-center my-3"
    >
      <h2 class="text-2xl mb-3">طلبات انشاء متجر</h2>
      <div class="flex justify-between">
        <button class="btn mx-1 btn-primary btn-sm" @click="filter('waiting')">
          في الانتظار
        </button>
        <button class="btn mx-1 btn-primary btn-sm" @click="filter('rejected')">
          المرفوضة
        </button>
      </div>
    </div>

    <p
      v-if="displayedStores.length === 0"
      class="text-center text-grey-500 text-xl"
    >
      لا يوجد تاجر تحت هذه الفلترة
    </p>
    <div
      v-for="oneUser in displayedStores"
      v-else
      :key="oneUser._id"
      class="oneUser"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg">{{ oneUser.title }}</h3>
        <div>
          <button
            class="btn btn-primary btn-sm"
            @click="openModal('validate-store', oneUser)"
          >
            إظهار التفاصيل
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center text-xs">
        <p>العنوان: {{ oneUser.location.name }}</p>
      </div>
    </div>

    <modal name="validate-store" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl mb-3 font-bold">ملفات المتجر</h2>
        <div class="images flex h-12 w-12" v-viewer="{ movable: false }">
          <img
            v-for="src in store.files"
            class="inline-block mx-3"
            :src="src"
            :key="src"
          />
        </div>
        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="approved(true)">
            تفعيل
          </button>
          <button class="btn btn-error btn-sm" @click="approved(false)">
            حذف
          </button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('validate-store')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { directive as viewer } from 'v-viewer'
import IStore from '@/interfaces/store'
import 'viewerjs/dist/viewer.css'
export default Vue.extend({
  directives: {
    viewer: viewer({
      debug: true,
    }),
  },
  layout: 'admin',
  data() {
    return {
      stores: [] as IStore[],
      displayedStores: [] as IStore[],
      store: {} as IStore,
    }
  },
  mounted() {
    this.getStores()
  },
  methods: {
    async getStores() {
      const res = await this.$axios.$get('/stores').catch((error: any) => {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      })
      this.stores = res
      this.filter('waiting')
    },
    async approved(approved) {
      let message: string | null = ''
      if (!approved) {
        while (message === '') {
          message = prompt('ما هو سبب الرفض؟')
        }
      }
      try {
        await this.$axios.$post(`/stores/validate/${this.store._id}`, {
          approved,
          message,
        })
        await this.getStores()
        this.closeModal()
        this.$store.dispatch('showToast', {
          message: 'نجح الطلب',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    filter(type: string): void {
      if (type === 'waiting') {
        this.displayedStores = this.stores.filter((store) => !store.reviewed)
        return
      }
      this.displayedStores = this.stores.filter(
        (store) => store.reviewed && !store.approved
      )
    },
    closeModal() {
      this.store = {} as IStore
      this.$modal.hide('validate-store')
    },
    openModal(modalName, store) {
      this.store = store
      this.$modal.show(modalName)
    },
  },
})
</script>

<style scoped></style>
