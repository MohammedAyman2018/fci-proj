<template>
  <div class="filters-drawer">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg my-3">التصنيفات</h3>
          <label for="my-drawer-4"> <i class="ri-close-fill"></i></label>
        </div>

        <!-- Sidebar content here -->
        <li v-for="category in categories" :key="category._id">
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">{{ category.name }}</span>
              <input
                v-model="selectedCategories"
                type="checkbox"
                :value="category._id"
                class="checkbox checkbox-primary"
              />
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategories: [],
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories
    },
  },
  watch: {
    selectedCategories: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          this.$store.dispatch('categories/setSelectedCategories', val)
        }
      },
    },
  },
}
</script>

<style>
</style>
