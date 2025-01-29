"use server"; // this means all functions exported from this file are server actions.

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() { // create a new Appwrite client with a session

    const client = new Client() // create a new Appwrite client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // set the API endpoint
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!); // set the project ID

    const session = (await cookies()).get("appwrite-session");

    if (!session || !session.value) { // if there is no session, throw an error
        throw new Error("No session");
    }

    client.setSession(session.value); // attach the session to the client

    // use getter functions to return the client and its services
    return { 
        get account() { 
        return new Account(client); 
        },
    };
}

export async function createAdminClient() { // create a new Appwrite client with an admin key
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // set the API endpoint
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)  // set the project ID
        .setKey(process.env.NEXT_APPWRITE_KEY!); // set the admin key for additional permissions
        // Since providing a key this admin client will have access to all the fuctions of the Appwrite API

    // use getter functions to return the client and its services
    return {
        get account() {
        return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get user() {
            return new Users(client);
        },
    };
}
