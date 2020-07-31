<template>
  <div class="content-container">
    <SideNav page="preferences" app="preferences"></SideNav>
    <div class="content-right">
      <h2>Preferences</h2>

      <div style="max-width:1200px">
        <div class="row gutters-sm">
          <div class="col-md-3 d-none d-md-block">
            <div class="card">
              <div class="card-body">
                <nav class="nav flex-column nav-pills nav-gap-y-1">
                  <a
                    href="#"
                    @click="tabIndex = 0"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 0 }"
                  >
                    <b-icon icon="person" font-scale="1.5" class="mr-2"></b-icon
                    >Personal Information
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 1"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 1 }"
                  >
                    <b-icon icon="flag" font-scale="1.5" class="mr-2"></b-icon
                    >Your Location
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 2"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 2 }"
                  >
                    <b-icon
                      icon="shield-lock"
                      font-scale="1.5"
                      class="mr-2"
                    ></b-icon
                    >Security
                  </a>
                  <a
                    href="#"
                    @click="tabIndex = 3"
                    class="nav-item nav-link has-icon nav-link-faded"
                    :class="{ active: tabIndex == 3 }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-bell mr-2"
                    >
                      <path
                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                      ></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg
                    >Notification
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <b-card no-body>
              <b-tabs v-model="tabIndex" id="not-show-on-large-screens" card>
                <b-tab active>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      ></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </template>
                  <h6>YOUR PROFILE INFORMATION</h6>
                  <hr />
                  <form @submit="updatePersonalInfo">
                    <div class="row">
                      <div class="col-md-3 text-center">
                        <img
                          class="mt-3"
                          :src="imagePlaceholder"
                          style="width: 100%;border:1px solid #999999"
                          alt=""
                        />
                        <label class="image-file-upload">
                          <input
                            type="file"
                            accept="image/*"
                            class="input"
                            ref="image"
                            @change="previewImage($event)"
                          />
                          Edit
                        </label>
                      </div>
                      <div class="col-md-9">
                        <div class="row">
                          <div class="col-md-8">
                            <b-form-group label="First Name:">
                              <b-form-input
                              size="sm"
                                v-model="personalInfo.firstName"
                                required
                              ></b-form-input>
                            </b-form-group>
                          </div>
                          <div class="col-md-4">
                            <b-form-group label="First Name Alias:">
                              <b-form-input
                              size="sm"
                                v-model="personalInfo.firstNameAlias"
                                placeholder="Your nick name"
                              ></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                        <b-form-group label="Middle Name:">
                          <b-form-input
                          size="sm"
                            v-model="personalInfo.middleName"
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group label="Last Name:">
                          <b-form-input
                            v-model="personalInfo.lastName"
                            size="sm"
                            required
                          ></b-form-input>
                        </b-form-group>
                        <div class="row">
                          <div class="col-md-6">
                            <b-form-group label="Phone:">
                              <b-form-input
                                v-model="personalInfo.phone"
                                size="sm"
                                required
                              ></b-form-input>
                            </b-form-group>
                          </div>
                          <div class="col-md-6">
                            <b-form-group label="Email:">
                              <b-form-input size="sm" v-model="personalInfo.email"></b-form-input>
                            </b-form-group>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="float-right mb-3">
                      <button type="reset" class="btn btn-light">Reset</button>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-settings"
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path
                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                      ></path>
                    </svg>
                  </template>
                  <h6>YOUR LOCATION</h6>
                  <hr />
                  <form @submit="updateLocationInfo">
                    <b-form-group label="Location:" >
                      <b-form-select
                          size="sm"
                          :disabled="disable"
                          v-model="locationInfo.locationId"
                          :class="{ 'validation-error': $v.locationInfo.locationId.$error }"
                          :options="locations"
                          ref="locationInput"
                          value-field="_id"
                          text-field="name"
                          @input="getBuildings"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group label="Building:" >
                      <b-form-select
                          size="sm"
                          type="text"
                          placeholder="Building"
                          v-model="locationInfo.buildingId"
                          :disabled="disable"
                          :options="buildings"
                          ref="buildingInput"
                          value-field="_id"
                          text-field="name"
                          @input="getFloors"
                        ></b-form-select>
                    </b-form-group>
                    <b-row>
                      <div class="col-md-6">
                        <b-form-group label="floor:" >
                      <b-form-select
                          size="sm"
                          v-model="locationInfo.floorId"
                          :disabled="disable"
                          :options="floors"
                          value-field="_id"
                          text-field="name"
                        ></b-form-select>
                    </b-form-group>
                      </div>
                      <div class="col-md-6">
                        <b-form-group label="Room / Mail Stop:" >
                      <b-form-input
                        size="sm"
                        class="mb-2"
                        :disabled="disable"
                      ></b-form-input>
                    </b-form-group>
                      </div>
                    </b-row>

                    <b-form-group label="Department:" >
                      <b-form-select
                          size="sm"
                          type="text"
                          v-model="locationInfo.departmentId"
                          :options="departments"
                          :disabled="disable"
                          placeholder="Department"
                          value-field="_id"
                          text-field="name"
                        ></b-form-select>
                    </b-form-group>
                    <div class="float-right mb-3">
                      <button type="reset" class="btn btn-light">Reset</button>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </div>
                  </form>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-shield"
                    >
                      <path
                        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      ></path>
                    </svg>
                  </template>
                  <h6>SECURITY SETTINGS</h6>
                  <hr />
                  <form @submit="updateCredentials">
                    <div class="form-group">
                      <label class="d-block">Change Password</label>
                      <input
                        ttype="password"
                        v-model="creds.oldPassword"
                        class="form-control"
                        placeholder="Enter your old password"
                      />
                      <input
                        type="password"
                        :class="{ 'form-error': $v.creds.password.$error }"
                        @blur="$v.creds.password.$touch()"
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
                         @blur="$v.creds.confirmPassword.$touch()"

                        class="form-control mt-1"
                        placeholder="Confirm new password"
                      />
                      <div v-if="!$v.creds.confirmPassword.sameAsPassword">
                      <span class="error-text"
                        >Passwords must be identical.</span
                      >
                    </div>
                    </div>
                    <button
                      class="btn btn-sm btn-primary float-right"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                  <br />
                  <hr />
                  <form>
                    <b-form-group label="Security Role:" >
                      <b-form-select
                          size="sm"
                         v-model="securityRoleId"
                          :options="securityRoles"
                          :disabled="disable"
                          value-field="_id"
                          text-field="name"
                        ></b-form-select>
                    </b-form-group>
                    <button
                      class="btn btn-sm btn-primary float-right"
                      type="submit"
                    >
                      Update
                    </button>
                    <br>
                  </form>
                </b-tab>
                <b-tab>
                  <template v-slot:title>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-bell"
                    >
                      <path
                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                      ></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </template>
                  <h6>NOTIFICATION SETTINGS</h6>
                  <hr />
                  <form>
                    <div class="form-group">
                      <label class="d-block mb-0">Email Notifications</label>
                      <div class="small text-muted mb-3">
                        Receive alert notifications via email
                      </div>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                          checked=""
                        />
                        <label class="custom-control-label" for="customCheck1"
                          >Email each time a an event is registered for a Package</label
                        >
                      </div>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck2"
                          checked=""
                        />
                        <label class="custom-control-label" for="customCheck2"
                          >Email Only when package is received and delivered</label
                        >
                      </div>
                    </div>
                    <div class="form-group mb-0">
                      <label class="d-block">SMS Notifications</label>
                       <div class="small text-muted mb-3">
                        Receive alert notifications via text messages(carrier charges may apply)
                      </div>
                      <ul class="list-group list-group-sm">
                        <li class="list-group-item has-icon">
                          Received
                          <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch1"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch1"
                            ></label>
                          </div>
                        </li>
                        <li class="list-group-item has-icon">
                          Delivered
                          <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch2"
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch2"
                            ></label>
                          </div>
                        </li>
                        <li class="list-group-item has-icon">
                          All Events
                          <div
                            class="custom-control custom-control-nolabel custom-switch ml-auto"
                          >
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch4"
                              checked=""
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch4"
                            ></label>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </form>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SideNav from '@/components/shared//SideNav'
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

