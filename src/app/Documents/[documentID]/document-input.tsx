import React, { useRef, useState } from 'react'
import {BsCloudCheck, BsCloudSlash} from "react-icons/bs"
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from 'sonner';
import { useStatus } from '@liveblocks/react';
import { LoaderIcon } from 'lucide-react';


interface DocumentInputProps{
  title:string;
  id : Id<"documents">;
};


const DocumentInput = ({title,id} : DocumentInputProps) => {

  const status = useStatus();

  const [value, setValue] = useState(title);
  const [isPending,setisPending]  = useState(false);
  const [isEditing,setisEditing]  = useState(false);

  const inputRef = useRef <HTMLInputElement>(null);
  const mutate= useMutation(api.documents.updateById);


  const debouncedUpdate = useDebounce((newValue : string)=>{
    if(newValue === title)return ;
    setisPending(true);
    mutate({id,title:newValue})
      .then(()=>toast.success("Document Updated")).
      catch(()=> toast.error("Something Went Wrong3"))
      .finally(()=> setisPending(false));
  })
  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    setisPending(true);
    mutate({id,title:value})
      .then(()=>{
        toast.success("Document Updated");
        setisEditing(false);
      }).
      catch(()=> toast.error("Something Went Wrong4"))
      .finally(()=> setisPending(false));
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newValue= e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  }



  const showLoader= isPending || status==="connecting"  || status==="reconnecting";
  const showError= status === "disconnected";
  return (
    <div className='flex items-center gap-2'>
      {isEditing ? (
        <form onSubmit={handleSubmit} className='relative w-fit max-w-[50ch]'>
          <span className='invisible whitespace-pre px-1.5 text-lg'>
            {value || " "}
          </span>
          <Input ref={inputRef} value={value} 
          onBlur={()=> setisEditing(false)} onChange={onChange} className='absolute inset-0 px-1.5 text-black text-lg bg-transparent truncate '/>
        </form>
      ):(
        <span className='text-lg px-1.5 cursor-pointer truncate' onClick={()=>{
          setisEditing(true);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }}>
            {title}
        </span>
      )}
      {showError && <BsCloudSlash className='size-4'/>}
      {!showError && !showLoader && <BsCloudCheck/>}
      {showLoader && <LoaderIcon className="size-4 animate-spin text-muted-foreground"/>}
        
    </div>
  )
}

export default DocumentInput
