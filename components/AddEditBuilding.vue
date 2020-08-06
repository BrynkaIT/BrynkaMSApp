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
    <b-card bg-variant="light buildingCard">
      <b-card-title>{{ formToOpen.title }}</b-card-title>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div>
            <b-form-group>
              <b-form-input
                v-model="building.name"
                size="sm"
                :class="{ 'validation-error': $v.building.name.$error }"
                @blur="$v.building.name.$touch()"
                placeholder="Name"
                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="This Building is part of:">
              <b-form-select
                size="sm"
                v-model="building.locationId"
                class="mb-3"
                :class="{ 'validation-error': $v.building.locationId.$error }"
                @blur="$v.building.locationId.$touch()"
                :options="locations"
                :disabled="disableLocation"
                ref="locationInput"
                value-field="_id"
                text-field="name"
              ></b-form-select>
            </b-form-group>
          </div>
          <b-row style="float:right">
            <b-button
              @click="$store.commit('switchForm',{ title:`Add ${formToOpen.from}`, to:formToOpen.from, from:'building'})"
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
            <b-button type="submit" variant="primary" size="sm">Submit</b-button>
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
      building: {
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
      disableLocation:false,
      isBuildingToEdit: false
    }
  },
  validations: {
    building: {
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
    if(this.formToOpen.data){
      this.fetchBuildingToEdit(this.formToOpen.data)
    }
  },
  activated() {
   if(this.formToOpen.data){
     this.building.locationId = this.formToOpen.data.locationId
     this.disableLocation = true
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$v.building.name.$touch()
      if (!this.$v.building.$invalid) {

        if (this.isBuildingToEdit) {
          return this.onUpdate()
        }
        this.$store
          .dispatch('buildings/postBuilding', this.building)
          .then(building => {
            this.$emit('refreshBuildings')
            this.showAlert(building.message, 'success')
            this.onReset()
            if (this.formToOpen.from) {
                this.$store.dispatch('buildings/getBuildings')
                this.$store.commit('switchForm',{
                title: this.formToOpen.title,
                to: this.formToOpen.from,
                from: 'building',
                isInternalContact: this.formToOpen.isInternalContact,
                data:building
              })
              setTimeout(() => { this.$emit('hideModal', false) }, 1000)
            }else{
              setTimeout(() => { this.$store.commit('closeModal') }, 1200)
            }
          })
          .catch(e => { this.showAlert(e.data.message, 'danger')})
      } else {
        this.showAlert('Please fill in required field(s)', 'danger')
      }
    },
    onUpdate() {
      this.$store
        .dispatch('buildings/putBuilding', this.building)
        .then(b => {
          this.$emit('refreshBuildings')
          this.showAlert(b.message, 'success')
          this.onReset()
          setTimeout(() => { this.$store.commit('closeModal') }, 1000)
        })
        .catch(e => { this.showAlert(e.data.message, 'danger') })
    },
    getLocations() {
      this.$store.dispatch('locations/getLocations')
    },
    onReset(evt) {
      this.building.name = ''
      this.building.locationId = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.building.$reset()
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
    fetchBuildingToEdit(formData) {
      if(formData.locationId == undefined){
      this.disableLocation = true
      this.building.id = formData._id
      this.building.locationId = formData.location._id
      this.building.name = formData.name
      this.isBuildingToEdit = true
      }
    }
  }
}
</script>

<style>
.buildingCard {
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
