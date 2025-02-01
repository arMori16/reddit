import { create } from "zustand"



type State={
    page:number,
    searchPage:number
}

type Action={
    getPage:()=>number,
    setPage:(num:number)=>void
    getSearchPage:()=>number,
    setSearchPage:(num:number)=>void
}

const usePageCounter = create<State & Action>((set:any,get:any)=>({
    page:0,
    searchPage:0,
    setPage:(num:number)=>set({page:num}),
    getPage:()=>get().page,
    setSearchPage:(num:number)=>set({searchPage:num}),
    getSearchPage:()=>get().searchPage
}))
export default usePageCounter;