<template>
  <ul class="menu bg-base-100 p-2 rounded-box">
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
