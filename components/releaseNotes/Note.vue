<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Text">
        <b-input
        required
         v-model="form.text"
        >
        </b-input>
      </b-form-group>
      <b-form-group label="Media">
         <b-form-file >
        <b-form-input
         v-model="form.media">
        </b-form-input>
      </b-form-file>
      <b-row v-if="mediaFiles.length > 0">
            <div
              style="max-width:120px; margin:3px"
              v-for="(media, index) in mediaFiles"
              :key="index"
            >
              <b-img
                thumbnail
                @click="showMultiple(media, index)"
                fluid
                :src="`${baseUrl}${media.imageURL}`"
                alt="attached Image"
              ></b-img>
            </div>
          </b-row>
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
  props:['note', 'releaseNoteId', 'versionId'],
  data(){
    return{
      mediaFiles:[],
      noteToEdit: false,

      form:{
        releaseNoteId:'',
        versionId:'',
        noteId:'',
        text:'',
        media:[]
      }
    }
  },
  mounted(){
    this.form.releaseNoteId = this.releaseNoteId
    this.form.versionId = this.versionId

    if(this.note){
      this.noteToEdit = true
      this.form.noteId = this.note._id
      this.form.text = this.note.text
      this.mediaFiles = this.note.media
    }

  },
  methods:{
    async onSubmit(e){
      e.preventDefault()
      if (this.noteToEdit) return this.onUpdate()

        try {
          const res = await this.$store.dispatch('versions/postNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$bvModal.hide('note-modal')
        } catch (error) {

          this.$brynkaToast(error, 'danger')
        }
    },
    async onUpdate(e){
      e.preventDefault()
        debugger
        try {
          const res = await this.$store.dispatch('versions/patchNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$bvModal.hide('note-modal')
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
