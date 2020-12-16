<template>
  <b-overlay :show="overlay" rounded="sm">
      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-card>
            <b-skeleton animation="wave" width="85%"></b-skeleton>
            <b-skeleton animation="wave" width="55%"></b-skeleton>
            <b-skeleton animation="wave" width="70%"></b-skeleton>
            <br />
            <b-skeleton animation="wave" width="85%"></b-skeleton>
            <b-skeleton animation="wave" width="55%"></b-skeleton>
            <b-skeleton animation="wave" width="70%"></b-skeleton>
          </b-card>
        </template>

          <b-card class="bg-light my-2 mx-1" v-if="isCurrentUser">
            <form @submit="updateCredentials">
              <div class="form-group">
                <label class="d-block">Change Password</label>
                <input
                  type="password"
                  v-model="creds.oldPassword"
                  class="form-control"
                  placeholder="Enter your old password"
                />
                <input
                  type="password"
                  :class="{ 'form-error': $v.creds.password.$error }"
                  v-model.trim="creds.password"
                  class="form-control mt-1"
                  placeholder="New password"
                />
                <div v-if="$v.creds.password.$error" class="">
                <span
                  v-if="!$v.creds.password.required"
                  class="error-text"
                  >Password is required</span
                >
                <span
                  v-if="!$v.creds.password.minLength"
                  class="error-text"
                  >Password must have at least{{
                    $v.creds.password.$params.minLength.min
                  }}letters.</span
                >
              </div>
                <input
                  type="password"
                  v-model.trim="creds.confirmPassword"
                  :class="{ 'form-error': $v.creds.confirmPassword.$error }"
                  class="form-control mt-1"
                  placeholder="Confirm new password"
                />
                <div v-if="!$v.creds.confirmPassword.sameAsPassword">
                <span class="error-text"
                  >Passwords must be identical.</span
                >
              </div>
              <b-button size="sm" type="submit" variant="primary" class="mt-2 float-right">Update</b-button>
              </div>
            </form>
          </b-card>

          <b-list-group class="m-1" v-else>
            <b-list-group-item  class="d-flex w-100 justify-content-between bg-light" >
              <span class="mr-auto">Password Reset</span>
              <b-button size="sm" @click="sendPasswordReset" variant="danger">Reset</b-button>
            </b-list-group-item>
          </b-list-group>


        <b-card class="bg-light m-1" v-if="!isCurrentUser">
          <form
          @submit="updateSecurity">
              <b-list-group class="my-1" >
                <b-list-group-item  class="d-flex w-100 justify-content-between">
                  <span class="mr-auto">Active</span>
                  <b-form-checkbox v-model="isActive" name="check-button" size="lg" switch></b-form-checkbox>
                </b-list-group-item>

              </b-list-group>

              <b-list-group class="my-1">

                <b-list-group-item
                  class="d-flex w-100 justify-content-between"
                >
                  <span class="mr-auto">Security Role</span>
                <b-form-select
                size="sm"
                :class="{ 'validation-error': $v.securityRoleId.$error }"
                v-model="securityRoleId"
                :options="securityRoles"
                value-field="_id"
                text-field="name"
                style="max-width: 250px;"

              ></b-form-select>
                </b-list-group-item>
              </b-list-group>
            <button class="btn btn-sm btn-primary float-right" type="submit">
              Update
            </button>
          </form>
        </b-card>
      </b-skeleton-wrapper>
    </b-overlay>
</template>

<script>
import { mapState } from 'vuex'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
export default {
  props: ['user', 'isCurrentUser'],
  computed: {
    ...mapState({
      securityRoles: state => state.securityRoles.securityRoles
    }),

  },
  data() {
    return {
      loading:true,
      overlay: false,
      isActive:false,
      securityRoleId: null,
      isPendingApproval: false,
      creds:{
        id: '',
        oldPassword:"",
        password:"",
        confirmPassword:"",
      },
    }
  },
  async mounted(){


  setTimeout(async ()=>{
       await this.$store.dispatch('securityRoles/getSecurityRoles')
       this.getSecurityInfo()
       this.loading = false
    }, 900)
  },
  validations: {
      securityRoleId: {
        required
      },
      creds: {
       password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {

    getSecurityInfo(){
      this.isActive = !this.user.isInactive
      this.isPendingApproval = this.user.isPendingApproval
      if(this.user.securityRole != null){
        this.securityRoleId = this.user.securityRole._id
      }
    },
    async updateSecurity(e) {
      e.preventDefault()

      this.$v.securityRoleId.$touch()
      if (!this.$v.securityRoleId.$invalid) {
        if(this.isActive) this.isPendingApproval = false
        this.overlay = true
        try {
           const res = await this.$store.dispatch('users/patchUser', {
              id:this.user._id,
              isInactive: !this.isActive,
              isPendingApproval: this.isPendingApproval,
              securityRoleId: this.securityRoleId
            })
          this.$emit('refresh', res.user._id)
          this.$brynkaToast(res.message, 'success')
          this.overlay = false
        } catch (error) {
          this.$brynkaToast(error, 'danger')
          this.overlay = false
        }
      } else {
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },
    async updateCredentials(e){
        e.preventDefault()
      this.$v.creds.$touch()
      if (!this.$v.creds.$invalid) {
        this.overlay = true

        try {
          const res = await this.$store.$axios.post('/changePassword', {
          password: this.creds.oldPassword,
          newPassword: this.creds.password
          })

          this.$brynkaToast(res.data.message, "success")
          this.$nextTick(() => {
            this.creds.oldPassword = ''
            this.creds.password = ''
            this.creds.confirmPassword = ''
            this.overlay = false
            this.$v.creds.$reset()
          })

        } catch (error) {
          this.$brynkaToast(error.response, 'danger')
          this.overlay = false
        }

      } else {
       this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },
    async sendPasswordReset(e){
      e.preventDefault()

      this.overlay = true
      try {
        const res = await this.$axios.post('/requestPasswordReset', { email: this.user.email})
        this.$brynkaToast(res.data.message, 'success')
        this.overlay = false
      } catch (error) {
        this.$brynkaToast(error, 'danger')
        this.overlay = false
      }

    }

  }
}
</script>

<style scoped>
.validation-error {
  border: 1px solid #f44336;
  color: red;
}
.validation-error::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}

.validation-error:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}
</style>
