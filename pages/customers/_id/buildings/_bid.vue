<template>
  <div class="content-container">
    <SideNav page="locations" app="settings"></SideNav>

    <div class="content-right">
      <b-card>
        <b-icon icon="arrow-left-square" scale="1.5" variant="info" @click="() =>{this.$router.back()}"></b-icon>
        <div class="top-panel mt-3">
          <div class="row">
            <div style="font-size: 3rem;">
              <b-icon
                icon="geo"
                class="rounded-circle border p-2"
                variant="light"
              ></b-icon>
            </div>
            <div v-if="building">
              <h3 class="mt-3 ml-1">{{ building.name }}</h3>
              <!-- <p class="ml-2">
                <span v-if="building.address.street1"
                  >{{ building.address.street1 }}<br />
                </span>
                <span v-if="building.address.street2"
                  >{{ building.address.street2 }}<br
                /></span>
                <span>{{ building.address.city }},&nbsp;</span
                ><span>{{ building.address.state }},&nbsp;</span>
                <span>{{ building.address.postalCode }}</span>
              </p> -->
            </div>
          </div>
        </div>
        <div class="mt-2" >
          <b-tabs small>
            <b-tab title="Floors">
              <div class="pr-3 pl-3">
            <b-row align-h="between" class="mt-4 mb-2">
            <b-col cols="4">
              <b-form-checkbox v-model="showInactives"  switch>
                Show Inactives
              </b-form-checkbox>
            </b-col>
            <b-col cols="4" class="text-right">
              <b-button size="sm"
            variant="primary"
            @click="$store.commit('switchForm',{ title:'Add Floor', to:'AddEditFloor',})">New Floor</b-button>
            </b-col>
          </b-row>
          </div>
          <div v-if="floors.length > 0">
              <b-list-group
              v-for="floor in floors"
              :key="floor._id"
            >
              <b-list-group-item class="flex-column align-items-start m-2">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">{{ floor.name }}</h5>
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    class="mb-2"
                    @click="$store.commit('switchForm', {
                          title: 'Edit Floor',
                          to: 'AddEditFloor',
                          data: floor
                          })
                        ">
                    <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
                  </b-button>
                </div>
                <small>Floor ID: {{ floor._id }}</small>
              </b-list-group-item>
            </b-list-group>
          </div>
            <div class="text-center" v-else>
                <h4>This Building currently has no floors</h4>
            </div>
            </b-tab >
            <b-tab title="Mail Stop">
            </b-tab >
          </b-tabs >

        </div>
      </b-card>

      <FullWidthModal :show="this.formToOpen.showModal">
        <component :is="this.formToOpen.to" @refresh="fetchFloors"/>
    </FullWidthModal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import AddEditFloor from '@/components/AddEditFloor'

export default {
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen,
    })
  },

  components: {
    SideNav,
    FullWidthModal,
    AddEditFloor,
  },

  data() {
    return {
      showInactives: false,
      tabIndex: 0,
      building:'',
      floors: [],
    }
  },
  async created() {

    this.fetchBuilding()
    this.fetchFloors();
  },
  methods: {
      async fetchBuilding() {
      try {

      const { building } = await this.$axios.$get(`/building/${this.$route.params.bid}`)

      this.building = building

      } catch (error) {
       this.$brynkaToast(error, 'danger')
      }
    },
    async fetchFloors() {
        try {

        const { floors } = await this.$store.dispatch('floors/getFloors', `?bid=${this.$route.params.bid}&deep=true`)
        this.floors = floors

        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }
    },
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
