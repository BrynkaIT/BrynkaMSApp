<template>
  <div class="content-container">
    <SideNav page="Realease Notes" app="Realease Notes"></SideNav>
    <div class="content-right">
      <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="warning">Brynka Web App</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card >
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 mb-0 text-gray-800">Release Notes</h1>
          
        </div>
        <b-card no-body>
          <b-tabs pills card vertical>
          <b-tab class="tabs" v-for="(version, index)  in versions" :title="version.build"  :key="version._id" :class=" 'active' ? index == 0 : ''">
            <b-card-text>
              <div class="release-header">
                  <h1 class="mt-4">v {{version.build}} </h1>
                  <ul>
                    <li>
                      Released: {{$moment(version.releaseDate).format('LLLL')}}
                    </li>

                  </ul>
                  <div class="note" v-for="(releaseNote, index) in version.releaseNotes" :key="index">
                    <h5 class="mt-4"><strong>{{releaseNote.title}}</strong></h5>
                  <ul>
                    <li v-for="note in releaseNote.notes" :key="note._id">{{note.text}}</li>

                  </ul>
                  </div>

              </div>
            </b-card-text>
          </b-tab>
          </b-tabs>
        </b-card>
      </b-card>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="warning">Brynka API</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <!-- <b-card-text>{{ text }}</b-card-text> -->
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-3 variant="warning">Brynka Manager</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <!-- <b-card-text>{{ text }}</b-card-text> -->
        </b-card-body>
      </b-collapse>
    </b-card>




      <br />
    </div>
  </div>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'

export default {
  middleware: ['authenticated'],

  components: {
    SideNav
  },
  data() {
    return {
      versions:''
    }
  },
  mounted(){
    this.fetchVersion()
  },

  methods: {
    async fetchVersion(){
      try {
        const { versions } = await this.$axios.$get(`/versions?app=webApp&build=^${process.env.version}`)
        this.versions = versions.reverse();
      } catch (error) {
        this.$brynkaToast(error.response, 'danger')
      }
    }
  }
}
</script>

<style scoped>
.tabs{
  padding-top: 0px;
}
</style>
