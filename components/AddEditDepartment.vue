<template>
  <div class="container">

    <b-card
    header-bg-variant="primary"
    header-text-variant="white"
    border-variant="secondary"
    class="departmentCard"
    :header="formToOpen.title ">
      <b-row align-h="between" class="mb-2">
        <b-col cols="4">
          <!-- <b-card-title>{{ formToOpen.title }}</b-card-title> -->
        </b-col>
        <b-col cols="4" class="text-right">
          <b-form-checkbox v-model="department.isActive"  switch>
          Active
        </b-form-checkbox>
        </b-col>
      </b-row>

        <b-form @submit="onSubmit" @reset="onReset" >
          <div>
            <b-form-group>
              <b-form-input
                v-model="department.name"
                size="sm"
                :class="{ 'validation-error': $v.department.name.$error }"
                @blur="$v.department.name.$touch()"
                placeholder="Name"
                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div style="float:right" >
            <b-button
               @click="$store.commit('switchForm',{ title:`Add ${formToOpen.from}`, to:'contact', from:'department'})"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from == 'contact'"
              >Cancel</b-button
            >
             <b-button
              @click="$store.commit('closeModal')"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from != 'contact'"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary" size="sm"
              >Submit</b-button
            >
          </div>
        </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'

export default {

   computed: {
    ...mapState({
      locations: state => state.locations.locations,
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      department: {
        id:'',
        name: '',
        locationId: null,
        isActive:true,
        protected:false
        },

        isDepartmentToEdit:false
    }
  },
  validations: {
    department: {
      name: {
        required
      }
    }
  },
  created() {

    if (this.formToOpen.data) {
      this.fetchDepartmentToEdit(this.formToOpen.data)
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.department.locationId = this.department.locationId ? this.department.locationId : this.$route.params.id
      this.$v.department.name.$touch()
      if (!this.$v.department.name.$invalid) {
        if (this.isDepartmentToEdit) return this.onUpdate()

        try {
            const res = await this.$store.dispatch('departments/postDepartment', this.department)
            this.$emit('refresh')
            this.$brynkaToast(res.message, 'success')
            this.onReset()
            this.$store.commit('closeModal')

        } catch (error) {
           this.$brynkaToast(error, 'danger')
        }
      } else {
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },
    async onUpdate() {
        try {
          const res = await this.$store.dispatch('departments/putDepartment', this.department)
          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$store.commit('closeModal')
        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }
    },
    onReset(evt) {
      this.department.name = ''
      this.department.locationId = null

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.department.$reset()
      })
    },
    fetchDepartmentToEdit(formData) {
       if(formData.locationId == undefined){
        this.department.id = formData._id
        this.department.locationId = formData.location._id || formData.location
        this.department.name = formData.name
        this.department.isActive = formData.isActive
        this.isDepartmentToEdit = true
      }
    }
  }
}
</script>

<style>
.departmentCard{
    max-width: 700px;
    margin: auto;
}
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
