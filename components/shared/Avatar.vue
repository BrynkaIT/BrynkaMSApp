<template>
  <b-nav vertical v-if="isAuth">
    <a class="nav-link" href="#" v-b-toggle.accordion-user>
      <span class="menu-icon">
        <img v-if="currentUser.imageUrl == '' || currentUser.imageUrl == null"
          style="max-width:32px; border-radius:360px;"
          src="../../assets/images/avatar-icon-images-4.png"
        />
        <img v-if="currentUser.imageUrl !=''"
          style="max-width:32px; border-radius:360px;"
          :src="currentUser.imageUrl"
        />
      </span>
      <span class="menu-title" v-if="currentUser">
        <i>{{ currentUser.firstName }} {{ currentUser.lastName }}</i>
      </span>
      <font-awesome-icon
        :icon="['fas', 'caret-down']"
        style="color:#a3a3a3;margin-left:8%;"
      />
    </a>

    <b-collapse
      id="accordion-user"
      accordion="my-accordion"
      role="tabpanel"
      class="mx-auto"
    >
      <div>
        <li>
          <nuxt-link
            :to="`/preferences`"
            class="nav-link"
            :class="{ active: page == 'preferences' }"
          >
            <span class="menu-title">Preferences</span>
          </nuxt-link>
        </li>
        <b-nav-item @click="logout" class="sub-link">Log Out</b-nav-item>
      </div>
    </b-collapse>
  </b-nav>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
   middleware: 'authenticated',
  props: ['page'],
   computed: {
      ...mapState({
      customer : state => state.managedService,
      auth: state => state.auth,
      currentUser : state => state.currentUser
    }),
    ...mapGetters({
      isAuth: 'isAuthenticated',
    })
  },
  methods: {
   logout () {
      this.$store.dispatch('logOut')
      localStorage.clear()
      this.$router.push(`/`)
    }
  }
}
</script>

<style>

</style>
