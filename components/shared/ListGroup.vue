<template>
  <b-list-group class="m-2">
    <b-list-group-item class="flex-column align-items-start py-1 px-3" href="#">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="text-dark">{{ name }}</h5>
        <div>
           <b-badge  v-if="isInactive" variant="danger" pill>Inactive </b-badge>
        </div>
      </div>

      <div class="d-flex w-100 justify-content-between">
        <span>Last Update : {{ $moment(lastUpdated).format("l") }} </span>
        <ActionButtons
          :infoLink="infoLink"
          :editModalTitle="editModalTitle"
          :editModalToOpen="editModalToOpen"
          :editModalData="editModalData"
          :id="id"
          :canEdit="canEdit"
          :canDelete="canDelete"
          @onDelete="$emit('on-delete', id)"
        ></ActionButtons>
      </div>
      <small class="id">System ID: {{ id }} </small>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import ActionButtons from '@/components/shared/ActionButtons'

export default {
  props: [
    'name',
    'lastUpdated',
    'id',
    'isInactive',
    'editModalTitle',
    'editModalToOpen',
    'editModalData',
    'infoLink',
    'canEdit',
    'canDelete'
  ],
  components:{
    ActionButtons
  }

}
</script>

<style scoped>
/* .id {
  position: relative;
  bottom: 15px;
} */

</style>
