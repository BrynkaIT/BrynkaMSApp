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
              @click="$store.commit('switchForm',{ title:'Add Version and Release Notes', to:'AddVersion',})"
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
                        <div class="version-session">
                          <h2 class="mt-4">v {{ version.build }}
                            <b-button
                              variant="transparent"
                             @click="onEdit('Version', version._id, '', version)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                            <b-button
                              variant="transparent"
                              @click="onDelete('Version', version._id)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon
                              icon="trash"
                              variant="danger"></b-icon></b-button>
                          </h2>
                          <ul>
                            <li>
                              Released:
                              {{ $moment(version.releaseDate).format('LLLL') }}
                            </li>
                          </ul>
                        </div >

                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                          ><b-button
                            class="p-0"
                            v-show="showEditBtns"
                            variant="transparent"
                            @click="addNew('ReleaseNote', version._id)">
                            <b-icon icon="plus"></b-icon>
                            <small class="text-primary"><i>Add a New ReleaseNote</i></small>
                        </b-button>

                          <div class="release-note-session" >
                            <h6 class="mt-4" >
                              <strong >{{ releaseNote.title }}</strong>
                              <b-button
                                variant="transparent"
                                @click="onEdit('ReleaseNote', version._id, releaseNote._id, releaseNote)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                              <b-button
                                variant="transparent"
                                @click="onDelete('ReleaseNote', version._id, releaseNote._id)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>
                            </h6>
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
                                  @click="onEdit('Note', version._id, releaseNote._id, note)"
                                  size="sm"
                                  v-show="showEditBtns">
                                  <b-icon icon="pencil" variant="info"></b-icon>
                                  </b-button>
                              <b-button
                                class="p-0"
                                variant="transparent"
                                @click="onDelete('Note', version._id, releaseNote._id, note._id)"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>

                              </span>

                              </li>
                              <b-button
                                class="p-0"
                                v-show="showEditBtns"
                                variant="transparent"
                                @click="addNew('Note', version._id, releaseNote._id)">
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
                   <div class="mt-2 text-right">
                    <b-button  variant="light" size="sm" @click="showEditBtns = !showEditBtns"><b-icon  icon="tools" variant="danger"></b-icon></b-button>
                  </div>
                    <b-card-text>
                      <div class="release-header">
                        <div class="version-session">
                          <h2 class="mt-4">v {{ version.build }}
                            <b-button
                              variant="transparent"
                             @click="onEdit('Version', version._id, '', version)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                            <b-button
                              variant="transparent"
                               @click="onDelete('Version', version._id)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon
                              icon="trash"
                              variant="danger"></b-icon></b-button>
                          </h2>
                          <ul>
                            <li>
                              Released:
                              {{ $moment(version.releaseDate).format('LLLL') }}
                            </li>
                          </ul>
                        </div >

                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                          ><b-button
                            class="p-0"
                            v-show="showEditBtns"
                            variant="transparent"
                            @click="addNew('ReleaseNote', version._id)">
                            <b-icon icon="plus"></b-icon>
                            <small class="text-primary"><i>Add a New ReleaseNote</i></small>
                        </b-button>

                          <div class="release-note-session" >
                            <h6 class="mt-4" >
                              <strong >{{ releaseNote.title }}</strong>
                              <b-button
                                variant="transparent"
                                @click="onEdit('ReleaseNote', version._id, releaseNote._id, releaseNote)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                              <b-button
                                variant="transparent"
                                @click="onDelete('ReleaseNote', version._id, releaseNote._id)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>
                            </h6>
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
                                  @click="onEdit('Note', version._id, releaseNote._id, note)"
                                  size="sm"
                                  v-show="showEditBtns">
                                  <b-icon icon="pencil" variant="info"></b-icon>
                                  </b-button>
                              <b-button
                                class="p-0"
                                variant="transparent"
                                @click="onDelete('Note', version._id, releaseNote._id, note._id)"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>

                              </span>

                              </li>
                              <b-button
                                class="p-0"
                                v-show="showEditBtns"
                                variant="transparent"
                                @click="addNew('Note', version._id, releaseNote._id)">
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
                  <div class="mt-2 text-right">
                    <b-button  variant="light" size="sm" @click="showEditBtns = !showEditBtns"><b-icon  icon="tools" variant="danger"></b-icon></b-button>
                  </div>
                    <b-card-text>
                      <div class="release-header">
                        <div class="version-session">
                          <h2 class="mt-4">v {{ version.build }}
                            <b-button
                              variant="transparent"
                             @click="onEdit('Version', version._id, '', version)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                            <b-button
                              variant="transparent"
                              @click="onDelete('Version', version._id)"
                              class="p-0"
                              size="sm"
                              v-show="showEditBtns"><b-icon
                              icon="trash"
                              variant="danger"></b-icon></b-button>
                          </h2>
                          <ul>
                            <li>
                              Released:
                              {{ $moment(version.releaseDate).format('LLLL') }}
                            </li>
                          </ul>
                        </div >

                        <div
                          class="note"
                          v-for="(releaseNote, index) in version.releaseNotes"
                          :key="index"
                          ><b-button
                            class="p-0"
                            v-show="showEditBtns"
                            variant="transparent"
                            @click="addNew('ReleaseNote', version._id)">
                            <b-icon icon="plus"></b-icon>
                            <small class="text-primary"><i>Add a New ReleaseNote</i></small>
                        </b-button>

                          <div class="release-note-session" >
                            <h6 class="mt-4" >
                              <strong >{{ releaseNote.title }}</strong>
                              <b-button
                                variant="transparent"
                                @click="onEdit('ReleaseNote', version._id, releaseNote._id, releaseNote)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="pencil" variant="info" ></b-icon></b-button>
                              <b-button
                                variant="transparent"
                                @click="onDelete('ReleaseNote', version._id, releaseNote._id)"
                                class="p-0"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>
                            </h6>
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
                                  @click="onEdit('Note', version._id, releaseNote._id, note)"
                                  size="sm"
                                  v-show="showEditBtns">
                                  <b-icon icon="pencil" variant="info"></b-icon>
                                  </b-button>
                              <b-button
                                class="p-0"
                                variant="transparent"
                                @click="onDelete('Note', version._id, releaseNote._id, note._id)"
                                size="sm"
                                v-show="showEditBtns"><b-icon  icon="trash" variant="danger"></b-icon></b-button>

                              </span>

                              </li>
                              <b-button
                                class="p-0"
                                v-show="showEditBtns"
                                variant="transparent"
                                @click="addNew('Note', version._id, releaseNote._id)">
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
          </b-tabs>
        </div>
      </b-card>
       <FullWidthModal :show="this.formToOpen.showModal">
        <AddVersion @refresh="fetchAllVersions"/>
    </FullWidthModal>
    <b-modal id="infoModal" :title="infoModal.modalTitle" :hide-footer="true">
      <component
        :is="activeComponent"
        :content="infoModal.content"
        :releaseNoteId="infoModal.releaseNoteId"
        :versionId="infoModal.versionId"
        @refresh="fetchAllVersions" />
    </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import RibbonHeader from '@/components/shared/RibbonHeader'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import AddVersion from '@/components/releaseNotes/AddVersion'
