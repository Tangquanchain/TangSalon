<template>
  <div>
    <div class="wrap" @click="scrollClose">
      <Alert/>
      <Aside/>
      <Navbar/>
      <router-view></router-view>
      <Footer/>
    </div>
  </div>
</template>



<script>
import Navbar from "./Navbar";
import Aside from './Aside';
import Footer from './Footer';
import Alert from './AlertMessage'
export default {
  components: {
    Alert,
    Navbar,
    Aside,
    Footer
  },
  methods: {
    scrollClose(){
           $(".wrap").removeClass("active");
      $(".aside").removeClass("active");
    }
  },
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