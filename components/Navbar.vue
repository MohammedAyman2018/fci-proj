<template>
  <div class="navbar shadow-lg bg-neutral text-neutral-content">
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold"> لوجو </span>
    </div>
    <div class="flex-none hidden px-2 mx-2 lg:flex">
      <div class="flex items-stretch">
        <nuxt-link to="/" class="btn btn-ghost btn-sm rounded-btn">
          الرئيسية
        </nuxt-link>
        <nuxt-link
          v-if="$auth && $auth.loggedIn"
          to="/profile"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          {{ $auth.user.name }}
        </nuxt-link>
        <nuxt-link
          v-if="$auth && $auth.loggedIn"
          to="/new-store"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          انشئ متجرك
        </nuxt-link>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            $auth.user.role === 'admin'
          "
          :to="`/dashboard/${$auth.user.name}/users`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          العملاء
        </nuxt-link>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            $auth.user.role === 'admin'
          "
          :to="`/dashboard/stores`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          المتاجر
        </nuxt-link>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            $auth.user.role === 'admin'
          "
          :to="`/dashboard/${$auth.user.name}/products`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          المنتجات
        </nuxt-link>
        <nuxt-link
          v-if="
            $auth &&
            $auth.loggedIn &&
            $auth.user.storeName &&
            $auth.user.role === 'admin'
          "
          :to="`/dashboard/${$auth.user.name}/categories`"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          الفئات
        </nuxt-link>
        <nuxt-link
          v-show="!$auth.loggedIn"
          to="/login"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          تسجيل دخول
        </nuxt-link>
        <nuxt-link
          v-show="!$auth.loggedIn"
          to="/sign-up"
          class="btn btn-ghost btn-sm rounded-btn"
        >
          إنشاء حساب
        </nuxt-link>
        <button
          v-show="$auth.loggedIn"
          class="btn btn-danger btn-sm rounded-btn text-red-500"
          @click="$auth.logout()"
        >
          تسجيل خروج
        </button>
      </div>
    </div>
    <div class="flex-none">
      <label for="my-drawer-3" class="btn btn-square btn-ghost">
        <i class="ri-menu-line"></i>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style scoped>
</style>
