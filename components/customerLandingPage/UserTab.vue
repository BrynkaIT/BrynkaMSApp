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
            <b-button
                size="sm"
                variant="primary"
                style="float:right"
                @click="
                  $store.commit('switchForm', {
                    title: 'Add User',
                    to: 'AddEditUser'
                    })
                "
              >
                New User</b-button
              >
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

          <template v-slot:cell(actions)="row" >
             <div class="text-center">
              <b-badge  v-show="row.item.isPendingApproval && row.item.isInactive" variant="warning" pill>Pending</b-badge>
              <b-badge  v-show="!row.item.isPendingApproval && row.item.isInactive" variant="danger" pill>Inactive </b-badge>
              <ActionButtons
                :infoLink="`./${$route.params.id}/users/${row.item._id}`"
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
      userToEdit: '',
      loading:true,
      items: [],
      showModal: false,
      formTitle: '',
      fields: [
       { key: 'fullName', label: 'Name', sortable: true },
        // { key: 'firstName', label: 'First Name', sortable: true },
        // { key: 'lastName', label: 'Last Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'userType', label: 'User Type', sortable: true },
        { key: 'securityRole.name', label: 'Security Role', sortable: true },
        { key: 'actions', label: '' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [15, 30, 60, 120],
      securityOptions: ['Admin', 'Ms User', 'Clerk'],
      isActiveOptions: ['True', 'False'],
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
    this.fetchUsers()
  },
  methods: {

    async fetchUsers() {
      try {
        const res = await this.$store.dispatch('users/getUsers', '?deep=true')
        this.items = res.users
        this.items.forEach(user => {
          if (user.isPendingApproval) {
            user._rowVariant = 'warning'
          }
        })
          // Set the initial number of items
          this.totalRows = this.items.length
        this.loading = false
      } catch (error) {
         this.$brynkaToast(error, 'danger')
      }

    },

    async onDelete(id) {
      try {
      const res = await this.$store.dispatch('users/deleteUser', id)
      this.fetchUsers()
      this.$brynkaToast(res.message, 'success')

      } catch (error) {
        console.log(error)
        debugger
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
