// export const state = () => {
//   return {
//     msSubDomain: null
//   };
// };


// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     var regex = /([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/gm
//     let domain = req.headers.host;
//     var subdomain = domain.match(regex);
//     var managedService;
//     if (subdomain != null) {
//       managedService = subdomain.toString().split('.');
//       commit('setmanagedServiceName', managedService[0]);
//     } else {
//       managedService = ['brynka'];
//       commit('setmanagedServiceName', managedService[0]);
//     }
//   },
// };

// export const mutations = {
//   setmanagedServiceName(state, managedService) {
//     debugger
//     // return (state.managedService = managedService)
//     if (state.auth.user)
//     {return (state.auth.user.msSubDomain = managedService)
//     }else{
//       return (state.msSubDomain = managedService);
//     }
//   }
// }
