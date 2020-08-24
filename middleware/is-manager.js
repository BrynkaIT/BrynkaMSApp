export default function ({ store, redirect }) {
  // If user is not Manager
  if (store.state.auth.userType !== "API" && store.state.auth.userType !== "ManagedService") {
    store.dispatch("logOut")
    return redirect(`/notAuthorized`)
  }
}
