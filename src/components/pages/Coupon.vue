<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-success" @click="openCoupon(true)">建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th width="200">編輯</th>
      </thead>
      <tbody>
        <tr v-for="items in coupon_code" :key="items.id">
          <td>{{items.title }}</td>
          <td>{{items.percent}}</td>
          <td>{{`${new Date(items.due_date*1000).getFullYear()}/${new Date(items.due_date*1000).getMonth()+1}/${new Date(items.due_date*1000).getDate()}`}}</td>
          <td>
            <span v-if="items.is_enabled==1" class="text-success">啟用</span>
            <!-- 產品如果為啟用 -->
            <span v-else>未啟用</span>
          </td>

          <td class="d-flex">
            <button class="btn btn-outline-primary btn-sm" @click="openCoupon(false,items)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="delModal(items)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pagination="pagination" @getPage="getCoupon"></Pagination>

    <!-- 編輯 建立 model -->
    <div
      class="modal fade"
      id="ProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>model title</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                v-model="tempProducts.title"
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon">優惠碼</label>
              <input
                v-model="tempProducts.code"
                type="text"
                class="form-control"
                id="coupon"
                placeholder="code"
              />
            </div>
            <div class="form-group">
                <div class="d-flex">
                  <label for="message-text" class="col-form-labe font-weight-bold">到期日</label>
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="message-text"
                  v-model="tempProducts.due_date"
                />
              </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input
                v-model="tempProducts.percent"
                type="text"
                class="form-control"
                id="percent"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempProducts.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-success" @click="sendCoupon( tempProducts.id)">更新優惠卷</button>
          </div>
        </div>
      </div>
    </div>

    <!--刪除Modal-->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProducts.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="readydelModal">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";

export default {
  data() {
    return {
      isNew: false,
      isLoading: false,
      pagination: {},
      tempProducts: {},
      coupon_code: [],
      coupon_percent: "",
      isLoading: false
    };
  },

  components: {
    Pagination
  },

  methods: {
    getCoupon(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.coupon_code = response.data.coupons;
        vm.pagination = response.data.pagination;
        console.log(vm.coupon_code);
      });
    },
    openCoupon(isNew, items) {
      if (isNew) {
        this.tempProducts = {};
        this.isNew = true;
      } else {
        this.tempProducts = Object.assign({}, items);
        this.isNew = false;
        //調整日期格式
        const month =
          new Date(items.due_date * 1000).getMonth() < 10
            ? "0" + (new Date(items.due_date * 1000).getMonth() + 1)
            : new Date(items.due_date * 1000).getMonth() + 1;
        const date =
          new Date(items.dut_date * 1000).getDate() < 10
            ? "0" + new Date(items.due_date * 1000).getDate()
            : new Date(items.due_date * 1000).getDate();
        this.tempProducts.due_date = `${new Date(
          items.due_date * 1000
        ).getFullYear()}-${month}-${date}`;
      }
      $("#ProductModal").modal("show");
    },

    addNewCoupon() {
      const vm = this;
      const timestamp = new Date(vm.tempProducts.due_date).getTime(); //Date 內無值的話為當前時間
      vm.tempProducts.due_date = Math.floor(timestamp / 1000); //改成API所需格式
      const postCoupon = vm.tempProducts;
      let api = `${process.env.APIPATH}/api/${process.env.PATHNAME}/admin/coupon`;
      let httpMethod = "post";
      this.$http[httpMethod](api, { data: postCoupon }).then(response => {
        $("#couponModal").modal("hide");
        this.getCoupon();
        vm.couponData = {};
      });
    },

    sendCoupon(id) {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      // console.log('API伺服器路徑:'+process.env.APIPATH,'申請的APIPath:'+process.env.CUSTOMPATH);
      const vm = this;
      const timestamp = new Date(vm.tempProducts.due_date).getTime(); //Date 內無值的話為當前時間
      vm.tempProducts.due_date = Math.floor(timestamp / 1000); //改成API所需格式
      const postCoupon = vm.couponData;
      let httpMethod = "post";
      console.log("判斷是建立新產品或編輯", vm.isNew);
      if (!vm.isNew) {
        //false變成true執行
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProducts.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProducts }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#ProductModal").modal("hide");
          vm.getCoupon();
        } else {
          $("#ProductModal").modal("hide");
          vm.getCoupon();
          console.log("新增失敗");
        }
      });
    },
    delModal(items) {
      console.log("this.tempProducts", this.tempProducts, "items", items);
      this.tempProducts = items; //將點到的地方傳入tempProducts來作為刪除的預備
      // console.log(this.tempProducts);
      $("#delProductModal").modal("show"); //打開刪除模板
    },
    readydelModal() {
      let vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempProducts.id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getCoupon(); //刪除了資料庫資料所以要重新抓取資料刷新
          console.log("成功刪除");
        } else {
          $("#delProductModal").modal("hide");
          vm.getCoupon();
          console.log("刪除失敗");
        }
      });
    }
  },
  created() {
    this.getCoupon();
  }
};
</script>