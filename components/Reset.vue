<template>
  <div class="w-100 text-white">

      <p class="text-dark">
        Remember, your new password <br />must be at least 6 characters long.
      </p>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group>
          <input
            :class="{ 'form-error': $v.form.password.$error }"
            class="form-control "
            type="password"
            placeholder="New Password"
            v-model.trim="form.password"
            required
          />
          <div v-if="$v.form.password.$error" class="">
            <span v-if="!$v.form.password.required" class="error-text"
              >Password is required</span
            >
            <span v-if="!$v.form.password.minLength" class="error-text"
              >Password must have at least{{
                $v.form.password.$params.minLength.min
              }}letters.</span
            >
          </div>
        </b-form-group>

        <b-form-group>
          <input
            :class="{
              'form-error': $v.form.confirmPassword.$error
            }"
            class="form-control"
            type="password"
            placeholder="Confirm New Password"
            v-model="form.confirmPassword"
          />
          <div v-if="!$v.form.confirmPassword.sameAsPassword">
            <span class="error-text">Passwords must be identical.</span>
          </div>
        </b-form-group>

        <b-button
          size="sm"
          type="submit"
          variant="primary"
          style="margin:10px 2px"
          >Submit</b-button
        >
      </b-form>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  middleware: 'notAuthenticated',
  layout: 'login',
  computed: {
    ...mapState({
      customer: state => state.customer,
      auth: state => state.auth.auth
    }),
    baseUrl() {
      return process.env.baseURL
    }
  },
  data() {
    return {
      form: {
        credentialsId: '',
        password: '',
        confirmPassword: ''
      },
      changeComplete: false
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    async onSubmit(evt) {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        evt.preventDefault()
        this.form.credentialsId = this.$route.query.c

        delete this.form.confirmPassword
        try {
          const { data } = await this.$store.dispatch('auth/resetPassword', {
            form: this.form,
            token: this.$route.query.t
          })

          this.$emit('response', true)
          this.$brynkaToast(data.message, 'success')

        } catch (error) {
            this.$emit('response', false)
          this.$brynkaToast(error, 'danger')
        }
      }
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.password = ''
      this.form.confirmPassword = ''
    }
  }
}
</script>

<style scoped>
button {
  border-radius: 5px;
  border: 1px solid #2196f3;
  background-color: #3c8dbc;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin: 15px;
}
button:hover {
  transform: scale(0.95);
  border: 2px solid #2ca973;
  background: #2ca973;
}
button:disabled {
  border: none;
  background-color: #ccc;
  color: #eeeeee;
  transform: none;
}

button:focus {
  outline: none;
}
button.overlay-btn {
  background-color: transparent;
  border-color: #000;
  color: #000;
}
button.overlay-btn:hover {
  background-color: #222d32;
  border-color: #000;
  color: #fff;
}
.error-text {
  display: block;
  color: #f44336;
  font-size: 11px;
}
.form-error {
  color: #f44336;
  background-color: #fff1f1;
  border: 1px solid #f44336;
}

p {
  font-size: 14px;

  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 7px 0;
}

.request-access {
  color: #ccc;
  font-style: italic;
}
.request-access:hover {
  color: rgb(10, 85, 247);
  text-decoration: underline;
  cursor: pointer;
}
</style>
