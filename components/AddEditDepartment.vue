<template>
  <div class="container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="message.variant"
      @dismiss-count-down="countDownChanged"
    >
      {{ message.text }}
    </b-alert>
    <b-card bg-variant="light departmentCard">
      <b-card-title>{{ formToOpen.title }}</b-card-title>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div>
            <b-form-group>
              <b-form-input
                v-model="department.name"
                size="sm"
                :class="{ 'validation-error': $v.department.name.$error }"
                @blur="$v.department.name.$touch()"
                placeholder="Name"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <b-form-group label="This Building is part of:">
              <b-form-select
                size="sm"
                v-model="department.locationId"
                class="mb-3"
                :class="{ 'validation-error': $v.department.locationId.$error }"
                @blur="$v.department.locationId.$touch()"
                :options="locations"
                :disabled="disableLocation"
                ref="locationInput"
                value-field="_id"
                text-field="name"
              ></b-form-select>
            </b-form-group>
          <b-row style="float:right">

            <b-button
               @click="$store.commit('switchForm',{ title:`Add ${formToOpen.from}`, to:'contact', from:'department'})"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from == 'contact'"
              >Cancel</b-button
            >
             <b-button
              @click="$store.commit('closeModal')"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from != 'contact'"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary" size="sm"
              >Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'

export default {

   computed: {
    ...mapState({
      locations: state => state.locations.locations,
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      department: {
        id:'',
        name: '',
        locationId: null
      },
      message: {
        text: '',
        variant: ''
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      show: true,
      disableLocation: false,
      isDepartmentToEdit:false
    }
  },
  validations: {
    department: {
      name: {
        required
      },
      locationId: {
        required
      }
    }
  },
  created() {
    this.getLocations()
    if (this.formToOpen.data) {
      this.fetchDepartmentToEdit(this.formToOpen.data)
    }
  },
  activated() {
   if(this.formToOpen.data){
     this.department.locationId = this.formToOpen.data.locationId
     this.disableLocation = true
    }
   },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$v.department.name.$touch()
      if (!this.$v.department.name.$invalid) {
        if (this.isDepartmentToEdit) {
          return this.onUpdate()
        }
        this.$store
          .dispatch('departments/postDepartment', this.department)
          .then(department => {
            this.$emit('refreshDepartments')
            this.showAlert(department.message, 'success')
            this.onReset()
            if (this.formToOpen.from) {
                this.$store.dispatch('departments/getDepartments')
                this.$store.commit('switchForm',{
                title: this.formToOpen.title,
                to: this.formToOpen.from,
                from: 'department',
                isInternalContact: this.formToOpen.isInternalContact,
                data:department
              })
              setTimeout(() => { this.$emit('hideModal', false) }, 1000)
            }else{
               setTimeout(() => { this.$store.commit('closeModal') }, 1200)
            }
          })
          .catch(e => {
            this.showAlert(e.data.message, 'danger')
          })
      } else {
        this.showAlert('Please fill in required field(s)', 'danger')
      }
    },
    onUpdate() {
      this.$store
        .dispatch('departments/putDepartment', this.department)
        .then(d => {
           this.$emit('refreshDepartments')
          this.showAlert(d.message, 'success')
          this.onReset()
          setTimeout(() => { this.$store.commit('closeModal') }, 1000)
        })
        .catch(e => {this.showAlert(e.data.message, 'danger')})
    },
     getLocations() {
      this.$store.dispatch('locations/getLocations')
    },
    onReset(evt) {
      this.department.name = ''
      this.department.locationId = null

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.department.$reset()
      })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert(message, variant) {
      this.message.text = message
      this.message.variant = variant
      this.dismissCountDown = this.dismissSecs
    },
    fetchDepartmentToEdit(formData) {
       if(formData.locationId == undefined){
        this.disableLocation = true
        this.department.id = formData._id
        this.department.locationId = formData.location._id
        this.department.name = formData.name
        this.isDepartmentToEdit = true
      }
    }
  }
}
</script>

<style>
.departmentCard{
    max-width: 700px;
    margin: auto;
}
.error-text {
  display: block;
  color: red;
  font-size: 12px;
  font-style: italic;
  text-align: center;
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
