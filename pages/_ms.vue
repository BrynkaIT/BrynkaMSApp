<template>
  <div class="mt-5">
    <div class="container">
      <div class="row text-center mb-4">
        <div class="col-md-12" v-if="this.$store.state.managedService.ManagedService.name != 'brynka'" >
          <img :src="this.$store.state.managedService.ManagedService.mainLogo" width="150px" />
          <h4>
            Brynka Manager
          </h4>
          <small>version 1.0</small>
        </div>
          <div class="col-md-12" v-else>
          <img :src="this.$store.state.managedService.ManagedService.mainLogo" width="50%"/>
          <p>version 1.0</p>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-6 offset-md-3">
          <div class="card shadow">
            <div class="card-body">
              <div class="login-title">
                <h4>Log In</h4>
              </div>
              <div class="login-form mt-4">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <input
                        :class="{ 'form-error': $v.credentials.email.$error }"
                        class="form-control"
                        type="email"
                        placeholder="Email"
                        @blur="$v.credentials.email.$touch()"
                        v-model.trim="credentials.email"
                      />
                      <div v-if="$v.credentials.email.$error" class="">
                        <span
                          v-if="!$v.credentials.email.required"
                          class="error-text"
                          >Email is required</span
                        >
                        <span
                          v-if="!$v.credentials.email.email"
                          class="error-text"
                          >Email address is not valid</span
                        >
                      </div>
                    </div>
                    <div class="form-group col-md-12">
                      <input
                        :class="{
                          'form-error': $v.credentials.password.$error
                        }"
                        class="form-control"
                        type="password"
                        placeholder="Password"
                        @blur="$v.credentials.password.$touch()"
                        v-model.trim="credentials.password"
                      />
                      <div v-if="$v.credentials.password.$error" class="">
                        <span
                          v-if="!$v.credentials.password.required"
                          class="error-text"
                          >Password is required</span
                        >
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="form-row">
                    <button v-if="!loading.status"
                      type="button"
                      @click.prevent="onLogin"
                      :disabled="$v.credentials.$invalid"
                      class="btn btn-danger btn-block"
                    >
                      Login
                    </button>
                    <button  v-if="loading.status"
                    type="button"
                    class="btn btn-danger btn-block"
                    disabled><b-spinner small type="grow">
                    </b-spinner>{{ loading.msg }}</button>
                  </div>
                </form>
              </div>
              <div class="logi-forgot text-right mt-2">
                <a href="#">Reset Password</a>
              </div>
              <div>
                <p class="mt-4">
                  <small>BRYNKA SOFTWARE SOLUTIONS</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'


export default {
  layout: 'admin',
  middleware: ['auth'],

  options: {
    auth: false
  },
     created(){
    this.$store.dispatch('managedService/getManagedService', this.$route.params.ms)
  },
  data() {
    return {
      credentials: {
        email: 'kirk.williams@brynka.com',
        password: 'bryn2010'
      },
      msg: {
        credentials: ''
      },
      loading:{
        status: false,
        msg:''
      }
    }
  },
  validations: {
    credentials: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
  },
  computed: {

  },
  methods: {
    async onLogin() {
      this.$v.credentials.$touch()
      if (!this.$v.credentials.$invalid) {
        this.loading.msg = "Loading..."
        this.loading.status = true;
        try {
          await this.$auth
            .loginWith('local', {
              data: this.credentials
            })
            .then(() => {
              this.$router.push('/customers')
            })
        } catch (e) {
          // this.msg.credentials = e.response.data.message
           this.loading.msg = "Authentication Failed"
          return false
        }
      }
    }
  }
}
</script>

<style scoped>
@charset "UTF-8";
html {
  font-size: 62.5%;
}

.card.shadow{
  background: #ececec;
  border: 1px solid #03a9f4;
}
/* .b-logo{
  width:50%
} */

</style>
