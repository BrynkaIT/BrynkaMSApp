<template>
  <div class="page-wrap d-flex flex-row align-items-center">
    <b-container>
    <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">404</span>
                    <div class="mb-4 lead">The page you are looking for was not found.</div>
                    <a href="#" @click="() => {this.$router.back()}">Back Home </a>
                </div>
            </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
  layout: 'login',

  computed: {
    ...mapState({

      auth: state => state.auth.auth,
      sideBarOpen: state => state.sideBarOpen,
      managedService : state => state.managedService

    }),

  },
}
</script>

<style scoped>

.page-wrap {
    min-height: 100vh;
    background:#222d32 !important;
    color:#fff;
}
</style>
