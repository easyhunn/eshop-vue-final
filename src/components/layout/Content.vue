<template>
  <div id="content">
    <div class="content-header">
      <button class="item" @click="this.addStore">
        <div class="d-icon icon-plus-white"></div>
        <div class="item-content">Thêm mới</div>
      </button>
      <button
        :disabled="noContent"
        ref="duplicateStore"
        class="item "
        @click="this.duplicateStore"
      >
        <div class="d-icon icon-duplicate"></div>
        <div class="item-content">Nhân bản</div>
      </button>
      <button
        :disabled="noContent"
        ref="updateStore"
        class="item"
        @click="this.updateStore"
      >
        <div class="d-icon icon-edit"></div>
        <div class="item-content">Sửa</div>
      </button>
      <button
        :disabled="noContent"
        ref="deleteStore"
        class="item"
        @click="this.toggleAlertDelete"
      >
        <div class="d-icon icon-delete"></div>
        <div class="item-content">Xoá</div>
      </button>
      <button :disabled="disabledReload" class="item" @click="this.reloadAll">
        <div class="d-icon icon-reload-white"></div>
        <div class="item-content">Nạp</div>
      </button>
    </div>
    <div class="table">
      <Table
        ref="table"
        v-on:reloadSuccess="reloadSuccess"
        v-on:startReload="showPreload"
        v-on:startFilter="startFilter"
      />
    </div>
    <div class="footer">
      <div class="pagging">
        <div class="pagging-left">
          <button
            v-on:click="firstPage"
            :disabled="disablePrevPage"
            ref="firstPage"
            class="d-icon icon-double-prepage"
          ></button>
          <button
            ref="prevPage"
            :disabled="disablePrevPage"
            v-on:click="prevPage"
            class="d-icon icon-prepage "
          ></button>
          <div style="padding: 0 4px">Trang</div>
          <input type="text" v-model="currentPage" @keydown.13="changePage()" />
          <div style="padding: 0 10px 0 4px">Trên {{ totalPage }}</div>
          <button
            :disabled="disableNextPage"
            ref="nextPage"
            v-on:click="nextPage"
            class="d-icon icon-nextpage"
          ></button>
          <button
            v-on:click="lastPage"
            :disabled="disableNextPage"
            ref="lastPage"
            class="d-icon icon-double-nextpage"
          ></button>
          <button class="d-icon icon-reload" v-on:click="reload()"></button>
          <select v-model="pageSize" name="" id="">
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <dir class="pagging-right">
          Hiển thị
          {{ startPosition + availableStore > 0 ? startPosition + 1 : 0 }} -
          {{ startPosition + availableStore > totalStore ? totalStore : startPosition + availableStore }} Trên {{ totalStore }} kết quả
        </dir>
      </div>
    </div>
    <Dialog ref="dialog" v-show="showDialog" :cancelFunc="hideDialog" />

    <!-- region alert delete -->
    <div class="alert-delete" v-if="this.showAlertDelete">
      <div class="alert-background"></div>
      <div class="alert-container">
        <div class="alert-header">
          <div class="alert-title">
            Xóa dữ liệu
          </div>
          <button
            @click="this.toggleAlertDelete"
            class="d-icon icon-x"
          ></button>
        </div>
        <div class="alert-content">
          <div class="d-icon m-icon-help m-icon"></div>
          <div class="alert-message">
            Bạn có chắc chắn muốn xóa <b>{{ storeNameSelected }}</b> khỏi danh
            sách cửa hàng.
          </div>
        </div>
        <div class="alert-footer">
          <div class="alert-group-button">
            <button class="button-default btn-red" @click="deleteStore">
              <div class="d-icon icon-delete-white"></div>
              <div class="d-text">Xóa</div>
            </button>
            <button
              class="button-default btn-3"
              @click="this.toggleAlertDelete"
            >
              <div class="d-icon icon-x"></div>
              <div class="d-text">Hủy bỏ</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end region alert delete -->

    <!-- region preload screen -->
    <div class="preload" v-show="preload">
      <div class="preload-background"></div>
      <div class="preload-container">
        <div class="loader"></div>
      </div>
    </div>
    <!-- end region pre load screen -->
    <!-- Thông báo thành công -->
    <Alert v-if="alertSuccess" :notify="notify" />
    <!-- thông báo lỗi mặc định -->
    <AlertErrorDefault
      v-if="showAlertErrorDefault"
      :closeAlert="closeAlertErrorDefault"
    />
  </div>
