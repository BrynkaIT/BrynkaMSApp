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
.tile-enter-active, .tile-leave-active {
	 transition-duration: 1600ms;
}
 .tile-enter-active::before, .tile-leave-active::before, .tile-enter-active::after, .tile-leave-active::after {
	 content: "";
	 position: fixed;
	 top: 0;
	 left: 0;
	 z-index: 99;
	 display: block;
	 width: 100%;
	 height: 50%;
	 transition-property: opacity, transform;
	 transition-timing-function: ease-in-out;
}
 .tile-enter-active::before, .tile-leave-active::before {
	 background-color: #222d32;
}
 .tile-enter-active::after, .tile-leave-active::after {
	 top: 50%;
	 background-color: #222d32;
}
 .tile-leave::before, .tile-leave::after {
	 transform: scaleX(0);
}
 .tile-leave-active::before {
	 transition-duration: 800ms;
}
 .tile-leave-active::after {
	 transition-duration: 500ms;
	 transition-delay: 300ms;
}
 .tile-leave-to::before, .tile-leave-to::after {
	 transform: scale(1);
	 transform-origin: left;
}
 .tile-enter::before, .tile-enter::after {
	 transform: scaleX(1);
}
 .tile-enter-active::before {
	 transition-duration: 800ms;
}
 .tile-enter-active::after {
	 transition-duration: 500ms;
	 transition-delay: 300ms;
}
 .tile-enter-to::before, .tile-enter-to::after {
	 transform: scaleX(0);
	 transform-origin: right;
}
</style>
