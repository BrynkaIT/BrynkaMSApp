<template>
  <div class="container">
    <br />
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        :variant="message.variant"
        @dismiss-count-down="countDownChanged"
      >
        {{ message.text }}
      </b-alert>
    <b-card bg-variant="light contactCard">
      <b-row class="mb-2 p-2">
        <b-card-title class="ml-2">{{ formToOpen.title }}</b-card-title>
        <div class="contact-type-btn-container" v-if="!contactTypeControls">
          <a href="#" class="contact-type-btn" :class="{ select : internal }" @click="internal = true">Internal</a>&nbsp;|&nbsp;
          <a href="#" class="contact-type-btn" :class="{ select : !internal }" @click="internal = false">External</a>
        </div>

        <div class="" v-if="contactTypeControls">
        <span href="#" class="contact-type-internal-only" >- Internal</span>
        </div>
      </b-row>

      <form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-row>
          <div class="col-md-2 text-center">
            <img
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
            <div class="mb-1 mt-3"><h6>Personal Info</h6></div>

              <div class="mb-2">
                <b-form-input
                  v-model="contact.firstName"
                  size="sm"
                  placeholder="First name"
                  :class="{'validation-error': $v.contact.firstName.$error }"
                  @blur="$v.contact.firstName.$touch()"
                ></b-form-input>
              </div>
              <div class="mb-2" v-if="moreFields">
                <b-form-input
                  v-model="contact.middleName"
                  size="sm"
                  placeholder="Middle"
                ></b-form-input>
              </div>
              <div class="mb-2">
                <b-form-input
                  v-model="contact.lastName"
                  size="sm"
                  placeholder="Last "
                  :class="{'validation-error': $v.contact.lastName.$error }"
                  @blur="$v.contact.lastName.$touch()"
                ></b-form-input>
              </div>

            <div class="mb-2" v-if="moreFields">
              <b-form-input
                v-model="contact.firstNameAlias"
                size="sm"
                placeholder="First Name Alias"
              ></b-form-input>
            </div>
            <div class="mb-2" v-if="!internal">
              <b-form-input
                v-model="contact.company"
                size="sm"
                :class="{'validation-error': $v.contact.company.$error }"
                @blur="$v.contact.company.$touch()"
                placeholder="Company name"
              ></b-form-input>
            </div>

            <div class="row mb-1" >
              <div class="col-md-6">
                <b-form-input
                  v-model="contact.email"
                  size="sm"
                  class="mb-2"
                  type="email"
                  placeholder="Email"
                ></b-form-input>
              </div>
              <div class="col-md-6">
                <b-form-input
                  v-model="contact.phone"
                  size="sm"
                  class="mb-2"
                  type="tel"
                  v-mask="'(###) ###-####'"
                  placeholder="Phone"
                ></b-form-input>
              </div>
            </div>
            <div  v-if="moreFields  && internal" style="background:#fff;border:1px solid #ccc;border-radius:5px;padding: 5px;">
              <b-form-group label="Allow Notifications" style="color:#626262">
                <b-form-checkbox-group

                  :options="notificationOptions"
                  switches
                ></b-form-checkbox-group>
              </b-form-group>

            </div>
            <div>
              <small><a href="#" @click="moreFields = !moreFields">{{moreFields ? 'Less': 'More'}} Options</a></small>
              </div>
            <hr />
          </div>
          <div class="col-md-5">
              <div class="external" v-if="!internal">
                <div class="mb-1 mt-3"><h6>Address</h6></div>

                  <b-form-input
                    v-model="contact.address.street1"
                    size="sm"
                    class="mb-2"
                    placeholder="Street"
                    type="text"
                  ></b-form-input>


                  <b-form-input
                  class="mb-2"
                    v-model="contact.address.street2"
                    size="sm"
                    type="text"
                    placeholder="Apt/Suite"
                  ></b-form-input>

                <div class="row ">
                  <div class="col-md-4">
                    <b-form-input
                    class="mb-2"
                      v-model="contact.address.city"
                      type="text"
                      size="sm"
                      placeholder="City"
                    ></b-form-input>
                  </div>
                  <div class="col-md-4">
                    <b-form-select
                    class="mb-2"
                  size="sm"
                  type="text"
                  v-model="contact.address.state"
                  :options="states"
                  ref="statesInput"
                  text-field="name"
                  value-field="abbreviation"
                ></b-form-select>
                  </div>
                  <div class="col-md-4">
                    <b-form-input
                    class="mb-2"
                    size="sm"
                    type="text"
                    v-model="contact.address.postalCode"
                    placeholder="Zip"
                  ></b-form-input>
                  </div>
                </div>

                <div class="mb-2">
                  <b-form-input
                    size="sm"
                    placeholder="Country"
                  ></b-form-input>
                </div>
              </div>


              <div class="internal" v-if="internal">
                <div class="mb-1 mt-3"><h6>Office Location</h6></div>

                <b-input-group class="mb-2">
                  <b-form-select
                    size="sm"
                    v-model="contact.locationId"
                    :class="{ 'validation-error': $v.contact.locationId.$error }"
                    @blur="$v.contact.locationId.$touch()"
                    :options="locations"
                    ref="locationInput"
                    value-field="_id"
                    text-field="name"
                    @input="getBuildings"
                  ></b-form-select>
                  <b-input-group-append>
                    <b-button
                    variant="btn btn-launch-form"
                    @click="$store.commit('switchForm',{ title:'Add Location', to:'location', from:'contact'})"
                    size="sm"
                  >
                    <b-icon icon="plus" style="color: #7952b3;"></b-icon>
                    </b-button>
                </b-input-group-append>
              </b-input-group>

                <b-input-group class="mb-2">
                    <b-form-select
                      size="sm"
                      type="text"
                      placeholder="Building"
                      v-model="contact.buildingId"
                      :disabled="$v.contact.locationId.$invalid"
                      :options="buildings"
                      ref="buildingInput"
                      value-field="_id"
                      text-field="name"
                      @input="getFloors"
                    ></b-form-select>
                    <b-input-group-append>
                      <b-button
                        variant="btn btn-launch-form"
                        @click="$store.commit('switchForm',{ title:'Add Building', to:'building', from:'contact', data:contact})"
                        size="sm"
                        :disabled="$v.contact.locationId.$invalid"
                      >
                        <b-icon icon="plus" style="color: #7952b3;"></b-icon
                      ></b-button>
                    </b-input-group-append>
                  </b-input-group>
                <div class="row">
                  <div class="col-md-6">
                    <b-input-group class="mb-2">
                      <b-form-select
                        size="sm"
                        v-model="contact.floorId"
                        :disabled="$v.contact.buildingId.$invalid"
                        :options="floors"
                        value-field="_id"
                        text-field="name"
                      ></b-form-select>
                      <b-input-group-append>
                        <b-button
                          variant="btn btn-launch-form"
                           @click="$store.commit('switchForm',{ title:'Add Floors', to:'floors', from:'contact', data: contact })"
                          size="sm"
                          :disabled="$v.contact.buildingId.$invalid"
                        >
                          <b-icon icon="plus" style="color: #7952b3;"></b-icon
                        ></b-button>
                      </b-input-group-append>
                  </b-input-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-input
                      size="sm"
                      class="mb-2"
                      placeholder="Room"
                      :disabled="$v.contact.buildingId.$invalid"
                    ></b-form-input>
                  </div>
                </div>

                <b-input-group>
                  <b-form-select
                    size="sm"
                    type="text"
                    v-model="contact.departmentId"
                    :options="departments"
                    :disabled="$v.contact.locationId.$invalid"
                    placeholder="Department"
                    value-field="_id"
                    text-field="name"
                  ></b-form-select>
                  <b-input-group-append>
                    <b-button
                      variant="btn btn-launch-form"
                     @click="$store.commit('switchForm',{ title:'Add Department', to:'department', from:'contact', data: contact })"
                      size="sm"
                      :disabled="$v.contact.locationId.$invalid"
                    >
                      <b-icon icon="plus" style="color: #7952b3;"></b-icon
                    ></b-button>
                  </b-input-group-append>
                </b-input-group>
              </div>
          </div>
        </b-row>
        <br />
        <b-row style="float:right">
          <b-button type="reset" class="mr-1" size="sm">Reset</b-button>
          <b-button type="submit" variant="primary" size="sm">Submit</b-button>
        </b-row>
      </form>

    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import usaStates from '@/static/js/usaStates.json'