</template>
<style>
#content {
  width: calc(100% - 168px);
  height: calc(100vh - 68px);
  background-color: #e5e6eb;
  margin-left: 150px;
  padding: 8px;
}
.d-icon {
  width: 16px;
  height: 16px;
  padding: 0 3px 0 0;
  cursor: pointer;
  background-repeat: no-repeat;
  border: none;
  outline: none;
}
.m-icon {
  width: 44px;
  height: 44px;
}
.disable {
  opacity: 0.5;
  cursor: context-menu !important;
}
.disable:hover {
  background-color: transparent !important;
}
.disable .d-icon {
  cursor: context-menu !important;
}
.disable .item-content {
  cursor: context-menu !important;
}
.content-header {
  display: flex;
  background-color: #2b3173;
  color: #fff;
  height: 36px;
  align-items: center;
}
.content-header .item {
  display: flex;
  justify-content: space-between;
  padding-left: 7px;
  padding-right: 7px;
  height: 100%;
  align-items: center;
  outline: none !important;
  border: none;
  border-left: 1px solid #190472;
  background-color: transparent;
  color: #fff;
}
.content-header .item:hover {
  background-color: #0088c1;
}
.content-header .item .item-content {
  padding: 0 5px;
  cursor: pointer;
  white-space: nowrap;
}

.table {
  width: 100%;
  height: calc(100% - 94px);
}
.footer {
  width: 100%;
  height: 53px;
  background-color: white;
  padding: 0px;
  margin-left: 1px;
  border-top: 1px solid #e1e1e1;
}
.footer .pagging {
  display: flex;
  flex-direction: row;
  height: 26px;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
}
.pagging .pagging-left {
  display: flex;
  align-items: center;
}
.pagging-left .d-icon {
  border: 1px solid #6b6f9d;
  border-radius: 3px;
  width: 22px;
  height: 22px;
  margin: 1px;
  padding: 0;
}
.pagging-left select {
  padding: 0 4px 0 4px;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  height: 100%;
  margin: 0 1px 0 1px;
  outline: none !important;
}
.pagging-left input {
  min-height: 12px;
  max-width: 40px;
  min-width: 40px;
  padding: 4px 6px;
  text-align: center;
  margin-right: 6px;
  margin-left: 10px;
  outline: none;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
}
.pagging .pagging-right {
  margin-right: 26px;
  line-height: 4px;
  color: #4b4c4c;
  font-weight: 300;
}

