

export default ({ store }, inject) => {
    inject('brynkaToast', (payload, variant)=> {
        let options = {
            title: 'Brynka Notification',
            toaster: 'b-toaster-top-center',
            variant: variant,
            autoHideDelay: 5000,
        }

        if(payload.response) {
            const error = payload.response.data.error

              if (error.multiple) {
                error.errors.forEach(e => {
                    store._vm._bv__toast.toast(e.description, options)
                } )
              } else {
                store._vm._bv__toast.toast(error.description, options)
              }
          }else if(payload.data){
            const err = payload.data.error

            if (err.multiple) {
             err.errors.forEach(e => {
                store._vm._bv__toast.toast(e.description, options)
              })
            } else {
                store._vm._bv__toast.toast(err.description, options)
            }
            } else {
                store._vm._bv__toast.toast(payload, options)
            }

    });


  }
