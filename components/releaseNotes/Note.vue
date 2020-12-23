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
          <b-button variant="secondary"  size="sm" @click="$bvModal.hide('infoModal')" > Close</b-button>
          <b-button  size="sm" variant="primary" type="submit">Submit</b-button>
        </div>

    </b-form>
  </div>
</template>

<script>
export default {
  props:['content', 'releaseNoteId', 'versionId'],
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

    if(this.content){
      this.noteToEdit = true
      this.form.noteId = this.content._id
      this.form.text = this.content.text
      this.mediaFiles = this.content.media
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
          this.$bvModal.hide('infoModal')
        } catch (error) {

          this.$brynkaToast(error, 'danger')
        }
    },
    async onUpdate(){
        try {
          const res = await this.$store.dispatch('versions/patchNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()
          this.$bvModal.hide('infoModal')
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
