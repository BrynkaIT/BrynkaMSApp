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
                  $store.commit('switchForm', { title: 'Add User', to: 'user' })
                "
              >
                New User</b-button
              >
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

          <template v-slot:cell(actions)="row" >
            <div class="action-buttons">
              <b-icon
              icon="pencil"
              class="bg-warning rounded p-1"
              variant="dark"
              @click="
                  $store.commit('switchForm', {
                    title:'Edit User',
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

export default {

  data() {
    return {
      userToEdit: '',
      items: [],
      showModal: false,
      formTitle: '',
      fields: [
        { key: '_id', label: 'user ID', sortable: true },
        { key: 'firstName', label: 'First Name', sortable: true },
        { key: 'lastName', label: 'Last Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'securityRole.name', label: 'Security Role',sortable: true},
        // { key: 'isActive', label: 'Is Active', sortable: true },
        { key: 'actions', label: 'Actions', }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15],
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
    isActive(item) {
      if (!item.isActive) {
        this.$axios
          .put('/users/activate', {
            userId: item._id
          })
          .then(user => {
            this.message = 'User Activated!'
            if (item._rowVariant) {
              item._rowVariant = null
            }
          })
          .catch(err => console.log(err.response))
      } else {
        this.$axios
          .put('/users/deactivate', {
            userId: item._id
          })
          .then(user => (this.message = 'User Deactivated!'))
          .catch(err => {
            this.message = err.response.data.message
            item.isActive = true
          })
      }
    },
    fetchUsers() {
      this.$store
        .dispatch('users/getUsers', '?deep=true')
        .then(response => {
          this.items = response.users
          this.items.forEach(user => {
            if (user.isPendingApproval) {
              user._rowVariant = 'warning'
            }
          })
          // Set the initial number of items
          this.totalRows = this.items.length
        })
        .catch(err => (this.message = err.response.data.message))
    },
  
    onDelete(item) {

      this.$store
        .dispatch('users/deleteUser', item._id)
        .then(res => {
          this.fetchUsers()
          this.$toasted.show(res.message, {
            theme: "outline",
            duration: 3000,
            position: 'top-center'
          })
        })
        .catch(e => {
          this.$toasted.error(e.data.message, {
            duration: 3000,
            position: 'top-center'
          })
        })
    },
    onHide(value) {
      this.showModal = value
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