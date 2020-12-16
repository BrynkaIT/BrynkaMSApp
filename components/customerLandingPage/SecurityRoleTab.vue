<template>
  <div>
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
            @click="$store.commit('switchForm',{ title:'Add Security Role', to:'AddEditSecurityRole'})"
            > New Security Role</b-button >
          </b-col>
        </b-row>

        <br />
        <!-- Main table element -->
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <b-skeleton-table
              :rows="10"
              :columns="3"
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

          <template v-slot:cell(actions)="row">
             <div class="text-center">
              <ActionButtons
                editModalTitle="Edit Security Role"
                editModalToOpen="AddEditSecurityRole"
                :editModalData="row.item"
                :canEdit="true"
                :id="row.item._id"
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
      loading: true,
      formTitle: '',
      fields: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'createdAt', label: 'Date Created',
        formatter: (value, key, item) => {
            return this.$moment(value).format("l");
          },
        sortable: true },
        { key: 'updatedAt', label: 'Last Updated',
        formatter: (value, key, item) => {
            return this.$moment(value).format("l");
          },
        sortable: true },
        { key: 'kind', label: 'Type', sortable: true },
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
      formToOpen: state => state.formToOpen
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
    this.fetchSecurityRoles()
  },
  methods: {
    fetchSecurityRoles() {
      this.$store.dispatch('securityRoles/getSecurityRoles')
      .then(response => {
        this.items = response.securityRoles
      this.totalRows = this.items.length
      this.loading = false
      }).catch(err => console.log(err))
    },
     onDelete(item){
      this.$store.dispatch('securityRoles/deleteSecurityRole', item._id)
      .then(res =>{
        this.fetchSecurityRoles()
        this.$toasted.success(res.message, {
        duration: 3000,
        position: 'top-center'
        })
      })
      .catch(e => {
        this.$toasted.error(e.message, {
          duration: 3000,
          position: 'top-center'
        })
      })
    },

    onFiltered(filteredItems) {

      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
