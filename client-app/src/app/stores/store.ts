import { createContext, useContext } from "react";
import ActivtyStore from "./activityStore";

interface Store {
    activityStore: ActivtyStore ;
}


export const store: Store = {
    activityStore: new ActivtyStore()
}

export const StoreContext = createContext(store) ;


export function useStore(){
    return useContext(StoreContext)
}

