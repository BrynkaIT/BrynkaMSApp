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
      v-show="canEdit"
      v-if="editModalToOpen"
      icon="pencil"
      class="border rounded p-1"
      variant="secondary"
      @click="
        $store.commit('switchForm', {
          title: editModalTitle,
          to: editModalToOpen,
          from: editModalFrom,
          data: editModalData,
          isInternalContact: isInternalContact
        })
      "
    ></b-icon>
    <b-icon
      v-if="canDelete"
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
    'canDelete',
    'isInternalContact',
    'editModalFrom',
    'canEdit'
  ],
  methods: {

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
