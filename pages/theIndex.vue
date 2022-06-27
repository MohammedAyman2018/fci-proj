<template>
  <div>
    <!-- Hero del producto -->
    <section id="colored-dna-back" class="hero is-white is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered reverse-columns">
            <div
              class="column is-10-mobile is-10-tablet is-5-desktop is-5-widescreen is-5-fullhd"
              data-aos="fade-down"
            >
              <h1 class="title titled is-1 mb-6">
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
                <b-button tag="router-link" to="/new-store" class="button"
                  >انضم لمتاجرنا</b-button
                >
              </div>
            </div>
            <div
              data-aos="fade-right"
              class="column is-10-mobile is-10-tablet is-4-desktop is-7-widescreen is-4-fullhd is-offset-1-fullhd"
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
          <div class="columns is-vcentered">
            <div
              data-aos="fade-left"
              class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
            >
              <figure class="image is-square">
                <img src="@/assets/drive_thru_2.jpg" />
              </figure>
            </div>
            <div
              data-aos="fade-down"
              class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
            >
              <h1 class="titled title is-1 mb-6">هنساعدك تنقل شغلك على النت</h1>
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
          <div class="columns is-vcentered reverse-columns">
            <div
              data-aos="fade-right"
              class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-5-desktop is-offset-1-desktop is-5-widescreen is-offset-1-widescreen is-5-fullhd is-offset-1-fullhd"
            >
              <h1 class="title titled is-1 mb-6">
                absurd illustrations that make sense
              </h1>
              <h2 class="subtitle subtitled">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laborum cupiditate dolorum vitae dolores nesciunt totam magni
                quas.
              </h2>
            </div>
            <div
              data-aos="fade-down"
              class="column is-10-mobile is-offset-1-mobile is-10-tablet is-offset-1-tablet is-4-desktop is-offset-1-desktop is-4-widescreen is-offset-1-widescreen is-4-fullhd is-offset-1-fullhd"
            >
              <!-- data-aos="fade-up" -->
              <figure class="image is-square">
                <img src="http://placehold.jp/150x150.png" />
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
              <h1 class="title titled is-1 mb-6">
                Primary bold title <span id="typewriter"></span>
              </h1>
              <h2 class="subtitle subtitled">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Laborum cupiditate dolorum vitae dolores nesciunt totam magni
                quas. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'الرئيسية',
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/aos@next/dist/aos.css' },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/TypewriterJS/2.13.1/core.min.js',
        },
        { src: 'https://unpkg.com/aos@next/dist/aos.js' },
      ],
    }
  },
  mounted() {
    // eslint-disable-next-line no-new
    new Typewriter('#typewriter', {
      strings: ['typewriter', 'Effect', 'typewriter.js', 'example'],
      autoStart: true,
      loop: true,
    })
    AOS.init({
      once: true,
    })
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
</style>
