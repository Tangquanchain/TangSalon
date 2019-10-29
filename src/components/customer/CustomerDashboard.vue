<template>
  <div>
    <div class="wrap">
      <AlertCart/>
      <Aside/>
      <Navbar/>
      <Homeheader/>
      <Footer/>
    </div>
  </div>
</template>



<script>
import Navbar from "./Navbar";
import Aside from './Aside';
import Homeheader from './Homeheader';
import Footer from './Footer';
import AlertCart from './AlertCartMessage'
export default {
  components: {
    AlertCart,
    Navbar,
    Aside,
    Homeheader,
    Footer
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");

.wrap {
  transition: transform 0.3s;
  position: relative;
}

.wrap.active {
  transform: translateX(220px);
}



</style>