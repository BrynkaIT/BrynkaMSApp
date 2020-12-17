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
              @click="$store.commit('switchForm',{ title:'Add Release Note', to:'ReleaseNotes',})"
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
                          <h6 class="mt-4">
                            <strong>{{ releaseNote.title }}</strong>
                            <b-button variant="outline-secondary" @click="edit(releaseNote, index, $event.target)" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h6>
                          <ul>
                            <li
                              v-for="note in releaseNote.notes"
                              :key="note._id"
                               class="note-text"
                            >
                              {{ note.text }}
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
                          <h6 class="mt-4">
                            <strong>{{ releaseNote.title }}</strong>
                            <b-button variant="outline-secondary"  @click="edit(releaseNote, index, $event.target)" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h6>
                          <ul>
                            <li
                              v-for="note in releaseNote.notes"
                              :key="note._id"
                              class="note-text"
                            >
                              {{ note.text }}
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
                          <h6 class="mt-4">
                            <strong>{{ releaseNote.title }}</strong>
                             <b-button variant="outline-secondary"  @click="edit(releaseNote, index, $event.target)" pill size="sm" v-show="showEditBtns">Edit</b-button>
                              <b-button variant="outline-danger" pill size="sm" v-show="showEditBtns">Delete</b-button>
                          </h6>
                          <ul>
                            <li
                              v-for="note in releaseNote.notes"
                              :key="note._id"
                               class="note-text"
                            >
                              {{ note.text }}
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
        <ReleaseNotes @refresh="fetchAllVersions"/>
    </FullWidthModal>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SideNav from '@/components/shared/SideNav.vue'
import RibbonHeader from '@/components/shared/RibbonHeader'
import FullWidthModal from '@/components/shared/FullWidthModal.vue'
import ReleaseNotes from '@/components/AddEditReleaseNotes'

export default {
  middleware: ['authenticated'],
   computed: {
    ...mapState({
      formToOpen: state => state.formToOpen,
    })
  },
  components: {
    SideNav,
    RibbonHeader,
    FullWidthModal,
    ReleaseNotes
  },
  data() {
    return {
      webAppVersions: '',
      managerAppVersions: '',
      apiVersions:'',
      showEditBtns: false,
      infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
    }
  },
  async mounted() {
    this.fetchAllVersions()
  },

  methods: {
    async fetchAllVersions(){
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
     edit(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
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
