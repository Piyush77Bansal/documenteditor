"use server"

import {auth,clerkClient} from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";


interface SessionClaimsOrg {
  id: string;
  rol?: string;
  slg?: string;
}

interface SessionClaims {
  o?: SessionClaimsOrg;
  org_id?: string;

}

const convex= new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
export async function getDocuments(ids:Id<"documents">[]){
    return await convex.query(api.documents.getByIds,{ids});
}

export async function getUsers(){
    const {sessionClaims} = await auth();
    const Session = sessionClaims as SessionClaims;
    const clerk = await clerkClient();

    
    const response = await clerk.users.getUserList({
         organizationId : Session?.o?.id ? [Session?.o?.id as string] : [sessionClaims?.org_id as string],
    });
    const users = response.data.map((user) =>({
        id:user.id,
        name:user.fullName ?? user.primaryEmailAddress?.emailAddress?? "Anonymous",
        avatar: user.imageUrl,
        color: "",
    }));
    return users;
}