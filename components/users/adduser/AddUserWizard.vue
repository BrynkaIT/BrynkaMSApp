<template>
  <div class="container">
    <form-wizard
      :title="formToOpen.title"
      class="mt-2"
      color="#007bff"
      subtitle="Create a user from an existing contact or from scratch"
      @on-complete="onSubmit"
      :startIndex="startIndex"
    >
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        :variant="message.variant"
        @dismiss-count-down="countDownChanged"
      >
        {{ message.text }}
      </b-alert>
      <!-- 1st Tab -->
      <tab-content title="User's Email" :before-change="firstTab">
        <div class="text-center" v-if="spinner">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div class="container" v-if="!foundContacts">
          <div class="col-md-12">
            <div class="input-group mb-3">
              <b-form-input
                type="text"
                class="form-control"
                ref="searchEmailInput"
                v-model="user.email"
                placeholder="Enter email Address"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div v-if="foundContacts">
          <h3 class="text-center text-primary mt-5">
            We found {{ contacts.length }} contacts with that email address.
          </h3>
          <p class="text-center">
            Convert one of these contacts to make a user.
          </p>
          <ul class="list-group">
            <li
              class="list-group-item nav-link"
              v-for="contact in contacts"
              :key="contact._id"
            >
              <span class="menu-icon">
                <img
                  v-if="contact.imageUrl != ''"
                  style="max-width:32px; border-radius:360px;"
                  :src="contact.imageUrl"
                />
              </span>
              <span class="menu-title">
                <i> {{ contact.fullName }}</i> -
              </span>
              <span>
                &nbsp; Location: {{ contact.location.name }} &nbsp; - SystemID:
                {{ contact._id }}
              </span>
              <span style="position: absolute;right: 5px;">
                <a
                  href="#"
                  class="btn btn-sm btn-primary"
                  @click="selectAUser(contact)"
                >
                  <b-icon
                    icon="check"
                    v-if="contact._id == selectedContact"
                  ></b-icon>
                  <span v-if="contact._id != selectedContact">Select</span>
                </a>
              </span>
            </li>
          </ul>
          <h3 class="text-center text-primary">OR</h3>
          <ul class="list-group">
            <li class="list-group-item nav-link">
              <h4>Create from Scratch</h4>
              <span style="position: absolute;right: 5px;">
                <a
                  href="#"
                  class="btn btn-sm btn-primary"
                  @click="createUserFromScratch"
                >
                  <b-icon icon="check" v-if="selectedContact == 'new'"></b-icon>
                  <span v-if="selectedContact != 'new'">Select</span>
                </a>
              </span>
            </li>
          </ul>
        </div>
      </tab-content>
      <!-- 2nd Tab -->
      <tab-content title="Contact Info" :before-change="secondTab">
        <br />
        <b-row>
          <div class="col-md-2 text-center">
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
          <div class="col-md-5">
            <div class="mb-1 "><h6>Personal Info</h6></div>

            <div class="mb-2">
              <b-form-input
                v-model="user.firstName"
                size="sm"
                placeholder="First name"
                :class="{ 'validation-error': $v.user.firstName.$error }"
                @blur="$v.user.firstName.$touch()"
              ></b-form-input>
            </div>
            <div class="mb-2">
              <b-form-input
                v-model="user.middleName"
                size="sm"
                placeholder="Middle"
              ></b-form-input>
            </div>
            <div class="mb-2">
              <b-form-input
                v-model="user.lastName"
                size="sm"
                placeholder="Last "
                :class="{ 'validation-error': $v.user.lastName.$error }"
                @blur="$v.user.lastName.$touch()"
              ></b-form-input>
            </div>

            <div class="mb-2">
              <b-form-input
                v-model="user.firstNameAlias"
                size="sm"
                placeholder="First Name Alias"
              ></b-form-input>
            </div>

            <div class="row">
              <div class="col-md-6">
                <b-form-input
                  v-model="user.email"
                  size="sm"
                  class="mb-2"
                  type="email"
                  placeholder="Email"
                ></b-form-input>
              </div>
              <div class="col-md-6">
                <b-form-input
                  v-model="user.phone"
                  size="sm"
                  class="mb-2"
                  type="tel"
                  v-mask="'(###) ###-####'"
                  placeholder="Phone"
                ></b-form-input>
              </div>
            </div>

            <hr />
          </div>
          <div class="col-md-5">
            <div class="internal">
              <div class="mb-1 "><h6>Office Location</h6></div>

              <b-input-group class="mb-2">
                <b-form-select
                  size="sm"
                  v-model="user.locationId"
                  :class="{ 'validation-error': $v.user.locationId.$error }"
                  @blur="$v.user.locationId.$touch()"
                  :options="locations"
                  ref="locationInput"
                  value-field="_id"
                  text-field="name"
                  @input="getBuildings"
                ></b-form-select>
              </b-input-group>

              <b-input-group class="mb-2">
                <b-form-select
                  size="sm"
                  type="text"
                  placeholder="Building"
                  v-model="user.buildingId"
                  :disabled="$v.user.locationId.$invalid"
                  :options="buildings"
                  :class="{ 'validation-error': $v.user.buildingId.$error }"
                  @blur="$v.user.buildingId.$touch()"
                  ref="buildingInput"
                  value-field="_id"
                  text-field="name"
                  @input="getFloors"
                ></b-form-select>
              </b-input-group>

              <b-input-group class="mb-2">
                <b-form-select
                  size="sm"
                  v-model="user.floorId"
                  :disabled="$v.user.buildingId.$invalid"
                  :options="floors"
                  value-field="_id"
                  text-field="name"
                ></b-form-select>
              </b-input-group>

              <b-form-input
                size="sm"
                class="mb-2"
                placeholder="Room"
                :disabled="$v.user.buildingId.$invalid"
              ></b-form-input>

              <b-input-group>
                <b-form-select
                  size="sm"
                  type="text"
                  v-model="user.departmentId"
                  :options="departments"
                  :disabled="$v.user.locationId.$invalid"
                  placeholder="Department"
                  value-field="_id"
                  text-field="name"
                ></b-form-select>
              </b-input-group>
            </div>
          </div>
        </b-row>
        <br />
      </tab-content>
      <!-- 3rd Tab -->
      <tab-content title="Security">
        <b-form-group
          id="input-group-3"
          label="Security Role:"
          label-for="input-3"
        >
          <b-form-select
            id="input-3"
            v-model="user.securityRoleId"
            :options="securityRoles"
            value-field="_id"
            text-field="name"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-3" label="Is Active?" label-for="input-3">
          <b-form-checkbox switch size="md" v-model="isActive"
            >Active</b-form-checkbox
          >
        </b-form-group>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import {
  email,
  required,
  requiredUnless,
  requiredIf
} from 'vuelidate/lib/validators'

