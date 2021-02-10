<template>
  <b-overlay :show="overlay" rounded="sm">
    <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <b-card>
            <b-skeleton animation="wave" width="85%"></b-skeleton>
            <b-skeleton animation="wave" width="55%"></b-skeleton>
            <b-skeleton animation="wave" width="70%"></b-skeleton>
            <br />
            <b-skeleton animation="wave" width="85%"></b-skeleton>
            <b-skeleton animation="wave" width="55%"></b-skeleton>
            <b-skeleton animation="wave" width="70%"></b-skeleton>
          </b-card>
        </template>
        <b-card class="bg-light">
          <form @submit="updateLocationInfo">

            <b-form-group>
              <label for="">Location:
                <span v-if="!canEdit" class="text-primary text-bolder">{{ staticFields.location }}</span>
              </label>
              <b-form-select
                v-if="canEdit"
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
                <span v-if="!canEdit" class="text-primary text-bolder">{{ staticFields.building}}</span>
              </label>
              <b-form-select
                v-if="canEdit"
                size="sm"
                type="text"
                placeholder="Building"
                v-model="locationInfo.buildingId"
                :options="buildings"
                ref="buildingInput"
                value-field="_id"
                text-field="name"
                @input="getFloors"
              ></b-form-select>
            </b-form-group>

            <b-row>
              <div class="col-md-6">
                <b-form-group>
                  <label for="">Floor:
                    <span v-if="!canEdit" class="text-primary text-bolder">{{ staticFields.floor }}</span>
                  </label>
                  <b-form-select
                    v-if="canEdit"
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
                  <span v-if="!canEdit" class="text-primary text-bolder">{{ staticFields.room }}</span>
                </label>
                  <b-form-input
                    v-if="canEdit"
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
                <span v-if="!canEdit" class="text-primary text-bolder">{{ staticFields.department }}</span>
              </label>
              <b-form-select
                v-if="canEdit"
                size="sm"
                type="text"
                v-model="locationInfo.departmentId"
                :options="departments"
                placeholder="Department"
                value-field="_id"
                text-field="name"
              ></b-form-select>
            </b-form-group>

            <div class="float-right mb-3" v-if="canEdit">
              <button type="submit" class="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </b-card>
    </b-skeleton-wrapper>
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

    }),
  },
  data() {
    return {
     overlay:false,
      canEdit: false,
      loading:true,
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
  async mounted(){
    var currentUser = JSON.parse(localStorage.getItem('managerApp_currentUser'))

    setTimeout(async () => {
      if(this.user._id == currentUser._id){
      this.canEdit = true
      }else{
        this.canEdit = currentUser.securityRole.canModifyUsers
      }
      await this.loadSelectFieldOptions()
      await this.getLocationInfo()
      }, 900)

  },
  validations: {
   locationInfo:{
      locationId: {
        required
      },
    },
  },


methods:{

  async getLocationInfo(){

      if(this.user.location){
      this.locationInfo.locationId = this.user.location._id
      this.staticFields.location = this.user.location.name
      this.staticFields.location = this.user.location.name
      // this.staticFields.building = this.user.building.name
      }

      if(this.user.building && this.user.building != null) {
        this.locationInfo.buildingId= this.user.building._id
        this.staticFields.building = this.user.building.name
      }

      if(this.user.department && this.user.department != null) {

        const { department } = await this.$store.dispatch('departments/getDepartment', this.user.department)
        this.staticFields.department =  department.name
        this.locationInfo.departmentId= this.user.department
      }
      if(this.user.floor && this.user.floor != null) {
        this.locationInfo.floorId= this.user.floor
        const { floor } = await this.$store.dispatch('floors/getFloor', this.user.floor)
        this.staticFields.floor= floor.name
      }
      this.loading = false
    },
    async loadSelectFieldOptions(){
      await this.$store.dispatch('locations/getLocations', {customerId:this.$route.params.id})
      await this.$store.dispatch('buildings/getBuildings')
      await this.$store.dispatch('floors/getFloors', )
      await this.$store.dispatch('departments/getDepartments')
    },
    async getLocations() {
      await this.$store.dispatch('locations/getLocations', {customerId:this.$route.params.id})
    },
    async getBuildings(lid) {

      const locationId = lid || this.locationInfo.locationId
      if (locationId != null) {
      await this.$store.dispatch('buildings/getBuildings', `?lid=${locationId}`)

      } else {
       await this.$store.commit('buildings/setBuildings', [])
      }
      this.getDepartments(locationId)
    },
    async getFloors(bid) {
      const buildingId = bid || this.locationInfo.buildingId
      if (buildingId != null) {
        await this.$store.dispatch('floors/getFloors', `?bid=${buildingId}`)
      } else {
        await this.$store.commit('floors/setFloors', [])
      }
    },
    async getDepartments(lid) {
      const locationId = lid || this.locationInfo.locationId
      if (locationId != null) {
        await this.$store.dispatch('departments/getDepartments', `?lid=${locationId}`)
      } else {
        await this.$store.commit('departments/setDepartments', [])
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
          setTimeout(async () => await this.getLocationInfo(), 900)
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
