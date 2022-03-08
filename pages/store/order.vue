<template>
  <section class="container mx-auto">
    <h3 class="my-4 font-bold text-center text-xl">إتمام الطلب</h3>
    <modal name="complete-profile" scrollable height="auto">
      <div class="p-4">
        <h2 class="text-xl font-bold">برجاء إكمال حسابك قبل إنشاء الحساب</h2>

        <div class="mt-5">
          <div class="flex justify-between items-center mt-4 mb-12">
            <button
              class="btn btn-success btn-sm"
              @click="$router.push('/profile')"
            >
              إكمال
            </button>
            <button
              class="btn btn-ghost btn-sm"
              @click="closeModal('complete-profile')"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </modal>
    <ul v--if="cart && cart.length > 0">
      <li
        v-for="(product, index) in cart"
        :key="product._id"
        class="flex justify-around items-center my-4"
        dir="rtl"
      >
        <p>
          <bdi>{{ product.name }}</bdi> {{ product.price }} جنيه
        </p>

        <div>
          <p>الكمية:</p>
          <div class="flex justify-between items-center">
            <input
              :value="product.amount"
              type="number"
              step="0.5"
              min="0"
              @input="updateProductAmount(index, $event)"
            />
            <i
              class="
                ri-delete-bin-line
                cursor-pointer
                mx-2
                hover:text-red-500
                ri-2x
              "
              @click="removeFromCart(product)"
            ></i>
          </div>
        </div>
      </li>
      <hr class="my-4" />
      <li class="flex justify-around items-center">
        <p class="font-bold">المجموع</p>
        <p>{{ total }} جنيه</p>
      </li>
    </ul>
    <div class="flex justify-center mt-4">
      <button class="btn btn-primary" @click="createOrder">إتمام الطلب</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OrderPage',
  data() {
    return {
      payment: '',
    }
  },
  computed: {
    cart() {
      return this.$store.state.localStorage.cart
    },
    total() {
      let sum = 0
      this.$store.state.localStorage.cart.forEach((product) => {
        sum += Number(product.price) * Number(product.amount)
      })
      return sum
    },
  },
  methods: {
    async createOrder() {
      try {
        if (!this.$auth.user.phone || !this.$auth.user.address) {
          this.$modal.show('complete-profile')
          return
        }

        const order = {
          items: this.cart.map((prod) => {
            return {
              name: prod.name,
              amount: prod.amount,
              price: prod.price,
              img: prod.img,
            }
          }),
          user: {
            name: this.$auth.user.name,
            tel: this.$auth.user.phone,
            address: this.$auth.user.address,
            payment: this.payment,
          },
          storeName: this.$auth.user.storeName,
        }
        const res = await this.$axios.post('/orders', order)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    removeFromCart(item) {
      if (confirm('هل ترغب حقاً في حذف هذا المنتج؟')) {
        this.$store.commit('localStorage/removeFromCart', item)
      }
    },
    updateProductAmount(idx, e) {
      if (e.target.value <= 0) e.target.value = 1
      const amount = e.target.value ? e.target.value : 1
      this.$store.commit('localStorage/editAmount', { idx, amount })
    },
  },
}
</script>

<style>
</style>
