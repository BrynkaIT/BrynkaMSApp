<template>
  <div class="page-wrap d-flex flex-row align-items-center">
    <b-container>
    <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                  <!-- <img src="../assets/images/brynkaManagerLogo-lg.png" class="w-100"/> -->
                    <span class="display-1 d-block text-warning wrong">Wrong page</span>
                    <div class="mb-4">Please enter your specific login page</div>
                </div>
            </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  layout:'login',
  middleware({ redirect, params }) {
    if(params.index){
     return redirect(`/${params.index}/login`)
    }
  },
  async validate({ params , store }) {

    const { message } =  await store.dispatch('validateCustomer', params.index)
    if(message === 'Valid'){
      return true
    }else{
      return false
    }
  },
}
</script>

<style scoped>

.page-wrap {
    min-height: 100vh;
    background:#222d32 !important;
    color:#fff;
}
@media(max-width: 992px){
  .wrong{
  font-size:32px;
  }
}
@media(max-width: 768px){
  .wrong{
  font-size:20px;
}
}

</style>
