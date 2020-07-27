export default function ({ $axios, store, redirect }) {
    $axios.onRequest( (res) => {
      if (store.state.auth) {
        if(!res.headers.cookie){
          res.headers.common['Authorization'] = `Bearer ${store.state.auth.token}`
        }
      }
    })
    $axios.onError(error => {
      if(error.response.status == 401 ){
        store.dispatch('logOut');
        return redirect('/notAuthorized')
      }
    })
  }