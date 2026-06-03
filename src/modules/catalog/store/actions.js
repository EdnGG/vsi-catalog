// export function someAction (/* context */) {
// }
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { db } from "../../../boot/firebase";

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
    // console.log('loadAssembliesVsi-action: ', assemblies)
    commit("setAssembliesVsi", assemblies);
    return assemblies;
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
    return assemblies;
  } catch (error) {
    console.error("Error loading assemblies from Firestore:", error);
    throw new Error(error);
  }
};

export const addAssemblyVsi = async ({ commit }, assembly) => {
  await addDoc(collection(db, "vsi"), assembly);
  console.log("Adding Azotea Plate:", assembly);
  commit("addAssemblyVsi", assembly);
};

export const addAssemblyWaterWorks = async ({ commit }, assembly) => {
  await addDoc(collection(db, "waterworks"), assembly);
  console.log("Adding T&T Plate:", assembly);
  commit("addAssemblyWaterWorks", assembly);
};

export const updateAssemblyVsi = async ({ commit }, assembly) => {
  try {
    const assemblyRef = doc(db, "vsi", assembly.id);
    await updateDoc(assemblyRef, assembly);
    commit("updateAssemblyVsi", assembly);
  } catch (error) {
    console.log("Error updating assembly", error.message);
  }
};

export const updateAssemblyWworks = async ({ commit }, assembly) => {
  try {
    const assemblyRef = doc(db, "waterworks", assembly.id);
    await updateDoc(assemblyRef, assembly);
    commit("updateAssemblyWworks", assembly);
  } catch (error) {
    console.log("Error updating assembly", error.message);
  }
};

export const setSearchResults = ({ commit }, results) => {
  commit("setSearchResults", results);
};

export const updateAssemblyVsiSteps = async ({ commit }, payload) => {
  // console.log('id actions', payload.id)
  // console.log('newSteps actions', payload.newSteps)
  const assemblyRef = doc(db, "vsi", payload.id);
  await updateDoc(assemblyRef, {
    steps: payload.newSteps,
  });
};

export const updateAssemblyMediaSteps = async ({ commit }, payload) => {

  try {
    const assemblyRef = doc(db, "vsi", payload.id);
    await updateDoc(assemblyRef, {
      media: payload.newSteps,
    });
    commit("updateAssemblyMediaSteps", payload);
  } catch (error) {
    console.log("Error updating media steps", error.message);
  }
};

export const updateAssemblyMediaStepsWworks = async ({ commit }, payload) => {

  try {
    const assemblyRef = doc(db, "waterworks", payload.id);
    await updateDoc(assemblyRef, {
      media: payload.newSteps,
    });
    commit("updateAssemblyMediaStepsWworks", payload);
  } catch (error) {
    console.log("Error updating media steps", error.message);
  }
};
