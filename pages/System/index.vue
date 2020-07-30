<template>
  <div class="content-container">
    <SideNav page="system" app="system"></SideNav>
    <div class="content-right">

      <b-card title="System" class="overflow-scroll">

      </b-card>

    </div>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
export default {
   layout:'main',
    middleware: ['authenticated'],
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
