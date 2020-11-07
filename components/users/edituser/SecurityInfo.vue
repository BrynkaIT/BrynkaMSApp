<template>
  <b-card>
    <form @submit="updateCredentials">
      <div class="form-group">
        <label class="d-block">Change Password</label>
        <input
          ttype="password"
          v-model="creds.oldPassword"
          class="form-control"
          placeholder="Enter your old password"
        />
        <input
          type="password"
          :class="{ 'form-error': $v.creds.password.$error }"
          @blur="$v.creds.password.$touch()"
          v-model.trim="creds.password"
          class="form-control mt-1"
          placeholder="New password"
        />
        <div v-if="$v.creds.password.$error" class="">
          <span v-if="!$v.creds.password.required" class="error-text"
            >Password is required</span
          >
          <span v-if="!$v.creds.password.minLength" class="error-text"
            >Password must have at least{{
              $v.creds.password.$params.minLength.min
            }}letters.</span
          >
        </div>
        <input
          type="password"
          v-model.trim="creds.confirmPassword"
          :class="{ 'form-error': $v.creds.confirmPassword.$error }"
          @blur="$v.creds.confirmPassword.$touch()"
          class="form-control mt-1"
          placeholder="Confirm new password"
        />
        <div v-if="!$v.creds.confirmPassword.sameAsPassword">
          <span class="error-text">Passwords must be identical.</span>
        </div>
      </div>
      <button class="btn btn-sm btn-primary float-right" type="submit">
        Update
      </button>
    </form>
  </b-card>
</template>

<script>
export default {}
</script>

<style></style>
