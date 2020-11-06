<template>
  <b-card class="bg-light">
    <form @submit="updatePersonalInfo">
      <div class="text-right">
        <b-button
          variant="light"
          @click="displayUserToEdit"
        >
          <b-icon
          icon="pencil"
          variant="info"
          scale="1.2"
        ></b-icon>
        </b-button>

      </div>

      <div class="row">
        <div class="col-md-2 text-center" v-if="userToEdit">
          <img
            class="mt-3"
            :src="imagePlaceholder"
            style="width: 100%;border:1px solid #999999"
            alt=""
          />
          <label class="image-file-upload" >
            <input
              type="file"
              accept="image/*"
              class="input"
              ref="image"
              @change="previewImage($event)"
            />
            Edit
          </label>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6">
              <b-form-group label="First Name:">
                <span v-if="!userToEdit" class="text-primary text-bolder">{{ firstName }}</span>
                <b-form-input
                 v-if="userToEdit"
                  size="sm"
                  v-model="personalInfo.firstName"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="First Name Alias:">
                <span v-if="!userToEdit" class="text-primary text-bolder">{{ firstNameAlias }}</span>
                <b-form-input
                  v-if="userToEdit"
                  size="sm"
                  v-model="personalInfo.firstNameAlias"
                  placeholder="Your nick name"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <b-form-group label="Middle Name:">
            <span v-if="!userToEdit" class="text-primary text-bolder">{{ middleName }}</span>
            <b-form-input
              v-if="userToEdit"
              size="sm"
              v-model="personalInfo.middleName"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Last Name:">
             <span v-if="!userToEdit" class="text-primary text-bolder">{{ lastName }}</span>
            <b-form-input
              v-if="userToEdit"
              v-model="personalInfo.lastName"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>
          <div class="row">
            <div class="col-md-6">
              <b-form-group label="Phone:">
                 <span v-if="!userToEdit" class="text-primary text-bolder">{{ phone }}</span>
                <b-form-input
                  v-if="userToEdit"
                  v-model="personalInfo.phone"
                  size="sm"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group label="Email:">
                 <span v-if="!userToEdit" class="text-primary text-bolder">{{ email }}</span>
                <b-form-input
                  v-if="userToEdit"
                  size="sm"
                  v-model="personalInfo.email"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="float-right mb-3" v-if="userToEdit">
        <b-button type="submit" variant="success">Update</b-button>
      </div>
        </div>
      </div>


    </form>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
export default {
  props:[
    'id',
    'firstName',
    'middleName',
    'lastName',
    'firstNameAlias',
    'useFirstNameAlias',
    'email',
    'phone',
    'imageUrl'

  ],
  computed: {

     baseUrl(){
      return process.env.baseURL
    }
  },
  data() {
    return {
      disable: true,
      tabIndex: 0,
      userToEdit:false,
      imagePlaceholder:'',
      personalInfo: {
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        firstNameAlias: '',
        useFirstNameAlias: false,
        email: '',
        phone: '',
        image: ''
      },
    }
  },
  validations: {
    personalInfo: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        email,
        required
      }
    }
  },
  methods:{
    displayUserToEdit(){
      this.userToEdit = !this.userToEdit
      this.getPersonalInfo()
    },
    getPersonalInfo() {
      this.personalInfo.id = this.id
      this.personalInfo.firstName = this.firstName
      this.personalInfo.middleName = this.middleName
      this.personalInfo.lastName = this.lastName
      this.personalInfo.firstNameAlias = this.firstNameAlias
      this.personalInfo.useFirstNameAlias = this.useFirstNameAlias
      this.personalInfo.email= this.email
      this.personalInfo.phone= this.phone
      this.personalInfo.image= this.imageUrl
      this.imagePlaceholder= this.imageUrl ? this.baseUrl+this.imageUrl : '/img/avatar-placeholder.png'
    },
    async updatePersonalInfo(e) {
      e.preventDefault()
      this.$v.personalInfo.$touch()
      if (!this.$v.personalInfo.$invalid) {
        this.personalInfo.useFirstNameAlias = this.personalInfo.firstNameAlias != '' ? true : false
        try {
          const res = await this.$store.dispatch('contacts/patchContact', this.personalInfo)
          this.$emit('refresh', res.contact._id)
          this.$brynkaToast(res.message, 'success')
          this.userToEdit = false
        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }
      }else{
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },
    previewImage() {
      const input = this.$refs.image
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imagePlaceholder = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.imagePlaceholder = files[0]
      }
      this.personalInfo.image = files[0]
    },
  }
}
</script>

<style></style>
