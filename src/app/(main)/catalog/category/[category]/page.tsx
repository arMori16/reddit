'use server'

import Catalog from "../../page"

export default async function Category({searchParams,params}:{searchParams:{page:number},params:{category:string}}){
    return (
        <Catalog searchParams={searchParams} category={`${params.category}`}/>
    )
}