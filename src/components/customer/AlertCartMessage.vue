<template>
  <div>
     <!-- 測試 {{ CartNumber  }} -->
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
    vm.$bus.$on("message:push", cartNum => {
      vm.getCartNum(cartNum);
    });
    vm.getCartNum();
  }
};
</script>