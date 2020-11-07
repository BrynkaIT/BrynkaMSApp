<template>
<b-overlay :show="overlay" rounded="sm">
  <b-card class="bg-light">
    <form @submit="updateLocationInfo">
      <div class="text-right">
        <b-button variant="light" @click="userToEdit = !userToEdit">
          <b-icon icon="pencil" variant="primary" scale="1.5"></b-icon>
        </b-button>
      </div>

      <b-form-group>
        <label for="">Location:
          <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.location }}</span>
        </label>
        <b-form-select
          v-if="userToEdit"
          size="sm"
          v-model="locationInfo.locationId"
          :class="{ 'validation-error': $v.locationInfo.locationId.$error }"
          :options="locations"
          ref="locationInput"
          value-field="_id"
          text-field="name"
          @input="getBuildings"
        ></b-form-select>
      </b-form-group>

      <b-form-group>
        <label for="">Building:
          <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.building}}</span>
        </label>
        <b-form-select
          v-if="userToEdit"
          size="sm"
          type="text"
          placeholder="Building"
          v-model="locationInfo.buildingId"
          :options="buildings"
          ref="buildingInput"
          value-field="_id"
          text-field="name"
          @change="getFloors"
        ></b-form-select>
      </b-form-group>

      <b-row>
        <div class="col-md-6">
          <b-form-group>
            <label for="">Floor:
              <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.floor }}</span>
            </label>
            <b-form-select
              v-if="userToEdit"
              size="sm"
              v-model="locationInfo.floorId"
              :options="floors"
              value-field="_id"
              text-field="name"
            ></b-form-select>
          </b-form-group>
        </div>

        <div class="col-md-6">
          <b-form-group>
          <label for="">Room / Mail Stop:
            <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.room }}</span>
          </label>
            <b-form-input
              v-if="userToEdit"
              value-field="_id"
              text-field="name"
              size="sm"
              class="mb-2">
            </b-form-input>
          </b-form-group>
        </div>
      </b-row>

      <b-form-group >
        <label for="">Department:
          <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.department }}</span>
        </label>
        <b-form-select
          v-if="userToEdit"
          size="sm"
          type="text"
          v-model="locationInfo.departmentId"
          :options="departments"
          placeholder="Department"
          value-field="_id"
          text-field="name"
        ></b-form-select>
      </b-form-group>

      <div class="float-right mb-3" v-if="userToEdit">
        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  </b-card>
</b-overlay>
</template>

<script>
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
export default {
  props: ['user'],
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
     overlay:false,
      userToEdit: false,
      locationName:'',
      staticFields:{
        location:'',
        building:'',
        floor:'',
        department:'',
        room:''
      },
      locationInfo: {
        id: '',
        locationId: null,
        departmentId: null,
        buildingId: null,
        floorId: null,

      }
    }
  },
  validations: {
   locationInfo:{
      locationId: {
        required
      },
    },
  },

  async mounted() {
    await this.getLocations()
    await this.getBuildings()
    await this.getFloors()
    await this.getLocationInfo(this.user)
    await this.displayStaticfields()
  },

methods:{
  async displayStaticfields(){
     const { location } = await this.$store.dispatch('locations/getLocation', this.user.location)
     const { building } = await this.$store.dispatch('buildings/getBuilding', this.user.building)
    const { department } = await this.$store.dispatch('departments/getDepartment', this.user.department)
    const { floor } = await this.$store.dispatch('floors/getFloor', this.user.floor)
    this.staticFields.location = location.name
    this.staticFields.building = building.name
    this.staticFields.department = department.name
    this.staticFields.floor= floor.name
  },
  async getLocationInfo(user){

      this.locationInfo.locationId= user.location

      if(user.building != null) {
        await this.getBuildings(user.location)
        this.locationInfo.buildingId= user.building
        this.locationInfo.floorId= user.floor
      }
      if(user.department != null) {
        await this.getDepartments(user.location)
        this.locationInfo.departmentId= user.department
      }
      if(user.floor != null) {
        await this.getFloors(user.building)
        this.locationInfo.floorId= user.floor
      }
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
    async updateLocationInfo(e) {
      e.preventDefault()
      this.$v.locationInfo.$touch()
      if (!this.$v.locationInfo.$invalid) {
         this.overlay = true
        this.locationInfo.id = this.user._id

        try {
          const res = await this.$store.dispatch('contacts/patchContact', this.locationInfo)
          this.$emit('refresh', res.contact._id)
          this.$brynkaToast(res.message, 'success')
          this.displayStaticfields()
          this.userToEdit = false
          this.overlay = false
        } catch (error) {
          this.$brynkaToast(error, 'danger')
          this.overlay = false
        }
      }else{
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },

  }
}

</script>

<style></style>
