<template>
  <div>
    <div class="aside">
      <loading :active.sync="isLoading"></loading>
      <div class="aside_title d-flex justify-content-center align-items-center text-center">
        <p class="mb-0 mr-1">CART LIST</p>
        <span class="badge badge-pill badge-danger">
          <AlertCart/>
        </span>
      </div>
      <table class="table table-sm mr-5">
        <tbody v-if="cartProduct">
          <tr v-if=" cartProduct == ''">
            <td class="text-center p-3" colspan="5">
              <p class="cartProduct_txt mb-0">CART IS EMPTY.</p>
              <button @click="goshop" class="btn btn-size btn-lg">GO SHOP</button>
            </td>
          </tr>
          <tr v-for="items in cartProduct" :key="items.id">
            <td class="align-middle text-center p-3">
              <div
                :style="`width:100px; height:100px; background: url(${items.product.imageUrl}) center / cover no-repeat;`"
              ></div>
            </td>
            <td class="align-middle">
              <p class="cartProduct_txt mb-0">{{items.product.title}}</p>
            </td>
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
            <td class="text-left pl-3" colspan="2">
              <p class="cartProduct_txt mb-0">TOTAL</p>
            </td>
            <td class="text-right pr-4" colspan="3">
              <p class="cartProduct_txt mb-0">{{ cartTotal | currency }} TW</p>
            </td>
          </tr>
        </tfoot>
      </table>
      <a
        href="#"
        class="btn btn-primary btn-block mt-2"
        style="border-radius:20px"
        @click.prevent="checkout"
      >
        <p class="cartProduct_txt mb-0">CHECKOUT</p>
      </a>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import AlertCart from "./AlertCartMessage";
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
      });
    },

    removeCart(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.delete(api).then(() => {
        vm.isLoading = false;
        vm.getProduct();
      });
    },

    goshop() {
      this.$router.push("/store/allproduct");
    },

    managerurl() {
      this.$router.push("/dashboard");
    },

    checkout() {
      this.$router.push("/checkout/cart");
      $("body").removeClass("scrollClose");
    }
  },

  created() {
    const vm = this;
    vm.$bus.$on("cart:push", () => {
      vm.getProduct();
    });
    vm.$bus.$on("cartfinish:push", () => {
      vm.getProduct();
    });
    this.getProduct();
  }
};
</script>

<style lang="scss">
$black:#000;
$side-white:rgba(241, 238, 238, 0.6);

body {
  overflow-x: hidden;
}

.aside {
  position: absolute;
  overflow: hidden;
  background-color: $side-white;
  width: 450px;
  height: 100vh;
  border-right: 1px solid $side-white;
  transform: translateX(-450px);
  transition: transform 0.3s;
  &.active {
    transform: translateX(-450px);
    overflow-y: scroll;
  }
}

.aside_title {
  margin-top: 30px;
  font-family: "Open Sans", sans-serif;
  padding-bottom: 28px;
  border-bottom: 1px solid $side-white;
}

.cartProduct_txt {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
}

.btn-size {
  border: 1px solid $black;
  margin: 7px 0px;
  border-radius: 0;
  outline: none;
  &:hover {
    background-color: $black;
    color: rgba(251, 251, 251, 0.8);
  }
}

.btn-block {
  width: 95%;
  margin: auto;
}
</style>