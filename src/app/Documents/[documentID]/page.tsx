import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import {auth} from "@clerk/nextjs/server"
import { preloadQuery } from "convex/nextjs";

import { api } from "../../../../convex/_generated/api";

interface DocumentIdPageProps{
  params:Promise<{documentId: Id<"documents">}>;
}

const DocumentIdPage = async ({params} : DocumentIdPageProps) => {
  try {
    const {documentId} = await params;
    const {getToken} = await auth();
    const token = await getToken({template:"convex"}) ?? undefined;
    if(!token){
      console.error("Unauthorized: No token found");
      return <div className="text-red-500 p-4">Unauthorized: No token found</div>;
    }
    const preloadedDocument = await preloadQuery(
      api.documents.getById,
      {id:documentId},
      {token}
    );
    if(!preloadedDocument){
      console.error(`Document not found: ${documentId}`);
      return <div className="text-red-500 p-4">Document not found</div>;
    }
    return <Document preloadedDocument={preloadedDocument}/>;
  } catch (error) {
    console.error("Error in DocumentIdPage:", error);
    return <div className="text-red-500 p-4">An unexpected error occurred. Please try again later.</div>;
  }
}

export default DocumentIdPage