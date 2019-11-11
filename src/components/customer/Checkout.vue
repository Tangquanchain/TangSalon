<template>
  <div>
    <div class="wrap">
      <Aside />
      <Navbar />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import Aside from "./Aside";
import Footer from "./Footer";
import $ from "jquery";
export default {
  components: {
    Navbar,
    Aside,
    Footer
  },
};
</script>

<style lang="scss">
.wrap {
  transition: transform 0.3s;
  position: relative;
}

.wrap.active {
  transform: translateX(450px);
}
</style>