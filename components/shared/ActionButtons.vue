<template>
  <div style="font-size: 1.75rem;">
    <b-icon
      v-if="infoLink"
      icon="info"
      class="border rounded"
      variant="secondary"
      @click="
        () => {
          $router.push(infoLink)
        }
      "
    ></b-icon>
    <b-icon
      v-if="editModalToOpen"
      icon="pencil"
      class="border rounded p-1"
      variant="secondary"
      @click="
        $store.commit('switchForm', {
          title: editModalTitle,
          to: editModalToOpen,
          data: editModalData
        })
      "
    ></b-icon>
    <b-icon
      v-if="showDeleteBtn"
      icon="trash"
      class="border rounded p-1"
      variant="secondary"
      @click="onDelete()"
    ></b-icon>
  </div>
</template>

<script>
export default {
  props: [
    'id',
    'editModalTitle',
    'editModalToOpen',
    'editModalData',
    'infoLink',
    'showDeleteBtn'
  ],
  methods: {
    info(item) {
      this.$router.push(`./${item.customer._id}/locations/${item._id}`)
    },
    onDelete() {
      this.$bvModal
        .msgBoxConfirm(`Really Delete?`, {
          title: 'Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(async value => {
          if (!value) {
            return
          } else {
            debugger
            this.$emit('onDelete', this.id)
          }
        })
    }
  }
}
</script>

<style scoped>

.bi-info:hover {
  background: #17a2b8;
  color: #fff !important;
}
.bi-pencil:hover {
  background: orange;
  color: #fff !important;
}
.bi-trash:hover {
  background: red;
  color: #fff !important;
}
</style>
