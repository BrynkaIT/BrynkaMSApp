<template>
  <div class="content-container">
    <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">
      <!-- view-all-customers-table -->
      <b-card class="overflow-scroll">
        <b-row align-h="between">
          <b-col cols="4">
            <b-card-title>Your Customers</b-card-title>
          </b-col>
          <b-col cols="4">
            <a
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
                  v-model="searchCriteria"
                  type="search"
                  id="filterInput"
                  @input="fetchCustomers"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!searchCriteria" @click="clearSearch"
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
                    <b-col md="4">
                      <div class="d-flex align-items-center">
                        <img
                          :src="`${baseUrl}${item.logoUrl}`"
                          width="70px"
                          class="mr-3"
                        />
                        <div>
                          <h5 class="mb-1">{{ item.name }}</h5>
                          <small class="text-muted">{{
                            item.emailDomain
                          }}</small>
                        </div>
                      </div>
                    </b-col>
                    <b-col md="4">
                      <p class="middle" v-if="item.address">
                        <span v-if="item.address.street1">{{ item.address.street1 }}</span> <span v-if="item.address.street2">{{ item.address.street2 }}</span>,<br>
                        <span v-if="item.address.city">{{ item.address.city }}</span>,
                        <span v-if="item.address.state">{{ item.address.state }}</span>,
                        <span v-if="item.address.postalCode">{{ item.address.postalCode }}</span><br>
                      </p>
                    </b-col>
                    <b-col md="4">
                      <b-dropdown variant="outline-primary" class="right">
                        <template v-slot:button-content>
                          <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
                        </template>
                        <b-dropdown-item-button variant="info"  @click="onRowSelected(item)">
                          <b-icon icon="info-circle" aria-hidden="true"></b-icon>
                          More
                        </b-dropdown-item-button>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button variant="danger"  @click="onDelete(item)">
                          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                          Delete
                        </b-dropdown-item-button>
                      </b-dropdown>


                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>


            <div class="text-center mt-3">
              <jw-pagination
                :items="items"
                @changePage="onChangePage"
                :pageSize="pageSize"
              ></jw-pagination>
            </div>
          </div>
          <div class="right-side-nav">
            <ul >
              <li class="">
                <a href="#" @click="fetchCustomers()">Reset</a>
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('a')"
                  >A</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('b')"
                  >B</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('c')"
                  >C</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('d')"
                  >D</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('e')"
                  >E</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('f')"
                  >F</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('g')"
                  >G</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('h')"
                  >H</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('i')"
                  >I</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('j')"
                  >J</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('k')"
                  >K</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('l')"
                  >L</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('m')"
                  >M</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('n')"
                  >N</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('o')"
                  >O</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('p')"
                  >P</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('q')"
                  >Q</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('r')"
                  >R</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('s')"
                  >S</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('t')"
                  >T</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('u')"
                  >U</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('v')"
                  >V</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('w')"
                  >W</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('x')"
                  >X</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('y')"
                  >Y</a
                >
              </li>
              <li class="">
                <a
                  href="#"
                  class="search-link"
                  @click="fetchCustomersByLetter('z')"
                  >Z</a
                >
              </li>
            </ul>
          </div>
        </div>
      </b-card>
      <!-- view-all-customers-table -->
    </div>
    <FullWidthModal :show="this.formToOpen.showModal">
      <CustomerForm @refreshCustomers="fetchCustomers"></CustomerForm>
    </FullWidthModal>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
import CustomerForm from '@/components/AddEditCustomer.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import JwPagination from 'jw-vue-pagination'
import { mapState } from 'vuex'
export default {
  middleware: ['authenticated', 'is-manager'],
  // transition: 'tile',
  components: {
    SideNav,
    FullWidthModal,
    CustomerForm,
    JwPagination
  },
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    }),
    baseUrl(){
      return process.env.baseURL
    }
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      fields: [
        'name',
        'modules',
        'emailDomain',
        'kind',
        { key: 'actions', label: 'Actions' }
      ],
      items: [],
      pageOfItems: [],
      pageSize: 10,
      searchCriteria: ''
    }
  },
  created() {
    this.fetchCustomers()
  },
  methods: {
    onRowSelected(item) {
      this.$router.push(`/customers/${item._id}`)
    },
    async fetchCustomers() {
      let query
      if (this.searchCriteria == '') {
      query = ''
      } else {
        query = `?name.bw=${this.searchCriteria}`
      }

      try {
      const { customers } = await this.$store.dispatch(`customers/getCustomers`,query)
      this.items = customers
      this.totalRows = this.items.length
      } catch (error) {
        console.log(error)
      }

    },
    async fetchCustomersByLetter(letter) {
      let query = `?name.bw=${letter}`

      try {
        const { customers } = await this.$store.dispatch(
        `customers/getCustomers`,
        query
      )
      this.items = customers
      this.totalRows = this.items.length
      } catch (error) {
         console.log(error)
      }

    },
    clearSearch() {
      this.searchCriteria = ''
      this.fetchCustomers()
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems
    }
  }
}
</script>
<style scoped>
.list-group-wrapper{
  width:90%;
  margin-left: 15px;
}
.middle {
  text-align: center;
}
.right{
  float: right
}
@media (max-width: 1222px) {
  .list-group-wrapper{
  width:85%
}
}
@media (max-width: 992px) {
  .middle{
    text-align: left;
  }
  .right{
  float: left
  }

}
.right-side-nav  {
  padding: 5px;
  text-align: center;
  position: absolute;
  right: 12px;
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
</style>
