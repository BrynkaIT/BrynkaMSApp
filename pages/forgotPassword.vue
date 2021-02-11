<template>
  <div class="content-container">
    <div class="content-right" style="padding:20px">
      <b-container style="margin-top:20%">
         <b-overlay :show="showOverlay" variant="dark" style="max-width:600px;margin:auto">
        <b-card class="left-panel">
          <b-card-body>

            <div style="text-align:center">
              <img src="../assets/images/brynkaManagerLogo-sm.png"  />
            </div>
            <hr />
            <div>
            <p class="text-dark">Forgot your password?</p>

              <b-form @submit="onSubmit" >
                <b-input-group>
                  <b-form-input
                    v-model="email"
                    :class="{ 'form-error': $v.email.$error }"
                    @blur="$v.email.$touch()"
                    type="email"
                    required
                    placeholder="Email"
                  ></b-form-input>
                  <b-input-group-append>
                  <b-button variant="primary" type="submit">Submit</b-button>
                </b-input-group-append>
                </b-input-group>
                <div v-if="!$v.email.email">
                  <span class="error-text">Please enter a valid email address</span>
                </div>
                <div v-else>
                  <small class="text-muted">Enter the email associated with your account</small>
                </div>
              </b-form>
            </div>

          </b-card-body>
        </b-card>
        </b-overlay>
      </b-container>
    </div>
  </div>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  middleware: 'notAuthenticated',
  // transition: 'tile',
  layout:'login',
  computed: {
    ...mapState({
      customer: state => state.customer,
      auth: state => state.auth.auth
    })
  },
  components: {},
  data() {
    return {
      showOverlay: false,

      email: '',
      companyName:''
    }
  },
  validations: {
    email: {
      email,
      required
    }
  },
  methods: {
    async onSubmit(evt) {
      this.$v.email.$touch()
      if (!this.$v.email.$invalid) {
        evt.preventDefault()
        this.showOverlay = true
        try {
          const { data } = await this.$store.dispatch('auth/forgetPassword', {
            email: this.email
          })

          this.$brynkaToast(data.message, 'success')
          this.showOverlay = false

        } catch (error) {
          this.showOverlay = false

          this.$brynkaToast(error, 'danger')
        }
      }
    },

  }
}
</script>
<style scoped>
.card {
  color: #fff;
  max-width: 600px;
  margin: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.form-error {
  color: #f44336;
  background-color: #fff1f1;
  border: 1px solid #f44336;
}
.error-text {
  display: block;
  color: #f44336;
  font-size: 11px;
}
.left-panel {
  background-color: #e9ecef;
}
.left-panel-success {
  background-color: #447c03;
}
</style>
