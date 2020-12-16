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
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
          <b-skeleton-table
          :rows="15"
          :columns="4"
          :table-props="{ bordered: true, striped: true }"
          ></b-skeleton-table>
          </template>
        <b-table
          striped
          bordered
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
          @filtered="onFiltered"
        >
            <template #cell(address)="row">
              <div v-if="row.item.address">
              <span v-if="row.item.address.street1">{{ row.item.address.street1 }}</span>
              <span v-if="row.item.address.street2"><br>{{ row.item.address.street2 }}</span>
              <span><br>{{ row.item.address.city }},&nbsp;</span>
              <span>{{ row.item.address.state}}&nbsp;</span>
              <span>{{ row.item.address.postalCode}}&nbsp;</span>
              </div>
            </template>

          <template v-slot:cell(actions)="row">
            <div class="text-center">
              <b-badge  v-show="row.item.isInactive" variant="danger" pill>Inactive </b-badge>
              <ActionButtons
                :infoLink="`./${$route.params.id}/locations/${row.item._id}`"
                editModalTitle="Edit Location"
                editModalToOpen="AddEditLocation"
                :editModalData="row.item"
                :id="row.item._id"
                :canEdit="true"
                :canDelete="true"
                @onDelete="onDelete"
              ></ActionButtons>
            </div>
          </template>
        </b-table>
        </b-skeleton-wrapper>
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
      loading:true,
      locationToEdit: null,
      fields: [
       { key: 'name', label: 'Location Name', sortable: true },
        // A virtual column made up from two fields
        { key: 'address', label: 'Address' },
        { key: 'actions', label: '' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [15, 30, 60],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
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
    async fetchLocations() {
      try {
        const {locations} = await this.$store.dispatch('locations/getLocations', {customerId: this.$route.params.id, query:'?deep=true'})
        this.items = locations
        this.totalRows = this.items.length
        this.loading = false
      } catch (error) {
        $brynkaToast('error', danger)
      }

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
