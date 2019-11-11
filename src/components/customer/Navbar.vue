<template>
  <div>
    <div class="Screen-modal" @click="scrollClose"></div>
    <loading :active.sync="isLoading"></loading>

    <nav class="navbar navbar-expand-md navbar-light">
      <a href="#" class="side_icon d-md-none d-sm-block" @click.prevent="siderOpen">
        <span></span>
        <span></span>
        <span></span>
      </a>
      <router-link to="/home">
        <a class href="#">
          <img class="d-none d-md-inline-block" src="../../../static/images/TagLogo.png" />
          <img
            class="d-inline-block d-md-none"
            src="../../../static/images/TagLogo.png"
            style="width: 60px"
            height="40px"
          />
        </a>
      </router-link>
      <!-- 手機管理 -->
      <div class="d-md-none">
        <a @click.prevent="managerurl" class="nav-link text-dark order-md-1" href="#">
          <i
            aria-hidden="true"
            class="fas fa-user-cog align-baseline text-white"
            style="font-size: 26px;"
          ></i>
        </a>
      </div>

      <div class="collapse navbar-collapse d-none d-md-block" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link style="text-decoration:none" to="/home">
              <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">Home</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link style="text-decoration:none" to="/store/allproduct">
              <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">PRODUCTS</a>
            </router-link>
          </li>
          <li class="nav-item">
            <a
              @click="managerurl"
              class="nav-item nav-link text-white mr-5 font-weight-bold d-sm-block d-md-none"
            >
              <i
                class="fas fa-user-cog align-baseline text-white"
                aria-hidden="true"
                style="font-size:26px"
              ></i>
            </a>
          </li>
        </ul>

        <ul class="navbar-nav cartbrowser ml-auto">
          <li class="nav-item d-flex">
            <!-- 網頁購物車 -->
            <div style="positon:relative">
              <a @click.prevent="getCartScreen" class="nav-link text-dark order-md-1 mr-5" href="#">
                <i
                  class="fa fa-shopping-bag align-baseline text-white"
                  aria-hidden="true"
                  style="font-size:26px"
                ></i>
                <span
                  class="badge badge-pill badge-danger"
                  style="position:absolute; left:25px; top:7px; font-size:10px;"
                >
                  <AlertCart />
                </span>
              </a>
            </div>
            <a
              class="nav-link text-dark order-md-2"
              @click.prevent="managerurl"
              style="cursor:pointer"
            >
              <i
                class="fas fa-user-cog align-baseline text-white"
                aria-hidden="true"
                style="font-size:26px"
              ></i>
            </a>
          </li>
        </ul>
        <div class="cart-modal" @click="removeScreen"></div>
      </div>
    </nav>

    <div class="site_header">
      <div class="container">
        <div class="row">
          <div class="top_side col-12">
            <div class="d-flex justify-content-center align-items-center py-4">
              <P>FERR DISCOUNT CODE FOR <strong class="text-success">Tom1111</strong> </P>
            </div>
          </div>
          <div class="left_side col-6">
            <div class="d-flex justify-content-center align-items-center">
              <router-link to="/home">
                <a href="#">HOME</a>
              </router-link>
            </div>
          </div>
          <div class="right_side col-6">
            <div class="d-flex justify-content-center align-items-center">
              <router-link to="/store/allproduct">
                <a href="#">PRODUCTS</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import AlertCart from "./AlertCartMessage";
import $ from "jquery";
export default {
  components: {
    AlertCart
  },
  data() {
    return {
      isLoading: false,
      cartProduct: [],
      cartLength: "",
      cartTotal: ""
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.cartProduct = response.data.data.carts;
        vm.cartTotal = response.data.data.total;
        console.log(response.data.data);
        vm.$bus.$emit("cartnum:push", response.data.data.carts.length);
        vm.$bus.$emit("cartfinish:push", response.data.data.carts);
      });
    },

    getCartScreen() {
      const vm = this;
      $(".cart-modal").addClass("cart-modal-open");
      $("body").addClass("scrollClose");
      $(".side_icon").toggleClass("animated");
      $(".wrap").toggleClass("active");
      $(".aside").toggleClass("active");
      $(".Screen-modal").toggleClass("cart-modal-open");
      vm.getProduct();
    },

    removeScreen() {
      $(".cart-modal").removeClass("cart-modal-open");
      $("body").removeClass("scrollClose");
      $(".side_icon").toggleClass("animated");
      $(".wrap").toggleClass("active");
      $(".aside").toggleClass("active");
      $(".Screen-modal").toggleClass("cart-modal-open");
    },

    managerurl() {
      this.$router.push("/dashboard");
    },

    siderOpen() {
      $(".side_icon").toggleClass("animated");
      $(".wrap").toggleClass("active");
      $(".aside").toggleClass("active");
      $(".Screen-modal").toggleClass("cart-modal-open");
    },
    scrollClose() {
      $(".Screen-modal").toggleClass("cart-modal-open");
      $(".wrap").removeClass("active");
      $(".aside").removeClass("active");
      $(".side_icon").removeClass("animated");
    }
  },
  created() {
    this.getProduct();
  }
};
</script>


<style lang="scss">
$side-header:#ececec;


.scrollClose {
  overflow-y: hidden;
}

.cart-modal-open {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100 !important;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.navbar {
  background-color: rgb(10, 8, 10);
  border-bottom: 1px solid $side-header;
  // position: fixed;
  width: 100%;
  z-index: 999;
}

.navbar-nav li a {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  transform: translateY(0px);
  transition: 0.35s;
}

.navbar-nav li a:hover {
  transform: translateY(-5px);
}

.site_header {
  background-color: rgba(236, 236, 236, 0.6);
  border-left: 1px solid $side-header;
  border-right: 1px solid $side-header;
  border-bottom: 1px solid$side-header;
  // padding-top: 76px;
  p {
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    color: rgba(10, 8, 10, 0.9);
    margin-bottom: 0;
    margin-top: 6px;
  }
  .right_side {
    border-left: 1.5px solid $side-header;
    padding: 0;
  }
}

.site_header .right_side a,
.site_header .left_side a {
  text-decoration: none;
  color: rgb(129, 129, 129);
  font-family: "Anton", sans-serif;
  font-weight: bold;
  font-size: 21px;
  letter-spacing: 1.5px;
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: black;
  }
}

@media (max-width: 767px) {
  .cartbrowser {
    display: none;
  }
  .site_header .top_side {
    display: none;
  }
}

@media (min-width: 768px) {
  .site_header .right_side,
  .site_header .left_side {
    display: none;
  }
}

.side_icon {
  display: block;
  position: relative;
  width: 48px;
  height: 48px;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.side_icon > span {
  display: block;
  width: 32px;
  height: 1.5px;
  background-color: white;
  position: absolute;
  opacity: 1;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  transition: all 0.3s;
}

/*第一條線*/
.side_icon > span:nth-child(1) {
  transform: translateY(-10px);
}

/*最下面線*/
.side_icon > span:nth-child(3) {
  transform: translateY(10px);
}

/*JQ動態加入*/
.side_icon.animated > span:nth-child(1) {
  transform: rotate(220deg);
}
.side_icon.animated > span:nth-child(2) {
  opacity: 0;
}
.side_icon.animated > span:nth-child(3) {
  transform: rotate(-220deg);
}
</style>