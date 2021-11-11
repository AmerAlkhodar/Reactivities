import { createContext, useContext } from "react";
import ActivtyStore from "./activityStore";
import commentStore from "./commentStore";
import commonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./ProfileStore";
import userStore from "./userStore";

interface Store {
    activityStore: ActivtyStore ;
    commonStore: commonStore ;
    userStore: userStore ;
    modalStroe: ModalStore;
    profileStore: ProfileStore;
    commentStore: commentStore;
}


export const store: Store = {
    activityStore: new ActivtyStore(),
    commonStore: new commonStore(),
    userStore: new userStore(),
    modalStroe: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new commentStore()
}

export const StoreContext = createContext(store) ;


export function useStore(){
    return useContext(StoreContext)
}

