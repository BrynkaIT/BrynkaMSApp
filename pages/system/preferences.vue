<template>
  <div class="content-container">
    <SideNav page="system" app="system"></SideNav>
    <div class="content-right">
      <b-card title="Theme" class="overflow-scroll">
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar class="mr-3" icon="people-fill"></b-avatar>
            <span class="mr-auto">J. Circlehead</span>
            <b-form-checkbox :v-model="true" name="check-button" switch>
            </b-form-checkbox>
          </b-list-group-item>

          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar class="mr-3" icon="star-fill"></b-avatar>
            <span class="mr-auto">J. Circlehead</span>
            <b-form-checkbox :v-model="true" name="check-button" switch>
            </b-form-checkbox>
          </b-list-group-item>

          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar class="mr-3" icon="music-note"></b-avatar>
            <span class="mr-auto">J. Circlehead</span>
            <b-form-checkbox :v-model="true" name="check-button" switch>
            </b-form-checkbox>
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card title="Notifications" class="overflow-scroll">
        <b-list-group>
          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar class="mr-3" icon="people-fill"></b-avatar>
            <span class="mr-auto">J. Circlehead</span>
            <b-form-checkbox :v-model="true" name="check-button" switch>
            </b-form-checkbox>
          </b-list-group-item>

          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar class="mr-3" icon="star-fill"></b-avatar>
            <span class="mr-auto">J. Circlehead</span>
            <b-form-checkbox :v-model="true" name="check-button" switch>
            </b-form-checkbox>
          </b-list-group-item>

          <b-list-group-item
            class="d-flex justify-content-between align-items-center"
          >
            <b-avatar class="mr-3" icon="music-note"></b-avatar>
            <span class="mr-auto">J. Circlehead</span>
            <b-form-checkbox :v-model="true" name="check-button" switch>
            </b-form-checkbox>
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card>
        <b-list-group>
          <b-list-group-item
            href="#"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>

            <p class="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>

            <small>Donec id elit non mi porta.</small>
          </b-list-group-item>

          <b-list-group-item href="#" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>

            <p class="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>

            <small class="text-muted">Donec id elit non mi porta.</small>
          </b-list-group-item>

          <b-list-group-item
            href="#"
            disabled
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Disabled List group item</h5>
              <small class="text-muted">3 days ago</small>
            </div>

            <p class="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </p>

            <small class="text-muted">Donec id elit non mi porta.</small>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import SideNav from '@/components/shared/SideNav.vue'
export default {
  //  transition: "tile",
  middleware: ['authenticated'],
  components: {
    SideNav
  },
  data() {
    return {}
  },

  methods: {}
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;1,400;1,500&display=swap');
.card {
  margin: 15px;
}
.card-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
}
.list-group {
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 1rem;
}
</style>