export default {
  middleware: ['authenticated'],
  components: {
    SideNav
  },
  computed: {
    ...mapState({
      locations: state => state.locations.locations,
      buildings: state => state.buildings.buildings,
      floors: state => state.floors.floors,
      departments: state => state.departments.departments,
      securityRoles: state => state.securityRoles.securityRoles,

    })
  },
  data() {
    return {
      disable: true,
      tabIndex: 0,

      personalInfo: {
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        firstNameAlias: '',
        useFirstNameAlias: false,
        email: '',
        phone: '',
        image: null,
      },
      locationInfo: {
        id: '',
        locationId: null,
        departmentId: null,
        buildingId: null,
        floorId: null,

      },
      creds:{
        id: '',
        oldPassword:"",
        password:"",
        confirmPassword:"",
      },
      securityRoleId: null,
      imagePlaceholder: 'http://ssl.gstatic.com/accounts/ui/avatar_1x.png'
    }
  },
  validations: {
   personalInfo: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        email,
        required
      }
    },
    locationInfo:{
      locationId: {
        required
      },
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
  created() {
    this.getLocations()
    this.getSecurityRoles()
    this.getCurrentUser(this.$store.state.currentUser)

  },
  methods: {
   async getCurrentUser(currentUser){
      this.personalInfo.id = currentUser._id
      this.personalInfo.firstName = currentUser.firstName
      this.personalInfo.middleName = currentUser.middleName
      this.personalInfo.lastName = currentUser.lastName
      this.personalInfo.firstNameAlias = currentUser.firstNameAlias
      this.personalInfo.useFirstNameAlias = currentUser.useFirstNameAlias
      this.personalInfo.email= currentUser.email
      this.personalInfo.phone= currentUser.phone
      this.personalInfo.image= currentUser.imageUrl
      this.imagePlaceholder= currentUser.imageUrl
      this.locationInfo.locationId= currentUser.location
      if(currentUser.building != null) {
        await this.getBuildings(currentUser.location)
        this.locationInfo.buildingId= currentUser.building
        this.locationInfo.floorId= currentUser.floor
      }
      if(currentUser.department != null) {
        await this.getDepartments(currentUser.location)
        this.locationInfo.departmentId= currentUser.department
      }
       this.securityRoleId= currentUser.securityRole
    },
    async getSecurityRoles() {
      await this.$store.dispatch('securityRoles/getSecurityRoles')
    },
    async getLocations() {
      await this.$store.dispatch('locations/getLocations')
    },
    async getBuildings(lid) {
      const locationId = lid || this.locationInfo.locationId
      if (locationId != null) {
      await this.$store.dispatch('buildings/getBuildings', `?lid=${locationId}`)

      } else {
        this.$store.commit('buildings/setBuildings', [])
      }
      this.getDepartments(locationId)
    },
    async getFloors(bid) {
      const buildingId = bid || this.locationInfo.buildingId
      if (buildingId != null) {
        await this.$store.dispatch('floors/getFloors', `?bid=${buildingId}`)
      } else {
         this.$store.commit('floors/setFloors', [])
      }
    },
    async getDepartments(lid) {
      const locationId = lid || this.locationInfo.locationId
      if (locationId != null) {
        await this.$store.dispatch('departments/getDepartments', `?lid=${locationId}`)
      } else {
        this.$store.commit('departments/setDepartments', [])
      }
    },

    updatePersonalInfo(e) {
      e.preventDefault()
      this.$v.personalInfo.$touch()
      if (!this.$v.personalInfo.$invalid) {
        this.personalInfo.useFirstNameAlias = this.personalInfo.firstNameAlias != '' ? true : false
        this.$store.dispatch('contacts/patchContact', this.personalInfo)
        .then(res =>{
            if(res.message){
            this.$toasted.success("Success! Please logout and back in for changes to take affect", {
            duration: 3000,
            position: 'top-center'
            })
          }
        }) .catch(e => {
            this.$toasted.error(e.data.message, {
            duration: 3000,
            position: 'top-center'
            })
        })
        }
    },
    updateLocationInfo(e) {
      e.preventDefault()
      this.$v.locationInfo.$touch()
      if (!this.$v.locationInfo.$invalid) {
        this.locationInfo.id = this.personalInfo.id
        this.$store.dispatch('contacts/patchContact', this.locationInfo)
        .then(res =>{
          debugger
            this.$toasted.success(res.message, {
            duration: 3000,
            position: 'top-center'
            })
        }) .catch(e => {
          debugger
            this.$toasted.error(e.data.message, {
            duration: 3000,
            position: 'top-center'
            })
        })
        }
    },
    updateCredentials(e) {
      e.preventDefault()
      this.$v.personalInfo.$touch()
      if (!this.$v.creds.$invalid) {
        debugger
        this.$store.$axios.post('/changePassword', {
          password: this.creds.oldPassword,
          newPassword: this.creds.password
        })
        .then(res =>{
          this.creds.oldPassword = ''
          this.creds.password = ''

          if(res.message){
            this.$toasted.success(res.data.message, {
            duration: 3000,
            position: 'top-center'
            })
          }
        })
        .catch(e => {
            this.$toasted.error(e.response.data.message, {
            duration: 3000,
            position: 'top-center'
            })
        })
        }
    },
    previewImage() {
      const input = this.$refs.image
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imagePlaceholder = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.imagePlaceholder = files[0]
      }
      this.personalInfo.image = files[0]
    },

  }
}
</script>
<style scoped>
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
.main-body {
  padding: 15px;
}

.nav-link {
  color: #4a5568;
}
.nav-link.active {
  color: white !important;
}
.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*='col-'] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}
.image-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 2px 12px;
  cursor: pointer;
  width: 100%;
  background: #007bfe;
  color: #fff;
  margin-top: 1px;
}

.image-wrapper {
  margin: auto;
  display: inline-flex;
  width: 96px;
}
input[type='file'] {
  display: none;
}

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
