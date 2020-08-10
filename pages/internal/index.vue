<template>
  <div class="content-container">
    <SideNav page="internal" app="Internal Stuff"></SideNav>
    <div class="content-right">

      <b-card title="Internal" class="overflow-scroll">

      </b-card>

    </div>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
export default {

  middleware: ['authenticated'],
  transition: "tile",
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
