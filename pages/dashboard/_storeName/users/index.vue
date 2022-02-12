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
    <div v-for="oneUser in displayedUsers" :key="oneUser._id" class="oneUser">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg">{{ oneUser.name }}</h3>
        <div>
          <div data-tip="تعديل" class="tooltip">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="openModal('edit-user', oneUser)"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>
          <div data-tip="تفاصيل أكثر" class="tooltip">
            <nuxt-link
              :to="`${$route.path}/${oneUser._id}`"
              class="btn btn-danger btn-square btn-xs"
            >
              <i class="ri-more-line"></i>
            </nuxt-link>
          </div>
          <div data-tip="حذف" class="tooltip">
            <button
              class="btn btn-error btn-square btn-xs"
              @click="openModal('delete-user', oneUser)"
            >
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center text-xs">
        <p>الدولة: {{ oneUser.country }}</p>
        <p>البريد الالكتروني: {{ oneUser.email }}</p>
        <p>
          رقم الهاتف: <bdi>{{ oneUser.phone }}</bdi>
        </p>
      </div>
    </div>
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
        <FormulateInput
          v-model="user.name"
          name="اسم العميل"
          label="اسم العميل"
          placeholder="ادخل اسم العميل"
          validation="required"
        />

        <FormulateInput
          v-model="user.address"
          name="عنوان العميل"
          label="عنوان العميل"
          placeholder="ادخل عنوان العميل"
          validation="required"
        />

        <FormulateInput
          v-model="user.dob"
          type="date"
          name="تاريخ ميلاد العميل"
          label="تاريخ ميلاد العميل"
          validation="required"
        />

        <FormulateInput
          v-model="user.email"
          name="البريد الإلكتروني"
          placeholder="البريد الإلكتروني"
          label="البريد الإلكتروني"
          validation="required|email"
        />
        <FormulateInput
          v-model="user.password"
          type="password"
          name="كلمة المرور"
          placeholder="ادخل كلمة المرور"
          label="كلمة المرور"
          validation="required"
        />

        <FormulateInput
          v-model="user.phone"
          name="رقم الجوال"
          type="tel"
          placeholder="ادخل رقم الجوال"
          label="رقم الجوال"
          validation="required"
        />

        <FormulateInput
          v-model="user.couuntry"
          name="الدولة"
          type="select"
          placeholder="ادخل الدولة"
          :options="{ مصر: 'مصر', السعودية: 'السعودية' }"
          label="الدولة"
          validation="required"
        />
        <FormulateInput
          v-model="user.role"
          name="وظيفة العميل"
          type="select"
          placeholder="اختر وظيفة العميل"
          :options="{ client: 'عميل', admin: 'أدمن' }"
          label="وظيفة العميل"
          validation="required"
        />

        <div class="flex justify-between items-center mt-4 mb-12">
          <button
            v-if="!edit"
            :disabled="!valid"
            class="btn btn-success btn-sm"
            @click="addUser"
          >
            أضافة
          </button>
          <button
            v-else
            :disabled="!valid"
            class="btn btn-warning btn-sm"
            @click="editUser"
          >
            تعديل
          </button>
          <button class="btn btn-ghost btn-sm" @click="closeModal('edit-user')">
            إلغاء
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  computed: {
    valid(): Boolean {
      return (
        !!this.user.name &&
        !!this.user.email &&
        !!this.user.phone &&
        !!this.user.password &&
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
    async getUsers() {
      try {
        this.users = await this.$axios.$get(
          `/users?store=${this.$route.params.storeName}`
        )
        this.displayedUsers = this.users
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
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
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تمت إضافة العميل بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
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
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم التعديل بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
        })
      }
    },
    async removeUser() {
      try {
        await this.$axios.$delete(`/users/${this.user._id}`)
        await this.getUsers()
        this.closeModal('delete-user')
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'تم حذف العميل بنجاح',
        })
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error,
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

<style scoped>
</style>
