<template>
  <div>
    <div>
      <div>
        <b-tabs
          small
          active-nav-item-class="text-danger"
          title-item-class="text-danger"
          content-class="mt-3 p-3"
        >
          <b-tab title-link-class="text-secondary" title="Location" active>
            <div>
              <b-card title="Location" sub-title="Panel">
                <location />

              </b-card>
            </div>
          </b-tab>
          <b-tab title-link-class="text-secondary" title="Users" lazy>
            <div>
              <b-card title="Users" sub-title="Panel">
                <users />
              </b-card>
            </div>
            </b-tab
          >
          <b-tab title-link-class="text-secondary" title="etc"
            lazy>
             <div>
              <b-card title="..." sub-title="...">
                <b-card-text>
                  Some quick example text to build on the
                  <em>card title</em> and make up the bulk of the card's
                  content.
                </b-card-text>

                <b-card-text
                  >A second paragraph of text in the card.</b-card-text
                >
              </b-card>
            </div>
            </b-tab
          >
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Location from '@/components/customer/Location.vue'
import Users from '@/components/customer/Users.vue'


export default {
  layout: 'customer',
  components: {
    Location,
    Users,
  },
  data() {
    return {
      customer: null
    }
  },
  created() {
    this.$axios
      .get(`/customer/${this.$route.params.id}`)
      .then(response => {
        this.$store.dispatch(
          'msCustomers/getSelectedCustomer',
          response.data.customer
        )
        this.customer = response.data.customer
      })
      .catch(e => console.log(e))
  }
}
</script>

<style scoped>
/* .customer-nav {
  height: 200px;
  background: #fff;
} */
/* .nav-link {
  color: #565656 !important;
  font-size: 13px;
}
.navbar {
  padding: 0px;
} */
</style>
