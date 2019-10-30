<template>
  <div>
     {{ CartNumber }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      CartNumber:""
    };
  },
  methods: {
    getCartNum(cartNum) {
        console.log(cartNum);
      this.CartNumber = cartNum;
    }
  },
  created() {
    const vm = this;
    vm.$bus.$on("cartnum:push", cartNum => {
      vm.getCartNum(cartNum);
    });
    vm.getCartNum();//測試用
  }
};
</script>