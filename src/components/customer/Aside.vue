<template>
  <div>
    <div class="aside">
      <div class="aside_title d-flex justify-content-center align-items-center text-center">
        <p class="mb-0">MENU</p>
      </div>
      <div class="aside_menu d-flex justify-content-center align-items-center text-center">
        <ul class="list-unstyled">
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#">ALL PRODUCTS</a>
          </li>
          <li>
            <a href="#">HOT PRODUCTS</a>
          </li>
          <li>
            <a @click="managerurl">
              <i class="fas fa-user-cog" aria-hidden="true"></i>
            </a>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    managerurl() {
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style lang="scss">
.aside {
  position: absolute;
  background-color: rgba(241, 238, 238, 0.6);
  width: 220px;
  height: 100%;
  overflow: hidden;
  border-right: 1px solid rgba(241, 238, 238, 0.6);
  transform: translateX(-220px);
  transition: transform 0.3s;
  &.active {
    transform: translateX(-220px);
  }
}

.aside_title {
  margin-top: 30px;

  a {
    text-decoration: none;
    color: rgba(112, 112, 112, 0.5);
    font-family: "Open Sans", sans-serif;
    font-size: 15px;
  }
}

.aside_menu {
  margin-top: 23px;
  border-top: 1px solid rgba(212, 210, 210, 0.6);
  li {
    margin: 15px 0;
    display: block;
    width: 219px;
    position: relative;
    a {
      text-decoration: none;
      font-family: "Open Sans", sans-serif;
      font-size: 10px;
      color: rgba(0, 0, 0, 0.9);
    }
  }
}

.aside_menu li::before {
  position: absolute;
  content: "";
  border-bottom: 1px solid rgb(42, 42, 42);
  height: 25px;
  right: 50%;
  left: 50%;
  transition: all 0.35s;
}

.aside_menu li:hover::before {
  right: 1.5em;
  left: 1.5em;
  cursor: pointer;
}
</style>