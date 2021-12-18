<template>
  <div class="container mx-auto px-2">
    <h2 class="text-2xl mb-3">كل العملاء</h2>
    <div v-for="user in displayedUsers" :key="user._id" class="user">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg">{{ user.name }}</h3>
        <div>
          <div data-tip="تعديل" class="tooltip">
            <button
              class="btn btn-warning btn-square btn-xs"
              @click="openModal('edit-user', user)"
            >
              <i class="ri-pencil-line"></i>
            </button>
          </div>
          <div data-tip="تفاصيل أكثر" class="tooltip">
            <a href="#my-modal" class="btn btn-danger btn-square btn-xs">
              <i class="ri-more-line"></i>
            </a>
          </div>
          <div data-tip="حذف" class="tooltip">
            <button
              class="btn btn-error btn-square btn-xs"
              @click="openModal('delete-user', user)"
            >
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center text-xs">
        <p>الدولة: {{ user.country.name }}</p>
        <p>البريد الالكتروني: {{ user.email }}</p>
        <p>
          رقم الهاتف: <bdi>{{ user.phone }}</bdi>
        </p>
      </div>
    </div>
    <modal name="delete-user" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">حذف العميل</h2>
        <p>هل انت واثق انك تريد حذف العميل؟</p>

        <div class="mt-5">
          <button class="btn btn-error" @click="removeUser">نعم</button>
          <button class="btn btn-error" @click="closeModal('delete-user')">
            إلغاء
          </button>
        </div>
      </div>
    </modal>

    <modal name="edit-user" adaptive height="auto" scrollable>
      <div class="p-4">
        <h2 class="text-xl font-bold">تعديل العميل</h2>
        <custom-input
          :label="'اسم المتجر'"
          :message="'اسم المتجر مطلوب'"
          should-validate
          is-requried
          :attrs="{ placeholder: 'ادخل اسم المتجر' }"
          @changed="user.name = $event"
        />
        <custom-input
          :label="'البريد الإلكتروني'"
          :message="'ادخل بريد الكتروني صحيح'"
          should-validate
          is-email
          :attrs="{
            type: 'email',
            placeholder: 'ادخل البريد الإلكتروني',
          }"
          @changed="user.email = $event"
        />
        <div class="form-control w-50 my-1">
          <label class="label">
            <span class="label-text">رقم الجوال</span>
          </label>
          <phone-input
            @change="
              user.phone = $event.phone
              user.country = $event.country
            "
          />
        </div>
        <custom-input
          :label="'كلمة المرور'"
          :message="'ادخل كلمة المرور صحيح'"
          should-validate
          is-requried
          :attrs="{ type: 'password', placeholder: 'ادخل كلمة المرور' }"
          @changed="user.password = $event"
        />
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IUser from '@/interfaces/user'
import CustomInput from '~/components/utils/CustomInput.vue'
import PhoneInput from '~/components/utils/PhoneInput.vue'
export default Vue.extend({
  name: 'UsersDashBoard',
  components: { CustomInput, PhoneInput },
  data() {
    return {
      user: {} as IUser,
      users: [] as IUser[],
      displayedUsers: [] as IUser[],
    }
  },
  async mounted() {
    await this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        this.users = await this.$axios.$get('/users')
        this.displayedUsers = this.users
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error || '',
        })
      }
    },
    openModal(modalName, user) {
      this.user = user
      this.$modal.show(modalName)
    },
    editUser() {
      console.log(this.user)
      this.closeModal('edit-user')
    },
    async removeUser() {
      try {
        const res = await this.$axios.$delete(`/users/${this.user._id}`)
        console.log(res)
        await this.getUsers()
        this.closeModal('delete-user')
      } catch (error: any) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: error || '',
        })
      }
    },
    closeModal(modalName) {
      this.user = {} as IUser
      this.$modal.hide(modalName)
    },
  },
})
</script>

<style scoped>
.user {
  @apply shadow-md p-4 bg-green-100 mb-3;
}
</style>
