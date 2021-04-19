<template>
    <div class="dialog">
        <div class="dialog-background"></div>
        <form class="dialog-container" @submit="saveFunc" >
            <div class="dialog-header">
                <div class="left-header">
                    <div class="header-title">
                        {{title}}
                    </div>
                </div>
                <div class="right-header">
                    <button type="button" class="d-icon icon-x" @click="this.cancelFunc"></button>
                </div>
            </div>
            <div class="dialog-content">
                <div class="dialog-row">
                    <label >
                        Mã cửa hàng <span class="text-red">*</span>
                    </label>
                    <input v-model="store.StoreCode"
                            @keyup="checkAvailableStoreCode" 
                            ref="storeCode" 
                            id="storeCode" 
                            type="text" 
                            maxlength="20"
                            class="d-input required">
                    <div  ref="storeCodeError" class="d-icon icon-exclamation"></div>
                    <span class="input-required">
                        {{storeCodeError}}
                    </span>
                </div>
                <div class="dialog-row">
                    <label >
                        Tên cửa hàng <span class="text-red">*</span>
                    </label>
                    <input v-model="store.StoreName" 
                            type="text" 
                            maxlength="255"
                            class="d-input required">
                    <div class="d-icon icon-exclamation"></div>
                    <span class="input-required">
                        Trường không được phép để trống
                    </span>
                </div>
                <div class="dialog-row">
                    <label >
                        Địa chỉ <span class="text-red">*</span>
                    </label>
                    <textarea id="address" v-model="store.Address" name="" cols="100" rows="3" class="d-text-area required"></textarea>
                    <div class="d-icon icon-exclamation"></div>
                    <span class="input-required"
                            maxlength="255"
                            style="top: 70%;">
                        Trường không được phép để trống
                    </span>
                </div>
                <div class="dialog-row">
                    <div class="dialog-sub-row">
                        <label for="">Số điện thoại</label>
                        <input ref="phoneNumber" v-model="store.PhoneNumber" maxlength="50" type="text" class="d-input">
                    </div>
                    <div class="dialog-sub-row">
                        <label for="" class="left-label">Mã số thuế</label>
                        <input ref="storeTaxCode
                        " maxlength="20" v-model="store.StoreTaxCode" type="text" class="d-input">
                    </div>
                </div>
                
                <div class="dialog-row">
                    <div class="dialog-sub-row">
                        <label for="">Quốc gia</label>
                        <select v-model="store.CountryId" name="" id="Country" class="d-select">
                            <option v-for="(country, id) in countries" v-bind:key="id" :value="country.CountryId" >{{country.CountryName}}</option>
                        </select>
                    </div>
                    <div class="dialog-sub-row">
                        
                    </div>
                </div>
                <div class="dialog-row">
                    <div class="dialog-sub-row">
                        <label for="">Tỉnh/Thành phố</label>
                        <select v-model="store.ProvinceId" id="Province" class="d-select">
                            <option v-for="(province, id) in provinces" v-bind:key="id" :value="province.ProvinceId" >{{province.ProvinceName}}</option>
                        </select>
                    </div>
                    <div class="dialog-sub-row">
                        <label for="" class="left-label">Quận/Huyện</label>
        
                        <select v-model="store.DistrictId" id="District" class="d-select">
                            <option v-for="(district, id) in districts" v-bind:key="id" :value="district.DistrictId" >{{district.DistrictName}}</option>
                        </select>
                    </div>
                </div>
                <div class="dialog-row">
                    <div class="dialog-sub-row">
                        <label for="" >Phường/Xã</label>
                        <select v-model="store.WardId" id="Ward" class="d-select">
                            <option v-for="(ward, id) in wards" v-bind:key="id" :value="ward.WardId">{{ward.WardName}}</option>
                        </select>
                    </div>
                    <div class="dialog-sub-row">
                        <label for="" class="left-label">Đường phố</label>
                        <input maxlength="255" v-model="store.Street" type="text" class="d-input">
                    </div>
                </div>
            </div>
            <div class="dialog-footer">
                <div class="dialog-footer-left">
                    <button type="button" class="button-default btn-3" >
                        <div class="d-icon icon-help" style="background-size: contain;"></div>
                        <div class="d-text">
                            Trợ giúp
                        </div>
                    </button>
                </div>
                <div class="dialog-footer-right">
                    <button class="button-default btn-1">
                        <div class="d-icon icon-save"></div>
                        <div class="d-text">Lưu</div>
                    </button>
                    <button class="button-default btn-2" @click="saveAndAdd">
                        <div class="d-icon icon-plus"></div>
                        <div class="d-text">Lưu và thêm mới</div>
                    </button>
                    <button type="button" style="border:none" class="button-default btn-3"  @keydown="reFocus" @click="this.cancelFunc">
                        <div class="d-icon icon-x"></div>
                        <div class="d-text" >Hủy bỏ</div>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
