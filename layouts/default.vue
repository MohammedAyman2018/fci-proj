<template>
  <div>
    <div>
      <div class="shadow drawer h-screen">
        <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <client-only>
            <Navbar />
          </client-only>
          <Nuxt />
          <!-- <main-footer /> -->
          <notifications group="foo" position="top right" />
        </div>
        <client-only>
          <side-bar />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
export default {}
</script>