import Version from '@/components/releaseNotes/EditVersion'
import ReleaseNote from '@/components/releaseNotes/ReleaseNote'
import Note from '@/components/releaseNotes/Note'


export default {
  middleware: ['authenticated'],
   computed: {
    ...mapState({
      formToOpen: state => state.formToOpen,
    }),

    activeComponent(){
      return this.infoModal.name
    },
  },
  components: {
    SideNav,
    RibbonHeader,
    FullWidthModal,
    AddVersion,
    Version,
    ReleaseNote,
    Note
  },
  data() {
    return {
      webAppVersions: '',
      managerAppVersions: '',
      apiVersions:'',
      showEditBtns: false,
      infoModal:{
        name:'',
        modalTitle:'',
        releaseNoteId:'',
        versionId:'',
        content:''
      },

    }
  },
  async mounted() {
    this.fetchAllVersions()
  },

  methods: {

    async fetchAllVersions(){

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

     addNew(ModalToOpen, versionId, releaseNoteId){
       const vid = versionId || ''
       const rid = releaseNoteId || ''
      this.infoModal.name = ModalToOpen
      this.infoModal.modalTitle = `Add New ${ModalToOpen}`
      this.infoModal.content = ''
      this.infoModal.releaseNoteId = rid,
      this.infoModal.versionId = vid,
     this.$bvModal.show('infoModal')
    },
    onEdit(ModalToOpen, versionId, releaseNoteId, content){
       const vid = versionId || ''
       const rid = releaseNoteId || ''
      this.infoModal.name = ModalToOpen
      this.infoModal.modalTitle = `Edit ${ModalToOpen}`
      this.infoModal.content = content
      this.infoModal.releaseNoteId = rid,
      this.infoModal.versionId = vid,
     this.$bvModal.show('infoModal')
    },
    async onDelete(session, versionId, releaseNoteId, noteId) {
      const vid = versionId || ''
      const rid = releaseNoteId || ''
      const nid = noteId || ''
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
          const res = await this.$store.dispatch(`versions/delete${session}`, {
            versionId: vid,
            releaseNoteId: rid,
            noteId: nid
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
