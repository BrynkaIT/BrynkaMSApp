<template>
  <div class="content-container">
    <SideNav page="locations" app="settings"></SideNav>

    <div class="content-right">
      <b-card>

        <RibbonHeader
          icon="building"
          :name="location.name"
          :address="location.address"
        ></RibbonHeader>

        <div class="mt-2" >
          <b-tabs small>
            <b-tab title="Buildings">
              <div class="pr-3 pl-3">
                <b-row align-h="between" class="mt-4 mb-2">
                <b-col cols="4">
                  <b-form-checkbox v-model="showInactiveBuildings"  switch>
                    Show Inactives
                  </b-form-checkbox>
                </b-col>
                <b-col cols="4" class="text-right">
                  <b-button size="sm"
                variant="primary"
                @click="$store.commit('switchForm',{ title:'Add Building', to:'AddEditBuilding',})">New Building</b-button>
                </b-col>
              </b-row>
              </div>

              <div v-if="location.buildings && location.buildings.length > 0">
                <ListGroup
                  v-for="building in location.buildings"
                  :key="building._id"
                  :name="building.name"
                  :lastUpdated="building.updatedAt"
                  :id="building._id"
                  :inactive="building.inactive"
                  editModalTitle="Edit Building"
                  editModalToOpen="AddEditBuilding"
                  :editModalData="building"
                  :infoLink="`/customers/${customerInContext._id}/buildings/${building._id}`"
                  :showDeleteBtn="false"
                ></ListGroup>
              </div>
              <div class="text-center" v-else>
                <h4>This Location currently has no buildings</h4>
            </div>

            </b-tab>

            <b-tab title="Departments">
              <div class="pr-3 pl-3">
                <b-row align-h="between" class="mt-4 mb-2">
                <b-col cols="4">
                  <b-form-checkbox v-model="showInactiveDepartments"  switch>
                    Show Inactives
                  </b-form-checkbox>
                </b-col>
                <b-col cols="4" class="text-right">
                  <b-button size="sm"
                variant="primary"
               @click="$store.commit('switchForm',{ title:'Add Department', to:'AddEditDepartment',})">New Department</b-button>
                </b-col>
              </b-row>
              </div>
              <div v-if="location.departments && location.departments.length > 0">
                <ListGroup
                  v-for="department in location.departments"
                  :key="department._id"
                  :name="department.name"
                  :lastUpdated="department.updatedAt"
                  :id="department._id"
                  :inactive="department.inactive"
                  editModalTitle="Edit Department"
                  editModalToOpen="AddEditDepartment"
                  :editModalData="department"
                  :showDeleteBtn="false"
                ></ListGroup>
            
              </div>
              <div class="text-center" v-else>
                <h4>This Location currently has no departments</h4>
            </div>
            </b-tab>
          </b-tabs>
        </div>
      </b-card>

      <FullWidthModal :show="this.formToOpen.showModal">
      <transition name="fade">
          <component :is="this.formToOpen.to" @refresh="fetchLocations"/>
          </transition>
    </FullWidthModal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import AddEditBuilding from '@/components/AddEditBuilding'
import AddEditFloor from '@/components/AddEditFloor'
import AddEditDepartment from '@/components/AddEditDepartment'
import RibbonHeader from '@/components/shared/RibbonHeader'
import ListGroup from '@/components/shared/ListGroup'

export default {
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen,
      customerInContext : state => state.customers.customerInContext,
    })
  },
  components: {
    SideNav,
    FullWidthModal,
    AddEditBuilding,
    AddEditFloor,
    AddEditDepartment,
    RibbonHeader,
    ListGroup
  },

  data() {
    return {
      showInactiveBuildings: false,
      showInactiveDepartments:false,
      tabIndex: 0,
      location: '',
    }
  },
  async created() {
    this.fetchLocations();
  },
  methods: {
   async fetchLocations() {
      try {
      const { location } = await this.$axios.$get(`/location/${this.$route.params.lid}?deep=true`)
      this.location = location

      } catch (error) {
         this.$brynkaToast(error, 'danger')
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Assistant&display=swap');

.top-panel {
  width: 100%;
  padding-left: 25px;
  background: #495057 !important;
  /* border-bottom: 1px solid #ccc !important; */
  color: #fff;
}
.side-panel {
  width: 200px !important;
  padding: 15px !important;
  background: #fff !important;
}
.side-panel .nav-link {
  color: #000 !important;
}
.side-panel .nav-link:hover {
  color: #343a40 !important;
  background: #ecf0f5 !important;
}
.side-panel .nav-link.active {
  color: #ecf0f5 !important;
  background: #2196f3 !important;
}
.content-right .nav-tabs .nav-link {
  color: #000 !important;
}
.content-right .nav-tabs .nav-link.active,
.content-right .nav-link:active,
.content-right .nav-tabs .nav-item.show .nav-link {
  color: #fff !important;
  background-color: #2196f3 !important;
}
.content-right .nav-tabs .nav-link:hover {
  color: #fff !important;
  background: #d5d4d4 !important;
}

@media (max-width: 1000px) {
  .side-panel {
    margin-left: -250px;
    transition: all 0.3s;
    z-index: 999999;
    position: absolute;
    height: 100%;
  }
}
@media print {
  .side-panel {
    display: none;
  }
}
</style>
