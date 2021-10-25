import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/User";
import { store } from "./store";

export default class userStore {
  

    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !! this.user ;
    }

    login = async (creds: UserFormValues) => {

       try
       {
        const user = await agent.Account.login(creds) ;
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user );
        store.modalStroe.closeModal();
        history.push('/activities')
       }catch(error){

        throw error;
       }
    }


    logout = () => {
        store.commonStore.setToken(null);
        this.user = null ;
        history.push('/');
    }


    getUser = async () => {
      try
      {
        const user = await agent.Account.current();
        runInAction(() => {
            this.user = user ;
        })

      }catch(error){
            console.log(error);
      }
    }

    register = async (creds: UserFormValues) => {
        try 
        {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {this.user = user});
            store.modalStroe.closeModal();
            history.push('/activities');

        }catch(error)
        {
            throw error;
        }

    }


}