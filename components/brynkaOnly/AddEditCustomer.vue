<template>
  <div class="container">
    <b-overlay :show="copyingDB" rounded="sm">
      <form-wizard
        :title="formToOpen.title"
        shape="tab"
        class="mt-2"
        color="#e67e22"
        subtitle="Create or Edit a Customer"
        @on-complete="onSubmit"
        :startIndex="startIndex"
      >

        <tab-content

          title="Basics"
          :before-change="validateTab1">
          <div class="container">
            <b-form-row>
              <div class="col-md-4">
                <b-form-group label="Name" label-for="input-1">
                  <b-form-input
                    v-model="form.name"
                    :class="{ 'validation-error': $v.form.name.$error }"
                    type="text"
                    @input="proccessCustomerName()"
                    required
                    placeholder="Customer / Account Name"
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group label="Possessive Name" label-for="input-2">
                  <b-form-input
                    v-model="form.possessiveName"
                    :class="{ 'validation-error': $v.form.possessiveName.$error }"
                    type="text"
                  >
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-4">
                <b-form-group label="Sub-Folder">
                  <b-form-input
                    v-model="form.subFolder"
                    :class="{ 'validation-error': $v.form.subFolder.$error }"
                    required
                    placeholder="Enter Sub-Folder Name"
                  ></b-form-input>
                </b-form-group>
              </div>
            </b-form-row>
            <b-form-group>
              <label for=""
                >Parent Customer(s):
                <b-badge
                  variant="primary"
                  class="mx-1"
                  pill
                  v-for="(parent, index) in parents"
                  :key="index"
                  >{{ parent }}
                  <b-icon
                    href="#"
                    variant="light"
                    scale="1.2"
                    icon="x-circle-fill"
                    @click="deletePC(index)"
                  ></b-icon></b-badge
              ></label>
              <b-form-select
                v-model="c"
                :options="customers"
                value-field="_id"
                text-field="name"
                multiple
                :select-size="3"
                @input="displaySelectedCustomerParents($event)"
              ></b-form-select>
            </b-form-group>

            <b-form-row>
              <div class="col-md-6 p-2">
                <b-form-group>
                  <h6 class="font-weight-bolder text-primary">Main Address</h6>
                  <div class="form-group">
                    <label>Street</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.address.street1"
                      placeholder="1234 Main St"
                    />
                  </div>
                  <div class="form-group">
                    <label>Street 2</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.address.street2"
                      placeholder="Apartment, studio, or floor"
                    />
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label>City</label>
                      <input
                        type="text"
                        v-model="form.address.city"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label>State</label>
                      <b-form-select
                        :options="states"
                        v-model="form.address.state"
                        text-field="name"
                        value-field="abbreviation"
                        class="form-control"
                      >
                      </b-form-select>
                    </div>
                    <div class="form-group col-md-3">
                      <label>Zip</label>
                      <input
                        type="text"
                        v-model="form.address.postalCode"
                        class="form-control"
                      />
                    </div>
                  </div>
                </b-form-group>
              </div>
              <div class="col-md-6 p-2">
                <b-form-group>
                  <h6 class="font-weight-bolder text-primary">Ship-To Address</h6>
                  <div class="form-group">
                    <label>Street</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.shipToAddress.street1"
                      placeholder="1234 Main St"
                    />
                  </div>
                  <div class="form-group">
                    <label>Street 2</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.shipToAddress.street2"
                      placeholder="Apartment, studio, or floor"
                    />
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label>City</label>
                      <input
                        type="text"
                        v-model="form.shipToAddress.city"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label>State</label>
                      <b-form-select
                        :options="states"
                        v-model="form.shipToAddress.state"
                        text-field="name"
                        value-field="abbreviation"
                        class="form-control"
                      >
                      </b-form-select>
                    </div>
                    <div class="form-group col-md-3">
                      <label>Zip</label>
                      <input
                        type="text"
                        v-model="form.shipToAddress.postalCode"
                        class="form-control"
                      />
                    </div>
                  </div>
                </b-form-group>
              </div>
            </b-form-row>
          </div>
        </tab-content>
        <tab-content title="Billing Info">
          <div class="mb-2">
            <h6 class="font-weight-bolder text-primary">Billing Contact</h6>
            <div class="form-row">
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.billToContact.title"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.billToContact.firstName"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.billToContact.middleName"
                  class="form-control"
                  placeholder="Middle Name"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.billToContact.lastName"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  v-model="form.billToContact.email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  v-model="form.billToContact.phone"
                  class="form-control"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>
          <b-form-group>
            <h6 class="font-weight-bolder text-primary">Billing Address</h6>
            <div class="form-group">
              <label>Street</label>
              <input
                type="text"
                class="form-control"
                v-model="form.billToAddress.street1"
                placeholder="1234 Main St"
              />
            </div>
            <div class="form-group">
              <label>Street 2</label>
              <input
                type="text"
                class="form-control"
                v-model="form.billToAddress.street2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-5">
                <label>City</label>
                <input
                  type="text"
                  v-model="form.billToAddress.city"
                  class="form-control"
                />
              </div>
              <div class="form-group col-md-4">
                <label>State</label>
                <b-form-select
                  :options="states"
                  v-model="form.billToAddress.state"
                  text-field="name"
                  value-field="abbreviation"
                  class="form-control"
                >
                </b-form-select>
              </div>
              <div class="form-group col-md-3">
                <label>Zip</label>
                <input
                  type="text"
                  v-model="form.billToAddress.postalCode"
                  class="form-control"
                />
              </div>
            </div>
          </b-form-group>
        </tab-content>

        <tab-content title="Technical Settings" :before-change="validateTab2">
          <b-row>
            <b-col>
              <b-form-group label="DbName:" label-for="input-2">
                <b-form-input
                  v-model="form.dbName"
                  :class="{ 'validation-error': $v.form.dbName.$error }"
                  required
                  placeholder="Enter Database Name"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Email-Domain">
                <b-form-input
                  v-model="form.emailDomain"
                  :class="{ 'validation-error': $v.form.emailDomain.$error }"
                  required
                  placeholder="Enter Email Domain"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Automatic Signup">
                <b-form-select
                  :options="AASignupOptions"
                  v-model="form.allowsAutomaticSignup"
                  required
                >
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Automatic Signup Email Domain Filters">
                <b-form-tags v-model="form.automaticSignUpEmailDomainFilters">
                </b-form-tags>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Media Folder">
                <b-form-input
                  v-model="form.mediaFolder"
                  :class="{ 'validation-error': $v.form.mediaFolder.$error }"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Logo">
                <b-form-file
                  v-model="form.image"

                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  ref="image"
                  accept="image/*"
                  @change="previewImage($event)"
                ></b-form-file>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group label="Modules">
                <b-form-checkbox-group
                  :options="moduleOptions"
                  v-model="form.modules"
                  switches
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-col>
            <b-col>
              <div>
                <b-img
                  :src="imagePlaceholder"
                  fluid
                  alt="Responsive image"
                ></b-img>
              </div>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Other">
          <div class="mb-2">
            <h6 class="font-weight-bolder text-primary">Sales Contact</h6>
            <div class="form-row">
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.salesContact.title"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.salesContact.firstName"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.salesContact.middleName"
                  class="form-control"
                  placeholder="Middle Name"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.salesContact.lastName"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  v-model="form.salesContact.email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  v-model="form.salesContact.phone"
                  class="form-control"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>
          <div class="mb-2">
            <h6 class="font-weight-bolder text-primary">IT Contact</h6>
            <div class="form-row">
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.technicalContact.title"
                  class="form-control"
                  placeholder="Title"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.technicalContact.firstName"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.technicalContact.middleName"
                  class="form-control"
                  placeholder="Middle Name"
                />
              </div>
              <div class="form-group col-md-3">
                <input
                  type="text"
                  v-model="form.technicalContact.lastName"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <input
                  type="text"
                  v-model="form.technicalContact.email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="text"
                  v-model="form.technicalContact.phone"
                  class="form-control"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>
        </tab-content>
      </form-wizard>
      <template #overlay>
        <div class="text-center">
          <b-icon icon="stopwatch" font-scale="5" variant="primary" animation="cylon"></b-icon>
          <h5>Please wait...</h5>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { mapState } from 'vuex'
