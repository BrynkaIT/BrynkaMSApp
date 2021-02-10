<template>
  <div class="body">
    <div class="form-container">
      <div class="row">
        <div class="col-md-6">
          <div class="mt-5 text-center py-5">
              <img src="../assets/images/brynkaManagerLogo-sm.png"/>
              <div class="mt-4 text-white">
                  <b-overlay
                    :show="loading"
                    rounded
                    opacity="0.9"
                    spinner-variant="primary"
                    class="d-inline-block"
                    >
                    <b-icon icon="person-lines-fill" font-scale="5" v-if="!isChangeComplete"></b-icon>
                    </b-overlay>
                  <b-icon icon="check2-circle" font-scale="5" variant="success" v-if="isChangeComplete"></b-icon>
                  <h2>Password Reset</h2>
                </div>
          </div>

        </div>
        <div class="col-md-6"></div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel"></div>
          <div class="overlay-panel overlay-right" >
            <Reset @response="responseFromApi"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Reset from '@/components/Reset'
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  layout:'login',
  components: {
    Reset
  },
  computed: {
    ...mapState({
      customer: state => state.customer,
      auth: state => state.auth.auth
    })
  },

  data() {
    return {
      loading: false,
      isChangeComplete:false,
    }
  },

  methods: {
    responseFromApi(value){
      this.isChangeComplete = value
      if(value){
        setTimeout(() => {
        this.$router.push('/')
        }, 1500)
      }
    },
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.body {
  background: #dae0e8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

}
.form-container {
  background-color: #222d32;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  min-width: 768px;
  min-height: 480px;
}
/* form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100%;
  text-align: center;
}
form h3 {
  color: #fff;
} */

input {
  margin: 4px 0;
}
button {
  border-radius: 5px;
  border: 1px solid #2196f3;
  background-color: #3c8dbc;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin: 15px;
}
button:hover {
  transform: scale(0.95);
  border: 2px solid #2ca973;
  background: #2ca973;
}
button:disabled {
  border: none;
  background-color: #ccc;
  color: #eeeeee;
  transform: none;
}

button:focus {
  outline: none;
}
.form-error {
  color: #f44336;
  background-color: #fff1f1;
  border: 1px solid #f44336;
}
.error-text {
  display: block;
}
h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}
h3,
h4 {
  color: #fff;
}

p {
  font-size: 14px;
  color: #fff;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 7px 0;
}

span {
  font-size: 12px;
  color: #fff;
}

a {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 15px;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay-container p {
  color: #000;
}

.overlay {
  background: #ffffff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #000;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 85%; /* Adjust according to logo height */
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.request-access{
 color:#ccc;
 font-style: italic;
}
.request-access:hover{
 color:#fff;
 text-decoration: underline;
 cursor: pointer;
}

button.overlay-btn {
  background-color: transparent;
  border-color: #000;
  color: #000;
}
button.overlay-btn:hover {
  background-color: #222d32;
  border-color: #000;
  color: #fff;
}

.overlayLeft {
  transform: translateX(-20%);
}
.rightPanelActive .overlay-container {
  transform: translateX(-100%);
}

.rightPanelActive .overlay {
  transform: translateX(50%);
}

.rightPanelActive .overlayLeft {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.rightPanelActive .overlay-right {
  transform: translateX(20%);
}

.err {
  background: #f443368f;
  border: 1px solid #ccc;
  border-radius: 7px;
}
@media (max-width: 767px) {
  body {
    padding: 15px;
  }
  .form-container{
    min-width:90%;
    height:750px;
  }
  .rightPanelActive .overlay-container {
  transform: translateY(-100%);
  }
  .overlay-container {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }
  .bottomPanelActive {
    transform: translateY(-100%);
  }
  .overlayLeft {
    transform: translateY(40%);
  }
  .overlayLeftVertical {
    right: 0;
  }
  .overlayRightVertical {
    transform: translateY(100%);
  }
}

</style>
