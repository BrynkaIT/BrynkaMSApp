<template>
  <div class="content-container">
    <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">

      <b-card style=" overflow:scroll">
          <div class="top-panel mt-2 mb-5">
            <div class="ml-2 pb-1" style="display:flex;flex-wrap: wrap;">
              <b-avatar
                size="3rem"
                icon="diagram3"
                class="border m-2"
                variant="none"
              ></b-avatar>
              <div><h3 class="mt-3 ml-1">Your Customers</h3></div>
            </div>
          </div>


          <div class="mt-3">
            <div class="row">

             <div class="col-md-5 col-sm-12">
               <b-input-group
               size="sm"
               class="mb-3">
              <b-form-input
                size="sm"
                v-model="searchQuery"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!searchQuery" @click="clearSearch"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
             </div>

             <div class="col-md-5 col-sm-12">
              <b-form-group
              size="sm"
              label="Display"
              label-cols-sm="2"
              label-cols-md="4"
              label-cols-lg="2"
              label-for="perPageSelect"

            >
              <b-form-select
              size="sm"
              v-model="pageSize"
                @input="perPage($event)"
                id="perPageSelect"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
             </div>

             <div class="col-md-2 col-sm-12">
                <b-button
              v-if="isBrynka"
              size="sm"
              class="mb-3 new-btn"
              variant="primary"
              @click="$store.commit('switchForm', { title: 'Add Customer' })">New <span class="">Customer</span></b-button>
             </div>
            </div>


            <b-list-group>
              <b-list-group-item
                href="#"
                v-for="item in pageOfItems"
                :key="item.id"
              >
                <b-row class="">
                  <div class="col-md-4 name-and-logo">
                    <div class="d-inline-flex">
                      <img
                        :src="`${baseUrl}${item.logoUrl}`"

                        class="mr-3 logo-width"
                      />
                      <div>
                        <h5 class="mb-1">{{ item.name }}</h5>
                        <small class="text-muted">{{ item.emailDomain }}</small>
                      </div>
                    </div>
                  </div>
                   <div class="col-md-4">
                    <p class="middle" v-if="item.address">
                      <span v-if="item.address.street1"
                        >{{ item.address.street1 }},</span
                      >
                      &nbsp;<span v-if="item.address.street2"
                        >{{ item.address.street2 }},</span
                      ><br />
                      <span v-if="item.address.city"
                        >{{ item.address.city }},&nbsp;</span
                      >
                      <span v-if="item.address.state"
                        >{{ item.address.state }},&nbsp;</span
                      >
                      <span v-if="item.address.postalCode">{{
                        item.address.postalCode
                      }}</span
                      ><br />
                    </p>
                  </div>
                  <div class="col-md-4">

                    <div style="font-size: 1.75rem;margin: 15px;" class="right">
                      <b-icon
                        icon="info"
                        class="border rounded"
                        variant="secondary"
                        @click="info(item)"
                      ></b-icon>
                    </div>

                  </div>
                </b-row>
              </b-list-group-item>
            </b-list-group>
          </div>
          <div class="text-center mt-3">
            <jw-pagination
              :items="resultQuery"
              @changePage="onChangePage"
              :pageSize="pageSize"
              :labels="customLabels"
            ></jw-pagination>
          </div>
      </b-card>
    </div>
    <FullWidthModal :show="this.formToOpen.showModal">
      <CustomerForm @refreshCustomers="fetchCustomers"></CustomerForm>
    </FullWidthModal>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
import CustomerForm from '@/components/brynkaOnly/AddEditCustomer.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import RibbonHeader from '@/components/shared/RibbonHeader'
import JwPagination from 'jw-vue-pagination'
import { mapState, mapGetters } from 'vuex'

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

export default {
  middleware: ['authenticated', 'is-manager'],
  components: {
    SideNav,
    FullWidthModal,
    CustomerForm,
    JwPagination,
    RibbonHeader

  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
      return this.resources.filter((item)=>{
        return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
      })
      }else{
        return this.resources;
      }
    },
    ...mapState({
      formToOpen: state => state.formToOpen
    }),
    baseUrl() {
      return process.env.baseURL
    },
    isBrynka(){
      return this.$store.getters['auth/isBrynka']
    }

  },
  data() {
    return {
      customLabels,
      fields: ['name','modules','emailDomain','kind',{ key: 'actions', label: 'Actions' }],
      resources:[],
      pageOfItems: [],
      pageSize: 15,
      intialPageSize: 15,
      pageOptions: [15, 30, 60],
      searchQuery: null,
    }
  },
  created() {
    this.fetchCustomers()
  },

  methods: {
    info(item) {
      this.$store.commit('customers/setCustomerInContext', item)
      this.$router.push(`/customers/${item._id}`)
    },
    async fetchCustomers() {

      try {
        const { customers } = await this.$store.dispatch(`customers/getCustomers`)
        this.resources = customers
        this.totalRows = this.resources.length
      } catch (err) {
        this.$toasted.error(err.message, {
          position: 'top-center',
          duration: 5000
        })
      }
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems
    },
    perPage(event){
      this.pageSize = event
      this.fetchCustomers()
    },
    clearSearch() {
      this.searchQuery = null
      this.fetchCustomers()
    }
  }
}
</script>

<style scoped>
.top-panel {
  width: 100%;
  background: #495057 !important;
  border-radius: 5px;
  color: #fff;
}
.list-group-wrapper {
  margin: 15px;
}
.logo-width{
  width:20%;
}
.list-group-item {
    padding: 0.5rem 1rem !important;
}
h5{
  font-weight: 300;
  font-size: 16px;
}
.middle {
  text-align: center;
  font-size: 14px;
  font-weight: 300;
}
.right {
  text-align: right;
}
.new-btn{
  float:right
}
.search-link:hover {
  font-size: 40px;
  font-family: sans-serif;
  font-weight: 900;
}
@media (max-width: 1222px) {
  .list-group-wrapper {
    width: 85%;
  }
}
@media (max-width: 992px) {

  .new-btn span{
  display:none
  }
  .list-group-wrapper {
    width: 80%;
  }
}
@media (max-width: 768px){
  .name-and-logo{
    text-align:center
  }
    .right {
    text-align:center
  }
  .logo-width{
    width:170px;
  }
  .new-btn {
  float:left;
  width:100%;
}
.new-btn span{
  display:inline
  }
}
@media (max-width: 368px) {

  .list-group-wrapper {
    width: 75%;
  }
}
</style>
