<template>
  <div class="content-container">
    <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">
      <!-- view-all-customers-table -->
      <b-card title="Your Customers" class="overflow-scroll">
        <b-row align-h="end">
          <b-col sm="5" md="5" class="my-1 mb-2">
            <b-form-group
              label="Per page"
              label-cols-sm="4"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
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
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
export default {
   layout:'main',
   middleware: ['authenticated'],
  components: {

    SideNav,
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
      // Set the initial number of items
      this.totalRows = this.items.length
      // this.$store.dispatch('managedService/getSelectedCustomer', null)
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
