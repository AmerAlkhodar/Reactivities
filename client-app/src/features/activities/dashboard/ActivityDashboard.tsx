import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";


export interface Props {

    activities: Activity[];
    selectedActivity : Activity | undefined ;
    selectActivity : (id : string) => void ;
    cancelSelectActivity : () => void ;
    editMode : boolean ;
    openForm : (id: string) => void ;
    closeForm : () => void ;
    createOrEdit : (activity: Activity) => void ; 
    DeleteActivity : (id: string) => void ; 
}


export default function ActivityDashboard({activities , selectedActivity , selectActivity , cancelSelectActivity , editMode , openForm , closeForm, createOrEdit, DeleteActivity}: Props){


    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} selectActivity={selectActivity} DeleteActivity= {DeleteActivity}/>
            </Grid.Column>

            <GridColumn width='6'>
                {selectedActivity && !editMode &&
                
                <ActivityDetails 
                activity={selectedActivity} 
                cancelSelectActivity={cancelSelectActivity} 
                openForm = {openForm}

                /> }
                {editMode && 
                <ActivityForm closeForm = {closeForm} activity = {selectedActivity} createOrEdit = {createOrEdit}/>}
            </GridColumn>

        </Grid>
    )
}