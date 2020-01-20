<template>
<div class="page-wrap d-flex flex-row align-items-center">
  <b-container>
   <div class="page-wrap d-flex flex-row align-items-center">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center">
                <span class="display-1 d-block">{{status}}</span>
                <div class="mb-4 lead">{{title}}</div>
                <nuxt-link :to="navigateToPage" class="btn btn-primary">{{navigateToText}}</nuxt-link>
            </div>
        </div>
    </div>
</div>

  </b-container>

</div>

</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    status: {
      required: true,
      type: String
    },
    navigateToPage: {
      required: true,
      type: String
    },
    navigateToText: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
  .page-wrap {
    min-height: 100vh;
    background:#222d32 !important;
    color:#fff;
}
</style>
