import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import qs from "querystring"

export default function usePagination (){
    const location = useLocation();
    const history = useHistory();

    const [actualPage, setActualPage] = useState(
        getActualPage() || 1   
    );

    function getActualPage(){
        const queryParams = qs.parse(location.search)
        const page = queryParams.page

        return page ? Number(page) : undefined

    }

    useEffect(()=>{
    history.push({
        search: qs.stringify({
            page: actualPage
        })
    })
    },[actualPage])




    return{
        setActualPage,
        actualPage
    }
}