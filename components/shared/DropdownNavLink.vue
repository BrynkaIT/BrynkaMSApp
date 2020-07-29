<template>
  <li :appModule="appModule">
    <b-nav vertical>
        <a class="nav-link" href="#" v-b-toggle.accordion-2 >
          <span class="menu-icon">
            <font-awesome-icon
              :icon="dropdownIcon"
              :style="dropdownIconStyle"
            />
          </span>
          <span class="menu-title">{{ dropdownText }}</span>
          <font-awesome-icon
            :icon="['fas', 'caret-down']"
            style="color:#a3a3a3;margin-left:28%;"
          />
        </a>

        <b-collapse
          id="accordion-2"
          accordion="my-accordion"
          role="tabpanel"
          class="mx-auto"
        >
          <div>
            <li v-for="nestedLink in nestedLinks" :key="nestedLink.navigateToText">
              <nuxt-link
                :to="`${customer.path}${nestedLink.navigateToPage}`" class="nav-link"

              >
                <span class="menu-title">{{ nestedLink.navigateToText }}</span>
              </nuxt-link>
            </li>

          </div>
        </b-collapse>
      </b-nav>
  </li>

</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default {
   middleware: 'authenticated',
   computed: {
    ...mapState({
      customer: state => state.managedService,
      auth: state => state.auth
    })
   },
  props: {
     appModule:{
      type:String
    },
    dropdownIcon: {
      type: Array
    },
    dropdownIconStyle: {
      type: Object
    },
    dropdownText:{
       type: String
    },
    appModule:{
      type: String
    },
    nestedLinks:{
      type: Array
    },

  }

}
</script>
