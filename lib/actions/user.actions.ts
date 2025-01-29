'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient(); // create a new Appwrite client with an admin key

        const respone = await account.createEmailPasswordSession(email, password); // create a new session

        return parseStringify(respone); // return the session
    } catch (error) {
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;

    try {
        const { account } = await createAdminClient(); // create a new Appwrite client with an admin key

        const newUserAccount = await account.create( 
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        ); // create a new user account

        const session = await account.createEmailPasswordSession(email, password); // create a new session
      
        (await cookies()).set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        }); // set the session cookie

        return parseStringify(newUserAccount); // return the new user

    } catch (error) {
        console.error('Error', error);
    }
}


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get(); 
      return parseStringify(user); // return the user
    } catch (error) {
      return null;
    }
}
  
export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        (await cookies()).delete("appwrite-session"); // delete the session cookie
        
        await account.deleteSession("current"); // delete the current session
    } catch (error) {
        return null;
    }
}