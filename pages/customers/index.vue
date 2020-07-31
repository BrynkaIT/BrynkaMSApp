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
            <b-button size="sm"
              variant="primary"
              style="float:right"
               @click="$store.commit('switchForm',{ title:'Add Customer'})"
               >
                New Customer</b-button
              >
          </b-col>
        </b-row>
        <b-table
          ref="selectableTable"
          selectable
          stacked="md"
          striped
          bordered
          head-variant="dark"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          @row-selected="onRowSelected"
          responsive="sm"
        >
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
      <CustomerForm
        @hideModal="onHide"

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
   layout:'main',
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
      perPage: 5,
      pageOptions: [5, 10, 15],
      fields: ['name', 'modules', 'emailDomain', 'kind'],
      items: []
    }
  },
  created() {
    this.$axios.get('/customers').then(response => {
      this.items = response.data.customers
      this.totalRows = this.items.length
    })
  },
  methods: {
    onRowSelected(items) {
      this.$router.push(`/customers/${items[0]._id}`)
    }
  }
}
</script>
<style scoped>
.card {
  margin: 15px;
}
</style>
