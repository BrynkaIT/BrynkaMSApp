<template>
 <div >
   <b-form class="mt-2">
     <b-row>
      <div class="col-md-5">
        <b-input-group prepend="Title" size="sm" >
          <b-form-input
            size="sm"
            v-model="form.title"
            type="text"
            placeholder="Title"
          ></b-form-input>

        </b-input-group>
      </div>
      <div class="col-md-5">
        <b-input-group prepend="Module" size="sm">

        <b-form-select
          size="sm"
          v-model="form.module"
          :options="modules"
          placeholder="Module"
        ></b-form-select>

        </b-input-group>
      </div>
      <div class="col-md-2">

       <div class="text-right mr-5">
      <b-button type="submit" variant="outline-secondary" @click="$emit('cancel')" size="sm" class="mr-1">Cancel</b-button>
      <b-button type="submit" variant="success" @click="onSubmit" size="sm">Update</b-button>

      </div>


       <!-- <label class="text-secondary">Add Row</label>
        <b-button-toolbar size="sm" class="float-right">
          <b-button-group class="mr-1" size="sm">
            <b-button
              title="Add Note"
              variant="outline-dark"
              size="sm"
              @click="form.notes.push({ text: '', mediaUrl: [], }) "
            >
              <b-icon
                icon="plus"
                scale=".7"
                aria-hidden="true"
              ></b-icon>
            </b-button>
            <b-button
              title="Subtract Note"
              variant="outline-dark"
              size="sm"
              :disabled="form.notes.length < 2"
              @click="form.notes.pop() "
            >
              <b-icon
                icon="dash"
                scale=".7"
                aria-hidden="true"
              ></b-icon>
            </b-button>
          </b-button-group>
        </b-button-toolbar> -->
      </div>
     </b-row>


    <!-- <ul>
      <li
        v-for="n in form.notes"
        :key="n._id"
          class="note-text"
      >
      <b-row>
        <div class="col-md-6">
          <b-input-group prepend="Text" size="sm"  class="mt-3">
          <b-form-input
            size="sm"
            v-model="n.text"
            type="text"
            placeholder="Title"
          ></b-form-input>

          </b-input-group>
        </div>
        <div class="col-md-6">
          <b-input-group prepend="Media" size="sm"  class="mt-3">
          <b-form-tags
            size="sm"
            v-model="n.media"
            type="text"
            placeholder="Title"
          ></b-form-tags>

          </b-input-group>
        </div>
      </b-row>
      </li>
    </ul> -->
    <!-- <div class="text-right mt-2">
      <b-button type="submit" variant="outline-secondary" @click="$emit('cancel')" size="sm" class="mr-1">Cancel</b-button>
      <b-button type="submit" variant="success" @click="onSubmit" size="sm">Update</b-button>

      </div> -->
   </b-form>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props:['releaseNote','versionId'],

  data() {
    return {
      form: {
        versionId:'',
        releaseNoteId:'',
        title:'',
        module:'',
        notes:[]
      },

      modules: [
        { value: null, text: 'Module' },
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
    this.form.releaseNoteId = this.releaseNote._id
    this.form.title = this.releaseNote.title
    this.form.module = this.releaseNote.module
    this.form.notes = this.releaseNote.notes
  },

  methods: {
    async onSubmit(e) {
      e.preventDefault()

        try {
          const res = await this.$store.dispatch('versions/patchReleaseNotes',this.form)

          this.$emit('refresh')
          this.$brynkaToast(res.message, 'success')
          this.onReset()

        } catch (error) {

          this.$brynkaToast(error, 'danger')
        }

    },

    onReset(evt) {
      this.form.versionId =  ''
      this.form.releaseNoteId = ''
      this.form.title = ''
      this.form.module = null
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
