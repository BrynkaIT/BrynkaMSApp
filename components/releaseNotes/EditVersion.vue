<template>
  <div >

      <b-form >
        <b-input-group size="sm" prepend="Application">
          <b-form-select
            size="sm"
            type="text"
            v-model="form.application"
            :options="applications"
            :class="{ 'validation-error': $v.form.application.$error }"
          ></b-form-select>
        </b-input-group>

        <b-row class="mt-2">
          <b-col sm>
            <b-input-group size="sm" prepend="Version">
              <b-form-input
                size="sm"
                v-model="form.version"
                type="text"
                placeholder="Version"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm>
            <b-input-group size="sm" prepend="Build">
              <b-form-input
                size="sm"
                v-model="form.build"
                type="text"
                placeholder="Build"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm>
            <b-input-group >
              <b-form-datepicker
                v-model="form.releaseDate"
                class="mb-2"
                size="sm"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"

              >
              </b-form-datepicker>
            </b-input-group>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col sm>
            <b-input-group size="sm" prepend="Primary Version">
              <b-form-input
                size="sm"
                v-model="form.primaryVersion"
                type="text"
                placeholder="Primary Version"
                :class="{ 'validation-error': $v.form.primaryVersion.$error }"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm>
            <b-input-group size="sm" prepend="Sub-version">
              <b-form-input
                size="sm"
                v-model="form.subVersion"
                type="text"
                placeholder="Subversion"
                :class="{ 'validation-error': $v.form.subVersion.$error }"
              ></b-form-input>
            </b-input-group>
          </b-col>
          <b-col sm>
            <b-input-group size="sm" prepend="Build Number">
              <b-form-input
                size="sm"
                v-model="form.buildNumber"
                type="text"
                placeholder="Build Number"
                :class="{ 'validation-error': $v.form.buildNumber.$error }"
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <div class="text-right mt-2">
          <b-button type="submit" variant="outline-secondary" @click="$emit('cancel')" size="sm" class="mr-1">Cancel</b-button>
          <b-button type="submit" variant="success" @click="onSubmit" size="sm">Update</b-button>

        </div>
      </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  props:['vs'],
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      form: {
        id:'',
        application: null,
        build: '',
        buildNumber: '',
        primaryVersion: '',
        subVersion: '',
        releaseDate: '',
        version: '',

      },
      applications: [
        { value: null, text: 'Application' },
        { value: 'api', text: 'Brynka API' },
        { value: 'webApp', text: 'Brynka Web App' },
        { value: 'managerApp', text: 'Brynka Manager' }
      ],

    }
  },
  validations: {
    form: {
      application: {
        required
      },
       primaryVersion: {
        required
      },
       subVersion: {
        required
      },
       releaseDate: {
        required
      },
       buildNumber: {
        required
      },
    }
  },
  mounted() {
    this.form.id = this.vs._id
    this.form.application = this.vs.application;
    this.form.build =  this.vs.build;
    this.form.buildNumber =  this.vs.buildNumber;
    this.form.primaryVersion =  this.vs.primaryVersion;
    this.form.subVersion =  this.vs.subVersion;
    this.form.releaseDate =  this.vs.releaseDate;
    this.form.version =  this.vs.version
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        try {
          const res = await this.$store.dispatch('versions/patchVersion', this.form)
          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          // this.$store.commit('closeModal')

        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }
      } else {
        this.$brynkaToast('Please fill in required field(s)', 'danger')
      }
    },

    onReset(evt) {
       this.form.application= null,
        this.form.build= '',
        this.form.buildNumber= '',
        this.form.primaryVersion= '',
        this.form.subVersion= '',
        this.form.releaseDate= '',
        this.form.version= '',

      this.$nextTick(() => {
        this.show = true
        this.$v.form.$reset()
      })
    },

  }
}
</script>

<style scoped>
.releaseNoteCard {
  max-width: 1200px;
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
