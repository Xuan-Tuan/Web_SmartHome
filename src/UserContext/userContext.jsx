import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("NULL");

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) {
        console.log("No user ID found in localStorage");
        return;
      }

      try {
        const docRef = doc(db, "user", `${uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ name }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
