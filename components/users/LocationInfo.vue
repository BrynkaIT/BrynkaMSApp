<template>
  <b-card class="bg-light">
    <form>
      <div class="text-right">
        <b-button variant="light" @click="userToEdit = !userToEdit">
          <b-icon icon="pencil" variant="primary" scale="1.5"></b-icon>
        </b-button>
      </div>

      <b-form-group label="Location:">
        <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.location }}</span>
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
      <b-form-group label="Building:">
        <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.building}}</span>
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
          <b-form-group label="floor:">
            <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.floor }}</span>
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
          <b-form-group label="Room / Mail Stop:">
          <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.room }}</span>
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

      <b-form-group label="Department:">
        <span v-if="!userToEdit" class="text-primary text-bolder">{{ staticFields.department }}</span>
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
    }),
  },
  data() {
    return {
      disable: true,
      tabIndex: 0,
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

}
}

</script>

<style></style>
