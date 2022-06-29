<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="text-lg font-bold"> السوق الإلكتروني </span>
      </b-navbar-item>
    </template>

    <template #start>
      <span v-for="link in links" :key="link.link" class="is-flex">
        <b-navbar-item
          v-if="link.display"
          tag="router-link"
          :to="link.link"
          v-text="link.text"
        />
      </span>
    </template>
    <template #end>
      <b-navbar-dropdown
        v-if="
          $auth &&
          $auth.loggedIn &&
          ['owner', 'admin'].includes($auth.user.role)
        "
        collapsible
        label="لوحة التحكم"
      >
        <span v-for="link in adminLinks" :key="link.link" class="is-flex">
          <b-navbar-item
            v-if="link.display"
            tag="router-link"
            class="is-flex-grow-1"
            :to="link.link"
            v-text="link.text"
          />
        </span>
      </b-navbar-dropdown>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            v-show="$auth.loggedIn"
            type="is-danger"
            @click="$auth.logout()"
          >
            <strong>تسجيل خروج</strong>
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
  data() {
    return {}
  },
  computed: {
    links() {
      return [
        { text: 'الرئيسية', link: '/', display: true },
        { text: 'تصفح المنتجات', link: '/store/products', display: true },
        { text: 'السلة', link: '/store/cart', display: true },
        {
          display: this.$auth && this.$auth.loggedIn,
          text: this.$auth && this.$auth.loggedIn ? this.$auth.user.name : '',
          link: '/profile',
        },
        {
          text: 'انشئ متجرك',
          link: '/new-store',
          display:
            this.$auth &&
            this.$auth.loggedIn &&
            this.$auth.user.role === 'client',
        },
        { text: 'تسجيل دخول', link: '/login', display: !this.$auth.loggedIn },
        { text: 'إنشاء حساب', link: '/sign-up', display: !this.$auth.loggedIn },
      ]
    },
    adminLinks() {
      const auth =
        this.$auth && this.$auth.loggedIn && this.$auth.user.storeName
      const owner = ['admin', 'owner'].includes(this.$auth.user.role)
      const admin = this.$auth.user.role === 'admin'
      const store = this.$auth.user.storeName
      return [
        {
          text: 'إحصائيات',
          link: `/dashboard/${store}`,
          display: auth && owner,
        },
        {
          text: 'تعديل متجرك',
          link: `/dashboard/${store}/edit/`,
          display: auth && owner,
        },
        {
          text: 'إدارة المتاجر',
          link: `/dashboard/stores/`,
          display: auth && admin,
        },
        {
          text: 'إدارة العملاء',
          link: `/dashboard/users/`,
          display: auth && admin,
        },
        {
          text: 'إدارة الطلبيات',
          link: `/dashboard/${store}/orders/`,
          display: auth && owner,
        },
        {
          text: 'إدارة المنتجات',
          link: `/dashboard/${store}/products/`,
          display: auth && owner,
        },
        {
          text: 'إدارة الفئات',
          link: `/dashboard/categories/`,
          display: auth && admin,
        },
      ]
    },
  },
})
</script>

<style scoped></style>