import { email, required, requiredUnless, requiredIf } from 'vuelidate/lib/validators'

export default {

  computed: {
    ...mapState({
      locations: state => state.locations.locations,
      buildings: state => state.buildings.buildings,
      floors: state => state.floors.floors,
      departments: state => state.departments.departments,
      formToOpen: state => state.formToOpen
    })

  },
  data() {
    return {
      contact: {
        id:'',
        company:'',
        firstName: '',
        middleName:'',
        lastName: '',
        firstNameAlias: '',
        useFirstNameAlias: false,
        email: '',
        phone: '',
        image: null,
        locationId: null,
        departmentId: null,
        address: {
          street1: '',
          street2: '',
          city: '',
          state: null,
          postalCode: ''
        },
        buildingId: null,
        floorId: null
      },
      internal: false,
      contactTypeControls:false,
      isContactToEdit:false,
      moreFields:false,
      imagePlaceholder: 'http://ssl.gstatic.com/accounts/ui/avatar_1x.png',
      attachedImage:null,
      show: true,
      showModal: false,
      mode: '',
      notificationOptions:[
        { text: 'Email', value: 'red' },
        { text: 'Text Message', value: 'green' }
          ],
      formToEdit: null,
      message: {
        text: '',
        variant: ''
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      states: [{ name: 'State', }],
    }
  },

  created() {
    this.internal = this.formToOpen.isInternalContact
    this.getLocations();
    this.fetchUSAStates();
     if(this.formToOpen.data){
      this.fetchContactToEdit(this.formToOpen.data);
    }
    this.contactTypeControls = this.formToOpen.isInternalContact
  },
  async activated() {
   if(this.formToOpen.data && this.internal === true){
      if(this.formToOpen.data.location){
      this.contact.locationId = this.formToOpen.data.location._id;
      }
      if(this.formToOpen.data.building){
         await this.getBuildings(this.contact.locationId);
          this.contact.buildingId = this.formToOpen.data.building._id;
      }
      if(this.formToOpen.data.department){
        await this.getDepartments(this.contact.locationId);
        this.contact.departmentId = this.formToOpen.data.department._id || this.formToOpen.data.department;
      }
      if(this.formToOpen.data.floor){
       await this.getFloors(this.contact.floorId);
        this.contact.floorId = this.formToOpen.data.floor._id ||  this.formToOpen.data.floor;
      }

    }
  },

  validations: {
    contact: {
      firstName: {
        required: requiredIf(function (contact) {
           if(!this.internal){
            return !contact.lastName && !contact.company
          }else{
            return true
          }
        })
      },
      lastName: {
        required:requiredIf(function (contact) {
           if(!this.internal){
            return !contact.company && !contact.firstName
          }else{
          return true
          }
        })
      },
      company:{
        required:requiredIf(function (contact) {
          if(!this.internal){
            return !contact.firstName && !contact.lastName
          }
        })
      },
      locationId: {
        required:requiredIf(function (contact) {
           if(this.internal){
            return true
           }
        })
      },
      buildingId: {
        required:requiredIf(function (contact) {
           if(this.internal){
           return !this.contact.buildingId || !this.contact.locationId
           }

        })
      }
    }
  },
  methods: {
    async fetchContactToEdit(contact){
     if(contact.isInternalContact === true) {
      await this.getDepartments(contact.location._id)
      await this.getBuildings(contact.location._id)
      this.contact.locationId = contact.location._id;
      this.contact.departmentId = contact.department;
      if(contact.building != null) {
        this.contact.buildingId = contact.building._id;
        await this.getFloors(contact.building._id)
        this.contact.floorId = contact.floor;
      }
     }
      this.contact.id = contact._id
      this.isContactToEdit = true;
      this.contact.company = contact.company;
      this.contact.firstName = contact.firstName;
      this.contact.lastName = contact.lastName;
      this.contact.firstNameAlias = contact.firstNameAlias;
      this.contact.useFirstNameAlias = contact.useFirstNameAlias;
      this.contact.email = contact.email;
      this.contact.phone = contact.phone;
      this.contact.isInternalContact = contact.isInternalContact;
      if(contact.imageUrl)this.imagePlaceholder = contact.imageUrl
      this.internal = contact.isInternalContact
      this.contact.address.street1 = contact.address.street1;
      this.contact.address.street2 = contact.address.street2;
      this.contact.address.city = contact.address.city;
      this.contact.address.state = contact.address.state;
      this.contact.address.postalCode = contact.address.postalCode


    },
     fetchUSAStates(){
       usaStates.forEach(state => {
          this.states.push(state)
        })
    },
    getLocations(){
      this.$store.dispatch('locations/getLocations')
      .then(res => {})
      .catch(e =>{ console.log(e)})
    },
    getBuildings(lid) {
      const locationId = lid || this.contact.locationId
      if (locationId != null) {
        this.$store.dispatch('buildings/getBuildings', `?lid=${locationId}`)
        .then(res =>  {})
        .catch(e => console.log(e))
      } else {
        this.$store.commit('buildings/setBuildings', [])
      }
      this.getDepartments(locationId)
    },
    getFloors(bid) {
      const buildingId = bid || this.contact.buildingId
       if (buildingId != null) {
      this.$store.dispatch('floors/getFloors', `?bid=${buildingId}`)
       .then(res =>  {})
        .catch(e => console.log(e))
      } else {
        this.$store.commit('floors/setFloors', [])
      }
    },
    getDepartments(lid) {
      const locationId = lid || this.contact.locationId
      if (locationId != null) {
        this.$store.dispatch('departments/getDepartments', `?lid=${locationId}`)
        .then(res => {})
        .catch(e => console.log(e))
      } else {
        this.$store.commit('departments/setDepartments', [])
      }
    },

    onSubmit(e) {
      e.preventDefault()
      this.$v.contact.$touch()
      if (!this.$v.contact.$invalid) {
        this.contact.useFirstNameAlias = this.contact.firstNameAlias != '' ? true : false
        if(this.isContactToEdit) return this.onUpdate()
         this.$store.dispatch('contacts/postContact', this.contact)
         .then(c =>{
            this.$emit('refreshContacts')
            this.$store.commit('closeModal')
            this.$toasted.success(c.message, {
              duration: 3000,
              position: 'top-center'
            })
         })
         .catch(e =>{
            this.$toasted.error(e.data.message, {
              duration: 3000,
              position: 'top-center'
            })
         })

      } else {
        e.preventDefault()
        this.showAlert('Please fill in required field(s)', 'danger')
      }
    },
  onUpdate(){
    
        this.$store.dispatch('contacts/patchContact', this.contact)
       .then(c =>{
          this.$emit('refreshContacts')
          this.$store.commit('closeModal')
          this.$toasted.success(c.message, {
          duration: 3000,
          position: 'top-center'
          })
       }) .catch(e=>{
          this.$toasted.error(e.data.message, {
          duration: 3000,
          position: 'top-center'
          })
       })
    },
    onReset(evt) {
      // Reset our form values
      this.contact.firstName = '';
      this.contact.lastName = '';
      this.contact.firstNameAlias = '';
      this.contact.useFirstNameAlias = false;
      this.contact.email = '';
      this.contact.phone = '';
      this.imagePlaceholder = 'http://ssl.gstatic.com/accounts/ui/avatar_1x.png';
      this.contact.image = null;
      this.contact.locationId = null;
      this.contact.departmentId = null;
      this.contact.address.street = '';
      this.contact.address.street2 = '';
      this.contact.address.city = '';
      this.contact.address.state = '';
      this.contact.address.postalCode = '';
      this.contact.buildingId = null;
      this.contact.floor = null;

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.contact.$reset()
      })
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
       this.contact.image = files[0]
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(message, variant) {
      this.message.text = message
      this.message.variant = variant
      this.dismissCountDown = this.dismissSecs
    },

  }
}
</script>

<style scoped>
.contactCard{
  margin: auto;
}
.contact-type-internal-only{
  position: relative;
  top: 5px;
  left: 4px;
  color: #007bff;
  font-weight: bolder;
  text-transform: uppercase;
  font-family: sans-serif;
}
.contact-type-btn-container{
  position: relative;
  left: 20px;
  top: 3px;
}
.contact-type-btn.select{
  font-size: 20px;
  font-weight: bolder;
  color: #007bff;
  text-transform: uppercase;
  font-family: sans-serif;
}
.contact-type-btn{
  color:#9e9e9e;
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
.fade-enter-active{
  transition: opacity .5s;
}
.fade-enter {
  opacity: 0;
}
.btn.btn-launch-form {
  border: 1px solid #ced4da;
}
input[type="file"] {
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
.image-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    width: 100%;
    background: #007bff;
    color: #fff;
    margin-top: 1px;
}

.image-wrapper {
  margin: auto;
  display: inline-flex;
  width: 96px;
}

</style>
