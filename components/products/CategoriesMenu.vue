<template>
  <div>
    <b-sidebar
      :open.sync="open"
      type="is-light"
      mobile="fullwidth"
      fullheight
      overlay
      right
      @close="$emit('close')"
    >
      <div class="p-1">
        <b-menu :activable="false">
          <b-menu-list label="الفلاتر">
            <!-- Categories -->
            <b-menu-item>
              <template #label="props">
                التصنيفات
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>
              <b-menu-item v-for="category in categories" :key="category._id">
                <template #label>
                  <b-field>
                    <b-checkbox
                      v-model="selectedCategories"
                      :native-value="category._id"
                      >{{ category.name }}</b-checkbox
                    >
                  </b-field>
                </template>
              </b-menu-item>
            </b-menu-item>
            <!-- Sort -->
            <b-menu-item>
              <template #label="props">
                ترتيب
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>
              <b-menu-item v-for="sort in sorting" :key="sort.name">
                <template #label>
                  <b-field>
                    <b-radio
                      v-model="sortList"
                      :native-value="sort.srotName"
                      @input="
                        $store.commit('products/sortProducts', sort.srotName)
                      "
                      >{{ sort.name }}</b-radio
                    >
                  </b-field>
                </template>
              </b-menu-item>
            </b-menu-item>
            <!-- Sort -->
            <b-menu-item>
              <template #label="props">
                المتجر
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'"
                ></b-icon>
              </template>
              <b-menu-item>
                <template #label>
                  <b-field>
                    <b-radio
                      v-model="storeList"
                      native-value="all"
                      @input="$store.commit('products/filterByStore', 'all')"
                      >الكل</b-radio
                    >
                  </b-field>
                </template>
              </b-menu-item>
              <b-menu-item v-for="store in stores" :key="store._id">
                <template #label>
                  <b-field>
                    <b-radio
                      v-model="storeList"
                      :native-value="store.title"
                      @input="
                        $store.commit('products/filterByStore', store.title)
                      "
                      >{{ store.title }}</b-radio
                    >
                  </b-field>
                </template>
              </b-menu-item>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: {
    openSidebar: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      open: false,
      storeList: [],
      sortList: [],
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
    openSidebar(val) {
      this.open = val
    },
  },
  async mounted() {
    await this.$store.dispatch('stores/getStores')
  },
}
</script>

<style></style>
