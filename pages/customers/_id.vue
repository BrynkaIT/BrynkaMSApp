<template>
  <div class="content-container">
    <SideNav page="Customer" app="customer"></SideNav>
    <div class="content-right">
      <b-card >
        <div class="d-flex align-items-center">
                        <img
                          :src="`${customer.imageFolder}`"
                          width="70px"
                          class="mr-3"
                        />
                        <div>
                          <h5 class="mb-1">{{ customer.name }}</h5>
                      
                        </div>
                      </div>
        <b-tabs v-model="tabIndex" small card>
          <b-tab title="Carriers">
            <Carriers />
          </b-tab>
          <!-- <b-tab title="Departments">
            <Departments />
          </b-tab> -->
          <b-tab title="Locations">
            <Locations />
          </b-tab>
          <b-tab title="Security Roles">
            <SecurityRole/>
          </b-tab>
          <b-tab title="Users">
            <Users />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
    <FullWidthModal :show="this.formToOpen.showModal">
      <component :is="this.formToOpen.to"/>
    </FullWidthModal>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import Carriers from '@/components/customer/Carriers'
import Departments from '@/components/customer/Departments'
import Locations from '@/components/customer/Locations'
import SecurityRole from '@/components/customer/SecurityRole'
import Users from '@/components/customer/Users'
import LocationDetails from '@/components/LocationDetails'
import AddEditLocation from '@/components/AddEditLocation'
import { mapState } from 'vuex'
export default {
   middleware: ['authenticated'],
  components: {
    SideNav,
    Carriers,
    Departments,
    Locations,
    FullWidthModal,
    LocationDetails,
    AddEditLocation,
    SecurityRole,
    Users
  },
  computed: {
    ...mapState({
      customer: state => state.customers.customerInContext,
      formToOpen: state => state.formToOpen,
    }),

  },
  data() {
    return {
      tabIndex: 0
    }
  },
  async created() {
    await this.$store.dispatch('customers/getCustomer', this.$route.params.id)
  }
}
</script>

<style scoped>
/* .customer-nav {
  height: 200px;
  background: #fff;
} */
/* .nav-link {
  color: #565656 !important;
  font-size: 13px;
}
.navbar {
  padding: 0px;
} */
</style>
