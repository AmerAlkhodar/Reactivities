import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";

export default class ActivtyStore {
       
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loadingInitial = true;
    loading = false;
    

        constructor (){
            makeAutoObservable(this)
        }


        get ActivitiesByDate(){
            return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        }

        get groupedActivities(){
            return Object.entries(
                this.ActivitiesByDate.reduce((activities , activity) => {
                    const date = activity.date ; 
                    activities[date] = activities[date] ? [...activities[date] , activity] : [activity];
                    return activities ;
                } ,{} as {[key: string] : Activity[]})
            )
        }

         loadActivities = async () => {
        
            try{
                const activities = await agent.Activities.list();
                activities.forEach(activity => {
                   this.setActivity(activity);
                })
                this.setLoadingInitial(false)

            }catch(error){
                console.log(error)
                this.setLoadingInitial(false)
            }
           

        }

        loadActivity = async (id: string) => {
                let activity = this.getActivity(id) ;
                if (activity) {
                    this.selectedActivity = activity ;
                    return activity ;
                } else {
                    this.setLoadingInitial(true);
                    try {
                        activity = await agent.Activities.details(id);
                        this.setActivity(activity);
                        runInAction(() => {
                            this.selectedActivity = activity ;
                        })
                        this.setLoadingInitial(false);
                        return activity
                    } catch (error) {
                        this.setLoadingInitial(false);
                        console.log(error);
                    }
                }

        }

        private getActivity = (id: string) => {
           return this.activityRegistry.get(id) ;
        }


        private setActivity = (activity: Activity) => {
            activity.date = activity.date.split('T')[0];
            this.activityRegistry.set(activity.id , activity);
        }



        setLoadingInitial = (status: boolean) => {
                this.loadingInitial = status;
        }




        createActivity = async (activity: Activity) => {
            this.loading = true ; 
            try {
                await agent.Activities.create(activity);
               runInAction(() => {
                this.activityRegistry.set(activity.id , activity);
                this.selectedActivity = activity;
                this.loading = false ; 
                this.editMode = false ;
               })
             

            } catch (error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false ; 
                })
            }
        }



        updateActivity = async (activity: Activity) => {
            this.loading = true;
            try {
                agent.Activities.update(activity);
                runInAction(() => {
                    this.activityRegistry.set(activity.id , activity);
                    this.selectedActivity = activity;
                    this.loading = false;
                    this.editMode = false;
                })
            } catch (error) {
                console.log(error);
            }

        }

        deleteActivity = async (id: string) => {
            this.loading = true ;
            try {
               await agent.Activities.delete(id);
               runInAction(() => {
                   this.activityRegistry.delete(id);
                   this.loading = false ; 
               })

            } catch (error) {
                console.log(error)
                runInAction(() => {
                    this.loading = false;
                })
            }
        }



}