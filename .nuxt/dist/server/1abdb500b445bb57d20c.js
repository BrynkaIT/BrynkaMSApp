exports.ids=[3],exports.modules={57:function(t,e,r){var content=r(72);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);var d=r(3).default;t.exports.__inject__=function(t){d("5f93dafa",content,!0,t)}},71:function(t,e,r){"use strict";r.r(e);var d=r(57),o=r.n(d);for(var n in d)"default"!==n&&function(t){r.d(e,t,(function(){return d[t]}))}(n);e.default=o.a},72:function(t,e,r){(e=r(2)(!1)).push([t.i,"html[data-v-5f264816]{font-size:62.5%}.card.shadow[data-v-5f264816]{background:#ececec;border:1px solid #03a9f4}",""]),t.exports=e},77:function(t,e,r){"use strict";r.r(e);var d=r(50),o={layout:"admin",middleware:["auth"],options:{auth:!1},created(){this.$store.dispatch("managedService/getManagedService",this.$route.params.ms)},data:()=>({credentials:{email:"kirk.williams@brynka.com",password:"bryn2010"},msg:{credentials:""},loading:{status:!1,msg:""}}),validations:{credentials:{email:{email:d.email,required:d.required},password:{required:d.required}}},computed:{},methods:{async onLogin(){if(this.$v.credentials.$touch(),!this.$v.credentials.$invalid){this.loading.msg="Loading...",this.loading.status=!0;try{await this.$auth.loginWith("local",{data:this.credentials}).then(()=>{this.$router.push("/customers")})}catch(t){return this.loading.msg="Authentication Failed",!1}}}}},n=r(1);var component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-5"},[t._ssrNode('<div class="container" data-v-5f264816>',"</div>",[t._ssrNode('<div class="row text-center mb-4" data-v-5f264816>'+("brynka"!=this.$store.state.managedService.ManagedService.name?'<div class="col-md-12" data-v-5f264816><img'+t._ssrAttr("src",this.$store.state.managedService.ManagedService.mainLogo)+' width="150px" data-v-5f264816> <h4 data-v-5f264816>\n          Brynka Manager\n        </h4> <small data-v-5f264816>version 1.0</small></div>':'<div class="col-md-12" data-v-5f264816><img'+t._ssrAttr("src",this.$store.state.managedService.ManagedService.mainLogo)+' width="50%" data-v-5f264816> <p data-v-5f264816>version 1.0</p></div>')+"</div> "),t._ssrNode('<div class="row text-center" data-v-5f264816>',"</div>",[t._ssrNode('<div class="col-md-6 offset-md-3" data-v-5f264816>',"</div>",[t._ssrNode('<div class="card shadow" data-v-5f264816>',"</div>",[t._ssrNode('<div class="card-body" data-v-5f264816>',"</div>",[t._ssrNode('<div class="login-title" data-v-5f264816><h4 data-v-5f264816>Log In</h4></div> '),t._ssrNode('<div class="login-form mt-4" data-v-5f264816>',"</div>",[t._ssrNode("<form data-v-5f264816>","</form>",[t._ssrNode('<div class="form-row" data-v-5f264816><div class="form-group col-md-12" data-v-5f264816><input type="email" placeholder="Email"'+t._ssrAttr("value",t.credentials.email)+t._ssrClass("form-control",{"form-error":t.$v.credentials.email.$error})+" data-v-5f264816> "+(t.$v.credentials.email.$error?"<div data-v-5f264816>"+(t.$v.credentials.email.required?"\x3c!----\x3e":'<span class="error-text" data-v-5f264816>Email is required</span>')+" "+(t.$v.credentials.email.email?"\x3c!----\x3e":'<span class="error-text" data-v-5f264816>Email address is not valid</span>')+"</div>":"\x3c!----\x3e")+'</div> <div class="form-group col-md-12" data-v-5f264816><input type="password" placeholder="Password"'+t._ssrAttr("value",t.credentials.password)+t._ssrClass("form-control",{"form-error":t.$v.credentials.password.$error})+" data-v-5f264816> "+(t.$v.credentials.password.$error?"<div data-v-5f264816>"+(t.$v.credentials.password.required?"\x3c!----\x3e":'<span class="error-text" data-v-5f264816>Password is required</span>')+"</div>":"\x3c!----\x3e")+"</div></div> <br data-v-5f264816> "),t._ssrNode('<div class="form-row" data-v-5f264816>',"</div>",[t._ssrNode((t.loading.status?"\x3c!----\x3e":'<button type="button"'+t._ssrAttr("disabled",t.$v.credentials.$invalid)+' class="btn btn-danger btn-block" data-v-5f264816>\n                    Login\n                  </button>')+" "),t.loading.status?t._ssrNode('<button type="button" disabled="disabled" class="btn btn-danger btn-block" data-v-5f264816>',"</button>",[r("b-spinner",{attrs:{small:"",type:"grow"}}),t._ssrNode(t._ssrEscape(t._s(t.loading.msg)))],2):t._e()],2)],2)]),t._ssrNode(' <div class="logi-forgot text-right mt-2" data-v-5f264816><a href="#" data-v-5f264816>Reset Password</a></div> <div data-v-5f264816><p class="mt-4" data-v-5f264816><small data-v-5f264816>BRYNKA SOFTWARE SOLUTIONS</small></p></div>')],2)])])])],2)])}),[],!1,(function(t){var e=r(71);e.__inject__&&e.__inject__(t)}),"5f264816","2ab2f95e");e.default=component.exports}};