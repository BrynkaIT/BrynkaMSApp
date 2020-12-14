<template>
  <div>
    <div class="container mt-5">
      <div class="row text-center mb-4">
        <div class="col-md-12">
          <div>
            <img src="../assets/images/brynkaManagerLogo-lg.png" />
          <br>
            <p style="color:#fff">Verison {{ version }}</p>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-6 offset-md-3">
          <div class="card shadow">
            <div class="card-body">
              <div class="login-title">
                <h3>Log In</h3>
              </div>
              <div class="login-form mt-4">
                <form>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                          <b-icon icon="person-fill" scale="1.5" variant="primary"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                        type="text"
                        placeholder="Username/ Email"
                        :class="{ 'form-error': $v.credentials.email.$error }"
                        @blur="$v.credentials.email.$touch()"
                        v-model.trim="credentials.email"
                        ></b-form-input>
                      </b-input-group>
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
                      <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                          <b-icon icon="lock-fill" scale="1.5" variant="primary"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                        type="password"
                        placeholder="Password"
                        @blur="$v.credentials.password.$touch()"
                        v-model.trim="credentials.password"
                        :class="{
                          'form-error': $v.credentials.password.$error
                        }"
                        ></b-form-input>
                      </b-input-group>
                      <div v-if="$v.credentials.password.$error" class="">
                        <span
                          v-if="!$v.credentials.password.required"
                          class="error-text"
                          >Password is required</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <button v-if="!loading.status"
                      type="button"
                      @click.prevent="onLogin"
                      :disabled="$v.credentials.$invalid"
                      style="background: rgb(255, 152, 0); color: #fff; font-size: 20px; font-weight: bolder;"
                      class="btn btn-block"
                    >
                      Submit
                    </button>
                    <button  v-if="loading.status"
                    type="button"
                    style="background: rgb(255, 152, 0); color: #fff; font-size: 20px; font-weight: bolder;"
                    class="btn btn-block"
                    disabled><b-spinner small type="grow">
                    </b-spinner>{{ loading.msg }}</button>
                  </div>
                </form>
              </div>
              <div class="login-forgot text-center mt-2">
                <a href="#"><small><i>Forgot your password?</i></small></a>
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
   layout:'login',
   middleware: 'notAuthenticated',

  data() {
    return {
      credentials: {
        email: process.env.NODE_ENV === 'development'? process.env.username: '',
        password: process.env.NODE_ENV === 'development'? process.env.password: '',
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

     version(){
      return process.env.version
    },
  },
  methods: {
    async onLogin() {
      this.$v.credentials.$touch()
      if (!this.$v.credentials.$invalid) {
        this.loading.msg = "Loading..."
        this.loading.status = true;

        try {
          const res = await this.$store.dispatch('login', this.credentials)
          localStorage.setItem('currentUser', JSON.stringify(res.data.user));
          await this.$store.dispatch('getVersion')
          this.loading.status = false
          this.$router.push(`/dashboard`)
        } catch (e) {
          this.loading.status = false
          this.msg.credentials = e.response.data.message
          return false
        }
      }
    }
  }
}
</script>

<style scoped>

html {
  font-size: 62.5%;
}

.card.shadow{
  background: #ececec;
  border: 1px solid #d7d9d9;
}
img{
  width:50%
}
</style>