export default {
  components: {
    FormWizard,
    TabContent
  },
  computed: {
    ...mapState({
      locations: state => state.locations.locations,
      buildings: state => state.buildings.buildings,
      floors: state => state.floors.floors,
      departments: state => state.departments.departments,
      securityRoles: state => state.securityRoles.securityRoles,
      formToOpen: state => state.formToOpen
    }),
     baseUrl(){
      return process.env.baseURL
    }
  },
  data() {
    return {
      hidden: true,
      disable: false,
      show: true,
      isActive: false,
      message: {
        text: 'testing',
        variant: ''
      },
      dismissSecs: 4,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      showCreateFromScratchAlert: false,
      contacts: [],

      user: {
        id: '',
        fromContact: '',
        firstName: '',
        middleName: '',
        lastName: '',
        firstNameAlias: '',
        useFirstNameAlias: false,
        email: '',
        phone: '',
        image: '/img/avatar-placeholder.png',
        locationId: null,
        departmentId: null,
        buildingId: null,
        floorId: null,
        securityRoleId: null,
        isInactive: false
      },
      imagePlaceholder: '/img/avatar-placeholder.png',
      spinner: false,
      foundContacts: false,
      selectedContact: null,
      userInContext: null,
      isUserToEdit: false,
      startIndex: 0
    }
  },
  validations: {
    user: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      locationId: {
        required
      },
      buildingId: {
        required
      }
    }
  },
  created() {
    this.getLocations()
    this.getSecurityRole()
    if (this.formToOpen.data) {
      this.hidden = false
      this.disable = true
      this.isUserToEdit = true
      this.startIndex = 1
      this.populateUser(this.formToOpen.data)
    }
  },
  methods: {
    async searchContact() {
      const email = this.user.email

      try {
        if (email === '') return
        this.spinner = true
        const userResults = await this.$store.dispatch(
          'users/getUsers',
          `?email=${email}&deep=true`
        )

        if (userResults.users.length > 0) {
          this.showAlert('This person is already a User!!', 'danger')
          setTimeout(() => {
            this.spinner = false
          }, 700)
          return
        }

        const contactResults = await this.$store.dispatch(
          'contacts/getContacts',
          `?email=${email}&deep=true`
        )

        if (contactResults.contacts.length > 0) {
          this.contacts = contactResults.contacts
          this.foundContacts = true
          setTimeout(() => {
            this.spinner = false
          }, 700)
        } else {
          return true
          this.$children[0].nextTab()
        }
      } catch (error) {
        this.showAlert(error, 'warning')
      }
    },
    selectAUser(contact) {
      ;(this.selectedContact = contact._id), (this.userInContext = contact)
    },
    createUserFromScratch() {
      this.selectedContact = 'new'
    },
    async populateUser(contact) {
      this.hidden = false
      this.disable = true

      if (this.userInContext != null) this.user.fromContact = contact._id
      else this.user.id = contact._id

      this.user.firstName = contact.firstName
      this.user.middleName = contact.middleName
      this.user.lastName = contact.lastName
      this.user.firstNameAlias = contact.firstNameAlias
      this.user.email = contact.email
      this.user.phone = contact.phone
      this.imagePlaceholder = contact.imageUrl ? this.baseUrl+contact.imageUrl : '/img/avatar-placeholder.png'
      this.user.locationId = contact.location._id || contact.location
      if (contact.department)
        this.user.departmentId = contact.department_id || contact.department
      await this.getBuildings(contact.location._id || contact.location)
      if (contact.building)
        this.user.buildingId = contact.building._id || contact.building
      if (contact.floor) this.user.floorId = contact.floor._id || contact.floor
      this.user.securityRoleId = contact.securityRole || null
      this.isActive = !contact.isInactive
    },
    async getSecurityRole() {
      await this.$store.dispatch('securityRoles/getSecurityRoles')
    },
    async getLocations() {
      await this.$store.dispatch('locations/getLocations')
    },
    async getBuildings(lid) {
      const locationId = lid || this.contact.locationId
      if (locationId != null) {
       await this.$store.dispatch('buildings/getBuildings', `?lid=${locationId}`)

      } else {
        this.$store.commit('buildings/setBuildings', [])
      }
      this.getDepartments(locationId)
    },
    async getFloors(bid) {
      const buildingId = bid || this.contact.buildingId
      if (buildingId != null) {
        await this.$store.dispatch('floors/getFloors', `?bid=${buildingId}`)
      } else {
         this.$store.commit('floors/setFloors', [])
      }
    },
    async getDepartments(lid) {
      const locationId = lid || this.contact.locationId
      if (locationId != null) {
        await this.$store.dispatch('departments/getDepartments', `?lid=${locationId}`)
      } else {
        this.$store.commit('departments/setDepartments', [])
      }
    },
    firstTab() {
      if (this.selectedContact === null) {
        return this.searchContact()
      }
      if (this.selectedContact === 'new') {
        return true
      } else {
        this.populateUser(this.userInContext)
        return true
      }
    },
    secondTab() {
      this.$v.user.$touch()
      if (!this.$v.user.$invalid) {
        return true
      } else {
        return false
      }
    },
    async onSubmit() {
      this.user.isInactive = !this.isActive
      this.user.isPendingApproval = !this.isActive
      this.user.useFirstNameAlias = this.user.firstNameAlias == undefined || this.user.firstNameAlias == '' ? false: true

      if (this.isUserToEdit) return this.onUpdate()

      try {
        const res = await this.$store.dispatch('users/postUser', this.user)

        this.$emit('refreshUsers')
        this.$brynkaToast(res.message, 'success')
        this.$store.commit('closeModal')

       } catch (error) {
          this.$brynkaToast(error, 'danger')
       }
    },
    async onUpdate() {

       try {
        const res = await this.$store.dispatch('users/patchUser', this.user)
        this.$emit('refreshUsers')
        this.$brynkaToast(res.message, 'success')
        this.$store.commit('closeModal')

       } catch (error) {
          this.$brynkaToast(error, 'danger')
       }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(message, variant) {
      this.message.text = message
      this.message.variant = variant
      this.dismissCountDown = this.dismissSecs
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
      this.user.image = files[0]
    }
  }
}
</script>
<style>
.vue-form-wizard {
  padding-bottom: 20px;
  border: 1px solid #ccc;
  background: #fafafa;
  padding: 10px;
}
.vue-form-wizard .nav-link {
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-align-items: center;
  align-items: center;
  white-space: nowrap;
  padding: 0.8rem 1.188rem;
  color: #a3a3a3 !important;
  -webkit-transition-duration: 0.45s;
  -moz-transition-duration: 0.45s;
  -o-transition-duration: 0.45s;
  transition-duration: 0.45s;
  transition-property: color;
  -webkit-transition-property: color;
  height: 46px;
  padding-left: 30px;
}

