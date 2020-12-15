<template>
<div>
   <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <div class="top-panel mt-2 mb-4 ">
              <div class="row p-3">
                <b-skeleton type="avatar" class="mr-2"></b-skeleton>

                <div style="width:25%">
                  <b-skeleton animation="wave" width="85%"></b-skeleton>
                  <b-skeleton animation="wave" width="55%"></b-skeleton>
                  <b-skeleton animation="wave" width="35%"></b-skeleton>
                </div>
              </div>
            </div>
          </template>
      <b-icon icon="arrow-left-square" scale="1.5" variant="info" @click="() =>{this.$router.back()}"></b-icon>
      <div class="top-panel mt-2 mb-4 ">
        <div class="row">
          <div class="col">
            <div class="ml-1 pb-1" style="display:flex;flex-wrap: wrap;">
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
                <span v-if="address.city">{{ address.city }},&nbsp;</span>
                <span v-if="address.state">{{ address.state }},&nbsp;</span>
                <span v-if="address.postalCode">{{ address.postalCode }}</span>
              </p>
            </small>
          </div>

        </div>
          </div>
          <div class="col py-3 px-5 text-right" v-if="isInactive">
            <h6><b-badge variant="danger" pill>Inactive</b-badge></h6>
          </div>
        </div>

      </div>
    </b-skeleton-wrapper>
</div>

</template>

<script>
export default {
  props: ['icon', 'avatar', 'name', 'address', 'isInactive'],
  computed:{
    loading(){
      if(this.name){
        return false
      }else{
        return true
      }
    }

}

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
