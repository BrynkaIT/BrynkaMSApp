<template>
  <div class="content-container">
    <SideNav page="Development" app="operations"></SideNav>
    <div class="content-right">

      <b-card title="Development" class="overflow-scroll">

      </b-card>

    </div>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
export default {
   layout:'main',
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
