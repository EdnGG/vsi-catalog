// export function someAction (/* context */) {
// }
// import axios from 'axios'
import  catalogApi from '../../../api/catalogApi'

export const loadAssemblies =  ({ commit }) => {
    const assemblies = catalogApi
    // console.table(assemblies)
    commit('setAssemblies', assemblies)
}

//  no se tiene que usar
// export const searchAssembly = ({ state }, query) => {
//     // Filtra los ensamblajes locales almacenados en el estado
//     const searchResults = state.assemblies.filter((assembly) =>
//       assembly.name.toLowerCase().includes(query.toLowerCase())
//     );
//     // Retorna los resultados de la búsqueda
//     return searchResults;
//   };

  export const setSearchResults = ({ commit }, results) => {
    commit("setSearchResults", results);
  }
