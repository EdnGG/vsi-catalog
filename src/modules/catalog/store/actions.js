// export function someAction (/* context */) {
// }
// import axios from 'axios'
import  catalogApi from '../../../api/catalogApi'

export const loadAssemblies =  ({ commit }) => {
    const assemblies = catalogApi
    commit('setAssemblies', assemblies)
}

  export const setSearchResults = ({ commit }, results) => {
    commit("setSearchResults", results);
  }
