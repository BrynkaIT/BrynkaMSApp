<template>
  <div>
    <ErrorView
      :title="'Ooooops, you are not authorized to visit this page.'"
      :status="'401'"
      :navigateToPage="'/logout'"
      :navigateToText="'Navigate to Home Page'"
    />
  </div>
</template>

<script>
import ErrorView from '@/components/shared/ErrorView'
export default {
  components: {
    ErrorView
  }
}
</script>

<style ></style>
