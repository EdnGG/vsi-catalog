// export function someAction (/* context */) {
// }
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy, startAfter, limit, } from "firebase/firestore";
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

// export const loadMoreAssemblies = async ({ commit, state }) => {
//   console.log('loadMoreAssemblies was called from actions')
//   const q = query(
//     collection(db, "vsi"),
//     orderBy("name"), // You should have some field to order by
//     startAfter(state.lastVisibleAssemblies),
//     limit(state.limit)
//   );
  
//   try {
//     const querySnapshot = await getDocs(q);
//     const newAssemblies = querySnapshot.docs.map((doc) => doc.data());
//     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
//     commit("setCurrentAssemblies", newAssemblies);
//     commit("setLastVisible", lastVisible);
//   } catch (error) {
//     console.error("Error loading more assemblies from Firestore:", error);
//     throw new Error(error);
//   }
// };

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

export const addAssemblyVsi = async ({ commit }, assembly) => {
  await addDoc(collection(db, "vsi"), assembly);
  commit("addAssemblyVsi", assembly);
};

export const addAssemblyWaterWorks = async ({ commit }, assembly) => {
  await addDoc(collection(db, "waterworks"), assembly);
  commit("addAssemblyWaterWorks", assembly);
};

export const updateAssemblyVsi = async ({ commit }, assembly) => {
  const assemblyRef = doc(db, "vsi", assembly.id);
  await updateDoc(assemblyRef, assembly);
  commit("updateAssemblyVsi", assembly);
};

export const setSearchResults = ({ commit }, results) => {
  commit("setSearchResults", results);
};

export const updateAssemblyVsiSteps = async ({ commit }, payload) => {
  console.log('id actions', payload.id)
  console.log('newSteps actions', payload.newSteps)
  const assemblyRef = doc(db, "vsi", payload.id);
  await updateDoc(assemblyRef, {
    steps: payload.newSteps,
  });
}

export const updateAssemblyMediaSteps = async ({ commit }, payload) => {
  console.log('id actions', payload.id)
  console.log('newSteps actions', payload.newSteps)
  const assemblyRef = doc(db, "vsi", payload.id);
  await updateDoc(assemblyRef, {
    ["media.src"]: payload.newSteps,
  });
}