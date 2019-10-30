<template>
  <div class="message-alert">
    <div class="alert alert-dismissible d-flex justify-content-center rounded-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      <strong class="alert-txt text-dark text-center"> Added {{ item.message }} X 1</strong>
     
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span class="text-dark" style="font-size:52px;" aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 1500);
    },
  },
  created() {
    const vm = this;
   
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message.product.title, status);
      console.log(message.product.title);
    });
  
    // vm.$bus.$emit('message:push');
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  width: 100%;
  top: 0px;
  right: 0px;
  z-index: 1100;
}

.alert-txt{
  font-size: 40px;
    font-family: "Anton", sans-serif;
}
</style>