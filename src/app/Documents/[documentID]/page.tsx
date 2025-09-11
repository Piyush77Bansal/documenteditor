import React from 'react'
import Editor from './editor'
import { Toolbar } from './toolbar';
interface DocumentIDPageProps {
    params: Promise<{ documentID: string }>
}
const DocumentIDPage = async({params}:DocumentIDPageProps) => {
    const documentID = await params;
  return (
    <div className='mih-h-screen bg-[#FAFBFD]'>
        <Toolbar/>
        <Editor/>
    </div>
  )
}

export default DocumentIDPage