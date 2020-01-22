// export const state = () => {
//   return {
//     ManagedService: null
//   };
// };


// export const actions = {

//   // Get url after brynka.com
//   nuxtServerInit({ commit }, { req }) {

//       const ms = {}
//       const domain = req.url
//       if (domain != '/') {
//         let array = domain.toString().split('/');
//         ms.name = array[1];
//         ms.mainLogo = "img/" + ms.name + "/mainLogo" +".png"
//         ms.secondaryLogo = "img/" + ms.name + "/secondaryLogo" +".png"
//         commit('setmanagedServiceName', ms);
//       } else {
//         ms.name = 'brynka';
//         ms.mainLogo = "img/brynka/mainLogo.png"
//         ms.secondaryLogo = "img/brynka/secondaryLogo.png"
//         commit('setmanagedServiceName', ms);
//       }

//   },

// };

// export const mutations = {
//   setmanagedServiceName(state, ms) {
//     return (state.ManagedService = ms)
//   }
// }
