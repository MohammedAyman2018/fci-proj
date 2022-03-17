<template>
  <div class="filters-drawer">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay"></label>

      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <div class="flex justify-end items-center">
          <label for="my-drawer-4"> <i class="ri-close-fill"></i></label>
        </div>

        <!-- <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">ابحث عن منتج بالاسم</span>
          </label>
          <input
            v-model="search"
            type="search"
            placeholder="اكتب ثلاث حروف على الأقل"
            class="input input-bordered w-full max-w-xs"
            @input="$store.commit('products/filterByName', search)"
          />
        </div> -->
        <!-- show with categories -->
        <div tabindex="0" class="collapse collapse-plus">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">التصنيفات</div>
          <div class="collapse-content">
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
          </div>
        </div>
        <!-- sort products -->
        <div tabindex="0" class="collapse collapse-plus">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">ترتيب</div>
          <div class="collapse-content">
            <!-- Sidebar content here -->
            <li v-for="sort in sorting" :key="sort.name">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">{{ sort.name }}</span>
                  <input
                    type="radio"
                    name="sort"
                    class="radio checked:bg-red-500"
                    @change="
                      $store.commit('products/sortProducts', sort.srotName)
                    "
                  />
                </label>
              </div>
            </li>
          </div>
        </div>
        <!-- Filter with store -->
        <div tabindex="0" class="collapse collapse-plus">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">المتجر</div>
          <div class="collapse-content">
            <!-- Sidebar content here -->
            <li>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">الكل</span>
                  <input
                    type="radio"
                    name="sort"
                    class="radio checked:bg-red-500"
                    @change="$store.commit('products/filterByStore', 'all')"
                  />
                </label>
              </div>
            </li>
            <li v-for="store in stores" :key="store._id">
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">{{ store.title }}</span>
                  <input
                    type="radio"
                    name="sort"
                    class="radio checked:bg-red-500"
                    @change="
                      $store.commit('products/filterByStore', store.title)
                    "
                  />
                </label>
              </div>
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategories: [],
      sorting: [
        { name: 'من الأقل سعراً للأعلى', srotName: 'priceFromLowToHigh' },
        { name: 'من الأعلى سعراً للأقل', srotName: 'priceFromHighToLow' },
        { name: 'من الأقل تقييماً للأعلى', srotName: 'rateFromLowToHigh' },
        { name: 'من الأعلى تقييماً للأقل', srotName: 'rateFromHighToLow' },
      ],
      search: '',
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories
    },
    stores() {
      return this.$store.state.stores.stores
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
  async mounted() {
    await this.$store.dispatch('stores/getStores')
  },
}
</script>

<style></style>
