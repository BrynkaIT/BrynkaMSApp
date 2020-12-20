<template>
  <div class="content-container">
    <SideNav page="Realease Notes" app="Realease Notes"></SideNav>
    <div class="content-right">
      <b-card>
        <RibbonHeader
          icon="list-nested"
          name="Version Release Notes"
        ></RibbonHeader>
        <div class="mt-4">
          <b-tabs content-class="mt-3" justified>
            <div class="m-3 text-right">
              <b-button pill variant="dark"
              @click="$store.commit('switchForm',{ title:'Add Release Note', to:'AddReleaseNote',})"
              >New</b-button></div>

            <b-tab title="Manager App" active>
              <b-card no-body>
                <b-tabs pills card vertical>
                  <b-tab
                    class="tabs"
                    v-for="(version, index) in managerAppVersions"
                    :title="version.build"
                    :key="version._id"
                    :class="'active' ? index == 0 : ''"
                  >
                  <div class="my-2 text-right">
                      <b-button  variant="light" @click="showEditBtns = !showEditBtns"><b-icon   icon="pencil" ></b-icon></b-button>
                  </div>
                    <b-card-text>
                      <div class="release-header">
                        <div class="main-release-note-session" v-if="version._id != mainReleaseNote._id">
                          <h2 class="mt-4">v {{ version.build }}
                            <b-button
                              variant="outline-secondary"
                              @click="editReleaseNote(version)"
                              pill
                              size="sm"
                              v-show="showEditBtns">Edit</b-button>
                            <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h2>
                          <ul>
                            <li>
                              Released:
                              {{ $moment(version.releaseDate).format('LLLL') }}
                            </li>
                          </ul>
                        </div >
                        <div class="edit-main-release-note-session m-5" v-else>
                            <EditReleaseNote :rn="mainReleaseNote" @refresh="fetchAllVersions" v-if="version._id == mainReleaseNote._id"/>
                        </div>
                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                        >

                          <h6 class="mt-4" v-if="!showReleaseNotes">
                            <strong >{{ releaseNote.title }}</strong>
                            <b-button variant="outline-secondary" @click="showReleaseNotes = !showReleaseNotes" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h6>

                          <b-input-group prepend="Title" size="sm" v-if="showReleaseNotes">
                            <b-form-input
                              size="sm"
                              v-model="releaseNote.title"
                              type="text"
                              placeholder="Title"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" size="sm" @click="showReleaseNotes = false">Save</b-button>
                            </b-input-group-append>
                          </b-input-group>

                          <ul>
                            <li
                              v-for="note in releaseNote.notes"
                              :key="note._id"
                               class="note-text"
                            >
                            <b-input-group prepend="Note" size="sm" v-if="showReleaseNotes" class="mt-3">
                            <b-form-input
                              size="sm"
                              v-model="note.text"
                              type="text"
                              placeholder="Title"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" size="sm" @click="showReleaseNotes = false">Save</b-button>
                            </b-input-group-append>
                            </b-input-group>

                            <span v-else> {{ note.text }}</span>

                            </li>
                          </ul>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-tab>
            <b-tab title="Web App">
              <b-card no-body>
                <b-tabs pills card vertical>
                  <b-tab
                    class="tabs"
                    v-for="(version, index) in webAppVersions"
                    :title="version.build"
                    :key="version._id"
                    :class="'active' ? index == 0 : ''"
                  >
                    <b-card-text>
                      <div class="release-header">
                         <b-button class="float-right" variant="light" @click="showEditBtns = !showEditBtns"><b-icon   icon="pencil" ></b-icon></b-button>

                        <h2 class="mt-4">v {{ version.build }}
                         <b-button variant="outline-secondary"  pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                        </h2>
                        <ul>
                          <li>
                            Released:
                            {{ $moment(version.releaseDate).format('LLLL') }}
                          </li>
                        </ul>
                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                        >
                          <h6 class="mt-4" v-if="!showReleaseNotes">
                            <strong >{{ releaseNote.title }}</strong>
                            <b-button variant="outline-secondary" @click="showReleaseNotes = !showReleaseNotes" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h6>

                          <b-input-group prepend="Title" size="sm" v-if="showReleaseNotes">
                            <b-form-input
                              size="sm"
                              v-model="releaseNote.title"
                              type="text"
                              placeholder="Title"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" size="sm" @click="showReleaseNotes = false">Save</b-button>
                            </b-input-group-append>
                          </b-input-group>

                          <ul>
                            <li
                              v-for="note in releaseNote.notes"
                              :key="note._id"
                               class="note-text"
                            >
                            <b-input-group prepend="Note" size="sm" v-if="showReleaseNotes" class="mt-3">
                            <b-form-input
                              size="sm"
                              v-model="note.text"
                              type="text"
                              placeholder="Title"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" size="sm" @click="showReleaseNotes = false">Save</b-button>
                            </b-input-group-append>
                            </b-input-group>

                            <span v-else> {{ note.text }}</span>

                            </li>
                          </ul>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-tab>
            <b-tab title="API">
              <b-card no-body>
                <b-tabs pills card vertical>
                  <b-tab
                    class="tabs"
                    v-for="(version, index) in apiVersions"
                    :title="version.build"
                    :key="version._id"
                    :class="'active' ? index == 0 : ''"
                  >
                    <b-card-text>
                      <div class="release-header">
                        <b-button class="float-right" variant="light" @click="showEditBtns = !showEditBtns"><b-icon   icon="pencil" ></b-icon></b-button>
                        <h2 class="mt-4">v {{ version.build }}

                           <b-button variant="outline-secondary" @click="edit(version, index, $event.target)" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                        </h2>
                        <ul>
                          <li>
                            Released:
                            {{ $moment(version.releaseDate).format('LLLL') }}
                          </li>
                        </ul>
                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                        >

                          <h6 class="mt-4" v-if="!showReleaseNotes">
                            <strong >{{ releaseNote.title }}</strong>
                            <b-button variant="outline-secondary" @click="showReleaseNotes = !showReleaseNotes" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h6>

                          <b-input-group prepend="Title" size="sm" v-if="showReleaseNotes">
                            <b-form-input
                              size="sm"
                              v-model="releaseNote.title"
                              type="text"
                              placeholder="Title"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" size="sm" @click="showReleaseNotes = false">Save</b-button>
                            </b-input-group-append>
                          </b-input-group>

                          <ul>
                            <li
                              v-for="note in releaseNote.notes"
                              :key="note._id"
                               class="note-text"
                            >
                            <b-input-group prepend="Note" size="sm" v-if="showReleaseNotes" class="mt-3">
                            <b-form-input
                              size="sm"
                              v-model="note.text"
                              type="text"
                              placeholder="Title"
                            ></b-form-input>
                            <b-input-group-append>
                              <b-button variant="success" size="sm" @click="showReleaseNotes = false">Save</b-button>
                            </b-input-group-append>
                            </b-input-group>

                            <span v-else> {{ note.text }}</span>

                            </li>
                          </ul>
                        </div>
                      </div>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </b-tab>
          </b-tabs>
        </div>
      </b-card>
       <FullWidthModal :show="this.formToOpen.showModal">
        <AddReleaseNote @refresh="fetchAllVersions"/>
    </FullWidthModal>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import RibbonHeader from '@/components/shared/RibbonHeader'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import AddReleaseNote from '@/components/releaseNotes/AddReleaseNote'