.alert-delete {
  position: absolute;
}
.alert-background {
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.5;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 4;
}
.alert-container {
  z-index: 5;
  width: 400px;
  height: 152px;
  background-color: white;
  position: fixed;
  top: calc((100% - 152px) / 2);
  left: calc((100vw - 400px) / 2);
  z-index: 5;
  border-radius: 3px;
}
.alert-container .alert-header {
  width: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  height: 21px;
  background-color: #f0f0f0;
  border-radius: 3px 3px 0 0;
  border: 1px solid #dfdfdf;
  border-bottom: none;
}
.alert-header .alert-title {
  font-size: 16px;
  font-weight: 600;
  color: #212121;
}
.alert-container .alert-content {
  width: calc(100% - 22px);
  height: 44px;
  padding: 10px;
  border: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
}
.alert-content .alert-message {
  padding-left: 16px;
  width: 332px;
}
.alert-container .alert-footer {
  height: 44px;
  display: flex;
  justify-content: flex-end;
}
.alert-footer .alert-group-button {
  display: flex;
  align-items: center;
  height: 100%;
}
.alert-group-button .button-default {
  height: 30px;
}
.alert-group-button .btn-3:hover {
  border-color: white !important;
}
/* pre load */
.preload {
  position: fixed;
  top: 161px;
}
.preload .preload-background {
  background-color: black;
  opacity: 0.2;
  width: calc(100vw - 170px);
  min-width: 1195px !important;
  height: calc(100vh - 161px);
  z-index: 4;
}
.preload .preload-container {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #3498db;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
import Table from "../base/Table.vue";
import Dialog from "../base/Dialog.vue";
import Const from "../../assets/js/Const.js";
import { location } from "../../assets/store/Location.js";
import axios from "axios";
import Alert from "../base/Alert.vue";
import AlertErrorDefault from "../base/AlertErrorDefault.vue";
export default {
  name: "Content",
  data: function() {
    return {
      showDialog: false,
      showAlertDelete: false,
      preload: false,
      storeNameSelected: "",
      storeIdSelected: null,
      disabledReload: false,
      totalStore: "",
      pageSize: 15,
      startPosition: 0,
      availableStore: 15,
      currentPage: 1,
      totalPage: "",
      disablePrevPage: true,
      disableNextPage: false,
      noContent: false,
      alertSuccess: false,
      notify: "",
      showAlertErrorDefault: false,
    };
  },
  components: {
    Table,
    Dialog,
    Alert,
    AlertErrorDefault,
  },
  methods: {
    startFilter () {
      this.showPreload();
      this.currentPage = 1;
      this.validatePage();
      this.startPosition = (this.currentPage - 1) * this.pageSize;
    },
    //Đóng thông báo lỗi mặc định
    // Created By: VM Hùng (19/04/2021)
    closeAlertErrorDefault() {
      this.showAlertErrorDefault = false;
    },
    //hiển thị thông báo lỗi mặc định
    // Created By: VM Hùng (19/04/2021)
    displayAlertErrorDefault() {
      this.showAlertErrorDefault = true;
    },
    // khi chuyển trang
    //CreatedBy: VM Hùng(16/04/2021)
    changePage() {
      //Kiểm tra trang hợp lệ
      this.validatePage();
      // //Thay đổi vị trí bắt đầu
      this.startPosition = (this.currentPage - 1) * this.pageSize;
      this.$root.$emit("pageChange", this.pageSize, this.currentPage);
    },
    //Kiểm tra trang hợp lệ
    //CreatedBy: VM Hùng(16/04/2021)
    validatePage () {
      
      if (this.currentPage < 1) this.currentPage = 1;
      if (this.currentPage > this.totalPage) this.currentPage = this.totalPage;
      //kiểm tra trang đầu tiên
      if (this.currentPage <= 1) {
        //không cho phép lùi lại page
        this.$refs.prevPage.classList.add("disable");
        this.disablePrevPage = true;
        //không cho phép về trang đầu tiên
        this.$refs.firstPage.classList.add("disable");
      } else {
        this.$refs.prevPage.classList.remove("disable");
        this.$refs.firstPage.classList.remove("disable");
        this.disablePrevPage = false;
      }
      // kiểm tra trang cuối cùng
      if (this.currentPage >= this.totalPage) {
        this.$refs.nextPage.classList.add("disable");
        this.disableNextPage = true;
        this.$refs.lastPage.classList.add("disable");
      } else {
        this.$refs.nextPage.classList.remove("disable");
        this.$refs.lastPage.classList.remove("disable");
        this.disableNextPage = false;
      }

    },
    //chuyển sang trang tiếp theo
    //CreatedBy: VM Hùng(13/04/2021)
    nextPage() {
      this.currentPage++;
      // this.startPosition = parseInt(this.startPosition) + parseInt(this.pageSize);
      this.changePage();
    },
    //Chuyển sang trang trước đó
    //CreatedBy: VM Hùng(13/04/2021)
    prevPage() {
      this.currentPage--;
      // this.startPosition = parseInt(this.startPosition) - parseInt(this.pageSize);
      this.changePage();
    },
    //Chuyển về trang đầu tiên
    //CreatedBy: VM Hùng(13/04/2021)
    firstPage() {
      this.currentPage = 1;
      this.startPosition = 0;
      this.changePage();
    },
    // chuyển về trang cuối cùng
    //CreatedBy: VM Hùng(13/04/2021)
    lastPage() {
      this.currentPage = this.totalPage;
      this.startPosition = (this.currentPage - 1) * this.pageSize;
      this.changePage();
    },
    //hiện màn hình preload
    //CreatedBy: VM Hùng(13/04/2021)
    showPreload() {
      this.preload = true;
    },
    // ẩn màn hình preload
    //CreatedBy: VM Hùng(13/04/2021)
    hidePreload() {
      this.preload = false;
    },
    reloadSuccess (totalPage, totalRecord) {
      this.totalStore = totalRecord;
      this.totalPage = totalPage;
      this.hidePreload();
      this.validatePage();
    },
    //Bật tắt màn hình preload
    //CreatedBy: VM Hùng(14/04/2021)
    togglePreload(data) {
      if (data == 1) this.showPreload();
      else this.hidePreload();
    },
    //Bật tắt dialog
    //CreatedBy: VM Hùng(13/04/2021)
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
    // ẨN dialog
    //CreatedBy: VM Hùng(13/04/2021)
    hideDialog() {
      this.showDialog = false;
    },
    //Bật thông báo xóa
    //CreatedBy: VM Hùng(13/04/2021)
    toggleAlertDelete() {
      this.showAlertDelete = !this.showAlertDelete;
    },

    // Xóa cửa hàng
    //CreatedBy: VM Hùng(13/04/2021)
    deleteStore() {
      this.toggleAlertDelete();
      this.showPreload();
      axios
        .delete(Const.ADDRESS.STORE + this.storeIdSelected)
        .then((res) => res)
        .then(() => {
          this.$refs.table.reLoadData();
          //hiện thông báo
          this.notify = Const.MESSAGE.DELETE_SUCCESS;
          this.hidePreload();

          this.alertSuccess = true;
          setTimeout(() => {
            this.alertSuccess = false;
          }, 2000);
        })
        .catch(() => {
          this.displayAlertErrorDefault();
        });
    },
    // Nhân bản thông tin cửa hàng
    //CreatedBy: VM Hùng(17/04/2021)
    duplicateStore() {
      this.toggleDialog();
      this.$refs.dialog.submitType = Const.SUBMIT_TYPE.DUPLICATE;
      this.$refs.dialog.showForm();
      this.$refs.dialog.setData({});
    },
    //Thêm mới 1 cửa hàng
    //CreatedBy: VM Hùng(13/04/2021)
    addStore() {
      this.toggleDialog();
      this.$refs.dialog.submitType = Const.SUBMIT_TYPE.INSERT;
      this.$refs.dialog.setData({});
      this.$refs.dialog.showForm();
  
    },
    //Cập nhật thông tin cửa hàng
    //CreatedBy: VM Hùng(13/04/2021)
    updateStore() {
      this.toggleDialog();
      this.$refs.dialog.submitType = Const.SUBMIT_TYPE.UPDATE;
      this.$refs.dialog.showForm();
    },
    // Tải lại toàn bộ các trang
    reloadAll() {
      this.showPreload();
      this.disabledReload = true;
      this.currentPage = 1;
      this.changePage();
      this.disabledReload = false;
    },
    // tải lại dữ liệu bảng
    //CreatedBy: VM Hùng(13/04/2021)
    reload() {
      this.showPreload();
      this.disabledReload = true;
      this.$refs.table.reLoadData();
      this.disabledReload = false;
    },
    // Lấy danh sách tất cả các tỉnh huyện thành phố đất nước
    //Created By: VM HÙng (15/04/2021)
    async loadLocationData() {
      // Lấy thông tin tất cả quốc gia
      await axios
        .get(Const.ADDRESS.COUNTRY)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          // thêm cửa hàng vào store
          data.forEach((element) => {
            location.commit("addCountry", element);
          });
        })
        .catch((e) => {
          console.log("error ::" + e);
          //this.displayAlertErrorDefault();
        });
      // Lấy thông tin tất cả tỉnh/ thành phố
      await axios
        .get(Const.ADDRESS.PROVINCE)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          // thêm cửa hàng vào store
          data.forEach((element) => {
            location.commit("addProvince", element);
          });
        })
        .catch((e) => {
          console.log("error ::" + e);
          //this.displayAlertErrorDefault();
        });
      // Lấy thông tin tất cả các huyện
      await axios
        .get(Const.ADDRESS.DISTRICT)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          // thêm cửa hàng vào store
          data.forEach((element) => {
            location.commit("addDistrict", element);
          });
        })
        .catch((e) => {
          console.log("error ::" + e);
          //this.displayAlertErrorDefault();
        });
      await axios
        .get(Const.ADDRESS.WARD)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          // thêm cửa hàng vào store
          data.forEach((element) => {
            location.commit("addWard", element);
          });
        })
        .catch((e) => {
          console.log("error ::" + e);
          //this.displayAlertErrorDefault();
        });
    },
  },
  created: function() {
    // Nhận sự kiện khi 1 hàng được chọn
    this.$root.$on("rowSelect", (id, name) => {
      this.storeNameSelected = name;
      this.storeIdSelected = id;
    });

    this.loadLocationData();
  },
  watch: {
    //Chỉ số bắt đầu của trang thay đổi
    //CreatedBy: VM Hùng(14/04/2021)
    startPosition() {
      // kiểm tra vị trí page hợp lệ chưa
      if (this.startPosition < 0) this.startPosition = 0;
      if (this.startPosition > this.totalStore) {
        this.startPosition = this.totalStore;
      }
      //gửi thông báo về table
      // this.$root.$emit("pageChange", this.startPosition, this.pageSize)
    },
    //Số lượng bản ghi trên page thay đổi
    //CreatedBy: VM Hùng(14/04/2021)
    pageSize() {
      this.currentPage = 1;
      this.startPosition = 0;
      this.$root.$emit("pageChange", this.pageSize, this.currentPage);
    },
    //Kiểm tra có bản ghi nào hiển thị không
    //CreatedBy: VM Hùng(14/04/2021)
    availableStore() {
      if (this.availableStore == "") {
        this.$refs.updateStore.classList.add("disable");
        this.$refs.duplicateStore.classList.add("disable");
        this.$refs.deleteStore.classList.add("disable");
        this.noContent = true;
      } else {
        this.$refs.updateStore.classList.remove("disable");
        this.$refs.duplicateStore.classList.remove("disable");
        this.$refs.deleteStore.classList.remove("disable");
        this.noContent = false;
      }
    },
  },
  mounted: function() {
    //nút xem trang trước bị ẩn ngay khi bắt đầu
    this.$refs.prevPage.classList.add("disable");
    this.$refs.firstPage.classList.add("disable");

    //Nhận được thông báo thành công từ dialog
    this.$root.$on("success", (notify) => {
      this.notify = notify;
      this.alertSuccess = true;
      setTimeout(() => {
        this.alertSuccess = !this.alertSuccess;
      }, 2000);
    });

    //Nhận được thông báo lỗi

    this.$root.$on("errorDefault", () => {
      this.displayAlertErrorDefault()
    });
  },
  updated: function() {
    //Tính lại tổng số trang mỗi lần update
    this.totalPage =
      this.totalStore % this.pageSize == 0
        ? parseInt(this.totalStore / this.pageSize)
        : parseInt(this.totalStore / this.pageSize) + 1;
  },
};
</script>
