import {parseAsString,useQueryState} from "nuqs";


const UseSearchParam = () => {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({clearOnDefault:true}),
  )
}

export default UseSearchParam
