<template>
  <div class="container">
    <b-card>
      <b-card-header header-bg-variant="primary" header-text-variant="white"
        ><h4>Security Roles</h4></b-card-header
      >
      <b-form class="mt-4" @submit="onSubmit">
        <b-form-group label="Security Role Name:" class="mt-2">
          <b-form-input
            size="sm"
            v-model="perms.name"
            :class="{ 'validation-error': $v.perms.name.$error }"
            placeholder="Enter name"
          ></b-form-input>
           <div v-if="$v.perms.name.$error">
              <span v-if="!$v.perms.name.required" class="error-text"
                >Security Role name is required</span
              >
            </div>
        </b-form-group>
        <b-form-group label="Protect from Deletion?">
          <b-form-select
          size="sm"
          v-model="perms.protectFromDeletion"
          :options="pfdOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group label="Set Security Level">
          <b-list-group class="p-2">
            <b-list-group-item

              variant="secondary"
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">

                <h5 class="mb-1">Catergory</h5>
                <h5 class="mr-5"><span
                  ><b-icon
                    icon="shield-lock"
                    variant="success"
                  ></b-icon
                  ></span
                >Access</h5>
              </div>
            </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  ><b-icon
                    icon="building"
                    scale="1.5"
                    variant="secondary"
                    class="mr-3"
                  ></b-icon
                  >Buildings</span
                >
                  <b-form-select
                  :options="accessOptions"
                  v-model="accessLevelBuildings"
                  @input="setPermissionsProp('Buildings',$event)"
                  size="sm"
                   style="max-width: 160px;"
                ></b-form-select>


              </b-list-group-item>

              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  ><b-icon
                    icon="people"
                    scale="1.5"
                    variant="info"
                    class="mr-3"
                  ></b-icon
                  >Contacts</span
                >
                <b-form-select
                  :options="accessOptions"
                  v-model="accessLevelContacts"
                  @input="setPermissionsProp('Contacts',$event)"
                  size="sm"
                  style="max-width: 160px;"
                ></b-form-select>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  ><b-icon
                    icon="box"
                    scale="1.5"
                    variant="warning"
                    class="mr-3"
                  ></b-icon
                  >Carriers & Services</span
                >
                <b-form-select
                  :options="accessOptions"
                  v-model="accessLevelCarriersAndServices"
                  @input="setCarriersAndServicesAccess($event)"
                  size="sm"
                  style="max-width: 160px;"
                ></b-form-select>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  ><b-icon
                    icon="bounding-box-circles"
                    scale="1.5"
                    variant="primary"
                    class="mr-3"
                  ></b-icon
                  >Departments</span
                >
                <b-form-select
                  :options="accessOptions"
                  v-model="accessLevelDepartments"
                  @input="setPermissionsProp('Departments',$event)"
                  size="sm"
                  style="max-width: 160px;"
                ></b-form-select>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  ><b-icon
                    icon="people"
                    scale="1.5"
                    variant="danger"
                    class="mr-3"
                  ></b-icon
                  >Item Types</span
                >
                <b-form-select
                  :options="accessOptions"
                  v-model="accessLevelItemTypes"
                  @input="setPermissionsProp('ItemTypes',$event)"
                  size="sm"
                  style="max-width: 160px;"
                ></b-form-select>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <span
                  ><b-icon
                    icon="person-check-fill"
                    scale="1.5"
                    variant="success"
                    class="mr-3"
                  ></b-icon
                  >Users</span
                >
                <b-form-select
                  :options="accessOptions"
                  v-model="accessLevelUsers"
                  @input="setPermissionsProp('Users',$event)"
                  size="sm"
                  style="max-width: 160px;"
                ></b-form-select>
              </b-list-group-item>

          </b-list-group>
        </b-form-group>
        <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    })
  },
  validations: {
      perms: {
        name: {
          required
        }
      }
    },
    created() {
    if(this.formToOpen.data){
      this.fetchSRToEdit(this.formToOpen.data)
    }
  },
  data() {
    return {
      SRToEdit:false,
      perms: {
        id:'',
        canAccessAllCustomers : false,
        canActivateUsers: false,
        canAccessAllLocations : false,
        canCreateApiUsers : false,
        canCreateBuildings : false,
        canCreateCarriers : false,
        canCreateCarrierLogic : false,
        canCreateCustomers : false,
        canCreateDepartments : false,
        canCreateEvents : false,
        canCreateFloors : false,
        canCreateItemTypes : false,
        canCreateLocations : false,
        canCreateMsCompanies : false,
        canCreateNonReceiveEvents : false,
        canCreatePrimaryCarrierLogic : false,
        canCreateReceivedItems : false,
        canCreateSecurityRoles : false,
        canCreateServices : false,
        canCreateTenants : false,
        canDeleteBuildings : false,
        canDeleteCarriers : false,
        canDeleteCarrierLogic : false,
        canDeleteCustomers : false,
        canDeleteDepartments : false,
        canDeleteEvents : false,
        canDeleteFloors : false,
        canDeleteItemTypes : false,
        canDeleteLocations : false,
        canDeleteMsCompanies : false,
        canDeletePrimaryCarrierLogic : false,
        canDeleteSecurityRoles : false,
        canDeleteServices : false,
        canDeleteTenants : false,
        canModifyBuildings : false,
        canModifyCarriers : false,
        canModifyCarrierLogic : false,
        canModifyCustomers : false,
        canModifyDepartments : false,
        canModifyEvents : false,
        canModifyFloors : false,
        canModifyItemTypes : false,
        canModifyLocations : false,
        canModifyMsCompanies : false,
        canModifyPrimaryCarrierLogic : false,
        canModifyServices : false,
        canModifySecurityRoles : false,
        canModifyTenants : false,
        canViewCustomers : false,
        canViewBuildings : false,
        canViewCarriers : false,
        canViewCarrierLogic : false,
        canViewDepartments : false,
        canViewFloors : false,
        canActivateUsers : false,
        canCreateContacts : false,
        canCreateUsers : false,
        canDeleteContacts : false,
        canDeleteReceivedItems : false,
        canDeleteUsers : false,
        canModifyContacts : false,
        canModifyReceivedItems : false,
        canModifyUsers : false,
        canViewContacts : false,
        canViewEvents : false,
        canViewItemTypes : false,
        canViewLocations : false,
        canViewPrimaryCarrierLogic : false,
        canViewReceivedItems : false,
        canViewServices : false,
        canViewSecurityRoles : false,
        canViewTenants : false,
        canViewUsers : false,
        protectFromDeletion : false,
        name: '',
        kind: 'SecurityRole'
      },
      pfdOptions:[{ value: false, text: 'False' },{ value: true, text: 'True' }],
      accessLevelBuildings: "none",
      accessLevelContacts:"none",
      accessLevelCarriersAndServices: "none",
      accessLevelDepartments: "none",
      accessLevelItemTypes: "none",
      accessLevelUsers: "none",
      accessOptions: [
        { value: 'none', text: 'None' },
        { value: 'view', text: 'View' },
        { value: 'create', text: 'Create' },
        { value: 'full', text: 'Full' }
      ]
    }
  },
  methods: {
     setCarriersAndServicesAccess(value) {
      this.setPermissionsProp('Carriers', value)
      this.setPermissionsProp('Services', value)
    },
    setPermissionsProp(entity, value){
      this.perms[`canView${entity}`] = value
      if(value == "full"){
        this.perms[`canCreate${entity}`] = true
        this.perms[`canDelete${entity}`] = true
        this.perms[`canModify${entity}`] = true
        this.perms[`canView${entity}`] = true
      }
      if(value == "create"){
        this.perms[`canCreate${entity}`] = true
        this.perms[`canDelete${entity}`] = false
        this.perms[`canModify${entity}`] = false
        this.perms[`canView${entity}`] = true
      }
       if(value == "view"){
        this.perms[`canCreate${entity}`] = false
        this.perms[`canDelete${entity}`] = false
        this.perms[`canModify${entity}`] = false
        this.perms[`canView${entity}`] = true
      }
      if(value == "none"){
        this.perms[`canCreate${entity}`] = false
        this.perms[`canDelete${entity}`] = false
        this.perms[`canModify${entity}`] = false
        this.perms[`canView${entity}`] = false
      }
    },
    getPermissionsProp(entity){
      if(this.perms[`canModify${entity}`]){
        this[`accessLevel${entity}`] = 'full'
      }else if(this.perms[`canCreate${entity}`]){
         this[`accessLevel${entity}`] = 'create'
      }else if(this.perms[`canView${entity}`]){
         this[`accessLevel${entity}`] = 'view'
      }else{
         this[`accessLevel${entity}`] = 'none'
      }
    },
     getCarriersAndServicesAccess() {
       if(this.perms.canModifyCarriers && this.perms.canModifyServices){
        this.accessLevelCarriersAndServices = 'full'
      }else if(this.perms.canCreateCarriers && this.perms.canCreateServices){
         this.accessLevelCarriersAndServices = 'create'
      }else if(this.perms.canViewCarriers && this.perms.canViewServices){
         this.accessLevelCarriersAndServices = 'view'
      }else{
         this.accessLevelCarriersAndServices = 'none'
      }
    },
    fetchSRToEdit(formData){
        this.perms.id = formData._id
        this.perms.canAccessAllCustomers = formData.canAccessAllCustomers || false;
        this.perms.canActivateUsers=formData.canActivateUsers || false;
        this.perms.canAccessAllLocations  = formData.canAccessAllLocations || false;
        this.perms.canCreateApiUsers  = formData.canCreateApiUsers || false;
        this.perms.canCreateBuildings  = formData.canCreateBuildings || false;
        this.perms.canCreateCarriers  = formData.canCreateCarrier || false;
        this.perms.canCreateCarrierLogic  = formData.canCreateCarrierLogic || false;
        this.perms.canCreateCustomers  = formData.canCreateCustomers || false;
        this.perms.canCreateDepartments  = formData.canCreateDepartments || false;
        this.perms.canCreateEvents  = formData.canCreateEvents || false;
        this.perms.canCreateFloors  = formData.canCreateFloors || false;
        this.perms.canCreateItemTypes  = formData.canCreateItemTypes || false;
        this.perms.canCreateLocations  = formData.canCreateLocations || false;
        this.perms.canCreateMsCompanies  = formData.canCreateMsCompanies || false;
        this.perms.canCreateNonReceiveEvents  = formData.canCreateNonReceiveEvents || false;
        this.perms.canCreatePrimaryCarrierLogic  = formData.canCreatePrimaryCarrierLogic || false;
        this.perms.canCreateReceivedItems  = formData.canCreateReceivedItems || false;
        this.perms.canCreateSecurityRoles  = formData.canCreateSecurityRoles || false;
        this.perms.canCreateServices  = formData.canCreateServices || false;
        this.perms.canCreateTenants  = formData.canCreateTenants || false;
        this.perms.canDeleteBuildings  = formData.canDeleteBuildings || false;
        this.perms.canDeleteCarriers  = formData.canDeleteCarriers || false;
        this.perms.canDeleteCarrierLogic  = formData.canDeleteCarrierLogic || false;
        this.perms.canDeleteCustomers  = formData.canDeleteCustomers || false;
        this.perms.canDeleteDepartments  = formData.canDeleteDepartments || false;
        this.perms.canDeleteEvents  = formData.canDeleteEvents || false;
        this.perms.canDeleteFloors  = formData.canDeleteFloors || false;
        this.perms.canDeleteItemTypes  = formData.canDeleteItemTypes || false;
        this.perms.canDeleteLocations  = formData.canDeleteLocations || false;
        this.perms.canDeleteMsCompanies  = formData.canDeleteMsCompanies || false;
        this.perms.canDeletePrimaryCarrierLogic  = formData.canDeletePrimaryCarrierLogic || false;
        this.perms.canDeleteSecurityRoles  = formData.canDeleteSecurityRoles || false;
        this.perms.canDeleteServices  = formData.canDeleteServices || false;
        this.perms.canDeleteTenants  = formData.canDeleteTenants || false;
        this.perms.canModifyBuildings  = formData.canModifyBuildings || false;
        this.perms.canModifyCarriers  = formData.canModifyCarriers || false;
        this.perms.canModifyCarrierLogic  = formData.canModifyCarrierLogic || false;
        this.perms.canModifyCustomers  = formData.canModifyCustomers || false;
        this.perms.canModifyDepartments  = formData.canModifyDepartments || false;
        this.perms.canModifyEvents  = formData.canModifyEvents || false;
        this.perms.canModifyFloors  = formData.canModifyFloors || false;
        this.perms.canModifyItemTypes  = formData.canModifyItemTypes || false;
        this.perms.canModifyLocations  = formData.canModifyLocations || false;
        this.perms.canModifyMsCompanies  = formData.canModifyMsCompanies || false;
        this.perms.canModifyPrimaryCarrierLogic  = formData.canModifyPrimaryCarrierLogic || false;
        this.perms.canModifyServices  = formData.canModifyServices || false;
        this.perms.canModifySecurityRoles  = formData.canModifySecurityRoles || false;
        this.perms.canModifyTenants  = formData.canModifyTenants || false;
        this.perms.canViewCustomers  = formData.canViewCustomers || false;
        this.perms.canViewBuildings  = formData.canViewBuildings || false;
        this.perms.canViewCarriers  = formData.canViewCarriers || false;
        this.perms.canViewCarrierLogic  = formData.canViewCarrierLogic || false;
        this.perms.canViewDepartments  = formData.canViewDepartments || false;
        this.perms.canViewFloors  = formData.canViewFloors || false;
        this.perms.canActivateUsers  = formData.canActivateUsers || false;
        this.perms.canCreateContacts  = formData.canCreateContacts || false;
        this.perms.canCreateUsers  = formData.canCreateUsers || false;
        this.perms.canDeleteContacts  = formData.canDeleteContacts || false;
        this.perms.canDeleteReceivedItems  = formData.canDeleteReceivedItems || false;
        this.perms.canDeleteUsers  = formData.canDeleteUsers || false;
        this.perms.canModifyContacts  = formData.canModifyContacts || false;
        this.perms.canModifyReceivedItems  = formData.canModifyReceivedItems || false;
        this.perms.canModifyUsers  = formData.canModifyUsers || false;
        this.perms.canViewContacts  = formData.canViewContacts || false;
        this.perms.canViewEvents  = formData.canViewEvents || false;
        this.perms.canViewItemTypes  = formData.canViewItemTypes || false;
        this.perms.canViewLocations  = formData.canViewLocations || false;
        this.perms.canViewPrimaryCarrierLogic  = formData.canViewPrimaryCarrierLogic || false;
        this.perms.canViewReceivedItems  = formData.canViewReceivedItems || false;
        this.perms.canViewServices  = formData.canViewServices || false;
        this.perms.canViewSecurityRoles  = formData.canViewSecurityRoles || false;
        this.perms.canViewTenants  = formData.canViewTenants || false;
        this.perms.canViewUsers  = formData.canViewUsers || false;
        this.perms.protectFromDeletion  = formData.protectFromDeletion || false;
        this.perms.name = formData.name
        this.perms.kind = formData.kind
        this.SRToEdit = true
        this.getPermissionsProp('Buildings')
        this.getPermissionsProp('Contacts')
        // this.getPermissionsProp('Carriers')
        // this.getPermissionsProp('Services')
        this.getCarriersAndServicesAccess()
        this.getPermissionsProp('Departments')
        this.getPermissionsProp('ItemTypes')
        this.getPermissionsProp('Users')
    },
    onSubmit(e){
       e.preventDefault()
      this.$v.perms.name.$touch()
      if (!this.$v.perms.$invalid) {
        if (this.SRToEdit) {
          return this.onUpdate()
        }
        this.$axios.post('/securityRole', this.perms)
        .then(res =>{
          if(res.status == 201 ){
            this.$emit('refreshSecurityRoles')
            this.$store.commit('closeModal')
            this.$toasted.success(res.data.message, {
              duration: 5000,
              position: 'top-center'
            })
          }else{
            this.$toasted.error('Something went Wrong!!', {
              duration: 5000,
              position: 'top-center'
            })
          }
        })
        .catch(err =>{
           this.$toasted.error('Server Error has occured !!', {
              duration: 5000,
              position: 'top-center'
          })
        })
      }
    },
    onUpdate() {
      this.$axios.put(`/securityRole/${this.perms.id}`, this.perms)
        .then(res => {
          if(res.status == 201 ){
            this.$emit('refreshSecurityRoles')
            this.$store.commit('closeModal')
            this.$toasted.success(res.data.message, {
              duration: 5000,
              position: 'top-center'
            })
          }else{
            this.$toasted.error('Something went Wrong!!', {
              duration: 5000,
              position: 'top-center'
            })
          }
        })
         .catch(err =>{
           this.$toasted.error('Server Error has occured !!', {
              duration: 5000,
              position: 'top-center'
          })
        })
    }
  }
}
</script>
<style>
.error-text {
  display: block;
  color: red;
  font-size: 12px;
  font-style: italic;
  text-align: center;
}
.validation-error {
  border: 1px solid #f44336;
  color: red;
}
.validation-error::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}

.validation-error:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}
</style>
