import Vue from 'vue';

Vue.filter('capFirstChar',(string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1)
})
