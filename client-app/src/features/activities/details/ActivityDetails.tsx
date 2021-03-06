import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidbar from './ActivityDetailedSidbar';




export default observer(function ActivityDetails(){

  const {activityStore} = useStore();
  const {selectedActivity: activity , loadingInitial , loadActivity, clearSelectedActivity} = activityStore ;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadActivity(id);
    return () => clearSelectedActivity();
  },[id , loadActivity , clearSelectedActivity])


  if (loadingInitial || !activity) return <LoadingComponent content='loading activites'/>;
    return(
        <Grid>

          <Grid.Column width={10}>
        <ActivityDetailedHeader activity = {activity}/>
        <ActivityDetailedInfo activity= {activity}/>
        <ActivityDetailedChat activityId={activity.id}/>
          </Grid.Column>


          <Grid.Column width={6}>
            <ActivityDetailedSidbar activity={activity}/>
          </Grid.Column>

        </Grid>
    )
})