export default function ({ store, redirect }) {
  // If user is not Manager
  if (store.state.auth.auth.userType !== "API" && store.state.auth.auth.userType !== "ManagedService") {
    store.dispatch("auth/logOut")
    return redirect(`/notAuthorized`)
  }
}