.vue-form-wizard .nav-link:hover,
.menu-icon:hover {
  color: #000 !important;
  background: none !important;
}
.vue-form-wizard .wizard-header {
  background: #eee;
  margin-bottom: 5px;
}
.vue-form-wizard .wizard-card-footer {
  margin-top: 5px;
  background: #eee;
  padding: 15px;
}
.contactCard {
  margin: auto;
}
.contact-type-internal-only {
  position: relative;
  top: 5px;
  left: 4px;
  color: #007bff;
  font-weight: bolder;
  text-transform: uppercase;
  font-family: sans-serif;
}
.contact-type-btn-container {
  position: relative;
  left: 20px;
  top: 3px;
}
.contact-type-btn.select {
  font-size: 20px;
  font-weight: bolder;
  color: #007bff;
  text-transform: uppercase;
  font-family: sans-serif;
}
.contact-type-btn {
  color: #9e9e9e;
}
hr {
  transform: rotate(-90deg);
  position: absolute;
  right: -90px;
  top: 85px;
  color: #c0c0c0;
  z-index: 99999;
  width: 180px;
  border: 0.5px solid;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
.btn.btn-launch-form {
  border: 1px solid #ced4da;
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
hr {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  position: absolute;
  right: -90px;
  top: 101px;
  color: #c0c0c0;
  z-index: 99999;
  width: 176px;
  border: 0.5px solid;
}
.image-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 2px 12px;
  cursor: pointer;
  width: 100%;
  background: #bdbdbd;
  color: #fff;
  margin-top: 1px;
}

.image-wrapper {
  margin: auto;
  display: inline-flex;
  width: 96px;
}
</style>
