<template>
  <div class="container mx-auto px-2">
    <div class="justify-between flex items-center my-3">
      <h2 class="text-2xl mb-3">كل العملاء</h2>
      <button
        class="btn btn-primary btn-sm"
        @click="
          edit = false
          openModal('edit-user', {})
        "
      >
        أضف عميل
      </button>
    </div>
    <vue-good-table
      :columns="[
        { label: 'الاسم', field: 'name' },
        { label: 'البريد الإلكتروني', field: 'email' },
        { label: 'رقم الهاتف', field: 'phone', sortable: false },
        { label: 'اسم المتجر', field: 'storeName' },
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
      :rows="displayedUsers"
      :rtl="true"
      :search-options="{ enabled: true, placeholder: 'ابحث في الجدول' }"
      max-height="auto"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operations'" class="flex">
          <div data-tip="تعديل" class="tooltip">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="openModal('edit-user', props.row)"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>
          <div data-tip="تفاصيل أكثر" class="tooltip mx-3">
            <nuxt-link
              :to="`${$route.path}/${props.row._id}`"
              class="btn btn-danger btn-square btn-xs"
            >
              <i class="ri-more-line"></i>
            </nuxt-link>
          </div>
          <div data-tip="حذف" class="tooltip">
            <button
              class="btn btn-error btn-square btn-xs"
              @click="openModal('delete-user', props.row)"
            >
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </span>
      </template>

      <div slot="emptystate">لا توجد فئات حتى الآن</div>
    </vue-good-table>


    <modal name="delete-user" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">حذف العميل</h2>
        <p>هل انت واثق انك تريد حذف العميل؟</p>

        <div class="mt-5">
          <button class="btn btn-error btn-sm" @click="removeUser">نعم</button>
          <button
            class="btn btn-error btn-sm"
            @click="closeModal('delete-user')"
          >
            إلغاء
          </button>
        </div>
      </div>
    </modal>

    <modal
      name="edit-user"
      adaptive
      height="auto"
      scrollable
      @closed="closeModal('edit-user')"
    >
      <div class="p-4 space-y-1">
        <h2 class="text-xl font-bold">{{ edit ? 'تعديل' : 'أضف' }} العميل</h2>
        <FormulateForm
          v-slot="{ isLoading }"
          :values="cloneDeep(user)"
          @submit="!edit ? addUser : editUser"
        >

          <FormulateInput
            name="name"
            label="اسم العميل"
            placeholder="ادخل اسم العميل"
            validation="required"
            validation‑name="اسم العميل"
          />

          <FormulateInput
            name="address"
            validation‑name="عنوان العميل"
            label="عنوان العميل"
            placeholder="ادخل عنوان العميل"
            validation="required"
          />

          <FormulateInput
            type="date"
            validation‑name="تاريخ ميلاد العميل"
            name="dob"
            label="تاريخ ميلاد العميل"
            validation="required"
          />

          <FormulateInput
            validation‑name="البريد الإلكتروني"
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            label="البريد الإلكتروني"
            validation="required|email"
          />
          <FormulateInput
            type="password"
            validation‑name="كلمة المرور"
            name="password"
            placeholder="ادخل كلمة المرور"
            label="كلمة المرور"
            validation="required"
          />

          <FormulateInput
            validation‑name="رقم الجوال"
            name="phone"
            type="tel"
            placeholder="ادخل رقم الجوال"
            label="رقم الجوال"
            validation="required"
          />

          <FormulateInput
            validation‑name="وظيفة العميل"
            name="role"
            type="select"
            placeholder="اختر وظيفة العميل"
            :options="{ client: 'عميل', admin: 'أدمن' }"
            label="وظيفة العميل"
            validation="required"
          />

          <div class="flex justify-between items-center mt-4 mb-12">
             <FormulateInput
              v-if="!edit"
                :wrapper-class="['w-full']"
                :input-class="['btn-success', 'w-full', 'btn']"
                :disabled="isLoading || !valid"
                type="submit"
                :label="!edit ? 'أضافة' : 'تعديل'"
              />
            <button class="btn btn-ghost btn-sm" @click="closeModal('edit-user')">
              إلغاء
            </button>
          </div>
        </FormulateForm>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'
import IUser from '@/interfaces/user'
export default Vue.extend({
  name: 'UsersDashBoard',

  layout: 'admin',
  data() {
    return {
      user: {} as IUser,
      edit: true,
      users: [] as IUser[],
      displayedUsers: [] as IUser[],
    }
  },
  head () {
    return {
      title: 'العملاء'
    }
  },
  computed: {
    valid(): Boolean {
      return (
        !!this.user.name &&
        !!this.user.email &&
        !!this.user.phone &&
        !!this.user.address &&
        !!this.user.dob &&
        !!this.user.role
      )
    },
  },
  async mounted() {
    await this.getUsers()
  },
  methods: {
    cloneDeep,
    async getUsers() {
      try {
        this.users = await this.$axios.$get(`/users`)
        this.displayedUsers = this.users
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    openModal(modalName, user) {
      this.user = user
      this.$modal.show(modalName)
    },
    async addUser() {
      try {
        await this.$axios.$post('/users', {
          ...this.user,
          storeName: this.$route.params.storeName,
        })
        await this.getUsers()
        this.closeModal('edit-user')
        this.$store.dispatch('showToast', {
          message: 'تمت إضافة العميل بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    async editUser() {
      try {
        await this.$axios.$patch(`/users/${this.user._id}`, {
          oldPassword: this.user.password,
          ...this.user,
        })
        await this.getUsers()
        this.closeModal('edit-user')
        this.$store.dispatch('showToast', {
          message: 'تم التعديل بنجاح',
          type: 'success',
        })
      } catch (error: any) {
        this.$store.dispatch('showToast', {
          message: error.response.data.msg,
          type: 'error',
        })
      }
    },
    async removeUser() {
      try {
        await this.$axios.$delete(`/users/${this.user._id}`)
        await this.getUsers()
        this.closeModal('delete-user')
        this.$store.dispatch('showToast', {
          message: 'تم حذف العميل بنجاح',
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
      this.user = {} as IUser
      this.edit = true
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped></style>
