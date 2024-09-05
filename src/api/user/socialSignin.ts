import { AuthProvider } from "@firebase/auth";
import { UserCredential } from "@firebase/auth-types";
import { auth } from "firebaseConfig";

export const SigninGoogle = async (
  provider: AuthProvider,
): Promise<UserCredential | null> => {
  try {
    const result = await auth.signInWithPopup(provider);
    return result; // UserCredential 반환
  } catch (error) {
    console.log("Login failed:", error);
    return null;
  }
};
