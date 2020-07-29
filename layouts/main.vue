<template>
<div>
    <top-nav />
    <nuxt />
  </div>
  <!-- Page Content  -->

</template>

<script>
import TopNav from '@/components/shared/TopNav.vue'

export default {
  components: {
    TopNav,

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
      theme: 'blue',

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
.card{
  margin:12px;
}
</style>
