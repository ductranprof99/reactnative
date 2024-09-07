import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_REGISTER_AUTH, FIRESTORE_DB } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// export function signIn(name: string, password: string): Promise<Response> {
// }

export interface RegisterData {
    name: string;
    birthday: string;
    gender: string;
    phone: string;
    address: string;
    email: string;
    password: string;
}

export const signUp = async (registerData: RegisterData, onSuccess: () => void, onFail: () => void) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_REGISTER_AUTH, registerData.email, registerData.password);
        const user = userCredential.user;

        // Prepare user data for Firestore
        const userData = {
            name: registerData.name,
            birthday: registerData.birthday,
            gender: registerData.gender,
            phone: registerData.phone,
            address: registerData.address,
            email: registerData.email
        };
        await setDoc(doc(FIRESTORE_DB, 'accounts', user.uid), userData);
        await FIREBASE_REGISTER_AUTH.signOut()
        await FIREBASE_AUTH.signOut()
        onSuccess()
    } catch (error) {
        console.error('Registration error:', error);
        onFail()
    }
}

export interface UserInfo {
    name: string;
    birthday: string;
    gender: string;
    phone: string;
    address: string;
    email: string;
    password: string;
}

export const signIn = async (mail: string, password: string, onSuccess: () => void, onFail: () => void) => {
    try {
        const response = await signInWithEmailAndPassword(FIREBASE_AUTH, mail, password)
        if (response.user) {
            onSuccess()
        } else {
            onFail()
        }
    } catch (error: any) {
        onFail()
    }
}

export const getUserInfo = async (email: string): Promise<UserInfo> => {
    const db = FIRESTORE_DB;
    const ref = collection(db, "accounts");
    const q = query(ref, where("email", "==", email));
    const snapshot = await getDocs(q);
    var result: UserInfo[] = []
   
    snapshot.forEach((doc) => {
        const data = doc.data();
        result.push({
            name: data.name,
            birthday: data.birthday,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            email: data.email,
            password: ""
        })
    });
    return result[0];
}

export const updateUserInfo = async (userInfo: UserInfo): Promise<boolean> => {
    try {
        const db = FIRESTORE_DB;
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (userId === undefined) {
            return false;
        }
        const updateRef = doc(db, 'accounts', userId)
        await updateDoc(updateRef, { ...userInfo });
        return true;
    } catch (error) {
        console.error("Error updating user information:", error);
        return false;
    }

}

export const checkUserUpdateUserInfoValid = (userInfo: UserInfo): boolean => {
    if (userInfo.name.length === 0) {
        return false;
    }
    if (userInfo.birthday.length === 0) {
        return false;
    }
    if (userInfo.phone.length === 0) {
        return false;
    }
    if (userInfo.address.length === 0) {
        return false;
    }
    if (userInfo.password.length !== 0 && userInfo.password.length < 8) {
        return false;
    }
    return true;
}

export const checkUserRegisterUserInfoValid = (userInfo: UserInfo): boolean => {
    if (userInfo.name.length === 0) {
        return false;
    }
    if (userInfo.birthday.length === 0) {
        return false;
    }
    if (userInfo.phone.length === 0) {
        return false;
    }
    if (userInfo.address.length === 0) {
        return false;
    }
    if (userInfo.password.length < 8) {
        return false;
    }
    if (userInfo.gender.length < 8) {
        return false;
    }
    return true;
}