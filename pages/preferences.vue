<template>
  <div class="content-container">
    <!-- <SideNav page="preferences" app="Receiving"></SideNav> -->
    <div class="content-right">
      <b-container>
        <b-row>
          <b-col cols="8">
            <b-card title="Preferences">
        <b-container>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Food:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="form.food"
              :options="foods"
              required
            ></b-form-select>
          </b-form-group>

          <b-form-group id="input-group-4">
            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
              <b-form-checkbox value="me">Check me out</b-form-checkbox>
              <b-form-checkbox value="that">Check that out</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card>
      </b-container>
     </b-card>
          </b-col>
          <b-col cols="4">
            <div class="form">
            <h2>How-To</h2>
            <p>The attached video shows how to receive a package and answers fequently asked questions</p>
            <div>
              <img src="/img/tutorial-poster.png" style="width:100%;">
              <!-- <b-embed
                type="iframe"
                aspect="16by9"
                controls
                src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                allowfullscreen
              ></b-embed> -->
            </div>
          </div>
          </b-col>
        </b-row>
      </b-container>

    </div>
  </div>
</template>
<script>
// import SideNav from '@/components/SideNav.vue'
  export default {
    components: {
    // SideNav,
  },
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
<style scoped>
.btn.btrak {
  float: right;
  margin: 1%;
  border-radius: 0.3rem;
  color: #fff;
  font-weight: 200;
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
}

.section-label {
  font-size: 13px;
  font-weight: 600;
}
.table {
  /* max-width: 1250px; */
  width:100%;
}

.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #ffeb3b !important;
  background-color: #4caf50 !important;
}
</style>
