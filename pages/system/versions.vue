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
              @click="$store.commit('switchForm',{ title:'Add Release Note', to:'AddVersionSession',})"
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
                  <div class="mt-2 text-right">
                    <b-button  variant="light" size="sm" @click="showEditBtns = !showEditBtns"><b-icon  icon="tools" variant="danger"></b-icon></b-button>
                  </div>
                    <b-card-text>
                      <div class="release-header">
                        <div class="version-session" v-if="version._id != versionSession._id">
                          <h2 class="mt-4">v {{ version.build }}
                            <b-button
                              variant="transparent"
                              @click="editVersionSession(version)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                            <b-button variant="transparent"  class="p-0" size="sm" v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>
                          </h2>
                          <ul>
                            <li>
                              Released:
                              {{ $moment(version.releaseDate).format('LLLL') }}
                            </li>
                          </ul>
                        </div >
                        <div class="edit-version-session mr-5" v-else>
                          <VersionSession
                            :vs="versionSession"
                            @refresh="fetchAllVersions"
                            @cancel="versionSession = ''"
                            v-if="version._id == versionSession._id" />
                        </div>
                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                        >
                          <div class="release-note-session" v-if="!showReleaseNotes">
                            <h6 class="mt-4" >
                              <strong >{{ releaseNote.title }}</strong>
                              <b-button
                                variant="transparent"
                                @click="editReleaseNote(releaseNote)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                              <b-button
                                variant="transparent"

                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>
                            </h6>
                          </div>
                          <div class="edit-release-note-session" v-else>
                              <ReleaseNote
                              @refresh="refreshReleaseNotes"
                              @cancel="cancelReleaseNote"
                              :versionId="version._id"
                              :releaseNote="releaseNote"
                               />

                          </div>

                            <ul class="mb-0">
                              <li
                                v-for="note in releaseNote.notes"
                                :key="note._id"
                                class="note-text"
                              >
                              <span> {{ note.text }}
                                <b-button
                                  class="p-0"
                                  variant="transparent"
                                  @click="editNote(note, releaseNote._id, $event.target)"
                                  size="sm"
                                  v-show="showEditBtns">
                                  <b-icon icon="pencil" variant="info"></b-icon>
                                  </b-button>
                              <b-button
                                class="p-0"
                                variant="transparent"
                                @click="deleteNote(releaseNote._id, note._id)"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>

                              </span>

                              </li>
                              <b-button
                                class="p-0"
                                v-show="showEditBtns"
                                variant="transparent"
                                @click="addNewNote(version._id, releaseNote._id)">
                                <b-icon icon="plus"></b-icon>
                                <small class="text-primary"><i>Add a New Note</i></small>
                              </b-button>
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
                   <div class="my-2 text-right">
                    <b-button  variant="light" size="sm" @click="showEditBtns = !showEditBtns"><b-icon  icon="pencil" variant="danger"></b-icon></b-button>
                  </div>
                    <b-card-text>

                      <div class="release-header">
                        <div class="main-release-note-session" v-if="version._id != versionSession._id">
                          <h2 class="mt-4">v {{ version.build }}
                          <b-button
                            variant="outline-secondary"
                            pill
                            size="sm"
                            @click="editVersionSession(version)"
                            v-show="showEditBtns">Edit</b-button>
                          <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h2>
                          <ul>
                            <li>
                              Released:
                              {{ $moment(version.releaseDate).format('LLLL') }}
                            </li>
                          </ul>
                        </div>
                        <div class="edit-main-release-note-session mr-5" v-else>
                          <VersionSession
                            :vs="versionSession"
                            @refresh="fetchAllVersions"
                            @cancel="versionSession = ''"
                            v-if="version._id == versionSession._id" />
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
                  <div class="my-2 text-right">
                    <b-button  variant="light" size="sm" @click="showEditBtns = !showEditBtns"><b-icon  icon="pencil" variant="danger"></b-icon></b-button>
                  </div>
                    <b-card-text>
                      <div class="release-header">
                        <div class="main-release-note-session" v-if="version._id != versionSession._id">
                          <h2 class="mt-4">v {{ version.build }}
                            <b-button
                              variant="outline-secondary"
                              @click="editVersionSession(version)"
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
                        </div>
                        <div class="edit-main-release-note-session mr-5" v-else>
                          <VersionSession
                            :vs="versionSession"
                            @refresh="fetchAllVersions"
                            @cancel="versionSession = ''"
                            v-if="version._id == versionSession._id" />
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
          </b-tabs>
        </div>
      </b-card>
       <FullWidthModal :show="this.formToOpen.showModal">
        <AddVersionSession @refresh="fetchAllVersions"/>
    </FullWidthModal>
    <b-modal id="note-modal" :title="note.title" :hide-footer="true">
      <Note :note="note.content" :releaseNoteId="note.releaseNoteId" :versionId="note.versionId" @refresh="fetchAllVersions"/>
    </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import RibbonHeader from '@/components/shared/RibbonHeader'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import AddVersionSession from '@/components/releaseNotes/AddVersionSession'
import VersionSession from '@/components/releaseNotes/EditVersionSession'
import ReleaseNote from '@/components/releaseNotes/ReleaseNote'
import Note from '@/components/releaseNotes/Note'


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
    AddVersionSession,
    VersionSession,
    ReleaseNote,
    Note
  },
  data() {
    return {
      webAppVersions: '',
      managerAppVersions: '',
      apiVersions:'',
      showEditBtns: false,
      showReleaseNotes: false,
      noteIndex:'',
      versionSession:'',
      releaseNote:'',
      note:{
        title:'',
        content:null,
        releaseNoteId:'',
        versionId:''
      }

    }
  },
  async mounted() {
    this.fetchAllVersions()
  },

  methods: {
    async fetchAllVersions(){
      this.versionSession = ''
      this.showEditBtns = false
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
      editVersionSession(version) {
        this.versionSession = version
    },
    editReleaseNote(releaseNote) {
      this.releaseNote = releaseNote
      this.showReleaseNotes = true
    },
    cancelReleaseNote() {
      this.releaseNote = ''
      this.showReleaseNotes = false
    },
    refreshReleaseNotes(){
      this.fetchAllVersions()
      this.cancelReleaseNote()
    },
    addNewNote(versionId, releaseNoteId, button){
     this.note.title = `Add New Note`
     this.note.content = ''
     this.note.versionId = versionId
     this.note.releaseNoteId = releaseNoteId
     this.$bvModal.show('note-modal')
    },
    editNote(note, releaseNoteId, button) {
      this.note.title = `Edit Note`
      this.note.content = note
      this.note.releaseNoteId = releaseNoteId
      this.$root.$emit('bv::show::modal', 'note-modal', button)
    },
    async deleteNote(releaseNoteId, noteId) {
      this.$bvModal
        .msgBoxConfirm(`Really Delete?`, {
          title: 'Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(async value => {
          if (!value) {
            return
          } else {
            try {
        const res = await this.$store.dispatch('versions/deleteNote', {
          releaseNoteId: releaseNoteId,
           noteId : noteId,
        })
        this.$brynkaToast(res.message, 'success')
        this.fetchAllVersions()
      } catch (error) {
         this.$brynkaToast(error, 'danger')
      }
      }
    })

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
