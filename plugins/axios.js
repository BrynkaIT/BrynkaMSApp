export default function ({ $axios, store, redirect }) {
    $axios.onRequest( (res) => {
      if(store.state.auth.resetToken){
        if(!res.headers.cookie){
          res.headers.common['Authorization'] = `Bearer ${store.state.auth.resetToken}`
        }
      }
      if (store.state.auth.auth) {
        if(!res.headers.cookie){
          res.headers.common['Authorization'] = `Bearer ${store.state.auth.auth.token}`
        }
      }
    })
    $axios.onError(error => {
      // if(error.response.status == 401 ){
      //   store.dispatch('auth/logOut');
      //   return redirect('/notAuthorized')
      // }
    })
  }
