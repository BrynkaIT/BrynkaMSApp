<template>
  <div class="container">
    <b-card
    header-bg-variant="primary"
    header-text-variant="white"
    border-variant="secondary"
    class="floorCard"
    :header="formToOpen.title ">
      <!-- <b-card-title>{{ formToOpen.title }}</b-card-title> -->
      <b-row align-h="between" class="mb-2">
        <b-col cols="4">
          <!-- <b-card-title>{{ formToOpen.title }}</b-card-title> -->
        </b-col>
        <b-col cols="4" class="text-right">
          <b-form-checkbox v-model="floors.isActive" switch>
            Active
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-card-body>
        <b-form @submit="onSubmit" @reset="onReset" >
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

          </div>
          <div style="float:right">
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
          </div>
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

      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      floors: {
        id:'',
        name: '',
        buildingId: null,
        locationId:null,
        isActive: true,
        protected: false
      },
      isFloorToEdit: false
    }
  },
  validations: {
    floors: {
      name: {
        required
      },

    }
  },
  created() {
    // this.getLocations()
    if (this.formToOpen.data) {
      this.fetchFloorToEdit(this.formToOpen.data)
    }
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.$v.floors.name.$touch()
      if (!this.$v.floors.$invalid) {
        if (this.isFloorToEdit) {
          return this.onUpdate()
        }
        if(this.$route.params.id){
          this.floors.buildingId = this.floors.buildingId ? this.floors.buildingId : this.$route.params.id
          const {location} = await this.getLocation(this.$route.params.id)
          this.floors.locationId = location
        }
        try {
          const res = await this.$store.dispatch('floors/postFloor', this.floors)
           this.$emit('refresh')
            this.$brynkaToast(res.message, 'success')
            this.onReset()
            this.$store.commit('closeModal')
        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }

      } else {
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },
    async onUpdate() {
      try {
        const res = await this.$store.dispatch('floors/putFloor', this.floors)
          this.$emit('refresh')
            this.$brynkaToast(res.message, 'success')
            this.onReset()
           this.$store.commit('closeModal')
      } catch (error) {
          this.$brynkaToast(error, 'danger')
      }
    },

    async getLocation(bid) {

      try{
      const { building } =  await this.$store.dispatch('buildings/getBuilding', bid)
      return building
      }catch(error){
        console.log(error)
      }
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
    async fetchFloorToEdit(formData) {
      const location = (formData.building != undefined ) ? formData.building.location: formData.locationId

      if(formData.locationId == undefined){
      this.floors.id = formData._id
      this.floors.name = formData.name
      this.floors.locationId = location
      this.floors.buildingId = formData.building._id
      this.floors.isActive = formData.isActive
      this.isFloorToEdit = true

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
