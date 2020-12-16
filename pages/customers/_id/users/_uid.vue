<template>
  <div class="content-container">
    <SideNav page="users" app="settings"></SideNav>

    <div class="content-right">
      <b-card>
        <RibbonHeader
          :avatar="this.baseUrl+user.imageUrl"
          :name="user.fullName"
          :isInactive="user.isInactive"
        ></RibbonHeader>

        <div class="mt-2" >
          <b-tabs small>
            <div class="pr-3 pl-3">
                <b-row align-h="between" class="mt-4 mb-2">
                <b-col cols="4">
                </b-col>
                <b-col cols="4" class="text-right">
                  <b-button size="sm"
                  variant="primary"
                  @click="$store.commit('switchForm',{ title:'Add User', to:'AddEditUser',})">New User</b-button>
                </b-col>
              </b-row>
              </div>

            <b-tab title="Personal Info" v-if="securityRole.canViewUsers">
              <PersonalInfo
               :user="user"
              @refresh="fetchUser"

              ></PersonalInfo>
            </b-tab>
             <b-tab title="Location" v-if="securityRole.canViewLocations">
              <LocationInfo
                :user="user"
                @refresh="fetchUser"
              ></LocationInfo>
            </b-tab>
            <b-tab title="Security" v-if="securityRole.canModifySecurityRoles">
              <SecurityInfo :user="user" @refresh="fetchUser"> </SecurityInfo>
            </b-tab>

          </b-tabs>
        </div>
      </b-card>

      <FullWidthModal :show="this.formToOpen.showModal">
        <transition name="fade">
          <component :is="this.formToOpen.to" @refresh="fetchUser"/>
        </transition>
    </FullWidthModal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import AddEditUser from '@/components/users/adduser/AddUserWizard'
import RibbonHeader from '@/components/shared/RibbonHeader'
import PersonalInfo from '@/components/users/edituser/PersonalInfo'
import LocationInfo from '@/components/users/edituser/LocationInfo'
import SecurityInfo from '@/components/users/edituser/SecurityInfo'

export default {
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen,
      customerInContext : state => state.customers.customerInContext,
    }),
     baseUrl(){
      return process.env.baseURL
    }
  },
  components: {
    SideNav,
    FullWidthModal,
    AddEditUser,
    RibbonHeader,
    PersonalInfo,
    LocationInfo,
    SecurityInfo
  },

  data() {
    return {
      tabIndex: 0,
      user: '',
      loading: true,
      securityRole:''
    }
  },
  async created() {
    this.fetchUser(this.$route.params.uid);
  },
  mounted(){
      const currentUser = JSON.parse(localStorage.getItem('managerApp_currentUser'))
      this.securityRole = currentUser.securityRole
  },
  methods: {
   async fetchUser(id) {
      try {

      const {user } = await this.$store.dispatch('users/getUser', id)
      this.user = user
      this.loading = false;
      } catch (error) {
         this.$brynkaToast(error, 'danger')
      }
    }
  }
}
</script>

<style scoped>

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
