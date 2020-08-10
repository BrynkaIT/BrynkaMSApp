<template>
  <div class="content-container">
    <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">
      <!-- view-all-customers-table -->
      <b-card title="Your Customers" class="overflow-scroll">
        <b-row align-h="between">

          <b-col sm="5" md="5" class="my-1 mb-2">
            <b-form-group
              label="Per page"
              label-cols-sm="2"
              label-cols-md="2"
              label-cols-lg="2"

              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2" class="my-1">
            <b-button
            size="sm"
              variant="primary"
              style="float:right"
               @click="$store.commit('switchForm',{ title:'Add Customer'})"
               >
                New Customer</b-button
              >
          </b-col>
        </b-row>
        <b-table
          stacked="md"
          striped
          bordered
          head-variant="dark"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          responsive="sm"
        >
        <template v-slot:cell(actions)="row" >
          <div class="action-buttons">
             <b-icon
            icon="info"
            class="bg-primary rounded p-1 "
            variant="light"
             @click="onRowSelected(row.item)"
            ></b-icon>
            <b-icon
            icon="pencil"
            class="bg-warning rounded p-1"
            variant="dark"
             @click="
                $store.commit('switchForm', {
                  title:'Edit Customer',
                  data: row.item
                })
              "
            ></b-icon>
             <b-icon
             icon="trash"
             class="rounded bg-danger p-1"
             variant="light"
             @click="onDelete(row.item)"
             ></b-icon>
          </div>
          </template>
        </b-table>
        <b-col sm="7" md="6" class="mx-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-card>
      <!-- view-all-customers-table -->
    </div>
    <FullWidthModal :show="this.formToOpen.showModal">
      <CustomerForm @refreshCustomers="fetchCustomers"
      ></CustomerForm>
    </FullWidthModal>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
import CustomerForm from '@/components/AddEditCustomer.vue'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import { mapState } from 'vuex'
export default {

   middleware: ['authenticated'],
   transition: "tile",
  components: {
    SideNav,
    FullWidthModal,
    CustomerForm
  },
  computed:{
    ...mapState({
      formToOpen: state => state.formToOpen
    }),
  },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 25,
      pageOptions: [25, 50, 100],
      fields: ['name', 'modules', 'emailDomain', 'kind',
      { key: 'actions', label: 'Actions' }
      ],
      items: []
    }
  },
  created() {
   this.fetchCustomers()
  },
  methods: {
    onRowSelected(item) {
      this.$router.push(`/customers/${item._id}`)
    },
    async fetchCustomers(){
      const { customers } = await this.$store.dispatch('customers/getCustomers')
    this.items = customers
    this.totalRows = this.items.length
    }
  }
}
</script>
<style scoped>
.action-buttons {
  font-size: 1.7rem;
  text-align:center
}
@media(max-width:992px){
  .action-buttons {
    min-width:120px;
  font-size: 1.5rem;
  text-align:left
  }
}
</style>
