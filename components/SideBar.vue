<template>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label>
    <ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
      <li>
        <nuxt-link
          v-if="$auth && $auth.loggedIn"
          to="/profile"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          {{ $auth.user.name }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="$auth && $auth.loggedIn && $auth.user.role === 'client'"
          to="/new-store"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          انشئ متجرك
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            $auth.user.role === 'admin'
          "
          :to="`/dashboard/stores/`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          المتاجر
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            ['admin', 'owner'].includes($auth.user.role)
          "
          :to="`/dashboard/${$auth.user.storeName}/users`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          العملاء
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            ['admin', 'owner'].includes($auth.user.role)
          "
          :to="`/dashboard/${$auth.user.storeName}/products`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          المنتجات
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            ['admin', 'owner'].includes($auth.user.role)
          "
          :to="`/dashboard/${$auth.user.storeName}/categories`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          الفئات
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-show="!$auth.loggedIn"
          to="/login"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          تسجيل دخول
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-show="!$auth.loggedIn"
          to="/sign-up"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          إنشاء حساب
        </nuxt-link>
      </li>
      <li
        v-if="
          $auth &&
          $auth.loggedIn &&
          $auth.user.storeName &&
          ['admin', 'owner'].includes($auth.user.role)
        "
      >
        <nuxt-link
          class="btn btn-ghost btn-sm rounded-btn"
          :to="`/dashboard/${$auth.user.storeName}`"
        >
          المتجر
        </nuxt-link>
      </li>
      <li>
        <button
          v-show="$auth.loggedIn"
          class="btn btn-danger btn-sm rounded-btn text-red-500"
          @click="$auth.logout()"
        >
          تسجيل خروج
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    links() {
      return this.$store.state.links
    },
  },
  mounted() {
    const lists = document.getElementsByTagName('li')
    if (lists) {
      Array.from(lists).forEach((li) => {
        li.addEventListener('click', this.closeSideBar)
      })
    }
  },
  methods: {
    closeSideBar() {
      const el: HTMLInputElement = document.getElementById(
        'my-drawer-3'
      ) as HTMLInputElement
      if (el) {
        el.checked = false
      }
    },
  },
})
</script>

<style scoped>
</style>
