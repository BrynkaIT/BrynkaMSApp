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
          @click="$store.commit('switchForm', { title: 'Add Department', to:'AddEditDepartment', })"
        >
          New Department</b-button
        >
      </b-col>
    </b-row>

    <br />
    <!-- Main table element -->
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
    >
      <template v-slot:cell(actions)="row">
        <b-icon
          icon="pencil"
          class="rounded-circle bg-primary p-1"
          font-scale="1.5"
          variant="light"
          @click="
            $store.commit('switchForm', {
              title: 'Edit Department',
              to:'AddEditDepartment',
              data: row.item
            })
          "
        ></b-icon>
        <b-icon
          icon="trash"
          class="rounded-circle bg-danger p-1"
          font-scale="1.5"
          variant="light"
          @click="onDelete(row.item)"
        ></b-icon>
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
      items: [],
      showModal: false,
      formTitle: '',
      departmentToEdit: null,
      fields: [
        { key: 'name', label: 'Department Name', sortable: true },
        { key: 'location.name', label: 'Location', sortable: true },
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
    this.fetchDepartments()
  },
  methods: {
    fetchDepartments() {
      this.$store.dispatch('departments/getDepartments', `?deep=true`)
        .then(departments => {
          this.items = departments
          this.totalRows = this.items.length
        })
        .catch(err => {
          this.message = err.data.message
          })
    },
    onDelete(item){
      this.$store.dispatch('departments/deleteDepartment', item._id)
      .then(res =>{
        this.fetchDepartments()
        this.$toasted.success(res.message, {
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
.b-icon:hover{
 -webkit-box-shadow: 0px 7px 10px 1px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 7px 10px 1px rgba(0,0,0,0.75);
box-shadow: 0px 7px 10px 1px rgba(0,0,0,0.75);
 transform: scale(1.2);
}

</style>
