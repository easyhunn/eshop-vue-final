import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    stores: [],
  };
};

export const store = new Vuex.Store({
         state: {
           stores: [],
         },
         mutations: {
           //Thêm mới 1 cửa hàng
           // Created by: VM Hùng 14/04/2021
           addStore(state, store) {
             state.stores.push(store);
           },
           //Xoá cửa hàng khỏi store
           // Created by: VM Hùng 14/04/2021
           delete(state, index) {
             state.stores.splice(index, index + 1);
           },
           //xoá toàn bộ thông tin cửa hàng
           // Created by: VM Hùng 14/04/2021
           deleteSelf(state) {
             Object.assign(state, getDefaultState());
           },
         },
         getters: {
           //Đếm số lượng cửa hàng
           // Created by: VM Hùng 14/04/2021
           count: (store) => store.stores.length,
           // lấy toàn bộ customer
           // Created by: VM Hùng 14/04/2021
           stores: (store) => store.stores,
         },
       });
