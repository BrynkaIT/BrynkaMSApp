exports.ids=[4],exports.modules={55:function(t,e,l){var content=l(68);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var o=l(3).default;t.exports.__inject__=function(t){o("3d59dbee",content,!0,t)}},67:function(t,e,l){"use strict";l.r(e);var o=l(55),r=l.n(o);for(var n in o)"default"!==n&&function(t){l.d(e,t,(function(){return o[t]}))}(n);e.default=r.a},68:function(t,e,l){(e=l(2)(!1)).push([t.i,"",""]),t.exports=e},74:function(t,e,l){"use strict";l.r(e);var o={data:()=>({items:[{isActive:!0,age:40,name:{first:"Dickerson",last:"Macdonald"}},{isActive:!1,age:21,name:{first:"Larsen",last:"Shaw"}},{isActive:!1,age:9,name:{first:"Mini",last:"Navarro"},_rowVariant:"success"},{isActive:!1,age:89,name:{first:"Geneva",last:"Wilson"}},{isActive:!0,age:38,name:{first:"Jami",last:"Carney"}},{isActive:!1,age:27,name:{first:"Essie",last:"Dunlap"}},{isActive:!0,age:40,name:{first:"Thor",last:"Macdonald"}},{isActive:!0,age:87,name:{first:"Larsen",last:"Shaw"},_cellVariants:{age:"danger",isActive:"warning"}},{isActive:!1,age:26,name:{first:"Mitzi",last:"Navarro"}},{isActive:!1,age:22,name:{first:"Genevieve",last:"Wilson"}},{isActive:!0,age:38,name:{first:"John",last:"Carney"}},{isActive:!1,age:29,name:{first:"Dick",last:"Dunlap"}}],fields:[{key:"name",label:"Person Full name",sortable:!0,sortDirection:"desc"},{key:"age",label:"Person age",sortable:!0,class:"text-center"},{key:"isActive",label:"is Active",formatter:(t,e,l)=>t?"Yes":"No",sortable:!0,sortByFormatted:!0,filterByFormatted:!0},{key:"actions",label:"Actions"}],totalRows:1,currentPage:1,perPage:5,pageOptions:[5,10,15],sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],infoModal:{id:"info-modal",title:"",content:""}}),computed:{sortOptions(){return this.fields.filter(t=>t.sortable).map(t=>({text:t.label,value:t.key}))}},mounted(){this.totalRows=this.items.length},methods:{info(t,e,button){this.infoModal.title=`Row index: ${e}`,this.infoModal.content=JSON.stringify(t,null,2),this.$root.$emit("bv::show::modal",this.infoModal.id,button)},resetInfoModal(){this.infoModal.title="",this.infoModal.content=""},onFiltered(t){this.totalRows=t.length,this.currentPage=1}}},r=l(1),n={data:()=>({items:[{isActive:!0,age:40,name:{first:"Dickerson",last:"Macdonald"}},{isActive:!1,age:21,name:{first:"Larsen",last:"Shaw"}},{isActive:!1,age:9,name:{first:"Mini",last:"Navarro"},_rowVariant:"success"},{isActive:!1,age:89,name:{first:"Geneva",last:"Wilson"}},{isActive:!0,age:38,name:{first:"Jami",last:"Carney"}},{isActive:!1,age:27,name:{first:"Essie",last:"Dunlap"}},{isActive:!0,age:40,name:{first:"Thor",last:"Macdonald"}},{isActive:!0,age:87,name:{first:"Larsen",last:"Shaw"},_cellVariants:{age:"danger",isActive:"warning"}},{isActive:!1,age:26,name:{first:"Mitzi",last:"Navarro"}},{isActive:!1,age:22,name:{first:"Genevieve",last:"Wilson"}},{isActive:!0,age:38,name:{first:"John",last:"Carney"}},{isActive:!1,age:29,name:{first:"Dick",last:"Dunlap"}}],fields:[{key:"name",label:"Person Full name",sortable:!0,sortDirection:"desc"},{key:"age",label:"Person age",sortable:!0,class:"text-center"},{key:"isActive",label:"is Active",formatter:(t,e,l)=>t?"Yes":"No",sortable:!0,sortByFormatted:!0,filterByFormatted:!0},{key:"actions",label:"Actions"}],totalRows:1,currentPage:1,perPage:5,pageOptions:[5,10,15],sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],infoModal:{id:"info-modal",title:"",content:""}}),computed:{sortOptions(){return this.fields.filter(t=>t.sortable).map(t=>({text:t.label,value:t.key}))}},mounted(){this.totalRows=this.items.length},methods:{info(t,e,button){this.infoModal.title=`Row index: ${e}`,this.infoModal.content=JSON.stringify(t,null,2),this.$root.$emit("bv::show::modal",this.infoModal.id,button)},resetInfoModal(){this.infoModal.title="",this.infoModal.content=""},onFiltered(t){this.totalRows=t.length,this.currentPage=1}}},c={layout:"customer",components:{Location:Object(r.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("b-container",{attrs:{fluid:""}},[l("b-row",[l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Sort","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"sortBySelect"}},[l("b-input-group",{attrs:{size:"sm"}},[l("b-form-select",{staticClass:"w-75",attrs:{id:"sortBySelect",options:t.sortOptions},scopedSlots:t._u([{key:"first",fn:function(){return[l("option",{attrs:{value:""}},[t._v("-- none --")])]},proxy:!0}]),model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}}),t._v(" "),l("b-form-select",{staticClass:"w-25",attrs:{size:"sm",disabled:!t.sortBy},model:{value:t.sortDesc,callback:function(e){t.sortDesc=e},expression:"sortDesc"}},[l("option",{domProps:{value:!1}},[t._v("Asc")]),t._v(" "),l("option",{domProps:{value:!0}},[t._v("Desc")])])],1)],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Initial sort","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"initialSortSelect"}},[l("b-form-select",{attrs:{id:"initialSortSelect",size:"sm",options:["asc","desc","last"]},model:{value:t.sortDirection,callback:function(e){t.sortDirection=e},expression:"sortDirection"}})],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"filterInput"}},[l("b-input-group",{attrs:{size:"sm"}},[l("b-form-input",{attrs:{type:"search",id:"filterInput",placeholder:"Type to Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t._v(" "),l("b-input-group-append",[l("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Clear")])],1)],1)],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter On","label-cols-sm":"3","label-align-sm":"right","label-size":"sm",description:"Leave all unchecked to filter on all data"}},[l("b-form-checkbox-group",{staticClass:"mt-1",model:{value:t.filterOn,callback:function(e){t.filterOn=e},expression:"filterOn"}},[l("b-form-checkbox",{attrs:{value:"name"}},[t._v("Name")]),t._v(" "),l("b-form-checkbox",{attrs:{value:"age"}},[t._v("Age")]),t._v(" "),l("b-form-checkbox",{attrs:{value:"isActive"}},[t._v("Active")])],1)],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{sm:"5",md:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Per page","label-cols-sm":"6","label-cols-md":"4","label-cols-lg":"3","label-align-sm":"right","label-size":"sm","label-for":"perPageSelect"}},[l("b-form-select",{attrs:{id:"perPageSelect",size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{sm:"7",md:"6"}},[l("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1),t._v(" "),l("b-table",{attrs:{"show-empty":"",small:"",stacked:"md",items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,filterIncludedFields:t.filterOn,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(name)",fn:function(e){return[t._v("\n      "+t._s(e.value.first)+" "+t._s(e.value.last)+"\n    ")]}},{key:"cell(actions)",fn:function(e){return[l("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(l){return t.info(e.item,e.index,l.target)}}},[t._v("\n        Info modal\n      ")]),t._v(" "),l("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("\n        "+t._s(e.detailsShowing?"Hide":"Show")+" Details\n      ")])]}},{key:"row-details",fn:function(e){return[l("b-card",[l("ul",t._l(e.item,(function(e,o){return l("li",{key:o},[t._v(t._s(o)+": "+t._s(e))])})),0)])]}}])}),t._v(" "),l("b-modal",{attrs:{id:t.infoModal.id,title:t.infoModal.title,"ok-only":""},on:{hide:t.resetInfoModal}},[l("pre",[t._v(t._s(t.infoModal.content))])])],1)}),[],!1,null,null,"74eb41a6").exports,Users:Object(r.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("b-container",{attrs:{fluid:""}},[l("b-row",[l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Sort","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"sortBySelect"}},[l("b-input-group",{attrs:{size:"sm"}},[l("b-form-select",{staticClass:"w-75",attrs:{id:"sortBySelect",options:t.sortOptions},scopedSlots:t._u([{key:"first",fn:function(){return[l("option",{attrs:{value:""}},[t._v("-- none --")])]},proxy:!0}]),model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}}),t._v(" "),l("b-form-select",{staticClass:"w-25",attrs:{size:"sm",disabled:!t.sortBy},model:{value:t.sortDesc,callback:function(e){t.sortDesc=e},expression:"sortDesc"}},[l("option",{domProps:{value:!1}},[t._v("Asc")]),t._v(" "),l("option",{domProps:{value:!0}},[t._v("Desc")])])],1)],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Initial sort","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"initialSortSelect"}},[l("b-form-select",{attrs:{id:"initialSortSelect",size:"sm",options:["asc","desc","last"]},model:{value:t.sortDirection,callback:function(e){t.sortDirection=e},expression:"sortDirection"}})],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter","label-cols-sm":"3","label-align-sm":"right","label-size":"sm","label-for":"filterInput"}},[l("b-input-group",{attrs:{size:"sm"}},[l("b-form-input",{attrs:{type:"search",id:"filterInput",placeholder:"Type to Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),t._v(" "),l("b-input-group-append",[l("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Clear")])],1)],1)],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{lg:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Filter On","label-cols-sm":"3","label-align-sm":"right","label-size":"sm",description:"Leave all unchecked to filter on all data"}},[l("b-form-checkbox-group",{staticClass:"mt-1",model:{value:t.filterOn,callback:function(e){t.filterOn=e},expression:"filterOn"}},[l("b-form-checkbox",{attrs:{value:"name"}},[t._v("Name")]),t._v(" "),l("b-form-checkbox",{attrs:{value:"age"}},[t._v("Age")]),t._v(" "),l("b-form-checkbox",{attrs:{value:"isActive"}},[t._v("Active")])],1)],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{sm:"5",md:"6"}},[l("b-form-group",{staticClass:"mb-0",attrs:{label:"Per page","label-cols-sm":"6","label-cols-md":"4","label-cols-lg":"3","label-align-sm":"right","label-size":"sm","label-for":"perPageSelect"}},[l("b-form-select",{attrs:{id:"perPageSelect",size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1),t._v(" "),l("b-col",{staticClass:"my-1",attrs:{sm:"7",md:"6"}},[l("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill",size:"sm"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1),t._v(" "),l("b-table",{attrs:{"show-empty":"",small:"",stacked:"md",items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,filterIncludedFields:t.filterOn,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(name)",fn:function(e){return[t._v("\n      "+t._s(e.value.first)+" "+t._s(e.value.last)+"\n    ")]}},{key:"cell(actions)",fn:function(e){return[l("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(l){return t.info(e.item,e.index,l.target)}}},[t._v("\n        Info modal\n      ")]),t._v(" "),l("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("\n        "+t._s(e.detailsShowing?"Hide":"Show")+" Details\n      ")])]}},{key:"row-details",fn:function(e){return[l("b-card",[l("ul",t._l(e.item,(function(e,o){return l("li",{key:o},[t._v(t._s(o)+": "+t._s(e))])})),0)])]}}])}),t._v(" "),l("b-modal",{attrs:{id:t.infoModal.id,title:t.infoModal.title,"ok-only":""},on:{hide:t.resetInfoModal}},[l("pre",[t._v(t._s(t.infoModal.content))])])],1)}),[],!1,null,null,"138dbd32").exports},data:()=>({customer:null}),created(){this.$axios.get(`/customer/${this.$route.params.id}`).then(t=>{this.$store.dispatch("managedService/getSelectedCustomer",t.data.customer),this.customer=t.data.customer}).catch(t=>console.log(t))}};var m=Object(r.a)(c,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[t._ssrNode("<div data-v-3779ed58>","</div>",[t._ssrNode("<div data-v-3779ed58>","</div>",[l("b-tabs",{attrs:{small:"","active-nav-item-class":"text-danger","title-item-class":"text-danger","content-class":"mt-3 p-3"}},[l("b-tab",{attrs:{"title-link-class":"text-secondary",title:"Location",active:""}},[l("div",[l("b-card",{attrs:{title:"Location","sub-title":"Panel"}},[l("location")],1)],1)]),t._v(" "),l("b-tab",{attrs:{"title-link-class":"text-secondary",title:"Users",lazy:""}},[l("div",[l("b-card",{attrs:{title:"Users","sub-title":"Panel"}},[l("users")],1)],1)]),t._v(" "),l("b-tab",{attrs:{"title-link-class":"text-secondary",title:"etc",lazy:""}},[l("div",[l("b-card",{attrs:{title:"...","sub-title":"..."}},[l("b-card-text",[t._v("\n                Some quick example text to build on the\n                "),l("em",[t._v("card title")]),t._v(" and make up the bulk of the card's\n                content.\n              ")]),t._v(" "),l("b-card-text",[t._v("A second paragraph of text in the card.")])],1)],1)])],1)],1)])])}),[],!1,(function(t){var e=l(67);e.__inject__&&e.__inject__(t)}),"3779ed58","d49a98e8");e.default=m.exports}};