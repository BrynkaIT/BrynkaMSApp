<template>
  <div class="content-container">
    <SideNav page="users" app="settings"></SideNav>

    <div class="content-right">
      <b-card>

        <RibbonHeader
          :avatar="this.baseUrl+user.imageUrl"
          :name="user.fullName"
        ></RibbonHeader>
        <!-- <pre>{{user}}</pre> -->
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

            <b-tab title="Personal Info">
              <PersonalInfo
              :id="user._id"
              :firstName="user.firstName"
              :middleName="user.middleName"
              :lastName="user.lastName"
              :firstNameAlias="user.firstNameAlias"
              :useFirstNameAlias="user.useFirstNameAlias"
              :email="user.email"
              :phone="user.phone"
              :imageUrl="user.imageUrl"
              @refresh="fetchUser"
              ></PersonalInfo>
            </b-tab>
             <b-tab title="Location">
              <LocationInfo
                :user="user"
              ></LocationInfo>
            </b-tab>
            <b-tab title="Security">
               <div >
               User Security Info
              </div>
            </b-tab>
            <b-tab title="Preferences">
               <div >
               User Preferences
              </div>
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
import AddEditUser from '@/components/AddEditUser'
import RibbonHeader from '@/components/shared/RibbonHeader'
import PersonalInfo from '@/components/users/PersonalInfo'
import LocationInfo from '@/components/users/LocationInfo'


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
    LocationInfo

  },

  data() {
    return {
      tabIndex: 0,
      user: '',
    }
  },
  async created() {
    this.fetchUser(this.$route.params.uid);
  },
  methods: {
   async fetchUser(id) {
      try {

      const {user } = await this.$store.dispatch('users/getUser', id)

      this.user = user

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
