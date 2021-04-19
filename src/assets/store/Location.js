import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
//Trả về giá trị mặc định của location
//Created By: VM Hùng (14/ 04/2021)
const getDefaultState = () => {
  return {
    country: [],
    province: [],
    district: [],
    ward: []
  }
}

export const location = new Vuex.Store({
         state: {
           country: [],
           province: [],
           district: [],
           ward: [],
         },
         mutations: {
           //Thêm mới 1 quốc gia
           //Created By: VM Hùng (14/04/2021)
           addCountry(state, country) {
             state.country.push(country);
           },
           //  Thêm mới 1 tỉnh thành phố
           //Created By: VM Hùng (14/04/2021)
           addProvince(state, province) {
             state.province.push(province);
           },
           //Thêm mới 1 Quận Huyện
           addDistrict(state, district) {
             state.district.push(district);
           },
           //Thêm mới 1 phường xã
           addWard(state, ward) {
             state.ward.push(ward);
           },
           deleteSelf(state) {
             Object.assign(state, getDefaultState());
           },
         },
         getters: {
           // Lấy tỉnh thành phố theo quốc gia
           //Created By: VM Hùng (16/04/2021)
           provinceWithCountry: (state) => (id) => {
             return state.province.filter(
               (province) => province.CountryId == id
             );
           },
           // Lấy quận huyện theo tỉnh
           //Created By: VM Hùng (16/04/2021)
           districtWithProvince: (state) => (id) => {
             return state.district.filter(
               (district) => district.ProvinceId == id
             );
           },
           //Lấy phưỜng xã theo quận huyện
           //Created By: VM Hùng (16/04/2021)
           wardWithDistrict: (state) => (id) => {
             return state.ward.filter((ward) => ward.DistrictId == id);
           },
         },
       });