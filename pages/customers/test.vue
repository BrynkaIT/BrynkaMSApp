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
              class="float-right"
              ><b-icon
                icon="plus-circle-fill"
                scale="2"
                class="mx-3"
                variant="primary"
              ></b-icon
            ></a>
          </b-col>
        </b-row>
        <b-row align-h="between">
          <b-col sm="5" md="5" class="my-1 mb-2">
            <b-input-group size="sm">
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
          </b-col>
        </b-row>
        <br />
        <div class="row">
          <div style="width:95%">
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
                        :src="`${item.imageFolder}`"
                        width="70px"
                        class="mr-3"
                      />
                      <!-- <b-avatar rounded class="mr-3" :src="`${item.imageFolder}`"></b-avatar> -->
                      <div>
                        <h5 class="mb-1">{{ item.name }}</h5>
                        <small class="text-muted">{{ item.emailDomain }}</small>
                      </div>
                    </div>
                  </b-col>
                  <b-col md="4">
                    <p class="text-center">
                      21 Main Street,<br />
                      Wallingford, PA 19086
                    </p>
                  </b-col>
                  <b-col md="4">
                    <b-button-toolbar style="float:right;">
                      <b-button-group class="mr-1">
                        <b-button title="Info">
                          <b-icon
                            icon="info-circle"
                            @click="onRowSelected(item)"
                            aria-hidden="true"
                          ></b-icon>
                        </b-button>
                        <b-button title="Edit">
                          <b-icon
                            icon="pencil"
                            @click="
                              $store.commit('switchForm', {
                                title: 'Edit Customer',
                                data: item
                              })
                            "
                            aria-hidden="true"
                          ></b-icon>
                        </b-button>
                        <b-button title="Delete">
                          <b-icon
                            icon="trash"
                            @click="onDelete(item)"
                            aria-hidden="true"
                          ></b-icon>
                        </b-button>
                      </b-button-group>
                    </b-button-toolbar>
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
          <ul>
             <li class="">
              <a href="#" @click="fetchCustomers('a')">Reset</a>
            </li>
            <li class="">
              <a href="#" @click="fetchCustomersByLetter('a')">A</a>
            </li>
            <li class=""><a href="">B</a></li>
            <li class=""><a href="">C</a></li>
            <li class=""><a href="">D</a></li>
            <li class=""><a href="">E</a></li>
            <li class=""><a href="">F</a></li>
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
  middleware: ['authenticated'],
  transition: 'tile',
  components: {
    SideNav,
    FullWidthModal,
    CustomerForm,
    JwPagination
  },
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    })
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
      const { customers } = await this.$store.dispatch(
        `customers/getCustomers`,
        query
      )

      this.items = customers
      this.totalRows = this.items.length
    },
    async fetchCustomersByLetter(letter) {
      let query = `?name.bw=${letter}`
      const { customers } = await this.$store.dispatch(
        `customers/getCustomers`,
        query
      )
      this.items = customers
      this.totalRows = this.items.length
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
.action-buttons {
  font-size: 1.7rem;
  text-align: center;
}
@media (max-width: 992px) {
  .action-buttons {
    min-width: 120px;
    font-size: 1.5rem;
    text-align: left;
  }
}
.right-side-nav ul{
    list-style: none;
    padding: 5px;
    /* width:5% */
}
.right-side-nav ul li a:hover{

 font-size: 40px;
  font-family: sans-serif;
  font-weight: 900;
}
</style>
