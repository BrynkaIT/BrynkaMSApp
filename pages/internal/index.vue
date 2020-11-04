<template>
  <div class="content-container">
     <SideNav page="customers" app="customers"></SideNav>
    <div class="content-right">

      <b-card  class="overflow-scroll">
        <b-container>
          <b-card-title class="mb-4">
            <span style="font-size: 2.5rem;">
               <img src="../../assets/images/bryka_b.png" width="32px" alt />
            </span><span class="pl-1  align-text-top">Internal</span>
          </b-card-title>
           <div class="row mt-2">

          <div class="col-md-4 p-4">
            <nuxt-link to="internal/rma"><h5 class="text-primary">RMA's</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
           <nuxt-link to="internal/inventory"><h5 class="text-primary">Inventory</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
            <nuxt-link to="internal/"><h5 class="text-primary">Blah</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
        </div>

        <div class="row mt-2 ">
          <div class="col-md-4 p-4">
            <nuxt-link to="internal/"><h5 class="text-primary">Blah</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
            <nuxt-link to="internal/"><h5 class="text-primary">Blah</h5></nuxt-link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aspernatur aliquid quaerat.</p>
          </div>
          <div class="col-md-4 p-4">
            <nuxt-link to="internal/"><h5 class="text-primary">Blah</h5></nuxt-link>
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
