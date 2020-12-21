<template>
  <div>
    <b-form @submit.prevent="submit">
      <b-form-group label="Text">
        <b-input
         v-model="form.text"
        >
        </b-input>
      </b-form-group>
      <b-form-group label="Media">
        <b-form-input
         v-model="form.media">
        </b-form-input>
      </b-form-group>

        <div class="text-right">
          <b-button variant="secondary"  size="sm" @click="$bvModal.hide('note-modal')" >  Close  </b-button>
          <b-button  size="sm" variant="primary" type="submit">Submit</b-button>
        </div>

    </b-form>
  </div>
</template>

<script>
export default {
  props:['note', 'releaseNoteId'],
  data(){
    return{
      form:{
        releaseNoteId:'',
        noteId:'',
        text:'',
        media:[]
      }
    }
  },
  mounted(){

    this.form.releaseNoteId = this.releaseNoteId
    this.form.noteId = this.note._id
    this.form.text = this.note.text
    this.form.media = this.note.media
  },
  methods:{
    async submit(e){
      e.preventDefault()

        try {
          const res = await this.$store.dispatch('versions/patchNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.bvModal.hide('note-modal')
        } catch (error) {

          this.$brynkaToast(error, 'danger')
        }
    },
     onReset(evt) {
      this.form.text =  ''
      this.form.media = ''

      this.$nextTick(() => {

      })
    },

  }
}
</script>

<style>

</style>
