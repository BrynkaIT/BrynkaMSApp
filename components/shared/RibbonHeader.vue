<template>
<div>
  <b-icon icon="arrow-left-square" scale="1.5" variant="info" @click="() =>{this.$router.back()}"></b-icon>
  <div class="top-panel mt-2 mb-4 ">
    <div class="row pb-1">
      <div>
        <b-avatar
          size="3rem"
          :icon="icon"
          class="border mt-2"
          variant="none"
          :src="avatar"
        ></b-avatar>
      </div>
      <div>
        <h3 class="mt-3 ml-1">{{ name }}</h3>
        <small>
          <p class="ml-2" v-if="address">
            <span v-if="address.street1">{{ address.street1 }}<br /> </span>
            <span v-if="address.street2">{{ address.street2 }}<br /></span>
            <span>{{ address.city }},&nbsp;</span
            ><span>{{ address.state }},&nbsp;</span>
            <span>{{ address.postalCode }}</span>
          </p>
        </small>

      </div>

    </div>
  </div>

</div>

</template>

<script>
export default {
  props: ['icon', 'avatar', 'name', 'address']
}
</script>

<style scoped>
.top-panel {
  width: 100%;
  /* padding-left: 25px; */
  background: #495057 !important;
  border-radius: 5px;
  color: #fff;
}
</style>
