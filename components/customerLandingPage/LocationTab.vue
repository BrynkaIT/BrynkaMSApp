<template>
    <div >
        <br />
        <!-- User Interface controls -->
        <b-row>

          <b-col md="5" class="my-1">
            <b-form-group
              label="Filter"
              label-cols-sm="2"
              label-cols-md="2"
              label-cols-lg="2"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col md="5" class="my-1">
            <b-form-group
              label="Per page"
              label-cols-sm="2"
              label-cols-md="4"
              label-cols-lg="3"
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
            @click="$store.commit('switchForm',{ title:'Add Location', to:'AddEditLocation'})"
            > New Location</b-button >
          </b-col>
        </b-row>

        <br />
        <!-- Main table element -->
        <b-table

          head-variant="dark"
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
        >

          <template v-slot:cell(actions)="row">
            <ActionButtons
              :infoLink="`./${row.item.customer}/locations/${row.item._id}`"
              editModalTitle="Edit Location"
              editModalToOpen="AddEditLocation"
              :editModalData="row.item"
              :id="row.item._id"
              :showDeleteBtn="true"
              @onDelete="onDelete"
            ></ActionButtons>

          </template>

          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template>
        </b-table>
        <b-container>
          <b-row>
            <b-col sm="7" md="6" class="my-1 mx-auto">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-container>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import ActionButtons from '@/components/shared/ActionButtons'

export default {
  components:{
    ActionButtons
  },
  data() {
    return {
      items: [],
      showModal: false,
      formTitle: '',
      locationToEdit: null,
      fields: [
        { key: 'name', label: 'Location Name', sortable: true },
        { key: 'address.street1', label: 'Street', sortable: true },
        { key: 'address.street2', label: 'Suite', sortable: true },
        { key: 'address.city', label: 'City', sortable: true },
        { key: 'address.state', label: 'State', sortable: true },
        { key: 'address.postalCode', label: 'State'},
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      message: ''
    }
  },
  computed: {
     ...mapState({
      formToOpen: state => state.formToOpen,
      customerInContext: state => state.customers.customerInContext
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  created() {
    this.fetchLocations()
  },
  methods: {
    fetchLocations() {

      // this.$store.dispatch('locations/getLocations', `?cid=${this.$route.params.id}&deep=true`)
      this.$store.dispatch('locations/getLocations')
        .then(response => {

          this.items = response.locations
          // Set the initial number of items
          this.totalRows = this.items.length
        })
    },

    async onDelete(id) {
      try {
        const res = await this.$store.dispatch('locations/deleteLocation', id)
          this.fetchLocations()
        this.$brynkaToast(res.message, 'success')
      } catch (error) {
        this.$brynkaToast(error, 'danger')
      }

    },

    // onHide(value) {
    //   this.showModal = value
    // },
    onFiltered(filteredItems) {

      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
<style >

</style>
