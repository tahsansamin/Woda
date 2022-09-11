import { createContext,useEffect,useState } from "react";

export const LocationContext = createContext()

export const LocationProvider = ({children}) => {
    const [longitude,setLongitude] = useState(JSON.parse(localStorage.getItem('longitude')||0))
    const [latitude,setLatitude] = useState(JSON.parse(localStorage.getItem('latitude')||0))
    const destinations = []
    

    
    const [balance,setBalance] = useState(JSON.parse(localStorage.getItem('balance') || 0))
    const [ridelist,setride] = useState([])
    const [modal,setmodal] = useState(false)
    const [curstart,setStart] = useState('')
    const [curend,setEnd] = useState('')
    const [curprice,setPrice] = useState(0)
    const [curid,setid] = useState(0)
    
    return(
        <LocationContext.Provider value={{destinations,curid,setid,curprice,setPrice,curstart,setStart,curend,setEnd,modal,setmodal,ridelist,setride,balance,setBalance,longitude,setLongitude,latitude,setLatitude}}>
            {children}
        </LocationContext.Provider>
    )

}
//@ Copyright 2022, Tahsan Samin, All rights reserved