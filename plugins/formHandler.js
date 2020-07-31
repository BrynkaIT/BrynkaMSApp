
export default ({ app }, inject) => {
  inject('openForm', (form)=> { // form = type Object,
    
      return {
        title : form.title,
        to : form.to,
        from :form.from,
        data: form.data,
        showModal : true,
        isInternalContact : form.isInternalContact
      }

    });


}