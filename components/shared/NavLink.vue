<template>
  <li :appModule="appModule" >
    <button @click="goTo(`${navigateToPage}`)" class="nav-link"
    :class="{ active: page == activeLink }"
    >
      <span class="menu-icon"
      :class="{ active: page == activeLink }"
      >
        <font-awesome-icon
          :icon="fontAwesomeIcon"
          :style="fontAwesomeStyle"
        />
      </span>
      <span class="menu-title">{{ navigateToText }}</span>
    </button>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
//  middleware: 'authenticated',
 computed: {
    ...mapState({
      customer: state => state.managedService,
      auth: state => state.auth
    })
 },
  props: {
    navigateToPage: {
      type: String,
      required: true,
    },
    activeLink:{
      type:String
    },
    navigateToText: {
      required: true,
      type: String
    },
    fontAwesomeIcon: {
      type: Array
    },
    fontAwesomeStyle: {
      type: Object
    },
    appModule:{
      type:String
    },
    page:{
      type:String
    }
  },
   methods: {
    goTo(page) {
      this.$router.push(`/${page}`)
      this.$store.commit('toggleSideBar', false)
    }
  }
}
</script>

<style></style>
