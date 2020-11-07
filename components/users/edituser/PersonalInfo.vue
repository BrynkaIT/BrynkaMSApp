<template>
<b-overlay :show="overlay" rounded="sm">
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
              <b-form-group>
                <label for="">First Name:
                  <span v-if="!userToEdit" class="text-primary text-bolder">{{ user.firstName }}</span>
                </label>
                <b-form-input
                 v-if="userToEdit"
                  size="sm"
                  v-model="personalInfo.firstName"
                  required
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group >
                <label for="">First Name Alias:
                  <span v-if="!userToEdit" class="text-primary text-bolder">{{ user.firstNameAlias }}</span>
                </label>
                <b-form-input
                  v-if="userToEdit"
                  size="sm"
                  v-model="personalInfo.firstNameAlias"
                  placeholder="Your nick name"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <b-form-group >
            <label for="">Middle Name:
              <span v-if="!userToEdit" class="text-primary text-bolder">{{ user.middleName }}</span>
            </label>
            <b-form-input
              v-if="userToEdit"
              size="sm"
              v-model="personalInfo.middleName"
            ></b-form-input>
          </b-form-group>

          <b-form-group >
            <label for="">Last Name:
              <span v-if="!userToEdit" class="text-primary text-bolder">{{ user.lastName }}</span>
            </label>
            <b-form-input
              v-if="userToEdit"
              v-model="personalInfo.lastName"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <div class="row">
            <div class="col-md-6">
              <b-form-group>
                <label for="">Phone:
                  <span v-if="!userToEdit" class="text-primary text-bolder">{{ user.phone }}</span>
                </label>
                <b-form-input
                  v-if="userToEdit"
                  v-model="personalInfo.phone"
                  size="sm"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group>
                <label for="">Email:
                  <span v-if="!userToEdit" class="text-primary text-bolder">{{ user.email }}</span>
                </label>
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
</b-overlay>
</template>

<script>
import { mapState } from 'vuex'
import vueMask from 'v-mask'
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'
export default {
  props:['user'],
  computed: {

     baseUrl(){
      return process.env.baseURL
    }
  },
  data() {
    return {
      overlay:false,
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
      this.personalInfo.id = this.user._id
      this.personalInfo.firstName = this.user.firstName
      this.personalInfo.middleName = this.user.middleName
      this.personalInfo.lastName = this.user.lastName
      this.personalInfo.firstNameAlias = this.user.firstNameAlias
      this.personalInfo.useFirstNameAlias = this.user.useFirstNameAlias
      this.personalInfo.email= this.user.email
      this.personalInfo.phone= this.user.phone
      this.personalInfo.image= this.user.imageUrl
      this.imagePlaceholder= this.user.imageUrl ? this.baseUrl+this.user.imageUrl : '/img/avatar-placeholder.png'
    },
    async updatePersonalInfo(e) {
      e.preventDefault()
      this.$v.personalInfo.$touch()
      if (!this.$v.personalInfo.$invalid) {
        this.overlay = true
        this.personalInfo.useFirstNameAlias = this.personalInfo.firstNameAlias != '' ? true : false
        try {
          const res = await this.$store.dispatch('contacts/patchContact', this.personalInfo)
          this.$emit('refresh', res.contact._id)
          this.$brynkaToast(res.message, 'success')
          this.userToEdit = false
           this.overlay = false
        } catch (error) {
          this.$brynkaToast(error, 'danger')
          this.overlay = false
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