.d-icon {
    background-repeat: no-repeat;
    background-position: center;
    border: none  !important;
    outline: none;
}
.btn-2:focus {
    opacity: 0.7;
}
.dialog-background {
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0.5;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 4;
}
.dialog-container {
    z-index: 5;
    width: 600px;
    height: 479px;
    background-color: white;
    position: fixed;
    top: calc((100vh - 479px) / 2);
    left: calc((100vw - 600px) / 2);
    z-index: 5;
    border-radius: 3px;
}
    .dialog-container .dialog-header {
        display: flex;
        justify-content: space-between;
        padding: 10px 14px;
        max-height: 41px;
        background-color: #f0f0f0;
        border-radius: 3px 3px 0 0;
    }
        .dialog-header .header-title {
            font-size: 16px;
            font-weight: 700;
        }
    .dialog-container .dialog-content {
        
        height: 364px;
        display: flex;
        flex-direction: column;
        padding: 16px 16px 0;
        border: 1px solid #e1e1e1;
    }
    .dialog-content .dialog-row{
        width: 100%;
        display: flex;
        padding: 6px 0;
        justify-content: space-between;
    }   
        .dialog-row label {
            white-space: nowrap;
            padding: 8px 5px 0 0;
            min-width: 100px;
            max-width: 100px;
        }
        .dialog-row .left-label {
            padding-left: 16px
        }
        .dialog-row .d-input {
            line-height: 20px;
            width: 100%;
            min-width: 420px;
            padding: 5px 10px;
            outline: none !important;
            border-radius: 3px;
            border: 1px solid #e1e1e1;
        }
        .dialog-row .d-input:focus {
            border: 1px solid #2b3173;
        }
        .dialog-row .icon-exclamation {
            position: relative;
            left: 3px;
            top: 35%;
            min-width: 16px;
            display: none;
        }
        .dialog-row .icon-exclamation:hover + span {
            display: block;
        }
        .dialog-row .input-required {
            position: relative;
            display: none;
            top: 100%;
        }
        .dialog-row .d-select {
            height: 32px;
            min-width: 170px;
            max-width: 170px;
            padding: 5px 10px;
            outline: none !important;
            border-radius: 3px;
            border: 1px solid #e1e1e1;
        }
        .dialog-row .d-select:focus {
             border: 1px solid #2b3173;
        }
        .dialog-row .d-text-area {
            padding: 5px 10px 4px;
            border: 1px solid #e1e1e1;
            border-radius: 3px;
            outline: none;
            max-width: calc(100% - 126px);
            min-width: 420px;
            max-height: 69px;
            min-height: 69px;
            resize: none;
        }
        .dialog-row .d-text-area:focus {
            border: 1px solid #2b3173;
        }
        .dialog-row .dialog-sub-row {
            display: flex;
            white-space: nowrap;
        }
            .dialog-sub-row .d-input {
                max-width: 148px;
                min-width: 148px;
            }
    .dialog-footer {
        display: flex;
        align-items: center;
        height: 61px;
        padding: 0 10px;
        justify-content: space-between;
    }
        .dialog-footer .dialog-footer-left {
            display: flex;
            padding: 7px;
            
        }
            .dialog-footer-left .btn-3:hover {
                background-color: #e5e6eb;
                border-color: #e5e6eb !important;
            }
        .dialog-footer .d-text {
            color: #2b3173;
            font-weight: 600;
            padding: 0 5px;
        }
        .dialog-footer .dialog-footer-right {
            display: flex;
        }
    

</style>
<script>
import axios from "axios";

import Const from "../../assets/js/Const.js";
import Entity from "../../assets/js/Entity";
import {location} from "../../assets/store/Location.js";
// import CommonFunction from "../js/Common.js";

