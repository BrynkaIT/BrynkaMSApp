<template>
  <div class="content-container">
    <SideNav page="Customer" ></SideNav>
    <div class="content-right">
      <b-card >
        <div><h5 class="mb-1">{{ customer.name }}</h5></div>
        <b-tabs v-model="tabIndex" small card>
          <b-tab title="Overview">
            <div class="emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-2">
                        <div class="profile-img">
                            <img :src="`${baseUrl}${customer.logoUrl}`" alt="customer logo"/>
                        </div>
                    </div>
                    <div class="col-md-8">
                      <div class="profile-head">
                        <h5>{{ customer.name }}</h5>
                        <h6>{{ customer.emailDomain}}</h6>
                        <p class="proile-rating"></span></p>
                        <b-tabs content-class="mt-3">
                          <b-tab title="Basic Info" active>
                            <div class="row" v-if="isBrynka">
                                <div class="col-md-6">
                                    <label >Customer Id</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer._id}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.name }}</p>
                                </div>
                            </div>
                            <div class="row" v-if="customer.address">
                                <div class="col-md-6">
                                    <label>Address</label>
                                </div>
                                <div class="col-md-6">
                                  <p >
                                    <span v-if="customer.address.street1">{{ customer.address.street1 }}</span> <span v-if="customer.address.street2">{{ customer.address.street2 }},</span><br>
                                    <span v-if="customer.address.city">{{ customer.address.city }},</span>
                                    <span v-if="customer.address.state">{{ customer.address.state }},</span>
                                    <span v-if="customer.address.postalCode">{{ customer.address.postalCode }}</span><br>
                                  </p>
                                </div>
                            </div>
                            <div class="row" v-if="isBrynka">
                                <div class="col-md-6">
                                    <label>Email Domain</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.emailDomain}}</p>
                                </div>
                            </div>
                            <div class="row" v-if="isBrynka">
                                <div class="col-md-6">
                                    <label>Possessive Name</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.possessiveName}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Parent(s)</label>
                                </div>
                                <div class="col-md-6">
                                    <span v-for=" (parent, index) in parentCustomers" :key="index">{{ parent }}<span v-if="parentCustomers.length > 1 ">,</span> </span>
                                </div>
                            </div>
                          </b-tab>
                          <b-tab title="Billing" v-if="isBrynka">
                            <div class="row" v-if="customer.billToContact">
                                <div class="col-md-6">
                                    <label>Billing Contact</label>
                                </div>
                                <div class="col-md-6">
                                    <p>
                                      <span>{{ customer.billToContact.firstName}} {{ customer.billToContact.lastName}}</span><br>
                                      <span>Title: {{ customer.billToContact.title }}</span><br>
                                      <span>Phone: {{ customer.billToContact.phone }}</span><br>
                                      <span>Email: {{ customer.billToContact.email}}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="row" v-if="customer.billToAddress">
                                <div class="col-md-6">
                                    <label>Billing Address</label>
                                </div>
                                <div class="col-md-6">
                                  <p >
                                    <span v-if="customer.billToAddress.street1">{{ customer.billToAddress.street1 }}</span> <span v-if="customer.billToAddress.street2">{{ customer.billToAddress.street2 }}</span>,<br>
                                    <span v-if="customer.billToAddress.city">{{ customer.billToAddress.city }}</span>,
                                    <span v-if="customer.billToAddress.state">{{ customer.billToAddress.state }}</span>,
                                    <span v-if="customer.billToAddress.postalCode">{{ customer.billToAddress.postalCode }}</span><br>
                                  </p>
                                </div>
                            </div>

                          </b-tab>
                          <b-tab title="Techinial Settings">
                             <div class="row" v-if="isBrynka">
                                <div class="col-md-6">
                                    <label>Database Name</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.dbName}}</p>
                                </div>
                            </div>
                             <div class="row" v-if="isBrynka">
                                <div class="col-md-6">
                                    <label>Media Folder</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.mediaFolder}}</p>
                                </div>
                            </div>
                            <div class="row" v-if="isBrynka">
                                <div class="col-md-6">
                                    <label>Sub-Folder</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.subFolder}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Default Security Role</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.defaultSecurityRole}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Allow Auto Signup</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.allowsAutomaticSignup}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Domain Filters</label>
                                </div>
                                <div class="col-md-6">
                                    <span v-for="(ASE, index) in customer.automaticSignUpEmailDomainFilters" :key="index">{{ ASE }}, </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                  <label>Last Updated</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ customer.updatedAt | moment("MMMM Do YYYY, h:mm:ss a") }}</p>
                                </div>
                            </div>
                          </b-tab>
                          <b-tab title="Other" v-if="isBrynka">
                            <div class="row" v-if="customer.salesContact">
                                <div class="col-md-6">
                                    <label>Billing Contact</label>
                                </div>
                                <div class="col-md-6">
                                    <p>
                                      <span>{{ customer.salesContact.firstName}} {{ customer.salesContact.lastName}}</span><br>
                                      <span>Title: {{ customer.salesContact.title }}</span><br>
                                      <span>Phone: {{ customer.salesContact.phone }}</span><br>
                                      <span>Email: {{ customer.salesContact.email}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="row" v-if="customer.technicalContact">
                                <div class="col-md-6">
                                    <label>Billing Contact</label>
                                </div>
                                <div class="col-md-6">
                                    <p>
                                      <span>{{ customer.technicalContact.firstName}} {{ customer.technicalContact.lastName}}</span><br>
                                      <span>Title: {{ customer.technicalContact.title }}</span><br>
                                      <span>Phone: {{ customer.technicalContact.phone }}</span><br>
                                      <span>Email: {{ customer.technicalContact.email}}</span>
                                    </p>
                                </div>
                            </div>

                          </b-tab>
                        </b-tabs>

                      </div>
                    </div>
                    <div class="col-md-2"  v-if="isBrynka">
                      <b-button pill
                      variant="outline-secondary"
                       @click="
                        $store.commit('switchForm', {
                          title: 'Edit Customer',
                          to:'CustomerForm',
                          data: customer
                        })
                      "
                      >Edit</b-button>

                    </div>
                     <div class="col-md-2"  v-if="!isBrynka">
                      <b-button pill
                      variant="outline-primary"
                       @click="
                        $store.commit('switchForm', {
                          title: 'Edit Customer',
                          to:'CustomerFormSimple',
                          data: customer
                        })
                      "
                      >Edit</b-button>

                    </div>
                </div>
            </form>
        </div>
          </b-tab>
          <!-- <b-tab title="Carriers">
            <Carriers />
          </b-tab> -->
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
      <component :is="this.formToOpen.to" @refreshCustomer="refreshData"/>
    </FullWidthModal>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
// import Carriers from '@/components/customerLandingPage/CarrierTab'
import AddEditCarrier from '@/components/AddEditCarrier'
import Locations from '@/components/customerLandingPage/LocationTab'
import SecurityRole from '@/components/customerLandingPage/SecurityRoleTab'
import AddEditSecurityRole from '@/components/AddEditSecurityRoles'
import Users from '@/components/customerLandingPage/UserTab'
import AddEditUser from '@/components/AddEditUser'
import CustomerForm from '@/components/brynkaOnly/AddEditCustomer.vue'
import CustomerFormSimple from '@/components/EditCustomer.vue'
import AddEditLocation from '@/components/AddEditLocation'
import { mapState, mapGetters } from 'vuex'
export default {
   middleware: ['authenticated', 'is-manager'],
  components: {
    SideNav,
    // Carriers,
    AddEditCarrier,
    Locations,
    FullWidthModal,
    AddEditLocation,
    SecurityRole,
    AddEditSecurityRole,
    CustomerForm,
    CustomerFormSimple,
    Users,
    AddEditUser
  },
  computed: {
    ...mapState({
      customer: state => state.customers.customerInContext,
      formToOpen: state => state.formToOpen,
    }),
   baseUrl(){
      return process.env.baseURL
    },
    ...mapGetters(['isBrynka'])
  },
  data() {
    return {
      tabIndex: 0,
      parentCustomers: [],
    }
  },

  async created() {
    try {
       const res = await this.$store.dispatch('customers/getCustomer', this.$route.params.id)
      this.getCustomerParentName(res.customer.parentCustomers)
    } catch (error) {
      console.log(error)
    }
  },
  methods:{
    async getCustomerParentName(ids) {
        ids.forEach(async (id) => {
          let { customers } = await this.$axios.$get(`/manage/customers?id=${id}`)
          if(customers.length > 0){
          this.parentCustomers.push(customers[0].name)
          }
        })
    },
    async refreshData(){
      await this.$store.dispatch('customers/getCustomer', this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.nav-tabs .nav-link a {
color: #000 !important;

}

.emp-profile{
    /* padding: 3%; */
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}

.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>
