import { createContext, useContext } from "react";
import ActivtyStore from "./activityStore";
import commonStore from "./commonStore";

interface Store {
    activityStore: ActivtyStore ;
    commonStore: commonStore ;
}


export const store: Store = {
    activityStore: new ActivtyStore(),
    commonStore: new commonStore()
}

export const StoreContext = createContext(store) ;


export function useStore(){
    return useContext(StoreContext)
}

