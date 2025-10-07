import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import {auth} from "@clerk/nextjs/server"
import { preloadQuery } from "convex/nextjs";

import { api } from "../../../../convex/_generated/api";

interface DocumentIdPageProps{
  params:Promise<{documentID: Id<"documents">}>;
}

const DocumentIdPage = async ({params} : DocumentIdPageProps) => {
  const {documentID} = await params;
  const {getToken} = await auth();
  const token = await getToken({template:"convex"}) ?? undefined;
  if(!token){
    throw new Error("Unauthorized");

  }
  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {id:documentID},
    {token}
  );
  if(!preloadedDocument){
    throw new Error("Document not found");
  }

  return <Document preloadedDocument={preloadedDocument}/>;

}

export default DocumentIdPage