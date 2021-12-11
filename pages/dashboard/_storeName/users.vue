<template>
  <div>
    <h2 class="text-2xl mb-3">كل العملاء</h2>
    <div v-for="user in displayedUsers" :key="user._id" class="user">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg">{{ user.name }}</h3>
        <div>
          <div data-tip="تعديل" class="tooltip">
            <a href="#my-modal" class="btn btn-warning btn-square btn-xs">
              <i class="ri-pencil-line"></i>
            </a>
          </div>
          <div data-tip="تفاصيل أكثر" class="tooltip">
            <a href="#my-modal" class="btn btn-danger btn-square btn-xs">
              <i class="ri-more-line"></i>
            </a>
          </div>
          <div data-tip="حذف" class="tooltip">
            <a href="#my-modal" class="btn btn-info btn-square btn-xs">
              <i class="ri-delete-bin-line"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center text-xs">
        <p>الدولة: {{ user.country.name }}</p>
        <p>البريد الالكتروني: {{ user.email }}</p>
        <p>رقم الهاتف: {{ user.phone }}</p>
      </div>
    </div>

    <div id="my-modal" class="modal">
      <div class="p-4">
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
      <h2>تعديل العميل</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IUser from '@/interfaces/user'
import CustomInput from '~/components/utils/CustomInput.vue'
export default Vue.extend({
  name: 'UsersDashBoard',
  components: { CustomInput },
  data() {
    return {
      users: [] as IUser[],
      displayedUsers: [] as IUser[],
    }
  },
  async mounted() {
    this.users = await this.$axios.$get('/users')
    this.displayedUsers = this.users
  },
})
</script>

<style scoped>
.user {
  @apply shadow-md p-4 bg-green-100 mb-3;
}
</style>
