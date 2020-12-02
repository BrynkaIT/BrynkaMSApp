<template>
<b-card class="bg-light">
   <form >
    <div class="form-group">
      <label class="d-block mb-0">Email Notifications</label>
      <div class="small text-muted mb-3">
        Receive alert notifications via email
      </div>
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customCheck1"
          checked=""
        />
        <label class="custom-control-label" for="customCheck1"
          >Email each time a an event is registered for a Package</label
        >
      </div>
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="customCheck2"
          checked=""
        />
        <label class="custom-control-label" for="customCheck2"
          >Email Only when package is received and delivered</label
        >
      </div>
    </div>
    <div class="form-group mb-0">
      <label class="d-block">SMS Notifications</label>
      <div class="small text-muted mb-3">
        Receive alert notifications via text messages(carrier charges may apply)
      </div>
      <ul class="list-group list-group-sm">
        <li class="list-group-item has-icon">
          Received
          <div
            class="custom-control custom-control-nolabel custom-switch ml-auto"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch1"
              checked=""
            />
            <label class="custom-control-label" for="customSwitch1"></label>
          </div>
        </li>
        <li class="list-group-item has-icon">
          Delivered
          <div
            class="custom-control custom-control-nolabel custom-switch ml-auto"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch2"
            />
            <label class="custom-control-label" for="customSwitch2"></label>
          </div>
        </li>
        <li class="list-group-item has-icon">
          All Events
          <div
            class="custom-control custom-control-nolabel custom-switch ml-auto"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitch4"
              checked=""
            />
            <label class="custom-control-label" for="customSwitch4"></label>
          </div>
        </li>
      </ul>
    </div>
  </form>
</b-card>

</template>

<script>
export default {}
</script>

<style></style>
