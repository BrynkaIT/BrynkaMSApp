<template>
  <div class="container">
    <b-card
    header-bg-variant="primary"
    header-text-variant="white"
    border-variant="secondary"
    class="carrierCard"
    :header="formToOpen.title ">

        <b-row align-h="between" class="mb-2">
        <b-col cols="4">
          <!-- <b-card-title>{{ formToOpen.title }}</b-card-title> -->
        </b-col>
        <b-col cols="4" class="text-right">
          <b-form-checkbox v-model="carrier.isActive" switch>
            Active
          </b-form-checkbox>
        </b-col>
      </b-row>
        <b-form @submit="onSubmit" @reset="onReset" >
          <div>
            <b-form-group
            label-size="sm"
            label="Name"
            label-cols-sm="2"
            label-cols-lg="1"
            >
              <b-form-input
                v-model="carrier.name"
                size="sm"
                :class="{ 'validation-error': $v.carrier.name.$error }"
                @blur="$v.carrier.name.$touch()"

                type="text"
              ></b-form-input>
            </b-form-group>

            <b-form-group
            label-size="sm"
            label="Code"
            label-cols-sm="2"
            label-cols-lg="1"
            >
              <b-form-input
                size="sm"
                v-model="carrier.code"
                class="mb-3"
                :class="{ 'validation-error': $v.carrier.code.$error }"
                @blur="$v.carrier.code.$touch()"

                type="text"
              ></b-form-input>
            </b-form-group>
          </div>
          <div style="float:right">
            <b-button
              @click="$store.commit('closeModal')"
              class="mr-1"
              size="sm"
              v-if="formToOpen.from != 'contact'"
              >Cancel</b-button
            >
            <b-button type="submit" variant="primary" size="sm">Submit</b-button>
          </div>
        </b-form>

    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      carrier: {
        id:'',
        name: '',
        code: null,
        isActive: true,
        protected: false
      },
      isCarrierToEdit: false
    }
  },
  validations: {
    carrier: {
      name: {
        required
      },
      code: {
        required
      }
    }
  },
  created() {

    if(this.formToOpen.data){
      this.fetchCarrierToEdit(this.formToOpen.data)
    }
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.$v.carrier.name.$touch()
      if (!this.$v.carrier.$invalid) {
        if (this.isCarrierToEdit) return this.onUpdate(this.carrier)

        try {
          const res = await this.$store.dispatch('carriers/postCarrier', this.carrier)
          this.$emit('refreshCarriers')
          this.$brynkaToast(res.message, 'success')
          this.onReset()

          if (this.formToOpen.from) {
                this.$store.dispatch('carriers/getCarriers')
                this.$store.commit('switchForm',{
                title: this.formToOpen.title,
                to: this.formToOpen.from,
                from: 'carrier',
                data: res
              })
              this.$store.commit('closeModal')

            }else{
             this.$store.commit('closeModal')
            }
        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }
      } else {
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },
    async onUpdate(carrier) {
      try {
        const res = await this.$store.dispatch('carriers/putCarrier', carrier)
        this.$emit('refreshCarriers')
        this.$brynkaToast(res.message, 'success')
        this.onReset()
        this.$store.commit('closeModal')
      } catch (error) {
        this.$brynkaToast(error, 'danger')
      }
    },

    onReset(evt) {
      this.carrier.name = ''
      this.carrier.code = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.$v.carrier.$reset()
      })
    },
    fetchCarrierToEdit(formData) {
      this.carrier.id = formData._id
      this.carrier.code = formData.code
      this.carrier.name = formData.name
      this.carrier.isActive = formData.isActive
      this.isCarrierToEdit = true
    }
  }
}
</script>

<style>
.carrierCard {
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
