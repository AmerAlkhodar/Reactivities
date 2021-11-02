import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import UploadImageWidget from "../../app/common/imageUpload/UploadImageWidget";
import { Photo, Profile } from "../../app/models/Profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}
export default observer(function ProfilePhotos({ profile }: Props) {
    const { profileStore: { isCurrentUser , uploadPhoto , uploading , setMainPhoto , loading , deletePhoto} } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target , setTarget] = useState('');

    function handlePhotoUpload(file:Blob){
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo : Photo , e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo : Photo , e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name)
        deletePhoto(photo.id);
    }


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width='16'>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right' content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>

                <Grid.Column width='16'>
                    {addPhotoMode ? (<UploadImageWidget uploading = {uploading} uploadPhoto= {handlePhotoUpload} />) :

                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url || '/assets/user.png'} />
                                    {isCurrentUser && (
                                        <Button.Group widths={2}>
                                            <Button 
                                            basic
                                            color= 'green'
                                            loading= {target === 'main' +photo.id && loading}
                                            name= {'main' +photo.id}
                                            content = 'Main'
                                            disabled={photo.isMain}
                                            onClick={e => handleSetMainPhoto(photo , e)}
                                            />
                                            <Button 
                                            basic
                                            color='red'
                                            icon='trash'
                                            disabled={photo.isMain}
                                            loading= {target === photo.id && loading}
                                            onClick={e => handleDeletePhoto(photo , e)}
                                            name = {photo.id}

                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                            ))}

                        </Card.Group>
                    }
                </Grid.Column>
            </Grid>


        </Tab.Pane>
    );

})