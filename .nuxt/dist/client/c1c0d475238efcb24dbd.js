(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{264:function(e,t,r){var content=r(272);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(32).default)("a624dd1e",content,!0,{sourceMap:!1})},271:function(e,t,r){"use strict";var l=r(264);r.n(l).a},272:function(e,t,r){(t=r(31)(!1)).push([e.i,".card[data-v-80d33fa2]{margin:15px}",""]),e.exports=t},294:function(e,t,r){"use strict";r.r(t);var l={layout:"customer",data:function(){return{totalRows:1,currentPage:1,perPage:5,pageOptions:[5,10,15],fields:["name","dbName","emailDomain","kind"],items:[]}},created:function(){var e=this;this.$axios.get("/customers").then((function(t){e.items=t.data.customers,e.totalRows=e.items.length,e.$store.dispatch("managedService/getSelectedCustomer",null)}))},methods:{onRowSelected:function(e){this.$router.push("/customers/".concat(e[0]._id))}}},o=(r(271),r(26)),component=Object(o.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("b-card",{attrs:{title:"Your Customers"}},[r("b-row",{attrs:{"align-h":"end"}},[r("b-col",{staticClass:"my-1 mb-2",attrs:{sm:"5",md:"5"}},[r("b-form-group",{staticClass:"mb-0",attrs:{label:"Per page","label-cols-sm":"4","label-cols-md":"4","label-cols-lg":"3","label-align-sm":"right","label-size":"sm","label-for":"perPageSelect"}},[r("b-form-select",{attrs:{id:"perPageSelect",size:"sm",options:e.pageOptions},model:{value:e.perPage,callback:function(t){e.perPage=t},expression:"perPage"}})],1)],1)],1),e._v(" "),r("b-table",{ref:"selectableTable",attrs:{selectable:"",stacked:"md",items:e.items,fields:e.fields,"current-page":e.currentPage,"per-page":e.perPage,responsive:"sm"},on:{"row-selected":e.onRowSelected}}),e._v(" "),r("b-col",{staticClass:"mx-auto",attrs:{sm:"7",md:"6"}},[r("b-pagination",{staticClass:"my-0",attrs:{"total-rows":e.totalRows,"per-page":e.perPage,align:"fill",size:"sm"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)],1)}),[],!1,null,"80d33fa2",null);t.default=component.exports}}]);