import EditReleaseNote from '@/components/releaseNotes/EditReleaseNote'
import EditItemizedNote from '@/components/releaseNotes/EditItemizedNote'


export default {
  middleware: ['authenticated'],
   computed: {
    ...mapState({
      formToOpen: state => state.formToOpen,
    }),
    releaseNoteIndex(){
      return this.noteIndex
    }
  },
  components: {
    SideNav,
    RibbonHeader,
    FullWidthModal,
    AddReleaseNote,
    EditReleaseNote,
    EditItemizedNote
  },
  data() {
    return {
      webAppVersions: '',
      managerAppVersions: '',
      apiVersions:'',
      showEditBtns: false,
      showReleaseNotes: false,
      noteIndex:'',
      mainReleaseNote:'',
        releaseNote: {
        title:''
      },
    }
  },
  async mounted() {
    this.fetchAllVersions()
  },

  methods: {
    async fetchAllVersions(){
      this.mainReleaseNote = ''
      this.webAppVersions = await this.fetchVersion('webApp')
      this.managerAppVersions = await this.fetchVersion('managerApp')
      this.apiVersions = await this.fetchVersion('api')
    },
    async fetchVersion(app) {
      try {
        const { versions } = await this.$axios.$get(`/versions?app=${app}` )
        return versions.reverse()
      } catch (error) {
        this.$brynkaToast(error.response, 'danger')
      }
    },
      editReleaseNote(version, index) {
        this.mainReleaseNote = version

    },
  }
}
</script>

<style scoped>
.tabs {
  padding-top: 0px;
}
.note-text{
  font-weight: 200;
    font-size: 14px;
}
</style>
