<template>
  <div class="container">
    <b-card
    header-bg-variant="primary"
    header-text-variant="white"
    border-variant="secondary"
    class="buildingCard"
    :header="formToOpen.title ">

      <b-row align-h="between" class="mb-2">
        <b-col cols="4">
          <!-- <b-card-title>{{ formToOpen.title }}</b-card-title> -->
        </b-col>
        <b-col cols="4" class="text-right">
          <b-form-checkbox v-model="building.isActive" switch>
            Active
          </b-form-checkbox>
        </b-col>
      </b-row>

        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group label="Building">
            <b-form-input
              v-model="building.name"
              size="sm"
              :class="{ 'validation-error': $v.building.name.$error }"
              @blur="$v.building.name.$touch()"
              placeholder="Building Name"
              type="text"
            ></b-form-input>
          </b-form-group>

          <div style="float:right" >
            <b-button
              @click="
                $store.commit('switchForm', {
                  title: `Add ${formToOpen.from}`,
                  to: formToOpen.from,
                  from: 'building'
                })
              "
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
          </div>
        </b-form>

    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

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
        id: '',
        name: '',
        locationId: '',
        isActive: true,
        protected: false
      },
      isBuildingToEdit: false
    }
  },
  validations: {
    building: {
      name: {
        required
      }
    }
  },
  created() {
    if (this.formToOpen.data) {
      this.fetchBuildingToEdit(this.formToOpen.data)
    }
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.building.locationId = this.building.locationId ? this.building.locationId :this.$route.params.id
      this.$v.building.name.$touch()
      if (!this.$v.building.$invalid) {
        if (this.isBuildingToEdit) return this.onUpdate()

        try {
          const res = await this.$store.dispatch('buildings/postBuilding',this.building)
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
        const res = await this.$store.dispatch('buildings/putBuilding',this.building)
        this.$emit('refresh')
        this.$brynkaToast(res.message, 'success')
        this.onReset()
        this.$store.commit('closeModal')
      } catch (error) {
        this.$brynkaToast(error, 'danger')
      }
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
    fetchBuildingToEdit(formData) {
      if (formData.locationId == undefined) {
        this.building.id = formData._id
        this.building.locationId = formData.location._id || formData.location
        this.building.name = formData.name
        this.building.isActive = formData.isActive
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
