<template>
  <!-- Page Content  -->
  <nuxt />
</template>

<script>
export default {
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
