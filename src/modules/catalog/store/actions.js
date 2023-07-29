// export function someAction (/* context */) {
// }
// import axios from 'axios'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../boot/firebase";

// import catalogApi from "../../../api/catalogApi";

// export const loadAssemblies = ({ commit }) => {
//   const assemblies = catalogApi;
//   commit("setAssemblies", assemblies);
// };

export const addAssemblyVsi = async ({ commit }, assembly) => {
  await addDoc(collection(db, "vsi"), assembly);
  commit("addAssemblyVsi", assembly);
};

export const addAssemblyWaterWorks = async ({ commit }, assembly) => {
  await db.collection("waterworks").add(assembly);
  commit("addAssemblyWaterWorks", assembly);
};

export const loadAssembliesVsi = async ({ commit }) => {
  try {
    const querySnapshot = await getDocs(collection(db, "vsi"));
    const assemblies = [];
    querySnapshot.forEach((doc) => {
      const assembly = {
        id: doc.id,
        ...doc.data(),
      };

      assemblies.push(assembly);
    });
    commit("setAssembliesVsi", assemblies);
  } catch (error) {
    console.error("Error loading assemblies from Firestore:", error);
    throw new Error(error);
  }
};

export const loadAssembliesWworks = async ({ commit }) => {
  try {
    const querySnapshot = await getDocs(collection(db, "waterworks"));
    const assemblies = [];
    querySnapshot.forEach((doc) => {
      const assembly = {
        id: doc.id,
        ...doc.data(),
      };

      assemblies.push(assembly);
    });
    commit("setAssembliesWworks", assemblies);
  } catch (error) {
    console.error("Error loading assemblies from Firestore:", error);
    throw new Error(error);
  }
};

export const setSearchResults = ({ commit }, results) => {
  commit("setSearchResults", results);
};
