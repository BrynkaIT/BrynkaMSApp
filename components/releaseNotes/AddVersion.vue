<template>
  <div class="container">
    <b-card
      footer-bg-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
      border-variant="secondary"
      class="releaseNoteCard"
      :header="formToOpen.title"
    >
      <b-form >
        <b-form-group>
          <b-form-select
            size="sm"
            type="text"
            v-model="form.application"
            :options="applications"
            :class="{ 'validation-error': $v.form.application.$error }"
          ></b-form-select>
        </b-form-group>

        <b-row>
          <b-col sm>
            <b-form-group>
              <b-form-input
                size="sm"
                v-model="form.version"
                type="text"
                placeholder="Version"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm>
            <b-form-group>
              <b-form-input
                size="sm"
                v-model="form.build"
                type="text"
                placeholder="Build"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm>
            <b-form-group>
              <b-form-datepicker
                v-model="releaseDate"
                class="mb-2"
                size="sm"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              >
              </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col sm>
            <b-form-group>
              <b-form-timepicker
              v-model="releaseTime"
                size="sm"
                placeholder="Choose a time"
                now-button
                reset-button
                locale="en"
              ></b-form-timepicker>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm>
            <b-form-group>
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
            <b-form-group>
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
            <b-form-group>
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
        <div class="mt-2">
          <p class="font-weight-light  text-secondary p-0 m-0">Release Notes</p>
          <p class="font-weight-light font-italic text-muted p-0 m-0">
            <small>Bug fixes, New Features and Upcoming Enhancements</small>
          </p>
          <hr class="pt-0 mt-0" />
          <div class="accordion" role="tablist">
            <b-card
              no-body
              class="mb-1"
              v-for="(releaseNote, index) in form.releaseNotes"
              :key="index"
            >
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button
                  block
                  v-b-toggle="[`accordion-${index}`]"
                  variant="light"
                  >
                  <span v-if="form.releaseNotes[index].title == ''">Release Note {{ index + 1 }}</span>
                  <span v-else>{{ form.releaseNotes[index].title }}</span>
                  </b-button
                >
              </b-card-header>
              <b-collapse
                :id="`accordion-${index}`"
                visible
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-row>
                    <b-col sm>
                      <b-form-group>
                        <b-form-input
                          size="sm"
                          v-model="form.releaseNotes[index].title"
                          type="text"
                          placeholder="Title"
                        ></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm>
                      <b-form-group>
                        <b-form-select
                          size="sm"
                          v-model="form.releaseNotes[index].module"
                          :options="modules"
                          placeholder="Module"

                        ></b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row v-for="(note, x) in releaseNote.notes" :key="x">
                    <div class="col-md-8">
                      <b-form-group>
                        <b-form-input
                          placeholder="Details..."
                          size="sm"
                          v-model="form.releaseNotes[index].notes[x].text"
                        ></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="col-md-3">
                      <b-form-group>
                        <b-form-tags
                          size="sm"
                          placeholder="Media Url"
                         v-model="form.releaseNotes[index].notes[x].media"
                        ></b-form-tags>
                      </b-form-group>
                    </div>
                    <div class="col-md-1">

                      <b-button-toolbar size="sm" v-if=" x == releaseNote.notes.length-1">
                        <b-button-group class="mr-1" size="sm">
                          <b-button
                            title="Add Note"
                            variant="outline-dark"
                            size="sm"
                            @click="releaseNote.notes.push({ text: '', mediaUrl: '', }) "
                          >
                            <b-icon
                              icon="plus"
                              scale=".7"
                              aria-hidden="true"
                            ></b-icon>
                          </b-button>
                          <b-button
                            title="Subtract Note"
                            variant="outline-dark"
                            size="sm"
                            :disabled="releaseNote.notes.length < 2"
                            @click="releaseNote.notes.pop() "
                          >
                            <b-icon
                              icon="dash"
                              scale=".7"
                              aria-hidden="true"
                            ></b-icon>
                          </b-button>
                        </b-button-group>
                      </b-button-toolbar>
                    </div>
                  </b-row>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
          <div>
            <a
              href="#"
              @click="form.releaseNotes.push({ title: '', module: null, notes: [{text: '', mediaUrl:''}] })"
              variant="transparent"
              class="font-italic text-primary"
              size="sm"
              ><small>Add a Release Note</small></a
            >
          </div>
        </div>
      </b-form>
      <template #footer>
        <b-row class="float-right mt-2">
          <b-button  class="mr-1" @click="onReset" size="sm">Reset</b-button>

          <b-button type="submit" variant="light" @click="onSubmit" size="sm">Submit</b-button>
        </b-row>
      </template>
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
      form: {
        application: null,
        build: '',
        buildNumber: '',
        primaryVersion: '',
        subVersion: '',
        releaseDate: '',
        version: '',
        releaseNotes: []
      },
      releaseDate: '',
      releaseTime:'',
      applications: [
        { value: null, text: 'Application' },
        { value: 'api', text: 'Brynka API' },
        { value: 'webApp', text: 'Brynka Web App' },
        { value: 'managerApp', text: 'Brynka Manager' }
      ],
      modules: [
        { value: null, text: 'Module' },
        { value: 'All', text: 'All' },
        { value: 'Receiving', text:'Receiving'},
        { value: 'Shipping', text:'Shipping'},
        { value: 'Outbound', text:'Outbound'},
        { value: 'Forwarding', text:'Forwarding'},
        { value: 'Inventory', text:'Inventory'}
        ]
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
  created() {},

  methods: {
    async onSubmit(e) {
      e.preventDefault()
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        const dateString = this.releaseDate + 'T' + this.releaseTime
        this.form.releaseDate = dateString

        try {
          const res = await this.$store.dispatch('versions/postVersion', this.form)

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
    onReset(evt) {
       this.form.application= null,
        this.form.build= '',
        this.form.buildNumber= '',
        this.form.primaryVersion= '',
        this.form.subVersion= '',
        this.form.releaseDate= '',
        this.form.version= '',
        this.form.releaseNotes= []

      this.$nextTick(() => {
        this.show = true
        this.$v.form.$reset()
      })
    },
    addANote() {
      this.form.releaseNotes.push({ title: '', module: '', notes: [] })
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
