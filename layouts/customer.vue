<template>
<div>
    <top-nav />
    <div class="content-container">
      <LeftPanel />
      <div class="content-right">
        <nuxt />
      </div>
    </div>
  </div>
  <!-- Page Content  -->

</template>

<script>
import TopNav from '@/components/shared/TopNav.vue'
import LeftPanel from '@/components/shared/LeftPanel.vue'

export default {
  components: {
    TopNav,
    LeftPanel
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: `/${this.theme}.css`
        }
      ]
    }
  },

  data() {
    return {
      theme: 'blue'
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Assistant&display=swap');

body {
  font-family: 'Assistant', sans-serif;
}
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}
</style>
