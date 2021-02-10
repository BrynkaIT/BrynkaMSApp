<template>
 <div >
   <b-form >
        <b-form-group label="Title" size="sm" >
          <b-form-input
            size="sm"
            v-model="form.title"
            required
            placeholder="Title"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Module" size="sm">
        <b-form-select
          size="sm"
          v-model="form.module"
          :options="modules"
          placeholder="Module"
        ></b-form-select>
        </b-form-group>
       <div class="text-right ">
      <b-button type="submit" variant="outline-secondary" @click="$bvModal.hide('infoModal')" size="sm">Close</b-button>
      <b-button type="submit" variant="primary" @click="onSubmit" size="sm">Submit</b-button>

      </div>
   </b-form>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props:['content','versionId'],

  data() {
    return {
      releaseNoteToEdit:false,
      form: {
        versionId:'',
        releaseNoteId:'',
        title:'',
        module:'All',
      },

      modules: [
        { value: 'All', text: 'All' },
        { value: 'Receiving', text: 'Receiving' },
        { value: 'Shipping', text: 'Shipping' },
        { value: 'Outbound', text: 'Outbound' },
        { value: 'Forwarding', text: 'Forwarding' },
        { value: 'Inventory', text: 'Inventory' }
      ]
    }
  },
  mounted() {

    this.form.versionId =  this.versionId

    if(this.content){

      this.releaseNoteToEdit = true
      this.form.releaseNoteId = this.content._id
      this.form.title = this.content.title
      this.form.module = this.content.module
    }


  },

  methods: {
    async onSubmit(e) {

      e.preventDefault()
       if (this.releaseNoteToEdit) return this.onUpdate()

        try {
          const res = await this.$store.dispatch('versions/postReleaseNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$bvModal.hide('infoModal')
        } catch (error) {
          this.$brynkaToast(error, 'danger')
        }

    },
    async onUpdate(){

        try {
          const res = await this.$store.dispatch('versions/patchReleaseNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$bvModal.hide('infoModal')
        } catch (error) {

          this.$brynkaToast(error, 'danger')
        }
    },
    onReset(evt) {
      this.form.versionId =  ''
      this.form.releaseNoteId = ''
      this.form.title = ''
      this.form.module = 'All'
      this.form.notes = []

      this.$nextTick(() => {

      })
    },

  }
}
</script>

<style scoped>
.releaseNoteCard {
  max-width: 1200px;
  margin: auto;
}
.error-text {
  display: block;
  color: red;
  font-size: 12px;
  font-style: italic;
  text-align: center;
}
.validation-error {
  border: 1px solid #f44336;
  color: red;
}
.validation-error::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}

.validation-error:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: red;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: red;
}
</style>
