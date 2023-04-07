import Vue from 'vue'
import App from './App.vue'
import {router}  from './routes/index.js'
import axios from 'axios'
import "./style.css"
// import { createApp } from 'vue'
// import JsonCSV from 'vue-json-csv'

Vue.config.productionTip = false
Vue.prototype.$http = axios;

// const app = new createApp({
//   render: h => h(App),
//   router,
//   data(){
//       return {
//           json_fields: {
//               "Complete name": "name",
//                   City: "city",
//                   Telephone: "phone.mobile",
//                   "Telephone 2": {
//                   field: "phone.landline",
//                       callback: (value) => {
//                       return `Landline Phone - ${value}`;
//                   },
//               },
//           },
//           json_data: [
//               {
//                   name: "Tony Peña",
//                   city: "New York",
//                   country: "United States",
//                   birthdate: "1978-03-15",
//                   phone: {
//                       mobile: "1-541-754-3010",
//                       landline: "(541) 754-3010",
//                   },
//               },
//               {
//                   name: "Thessaloniki",
//                   city: "Athens",
//                   country: "Greece",
//                   birthdate: "1987-11-23",
//                   phone: {
//                       mobile: "+1 855 275 5071",
//                       landline: "(2741) 2621-244",
//                   },
//               },
//           ],
//           json_meta: [
//           [
//               {
//                   key: "charset",
//                   value: "utf-8",
//               },
//           ],
//       ],
//       }
//   },
//   component:{
//     downloadCsv: JsonCSV
//   }
// }).mount('#app')

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')


