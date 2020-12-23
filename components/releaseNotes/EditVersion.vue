<template>
  <div >

      <b-form >
        <b-form-group label="Application">
          <b-form-select
            size="sm"
            type="text"
            v-model="form.application"
            :options="applications"
            :class="{ 'validation-error': $v.form.application.$error }"
          ></b-form-select>
        </b-form-group>

        <b-row class="mt-2">
          <b-col sm>
            <b-form-group label="Version">
              <b-form-input
                size="sm"
                v-model="form.version"
                type="text"
                placeholder="Version"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm>
            <b-form-group label="Build">
              <b-form-input
                size="sm"
                v-model="form.build"
                type="text"
                placeholder="Build"
              ></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>
        <b-row>
          <b-col sm>
            <b-form-group label="Release Date">
              <b-form-datepicker
                v-model="releaseDate"
                class="mb-2"
                size="sm"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                required
              >
              </b-form-datepicker>
            </b-form-group>
          </b-col>
           <b-col sm>
            <b-form-group label="Release Time">
              <b-form-timepicker
                v-model="releaseTime"
                size="sm"
                placeholder="Choose a time"
                now-button
                reset-button
                locale="en"
                required
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col sm>
            <b-form-group label="Primary Version">
              <b-form-input
                size="sm"
                v-model="form.primaryVersion"
                type="text"
                placeholder="Primary Version"
                :class="{ 'validation-error': $v.form.primaryVersion.$error }"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm>
            <b-form-group label="Sub-version">
              <b-form-input
                size="sm"
                v-model="form.subVersion"
                type="text"
                placeholder="Subversion"
                :class="{ 'validation-error': $v.form.subVersion.$error }"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm>
            <b-form-group label="Build Number">
              <b-form-input
                size="sm"
                v-model="form.buildNumber"
                type="text"
                placeholder="Build Number"
                :class="{ 'validation-error': $v.form.buildNumber.$error }"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="text-right mt-2">
          <b-button  variant="outline-secondary" @click="$bvModal.hide('infoModal')" size="sm" class="mr-1">Cancel</b-button>
          <b-button type="submit" variant="primary" @click="onSubmit" size="sm">Update</b-button>

        </div>
      </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  props:['content'],
  computed: {
    ...mapState({
      formToOpen: state => state.formToOpen
    })
  },
  data() {
    return {
      releaseTime:'',
      releaseDate:'',
      form: {
        id:'',
        application: '',
        build: '',
        buildNumber: '',
        primaryVersion: '',
        subVersion: '',
        releaseDate: '',
        version: '',

      },
      applications: [
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

       buildNumber: {
        required
      },
    }
  },
  mounted() {
    this.form.id = this.content._id
    this.form.application = this.content.application;
    this.form.build =  this.content.build;
    this.form.buildNumber =  this.content.buildNumber;
    this.form.primaryVersion =  this.content.primaryVersion;
    this.form.subVersion =  this.content.subVersion;
    this.form.version =  this.content.version

    const dt = this.separateDateTime(this.content.releaseDate)
    this.releaseDate =  dt.date
    this.releaseTime = dt.time

  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        const dateString = this.releaseDate + 'T' + this.releaseTime
        this.form.releaseDate = dateString
        try {
          const res = await this.$store.dispatch('versions/patchVersion', this.form)
          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$bvModal.hide('infoModal')

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
    separateDateTime(dt){
      var split = dt.split("T");
      var date = split[0]

      var time = split[1];
      var split2 = time.split(".");

      return{
        date: date,
        time: split2[0]
      }
    }
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
