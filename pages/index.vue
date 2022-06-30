<template>
  <div>
    <!-- Hero del producto -->
    <section id="colored-dna-back" class="hero is-white is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div
            class="columns is-multiline is-centered is-vcentered reverse-columns"
          >
            <div
              class="column is-10-touch is-5-desktop is-5-widescreen is-5-fullhd"
            >
              <h1 data-aos="fade-down" class="title is-size-3-tablet is-1 mb-6">
                السوق الإلكتروني لأصحاب الأعمال الصغيرة
              </h1>
              <div class="buttons">
                <b-button
                  tag="router-link"
                  to="/store/products"
                  class="button is-yellow"
                >
                  تصفح المنتجات
                </b-button>
                <b-button
                  v-if="
                    !$auth.loggedIn ||
                    ($auth.loggedIn &&
                      !['owner', 'admin'].includes($auth.user.role))
                  "
                  tag="router-link"
                  to="/new-store"
                  class="button"
                  >انضم لمتاجرنا</b-button
                >
              </div>
            </div>
            <!-- data-aos="fade-top" -->
            <div
              class="column is-5-touch is-4-desktop is-7-widescreen is-4-fullhd is-offset-1-fullhd"
            >
              <figure class="image is-square">
                <img style="object-fit: cover" src="@/assets/story_2.jpg" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-white is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-multiline is-centered is-vcentered">
            <div
              data-aos="fade-bottom"
              class="column is-7-mobile is-5-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
            >
              <figure class="image is-square">
                <img src="@/assets/drive_thru_2.jpg" />
              </figure>
            </div>
            <div
              data-aos="fade-down"
              class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
            >
              <h1 class="is-size-3-tablet is-size-2-desktop title is-1 mb-6">
                هنساعدك تنقل شغلك على النت
              </h1>
              <h2 class="subtitled subtitle">
                مع السوق الإلكتروني انسى استغلال التجار واختار بين كل الاسعار
                اللي في السوق
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-white is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div
            class="columns is-multiline is-centered is-vcentered reverse-columns"
          >
            <div
              data-aos="fade-top"
              class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
            >
              <h1 class="title is-size-3-tablet is-size-2-desktop is-1 mb-6">
                كل اللي عليك تحط منتجاتك
              </h1>
              <h2 class="subtitle subtitled">
                سهولة الاستخدام ودعم متواصل بس عشان نساعدك توصل لجمهور اكبر
                وتبيع اكتر
              </h2>
            </div>
            <div
              data-aos="fade-down"
              class="column is-7-mobile is-5-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
            >
              <!-- data-aos="fade-up" -->
              <figure class="image is-square">
                <img src="@/assets/supermarket.jpg" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="hero is-medium has-text-centered">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div data-aos="zoom-in-up" class="column is-8">
              <h1 class="title is-size-3 is-1 mb-6">
                السوق الالكتروني خاص ب <span id="typewriter"></span>
              </h1>
              <h2 class="subtitle subtitled">
                بكل بساطة مهمتنا اننا نشيل احتكار التجار وده عن طريق اننا نوصلك
                بالعميل مبارشرة
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      full-screen
      :can-cancel="false"
      custom-class="force-overflow"
    >
      <template #default="props">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">أختر اهتماماتك</p>
          </header>
          <div class="my-2 columns is-multiline">
            <b-field
              v-for="cat in categories"
              :key="cat._id"
              v-model="intersts"
              class="column is-2-mobile is-4-tablet"
            >
              <b-checkbox>{{ cat.name }}</b-checkbox>
            </b-field>
          </div>

          <footer class="modal-card-foot">
            <b-button label="ليس الآن" @click="props.close()" />
            <b-button label="تم" type="is-primary" @click="editUser" />
          </footer>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      intersts: [],
      isComponentModalActive: false,
    }
  },
  head() {
    return {
      title: 'الرئيسية',
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories
    },
  },
  async mounted() {
    try {
      await this.$store.dispatch('categories/getCategories')
    } catch (error) {
      this.$store.dispatch('showToast', {
        message: error,
        type: 'danger',
      })
    }
    this.$nextTick(() => {
      // eslint-disable-next-line no-new
      new Typewriter('#typewriter', {
        strings: [
          'السوبر ماركت',
          'المشاريع الصغيرة',
          'الخدمات المنزلية',
          'تجار القطاعي والجملة',
        ],
        autoStart: true,
        loop: true,
      })
      AOS.init({
        once: true,
      })
    })
  },
  methods: {
    removeFromIntersts(id) {
      const idx = this.intersts.indexOf(id)
      if (idx !== -1) {
        this.intersts.splice(idx, 1)
      }
    },
    async editUser() {
      try {
        await this.$axios.$patch(`/users/${this.$auth.user._id}`, {
          intersts: this.intersts,
        })
        await this.$auth.fetchUser()
        await this.$auth.refreshTokens()
        // this.$modal.
        this.$store.dispatch('showToast', {
          message: 'تم التعديل بنجاح',
          type: 'success',
        })
        this.isComponentModalActive = false
      } catch (error) {
        this.$store.dispatch('showToast', { message: error, type: 'error' })
      }
    },
  },
}
</script>

<style>
@media (max-width: 500px) {
  .reverse-columns {
    flex-direction: column-reverse;
    display: flex;
  }
}

.titled {
  /* font-family: 'Merriweather', serif !important; */
  font-size: 58px !important;
  font-weight: 400 !important;
  line-height: 64px !important;
}

.subtitled {
  /* font-family: 'Merriweather', serif !important; */
  font-size: 22px !important;
  font-weight: 400 !important;
  line-height: 36px !important;
}
#colored-dna-back {
  background: url(~assets/shopping-bag-package-banner-sign-symbol-shopping-concept-orange-background-3d-rendering.jpg);
  background-position: center;
  background-size: cover;
  background-color: #212931;
}

.category-modal-card {
  border: 1px solid #000;
  border-radius: 10px;
  padding: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.category-modal-card.choosed {
  background: green;
}
</style>