export default {
  name: "Dialog",
  props: {
    cancelFunc: Function,
  },
  data: function() {
      return {
          title: Const.DIALOG.TITLE_ADD,
          submitType: "",
          store: {
              StoreCode: "",
              StoreName: "",
              Address: "",
              PhoneNumber: "",
              StoreTaxCode: "",
              CountryId: null,
              ProvinceId: null,
              DistrictId: null,
              WardId: null,
              Street: "",
              Status: 1
          },
          countries: {
          },
          provinces: {

          },
          districts: {

          },
          wards: {

          },
          rowSelected: null,
          storeNameSelected: "",
          storeCodeSelected: "",
          storeCodeError: Const.DIALOG.NOT_ALLOW_BLANK,
          valid: true
      }
  },
  methods : {
    // Xoá các ô input đã validate
    // chuyển border của tất cả input, select về mặc đinh
    //xóa dấu !
    //Created by: VM Hùng (13/04/2021)
    removeValidate() { 
      var form = document.getElementsByTagName("form")[0].elements;
      var iconExclamation = document.getElementsByClassName("icon-exclamation");
      // xoá border
      for (let i = 0; i < form.length; ++i) {
        form[i].style.border = "1px solid #d2d2d2";
      }
      //xóa dấu !
      for (let i = 0; i < iconExclamation.length; ++i) {
         iconExclamation[i].style.display = "none";
      }
    },
    //focus vào phần tử đầu tiên của form
    //Created by: VM Hùng (13/04/2021)
    focusFirstElement() {
      this.$refs.storeCode.focus();
    },
    //Kiểm tra thông tin form hợp lệ 
    //Created by: VM Hùng (13/04/2021)

    checkValidate() {
        if (!this.noBlankData()) this.valid = false;
        else this.valid = true
    },
    // Kiểm tra tất cả trường yêu cầu đều có dữ liệu
    //Created By: VM Hùng (16/04/2021)
    noBlankData () {
        var valid = true;
        var requiredField = document.getElementsByClassName("required");
        var iconExclamation = document.getElementsByClassName("icon-exclamation");
        //Kiểm tra dữ liệu rỗng
        for (var i = 0; i < requiredField.length; ++i) {
            if (requiredField[i].value.trim() == "") {
                requiredField[i].style.border = "1px solid red";
                iconExclamation[i].style.display = "block";
                valid = false;
            } 
        }
        return valid;
    },
    // focus lại phần từ đầu tiên
    //Created by: VM Hùng (13/04/2021)
    reFocus(e) {
      if (e.keyCode == 9) {
        e.preventDefault();
        this.focusFirstElement();
      }
    },
    // hiên dialog
    //Created by: VM Hùng (13/04/2021)

    showForm() {
        // Đổi tiêu đề dialog
        if (this.submitType == Const.SUBMIT_TYPE.UPDATE) {
            this.title = Const.DIALOG.TITLE_UPDATE;
        } else {
            this.title = Const.DIALOG.TITLE_ADD;
        }
        this.storeCodeSelected = null;
        this.storeCodeError = Const.DIALOG.NOT_ALLOW_BLANK;

        if (this.submitType == Const.SUBMIT_TYPE.UPDATE || this.submitType == Const.SUBMIT_TYPE.DUPLICATE) {
            this.fillFormData();
        } else{
            this.setData(Entity.STORE);
        }        
        this.removeValidate();
        this.$nextTick(() => this.focusFirstElement());
    },
    //cập nhật thông tin cửa hàng
    //<param>cancel: có đóng cửa sổ dialog hay không </param>
    //Created by: VM Hùng (13/04/2021)
    //Modified by: VM Hùng (17/04/2021)
    updateStore (cancel) {
        // Sửa thông tin khách hàng vào store
        axios
            .put(Const.ADDRESS.STORE + this.rowSelected, this.store)
            .then(() => {
                this.$root.$emit("success", Const.MESSAGE.UPDATE_SUCCESS);
                if (cancel) this.cancelFunc();
            }).then (() => {
                //thông báo thêm thành công về table
                this.$root.$emit("dialogSubmit", 1);
            }) 
            .catch((error) => {
                if (typeof error.response != "undefined") {
                    if (!error.response.data.userMsg) this.$root.$emit("errorDefault", 1);
                    console.log(error.response.userMsg)
                } else {
                    this.$root.$emit("errorDefault", 1);
                }
            });
    },
    //Thêm mới 1 cửa hàng
    //Created by: VM Hùng (13/04/2021)
    //Modified by: VM Hùng (17/04/2021)
    addStore(cancel) {
        axios
            .post(Const.ADDRESS.STORE, this.store)
            .then(() => {              
                this.$root.$emit("success", Const.MESSAGE.ADDD_SUCCESS);
                if (cancel) this.cancelFunc();
            }).then (() => {
                //thông báo thêm thành công về table
                this.$root.$emit("dialogSubmit", 1);
            })
            .catch((error) => {
                if (typeof error.response != "undefined") {
                    if (!error.response.data.userMsg) this.$root.$emit("errorDefault", 1);
                    console.log(error.response.userMsg)
                } else {
                    this.$root.$emit("errorDefault", 1);
                }
            });
    },
    //Tải dữ liệu cửa hàng được chọn vào form khi update
    //Created By: VM Hùng (16/04/2021)
    async fillFormData() {
      await axios
        .get(Const.ADDRESS.STORE + this.rowSelected)
        .then((response) => {
            return response.data;
        })
        .then((data) => {
            this.setData(data);       
            if (this.submitType == Const.SUBMIT_TYPE.UPDATE) this.storeCodeSelected = data.StoreCode;
        });
    },
    // kiểm tra mã cửa hàng đã tồn tại hay chưa
    // Created by: VM Hùng (16/04/2021)
    checkAvailableStoreCode () {
        //Kiểm tra mã khách hàng hợp lệ
        if (this.store.StoreCode.length > 20) {
            // Nếu độ dài mã khách hàng vượt quá giới hạn cho phép
            this.$refs.storeCode.style.border = "1px solid red";
            this.$refs.storeCodeError.style.display="block";
            this.storeCodeError = Const.DIALOG.STORECODE_EXCEED;
        } else {

            if (this.store.StoreCode != this.storeCodeSelected)
                axios
                    .get(Const.ADDRESS.STORE_BY_STORE_CODE +  this.store.StoreCode)
                    .then((response) => {
                        if (response.data.StoreCode) {
                            if (response.data.StoreCode) {
                                //Nếu mã khách hàng đã tồn tại
                                this.$refs.storeCode.style.border = "1px solid red";
                                this.storeCodeError = Const.MESSAGE.DUPLICATE_STORECODE;
                                this.$refs.storeCodeError.style.display = "block";
                            }
                        } else {
                            this.$refs.storeCodeError.style.display = "none";
                            this.$refs.storeCode.style.border = "1px solid #2b3173";
                        }
                    }).catch ((e) => {
                        this.$refs.storeCode.style.border = "1px solid red";
                        this.storeCodeError = e.response.data.userMsg;
                        this.$refs.storeCodeError.style.display = "block";
                    }) 
        }
    },
    setData (data) {
        Object.assign(this.store, data);
    },
    //Lưu và thêm mới
    //Created By: VM Hùng (17/04/2021)
    saveAndAdd (e) {
        e.preventDefault();
        this.checkValidate();
        if (this.valid) {
            // Xác định kiểu sử dụng modal
            if (this.submitType == Const.SUBMIT_TYPE.UPDATE) {
                this.updateStore();
            } else {
                this.addStore();
            }
        }
    },
    //Lưu thông tin trên form
    //Created By: VM Hùng (17/04/2021)
    saveFunc(e) {
      // kiểm tra dữ liệu hợp lệ
      e.preventDefault();
      this.checkValidate();
      if (this.valid) {
        // Xác định kiểu sử dụng modal
        if (this.submitType == Const.SUBMIT_TYPE.UPDATE) {
          this.updateStore(true);
        } else {
          this.addStore(true);
        }
      }
    },

    
  },
  mounted() {
    this.valid = true;
    var form = document.getElementsByTagName("form")[0];
    //Thêm sự kiện khi focus vào ô
    form.addEventListener(
      "focus",
      (event) => {
        event.target.style.border = "1px solid #2b3173";
        event.target.style.outline = "none";
        if (event.target.classList.contains("required")) {

            event.target.nextSibling.style.display = "none";
        }
        // var iconExclamation = document.getElementsByClassName("icon-exclamation");
        //event.target.nextElementSibling.style.display = "none";
      },
      true
    );
    
    form.addEventListener(
      "blur",
      (event) => {
        
        if (!event.target.value.trim() && event.target.tagName != "BUTTON" && event.target.classList.contains("required")) {
          if (!this.storeCodeError) this.storeCodeError = Const.MESSAGE.NOT_ALLOW_BLANK;
          event.target.style.border = "1px solid red";
          event.target.nextSibling.style.display = "block";
        }
        else {
            event.target.style.border = "1px solid #e1e1e1";
            if (event.target.classList.contains("required")) {
                event.target.nextSibling.style.display = "none";
            }
            if (event.target.id == "storeCode") {
                this.checkAvailableStoreCode();
            }
        }
      },
      true
    );
    //Tải dữ liệu đất nước
    this.countries = location.state.country;
  },
  created: function() {
    // Hàng đầu tiên được chọn ngay lúc mở trang
    this.$root.$on("rowSelect", (rowId, name) => {
        this.rowSelected = rowId
        this.storeNameSelected = name;
    });
  },
  watch: {
        //thay đổi tất cả id của tỉnh, huyện xã khi id quốc gia thay đổi
        //Created By: VM HÙNG (14/04/2021)

        "store.CountryId"() {
            this.provinces = location.getters.provinceWithCountry(this.store.CountryId);
            this.districts = [];
            this.wards = [];
        },
        //thay đổi tất cả id của tỉnh, huyện xã khi id quốc gia thay đổi
        //Created By: VM HÙNG (14/04/2021)
        "store.ProvinceId" () {
            this.districts = location.getters.districtWithProvince(this.store.ProvinceId);
            this.wards = [];
        },
        //thay đổi tất cả id của tỉnh, huyện xã khi id quốc gia thay đổi
        //Created By: VM HÙNG (14/04/2021)
        "store.DistrictId" () {
            this.wards = location.getters.wardWithDistrict(this.store.DistrictId);
        }
  }

}
</script>