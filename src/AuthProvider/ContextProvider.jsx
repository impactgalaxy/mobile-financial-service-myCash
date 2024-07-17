import { createContext } from "react";
import auth from "../../firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext(null);

export default function ContextProvider({ children }) {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginPage = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const context = {
    createUser,
    loginPage,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