import { email, required, requiredUnless, requiredIf } from 'vuelidate/lib/validators'
export default {
  components: {
    FormWizard,
    TabContent
  },
  computed: {
    ...mapState({
      auth: state => state.auth,
      customers: state => state.customers.customers,
      securityRoles: state => state.securityRoles.securityRoles,
      usaStates: state => state.usStates.usaStates,
      formToOpen: state => state.formToOpen
    }),
     baseUrl(){
      return process.env.baseURL
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      subFolder: {
        required
      },
      possessiveName: {
        required
      },
      dbName: {
       required: requiredIf(function (customer) {
           if(this.customerToEdit){
            return false
          }else{
            return true
          }
        })
      },
      emailDomain: {
        required
      },
      mediaFolder: {
        required
      },
      defaultSecurityRoleModel: {
        required
      }
    }
  },
  created() {
    this.fetchUSAStates()
    if (this.formToOpen.data) {
      this.isCustomerToEdit = true
      this.populateCustomer(this.formToOpen.data)
    }
  },
  data() {
    return {
      copyingDB: false,
      startIndex: 0,
      states: [{ name: 'Select State', abbreviation: null }],
      form: {
        id: '',
        address: {
          street1: '',
          street2: '',
          city: '',
          state: null,
          postalCode: ''
        },
        allowsAutomaticSignup: false,
        automaticSignUpEmailDomainFilters: [],
        billToContact: {
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
          phone: '',
          title: ''
        },
        billToAddress: {
          street1: '',
          street2: '',
          city: '',
          state: '',
          postalCode: ''
        },
        dbName: '',
        defaultSecurityRoleModel: 'none',
        emailDomain: '',
        mediaFolder: '',
        image: null,
        parentCustomers: [],
        modules: [],
        name: '',
        possessiveName: '',
        salesContact: {
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
          phone: '',
          title: ''
        },
        shipToAddress: {
          street1: '',
          street2: '',
          city: '',
          state: '',
          postalCode: ''
        },
        subFolder: '',
        technicalContact: {
          email: '',
          firstName: '',
          lastName: '',
          middleName: '',
          phone: '',
          title: ''
        }
      },
      moduleOptions: ['Receiving', 'Shipping', 'Jobsubmission'],
      AASignupOptions: [ { value: 'false', text: 'No' },{ value: 'true', text: 'Yes' }],
      isCustomerToEdit: false,
      c: [],
      parents: [],
      customerToEdit: false,
      imagePlaceholder: ''
    }
  },
  methods: {
    async populateCustomer(customer) {

      this.customerToEdit = true
      this.form.id = customer._id
      this.form.allowsAutomaticSignup = customer.allowsAutomaticSignup
      this.form.automaticSignUpEmailDomainFilters = customer.automaticSignUpEmailDomainFilters

      this.form.dbName  = customer.dbName || ''
      this.form.defaultSecurityRole  = customer.defaultSecurityRole || ''
      this.form.defaultSecurityRoleModel = customer.defaultSecurityRoleModel || ''
      this.form.emailDomain = customer.emailDomain || ''
      this.form.mediaFolder = customer.mediaFolder || ''
      this.imagePlaceholder = process.env.baseURL + customer.logoUrl || ''

      await this.$store.dispatch(`customers/getCustomers`)
      this.displaySelectedCustomerParents(customer.parentCustomers)
      this.form.modules = customer.modules || ''
      this.form.name = customer.name || ''
      this.form.possessiveName = customer.possessiveName  || ''
      this.form.subFolder = customer.subFolder || ''

      this.form.address.street1 = customer.address ? customer.address.street1 : ''
      this.form.address.street2 = customer.address ? customer.address.street2 : ''
      this.form.address.city = customer.address ? customer.address.city : ''
      this.form.address.state = customer.address ? customer.address.state : ''
      this.form.address.postalCode = customer.address ? customer.address.postalCode : ''

      this.form.billToAddress.street1 = customer.billToAddress ? customer.billToAddress.street1 : ''
      this.form.billToAddress.street2 = customer.billToAddress ? customer.billToAddress.street2 : ''
      this.form.billToAddress.city = customer.billToAddress ? customer.billToAddress.city  : ''
      this.form.billToAddress.state = customer.billToAddress ? customer.billToAddress.state : ''
      this.form.billToAddress.postalCode =  customer.billToAddress ? customer.billToAddress.postalCode : ''

      this.form.billToContact.title = customer.billToContact ? customer.billToContact.title : ''
      this.form.billToContact.email= customer.billToContact ? customer.billToContact.email : ''
      this.form.billToContact.firstName= customer.billToContact ? customer.billToContact.firstName : ''
      this.form.billToContact.lastName= customer.billToContact ? customer.billToContact.lastName : ''
      this.form.billToContact.middleName= customer.billToContact ? customer.billToContact.middleName : ''
      this.form.billToContact.phone= customer.billToContact ? customer.billToContact.phone : ''

      this.form.shipToAddress.street1 = customer.shipToAddress ? customer.shipToAddress.street1 : ''
      this.form.shipToAddress.street2 = customer.shipToAddress ? customer.shipToAddress.street2 : ''
      this.form.shipToAddress.city = customer.shipToAddress ? customer.shipToAddress.city : ''
      this.form.shipToAddress.state = customer.shipToAddress ? customer.shipToAddress.state : ''
      this.form.shipToAddress.postalCode = customer.shipToAddress ? customer.shipToAddress.postalCode : ''

      this.form.salesContact.title = customer.salesContact ? customer.salesContact.title : ''
      this.form.salesContact.email = customer.salesContact ? customer.salesContact.email : ''
      this.form.salesContact.firstName = customer.salesContact ? customer.salesContact.firstName : ''
      this.form.salesContact.lastName = customer.salesContact ? customer.salesContact.lastName  : ''
      this.form.salesContact.middleName = customer.salesContact ? customer.salesContact.middleName : ''
      this.form.salesContact.phone = customer.salesContact ? customer.salesContact.phone : ''

      this.form.technicalContact.title = customer.technicalContact ? customer.technicalContact.title : ''
      this.form.technicalContact.email= customer.technicalContact ? customer.technicalContact.email : ''
      this.form.technicalContact.firstName= customer.technicalContact ? customer.technicalContact.firstName : ''
      this.form.technicalContact.lastName= customer.technicalContact ? customer.technicalContact.lastName : ''
      this.form.technicalContact.middleName= customer.technicalContact ? customer.technicalContact.middleName  : ''
      this.form.technicalContact.phone= customer.technicalContact ? customer.technicalContact.phone  : ''
    },
    proccessCustomerName() {
      this.form.dbName = this.form.name.toLowerCase().replace(/\s/g, '')
      this.form.mediaFolder = this.form.name.toLowerCase().replace(/\s/g, '')
      this.form.possessiveName = this.form.name.toLowerCase().concat("'s")
      this.form.subFolder = this.form.name.toLowerCase().replace(/\s/g, '')
    },
    async displaySelectedCustomerParents(ids) {
      ids.forEach(async (id) => {

        let URL;
        if(this.auth.customerSubFolder === 'brynka' && this.auth.userType === 'API'){
          URL= "/manage/brynka/customers"
          }else{
          URL = "/manage/customers"
          }

        let { customers } = await this.$axios.$get(`${URL}?id=${id}`)

        if(customers.length > 0){
          if (this.parents.some(parent => parent == customers[0].name)) {
            return alert('Customer already selected')
          }
          this.parents.push(customers[0].name)
          this.form.parentCustomers.push(customers[0]._id)
        }
      })
    },
    deletePC(index) {
      if (index > -1) {
        this.parents.splice(index, 1)
        this.form.parentCustomers.splice(index, 1)
      }
    },
    previewImage(e) {
      const files = e.target.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imagePlaceholder = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.imagePlaceholder = files[0]
      }
    },
    validateTab1() {
      this.$v.form.name.$touch()
      this.$v.form.subFolder.$touch()
      this.$v.form.possessiveName.$touch()
      if (
        !this.$v.form.name.$invalid &&
        !this.$v.form.subFolder.$invalid &&
        !this.$v.form.possessiveName.$invalid
      ) {
        return true
      } else {
        return false
      }
    },
    validateTab2() {
      this.$v.form.dbName.$touch()
      this.$v.form.emailDomain.$touch()
      this.$v.form.mediaFolder.$touch()

      if (
        !this.$v.form.dbName.$invalid &&
        !this.$v.form.emailDomain.$invalid &&
        !this.$v.form.mediaFolder.$invalid
      ) {
        return true
      } else {
        return false
      }
    },
    async onSubmit() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        if (this.customerToEdit) { return this.onUpdate(this.form) }
        this.copyingDB = true
        try {
          this.buildingCustomer = true
          const res = await this.$store.dispatch('customers/postCustomer',this.form)
          this.$emit('refreshCustomers')
          this.$store.commit('closeModal')
          this.copyingDB = false
          this.$brynkaToast(res.message, 'success')
        } catch (error) {
          this.$brynkaToast(error, 'danger')
          this.copyingDB = false
        }
      }
    },

    async onUpdate(customer) {

      try {
        const res = await this.$store.dispatch('customers/patchCustomer', customer)

        this.$emit('refreshCustomer')
        this.$store.commit('closeModal')
        this.$brynkaToast(res.message, 'success')
      } catch (error) {
        this.$brynkaToast(error, 'danger')
      }
    },
    fetchUSAStates() {
      this.usaStates.forEach(state => {
        this.states.push(state)
      })
    }
  }
}
</script>

<style scoped>
.vue-form-wizard {
  padding-bottom: 20px;
  border: 1px solid #ccc;
  background: #fafafa;
  padding: 10px;
  border-radius: 5px;
}
.vue-form-wizard .nav-link {
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-align-items: center;
  align-items: center;
  white-space: nowrap;
  padding: 0.8rem 1.188rem;
  color: #a3a3a3 !important;
  -webkit-transition-duration: 0.45s;
  -moz-transition-duration: 0.45s;
  -o-transition-duration: 0.45s;
  transition-duration: 0.45s;
  transition-property: color;
  -webkit-transition-property: color;
  height: 46px;
  padding-left: 30px;
}

.vue-form-wizard .nav-link:hover,
.menu-icon:hover {
  color: #000 !important;
  background: none !important;
}
.vue-form-wizard .wizard-header {
  background: #eee;
  margin-bottom: 5px;
}
.vue-form-wizard .wizard-card-footer {
  margin-top: 5px;
  background: #eee;
  padding: 15px;
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

@media (min-width: 1200px) {
  .vue-form-wizard {
    /* width: 80%; */
    margin: auto;
  }
}
</style>
