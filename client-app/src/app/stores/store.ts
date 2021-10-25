import { createContext, useContext } from "react";
import ActivtyStore from "./activityStore";
import commonStore from "./commonStore";
import ModalStore from "./modalStore";
import userStore from "./userStore";

interface Store {
    activityStore: ActivtyStore ;
    commonStore: commonStore ;
    userStore: userStore ;
    modalStroe: ModalStore;
}


export const store: Store = {
    activityStore: new ActivtyStore(),
    commonStore: new commonStore(),
    userStore: new userStore(),
    modalStroe: new ModalStore()
}

export const StoreContext = createContext(store) ;


export function useStore(){
    return useContext(StoreContext)
}

