<template>
  <div>
    <transition name="slide-left">
      <div id="myModal" class="modal" v-if="show" >
        <!-- Modal content -->
        <div class="modal-content" style="overflow: auto;">
          <div class="container-fluid">
            <b-icon
              icon="x-circle"
              @click="$store.commit('closeModal')"
              class="close"
            ></b-icon>
            <br />
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
   middleware: 'authenticated',
  props:['show'],
  data() {
    return {

    }
  },
  methods: {
    // hide(event){
    //   this.$emit('hideModal', false)
    // }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 9999999;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto;
  background-color: #fff;
}

.modal-content {
  background-color: #343a40;
  /* background: #ecf0f5; */
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 100%;
  height: 100%;
}

.close {
  color: #000;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(242, 4, 4);
  text-decoration: none;
  cursor: pointer;
  transform: scale(1.3);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 2.775);
  overflow: hidden;
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translate(10em, 0);
}
@media print {
  .close{
   display:none;
  }

}
</style>
