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
               class="mb-3">
              <b-form-input
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
              label="Per page"
              label-cols-sm="2"
              label-cols-md="4"
              label-cols-lg="2"
              label-for="perPageSelect"

            >
              <b-form-select
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
              class="float-right mb-3"
              variant="primary"
              @click="$store.commit('switchForm', { title: 'Add Customer' })">New Customer</b-button>
             </div>
            </div>


            <b-list-group>
              <b-list-group-item
                href="#"
                v-for="item in pageOfItems"
                :key="item.id"
              >
                <b-row>
                  <div class="col-md-4 col-sm-12">
                    <div class="d-flex align-items-center">
                      <img
                        :src="`${baseUrl}${item.logoUrl}`"
                        width="70px"
                        class="mr-3"
                      />
                      <div>
                        <h5 class="mb-1">{{ item.name }}</h5>
                        <small class="text-muted">{{ item.emailDomain }}</small>
                      </div>
                    </div>
                  </div>
                   <div class="col-md-4 col-sm-12">
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
                  <div class="col-md-4 col-sm-12">

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
      this.$store.commit('setCustomerInContext', item)
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
  /* width: 90%; */
  margin: 15px;
}
.middle {
  text-align: center;
}
.right {
  float: right;
}
.right-side-nav {
  padding: 5px;
  text-align: center;
  position: absolute;
  right: 21px;
}
.right-side-nav ul {
  list-style: none;
  text-align: center;
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
  .middle {
    text-align: left;
  }
  .right {
    float: left;
  }
  .list-group-wrapper {
    width: 80%;
  }
}
@media (max-width: 368px) {

  .list-group-wrapper {
    width: 75%;
  }
}
</style>
