// export const someAction  = (/* context */) => {
// }

// import { collection, addDoc, getDocs,  } from "firebase/firestore";
import { db, auth } from "src/boot/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const login = async ({ commit }, {email, password}) => {
  try {
    console.log('Payload Object: ', email , password)
    const user = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    commit("setUser", user);
    return user;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
export const register = async ({ commit }, { name, email, password}) => {
    try {
      console.log('Payload Object: ', name , email , password)
      // Registra al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      console.log('userCredential: ', userCredential)
      
      const user = userCredential.user;

      console.log('user: ', user)
  
      // Opcional: Guarda datos adicionales del usuario en Firestore
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: payload.name,
    //   });
  
      commit("setUser", user);
      return user;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  export const logout = async ({commit}) => {
    
  }
  
