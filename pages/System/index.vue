<template>
  <div class="content-container">
     <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">

      <b-card  class="overflow-scroll">
        <b-container>
          <b-card-title class="mb-4">
            <span style="font-size: 2.5rem;">
               <img src="../../assets/images/bryka_b.png" width="32px" alt />
            </span><span class="pl-1  align-text-top">System</span>
          </b-card-title>
           <div class="row mt-2">

          <div class="col-md-4 p-4">
            <nuxt-link to="system/versions"><h5 class="text-primary">App Versions</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
           <nuxt-link to="system/"><h5 class="text-primary">Themes</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
            <nuxt-link to="system/"><h5 class="text-primary">Maintaince</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
        </div>

        <div class="row mt-2 ">
          <div class="col-md-4 p-4">
            <nuxt-link to="system/"><h5 class="text-primary">Reports</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
            <nuxt-link to="system/"><h5 class="text-primary">Performance</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
            <nuxt-link to="system/"><h5 class="text-primary">Development</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
        </div>
        </b-container>
      </b-card>

    </div>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
export default {

  middleware: ['authenticated'],
  // transition: "tile",
  components: {
    SideNav,
  },
  data() {
    return {

    }
  },

  methods: {

  }
}
</script>
<style scoped>
.card {
  margin: 15px;
}
</style>
