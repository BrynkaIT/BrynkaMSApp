<template>
  <div class="content-container">
    <!-- <SideNav page="securityRoles" app="Admin"></SideNav> -->

    <div class="content-right">
      <b-card header="Security Roles" header-tag="header">
        <br />
        <!-- User Interface controls -->
        <b-row>
          <b-col lg="4" class="my-1">
            <b-form-group
              label="Sort"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="sortBySelect"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-select
                  v-model="sortBy"
                  id="sortBySelect"
                  :options="sortOptions"
                  class="w-75"
                >
                  <template v-slot:first>
                    <option value="">-- none --</option>
                  </template>
                </b-form-select>
                <b-form-select
                  v-model="sortDesc"
                  size="sm"
                  :disabled="!sortBy"
                  class="w-25"
                >
                  <option :value="false">Asc</option>
                  <option :value="true">Desc</option>
                </b-form-select>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="4" class="my-1">
            <b-form-group
              label="Filter"
              label-cols-sm="3"
              label-align-sm="right"
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
          <b-col lg="4" class="my-1">
            <b-form-group
              label="Add"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="AddNewSecurityRole"
              class="mb-0"
            >
              <!-- <b-button size="sm" variant="outline-primary" v-b-modal.modal>New Security Role</b-button> -->
              <b-button size="sm" variant="outline-primary" @click="addNew">New Security Role

              </b-button>
            </b-form-group>
          </b-col>
        </b-row>
        <br />
        <!-- Main table element -->


        <b-table
          show-empty
          small
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template v-slot:cell(name)="row">
            {{ row.value.name }}
          </template>

          <template v-slot:cell(actions)="row">

            <b-button variant="primary" size="sm" @click="row.toggleDetails">
              <!-- {{ row.detailsShowing ? 'Hide' : 'Show' }} -->
              Details
            </b-button>
            <b-button
            variant="warning"
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
              Edit
            </b-button>
            <b-button
            variant="danger"
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
              Delete
            </b-button>
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
        <template v-slot:footer>
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
        </template>
      </b-card>
    </div>
     <!-- Add New modal -->
    <!-- <b-modal
      id="modal"
      ref="modal"
      title="Add New Security Role"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Security Role Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="NewSecurityRole.srName"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Role Permissions">
          <b-form-checkbox v-model="NewSecurityRole.canCreateUsers" switch size="lg">Create User</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.canActivateUsers" switch size="lg">Activate Users</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.canModifyUsers" switch size="lg">Modify Users</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.canDeleteUsers" switch size="lg">Delete Users</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.protectFromDeletion" switch size="lg">Protect this User From Deletion</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.canCreateContacts" switch size="lg">Create Contacts</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.canModifyContacts" switch size="lg">Modify Contacts</b-form-checkbox>
          <b-form-checkbox v-model="NewSecurityRole.canDeleteContacts" switch size="lg">Delete Contacts</b-form-checkbox>
        </b-form-group>
      </form>
    </b-modal> -->

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @ok="handleOk"
      ref="infoModal"
    >
    <form ref="form" @submit.prevent="handleSubmit" v-if="!infoModal.editMode">
        <b-form-group
          label="Security Role Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input v-model="securityRole.srName" required></b-form-input>
        </b-form-group>
        <b-form-group label="Role Permissions">
          <b-form-checkbox v-model="securityRole.canCreateUsers" switch size="lg">Create User</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.canActivateUsers" switch size="lg">Activate Users</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.canModifyUsers" switch size="lg">Modify Users</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.canDeleteUsers" switch size="lg">Delete Users</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.protectFromDeletion" switch size="lg">Protect this User From Deletion</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.canCreateContacts" switch size="lg">Create Contacts</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.canModifyContacts" switch size="lg">Modify Contacts</b-form-checkbox>
          <b-form-checkbox v-model="securityRole.canDeleteContacts" switch size="lg">Delete Contacts</b-form-checkbox>
        </b-form-group>
      </form>
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
// import SideNav from '@/components/SideNav.vue'

export default {
  page: 'admin/securityRoles',
   app:'admin',
  components: {
    // SideNav
  },
  data() {
    return {
      items:[],
      fields: [
        { key: 'srName', label: 'Security Role Name', sortable: true },
        { key: 'createdAt', label: 'Date Create', sortable: true },
        { key: 'updatedAt', label: 'Last Modified', sortable: true },
        // { key: 'isActive', label: 'Active?', sortable: true },
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
      filterOn: [],
      // nameState: null,
      securityRole:{
        srName: '',
        createdAt: '',
        updatedAt:'',
        canCreateUsers:false,
        canActivateUsers:false,
        canModifyUsers:false,
        canDeleteUsers:false,
        canCreateContacts:false,
        canModifyContacts:false,
        canDeleteContacts:false,
        protectFromDeletion:false
      },

      submittedPermissions: '',
      infoModal: {
        id: 'info-modal',
        title: '',
        content:'',
        editMode:false,
      },
    }
  },
  computed: {
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
    this.$axios.get('/securityRole')
      .then(response => {
        console.log(response.data.securityRoles)
        this.items = response.data.securityRoles

      // Set the initial number of items
      this.totalRows = this.items.length
    }).catch(err => console.log(err))
  },
  methods: {
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        // this.nameState = valid ? 'valid' : 'invalid'
        return valid
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
       this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        //  this.items.push(this.securityRole)
        this.$axios.post('/securityRole', this.securityRole)
          .then(response => {
            console.log(response)
            this.items = response.data.securityRoles

          // Set the initial number of items
          this.totalRows = this.items.length
          this.resetInfoModal()
        }).catch(err => console.log(err))
            // Hide the modal manually
            this.$nextTick(() => {
              // Push the name to submitted names
              this.$refs.infoModal.hide()
            })
      },

    info(item, index, button) {
      this.infoModal.editMode = false;
      this.securityRole.srName= item.srName
      this.securityRole.createdAt = item.createdAt;
      this.securityRole.updatedAt = item.updatedAt;
      // this.securityRole.isActive = item.isActive,
      this.securityRole.canActivateUsers = item.canActivateUsers,
      this.securityRole.canCreateContacts = item.canCreateContacts,
      this.securityRole.canCreateUsers = item.canCreateUsers,
      this.securityRole.canDeleteContacts = item.canDeleteContacts,
      this.securityRole.canDeleteUsers = item.canDeleteUsers,
      this.securityRole.canModifyContacts = item.canModifyContacts,
      this.securityRole.canModifyUsers = item.canModifyUsers,
      this.securityRole.protectFromDeletion = item.protectFromDeletion,
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    addNew(){
      this.$refs['infoModal'].show()
      this.infoModal.editMode = false;
      this.infoModal.title = `New Security Role`;
      // this.$root.$emit('bv::show::modal', this.infoModal.id)
    },
    resetInfoModal() {
      this.securityRole.srName = '';
      this.securityRole.createdAt = '';
      this.securityRole.updatedAt = '';
      // this.securityRole.isActive = '';
      this.securityRole.canActivateUsers = '';
      this.securityRole.canCreateContacts = '';
      this.securityRole.canCreateUsers = '';
      this.securityRole.canDeleteContacts = '';
      this.securityRole.canDeleteUsers = '';
      this.securityRole.canModifyContacts = '';
      this.securityRole.canModifyUsers = '';
      this.securityRole.protectFromDeletion = '';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
