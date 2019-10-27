<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-md navbar-light stick-top">
      <!-- <button
        class="navbar-toggler d-lg-none text-white"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="navbar-toggler-icon"></i>
      </button>-->

      <a href="#" class="side_icon d-md-none d-sm-block" @click.prevent="siderOpen">
        <span></span>
        <span></span>
        <span></span>
      </a>

      <a class href="#">
        <img class="d-none d-md-inline-block" src="../../../static/images/TagLogo.png" />
        <img
          class="d-inline-block d-md-none"
          src="../../../static/images/TagLogo.png"
          style="width: 60px"
          height="40px"
        />
      </a>

      <!-- 手機購物車 -->
      <!-- <div class="dropdown" style="positon:relative">
        <a
          class="cartphone nav-link text-white order-md-1 d-sm-block d-md-none"
          data-toggle="dropdown"
          data-flip="false"
          href="#"
        >
          <i class="fa fa-shopping-bag fa-2x align-baseline" aria-hidden="true"></i>
          <span
            class="badge badge-pill badge-danger"
            style="position:absolute; left:42px; top:12px; font-size:10px;"
          >9</span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                    data-title="刪除 金牌西裝 1 件"
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">金牌西裝</td>
                <td class="align-middle">1 件</td>
                <td class="align-middle text-right">$520</td>
              </tr>
              <tr>
                <td class="align-middle text-center">
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                    data-title="刪除 金牌女裝 1 件"
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">金牌女裝</td>
                <td class="align-middle">1 件</td>
                <td class="align-middle text-right">$480</td>
              </tr>
            </tbody>
          </table>
          <a href="shoppingCart-checkout.html" class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>
      </div> -->

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-item nav-link text-white mr-5 font-weight-bold" href="#">Others</a>
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
            <div class="dropdown" style="positon:relative">
              <a
                @click="getProduct"
                class="nav-link text-dark order-md-1 mr-5"
                href="#"
                data-toggle="dropdown"
                data-flip="false"
              >
                <i
                  class="fa fa-shopping-bag align-baseline text-white"
                  aria-hidden="true"
                  style="font-size:26px"
                ></i>
                <span
                  class="badge badge-pill badge-danger"
                  style="position:absolute; left:25px; top:7px; font-size:10px;"
                > {{cartLength}} </span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right p-3 h-100vh"
                style="min-width: 450px"
                data-offset="400"
              >
                <h6>已選擇商品</h6>
                <table class="table table-sm">
                  <tbody v-if= "cartProduct">
                    <tr v-for="items in cartProduct" :key="items.id">
                      <td class="align-middle text-center">
                       <div :style="`width:100px; height:100px; background: url(${items.product.imageUrl}) center / cover no-repeat;`"></div>
                      </td>
                      <td class="align-middle">{{items.product.title}}</td>
                      <td class="align-middle">X{{items.qty}}</td>
                      <td class="align-middle text-right">{{items.product.origin_price | currency }} TW</td>
                      <td class="align-middle">
                        <button class="btn" type="button" @click="removeCart(items.id)">
                          <i class="fa fa-trash-alt" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td class="text-left" colspan="2">TOTAL</td>
                      <td class="text-right" colspan="3">{{ cartTotal | currency }} TW</td>
                       
                    </tr>
                  </tfoot>
                </table>
                <a href="shoppingCart-checkout.html" class="btn btn-primary btn-block">
                  <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
                </a>
              </div>
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
      </div>
    </nav>

    <div class="site_header">
      <div class="container">
        <div class="row">
          <div class="top_side col-12">
            <div class="d-flex justify-content-center align-items-center py-2">
              <P>FERR SHIPPING WHEN YOU BUY MORE THEN $899 TW</P>
            </div>
          </div>
          <div class="left_side col-6">
            <div class="d-flex justify-content-center align-items-center">
              <a href>MENS PRODUCT</a>
            </div>
          </div>
          <div class="right_side col-6">
            <div class="d-flex justify-content-center align-items-center">
              <div>
                <a href>WOMENS PRODUCT</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import $ from "jquery";

export default {
  data() {
    return {
      isLoading: false,
      cartProduct:[],
      cartLength:"",
      cartTotal:"",
    }
  },
  methods: {
    getProduct(){
           const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
           const vm = this;
           this.$http.get(api).then( response => {
             vm.cartProduct = response.data.data.carts;
             vm.cartTotal = response.data.data.total;
                console.log(response.data.data);
             vm.cartLength = (response.data.data.carts).length;
             console.log(vm.cartLength);
           })
    },

    removeCart(id){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(api).then( () => {
            vm.isLoading = false;
            vm.getProduct();
            })
    },

    managerurl() {
      this.$router.push("/dashboard");
    },

    siderOpen() {
      $(".side_icon").toggleClass("animated");
      $(".wrap").toggleClass("active");
      $(".aside").toggleClass("active");
    }
  },
  created() {
    this.getProduct();
  },
};
</script>


<style lang="scss">
.navbar {
  background-color: rgb(10, 8, 10);
  border-bottom: 1px solid#ececec;
  position: fixed;
  width: 100%;
  z-index: 999;
}

.navbar-nav li a,
.cartphone {
  font-family: "Open Sans", sans-serif;
  font-size: 20px;
  transform: translateY(0px);
  transition: 0.35s;
}

.navbar-nav li a:hover,
.cartphone:hover {
  transform: translateY(-5px);
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

.site_header {
  background-color: rgba(236, 236, 236, 0.6);
  border-left: 1px solid #ececec;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid#ececec;
  padding-top: 76px;
  p {
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    color: rgba(10, 8, 10, 0.9);
    margin-bottom: 0;
    margin-top: 6px;
  }
  .right_side {
    border-left: 1.5px solid #ececec;
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
    color: rgb(0, 0, 0);
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