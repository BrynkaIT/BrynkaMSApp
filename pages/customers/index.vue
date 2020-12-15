<template>
  <div class="content-container">
    <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">
      <!-- view-all-customers-table -->
      <b-card style="height:95%; overflow:scroll">
        <b-row align-h="between">
          <b-col cols="8">
            <b-card-title>Your Customers</b-card-title>
          </b-col>
          <b-col cols="4">
            <a
              v-if="isBrynka"
              href="#"
              @click="$store.commit('switchForm', { title: 'Add Customer' })"
              class="float-right align-items-center"
              ><b-icon
                icon="plus-circle-fill"
                scale="2"
                class="mx-3"
                variant="primary"
              ></b-icon
            ></a>
          </b-col>
        </b-row>

        <br />
        <div class="row">
          <div class="list-group-wrapper">
            <b-input-group size="sm" class="mb-3">
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
          <div class="mx-auto mt-3">
             <jw-pagination
                :items="resultQuery"
                @changePage="onChangePage"
                :pageSize="pageSize"
              ></jw-pagination>
            </div>
          <div class="right-side-nav">
            <ul>
              <li class="">
                <a href="#" @click="fetchCustomers()">Reset</a>
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('a')"
                  >A</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('b')"
                  >B</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('c')"
                  >C</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('d')"
                  >D</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('e')"
                  >E</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('f')"
                  >F</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('g')"
                  >G</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('h')"
                  >H</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('i')"
                  >I</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('j')"
                  >J</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('k')"
                  >K</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('l')"
                  >L</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('m')"
                  >M</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('n')"
                  >N</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('o')"
                  >O</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('p')"
                  >P</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('q')"
                  >Q</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('r')"
                  >R</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('s')"
                  >S</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('t')"
                  >T</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('u')"
                  >U</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('v')"
                  >V</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('w')"
                  >W</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('x')"
                  >X</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('y')"
                  >Y</a
                >
              </li>
              <li class="">
                <a href="#" class="search-link" @click="fetchCustomers('z')"
                  >Z</a
                >
              </li>
            </ul>
          </div>
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
import JwPagination from 'jw-vue-pagination'
import { mapState, mapGetters } from 'vuex'
export default {
  middleware: ['authenticated', 'is-manager'],
  components: {
    SideNav,
    FullWidthModal,
    CustomerForm,
    JwPagination

  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
        console.log(this.searchQuery)
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

      fields: ['name','modules','emailDomain','kind',{ key: 'actions', label: 'Actions' }],
      resources:[],
      pageOfItems: [],
      pageSize: 25,
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
    async fetchCustomers(l) {

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
    clearSearch() {
      this.searchQuery = null
      this.fetchCustomers()
    }
  }
}
</script>

<style scoped>
.list-group-wrapper {
  width: 90%;
  margin-left: 15px;
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
