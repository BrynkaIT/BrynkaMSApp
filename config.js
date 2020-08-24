if(process.env.NODE_ENV === 'production'){
  module.exports = {
    baseURL:process.env.API_DOMAIN_PROD,
    devUsername: '',
    devPassword: ''
  }
}else{
  module.exports = {
    baseURL: process.env.API_DOMAIN_DEV,
    devUsername: process.env.BRYNKA_USER_USERNAME,
    devPassword: process.env.BRYNKA_USER_PASSWORD
  };
}
