<template>
  <div class="content-container">
    <SideNav page="Sales" app="sales"></SideNav>
    <div class="content-right">

      <b-card title="Sales" class="overflow-scroll">

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
