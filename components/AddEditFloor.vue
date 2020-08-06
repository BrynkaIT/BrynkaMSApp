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
    <b-card bg-variant="light floorCard">
      <b-card-title>{{ formToOpen.title }}</b-card-title>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <div>
            <b-form-group>
              <b-form-input
                v-model="floors.name"
                size="sm"
                :class="{ 'validation-error': $v.floors.name.$error }"
                @blur="$v.floors.name.$touch()"
                placeholder="Name of Floor"
                type="text"
              ></b-form-input>
            </b-form-group>

              <b-form-select
                size="sm"
                v-model="floors.locationId"
                class="mb-3"
                :class="{ 'validation-error': $v.floors.locationId.$error }"
                @blur="$v.floors.locationId.$touch()"
                :options="locations"
                :disabled="disableLocation"
                @input="getBuildings"
                ref="locationInput"
                value-field="_id"
                text-field="name"
              ></b-form-select>


              <b-form-select
                size="sm"
                v-model="floors.buildingId"
                class="mb-3"
                :class="{ 'validation-error': $v.floors.buildingId.$error }"
                @blur="$v.buidling.buildingId.$touch()"
                :options="buildings"
                :disabled="disableBuilding"
                ref="buildingInput"
                value-field="_id"
                text-field="name"
              ></b-form-select>

          </div>
          <b-row style="float:right">
            <b-button
              @click="$store.commit('switchForm',{ title:`Add ${formToOpen.from}`, to:formToOpen.from, from:'floors'})"
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
      buildings: state => state.buildings.buildings,
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      floors: {
        id:'',
        name: '',
        buildingId: null,
        locationId:null
      },
      message: {
        text: '',
        variant: ''
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      show: true,
      disableBuilding:false,
      disableLocation:false,
      isFloorToEdit: false
    }
  },
  validations: {
    floors: {
      name: {
        required
      },
      buildingId: {
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
      this.fetchFloorToEdit(this.formToOpen.data)
    }
  },
  activated() {
   if(this.formToOpen.data){
    this.floors.buildingId = this.formToOpen.data.buildingId
    this.floors.locationId = this.formToOpen.data.locationId
    this.disableBuilding = true
    this.disableLocation = true
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$v.floors.name.$touch()
      if (!this.$v.floors.$invalid) {
        if (this.isFloorToEdit) {
          return this.onUpdate()
        }
        this.$store
          .dispatch('floors/postFloor', this.floors)
          .then(floors => {
            this.$emit('refreshFloors')
            this.showAlert(floors.message, 'success')
            this.onReset()
            if (this.formToOpen.from) {
                this.$store.dispatch('floors/getFloors')
                this.$store.commit('switchForm',{
                title: this.formToOpen.title,
                to: this.formToOpen.from,
                from: 'floors',
                isInternalContact: this.formToOpen.isInternalContact,
                data:floors
              })
              setTimeout(() => {this.$emit('hideModal', false)}, 1000)
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
        .dispatch('floors/putFloor', this.floors)
        .then(f=> {
          this.$emit('refreshFloors')
          this.showAlert(f.message, 'success')
          this.onReset()
          setTimeout(() => { this.$store.commit('closeModal') }, 1000)
        })
        .catch(e => {
          this.showAlert(e.data.message, 'danger')})
    },
    getBuildings(lid) {
      const locationId = lid || this.floors.locationId
      this.$store.dispatch('buildings/getBuildings', `?lid=${locationId}`)
      .then(res =>{
         console.log(res)
        this.disableBuilding = false
      })
    },
    getLocations() {
      this.$store.dispatch('locations/getLocations')
    },
    onReset(evt) {
      this.floors.name = ''
      this.floors.buildingId = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.floors.$reset()
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
    async fetchFloorToEdit(formData) {

      const location = (formData.building != undefined ) ? formData.building.location: formData.locationId
      await this.getBuildings(location)

      if(formData.locationId == undefined){
      this.floors.id = formData._id
      this.floors.name = formData.name
      this.floors.locationId = location
      this.floors.buildingId = formData.building._id
      this.isFloorToEdit = true
      this.disableLocation = true
      this.disableBuilding = true;
      }
    }
  }
}
</script>

<style>
.floorCard {
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
