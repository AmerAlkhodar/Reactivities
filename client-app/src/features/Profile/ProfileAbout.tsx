import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import { useStore } from "../../app/stores/store";
import MyTextArea from "../../app/common/form/MyTextArea";



export default observer(function ProfileAbout() {
    const [editMode, setEditMode] = useState(false);
    const { profileStore: { updateProfile, profile, isCurrentUser } } = useStore()



    const ValidationSchema = Yup.object({
        displayName: Yup.string().required('displayName is required')
    })



    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width='16'>
                    <Header as='h3' icon='info' content={`About ${profile?.displayName}`} floated='left' />
                    {isCurrentUser && (
                        <Button
                            content={editMode ? 'Cancel' : 'Edit Profile'}
                            floated='right'
                            basic
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                {!editMode && (

                    <Grid.Column width='16'>
                        <span style={{ whiteSpace: 'pre-wrap' }} >{profile?.bio}</span>
                    </Grid.Column>
                )}
            </Grid>



            {editMode &&
                (
                    <Formik
                        validationSchema={ValidationSchema}
                        enableReinitialize
                        initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
                        onSubmit={values => updateProfile(values).then(() => { setEditMode(false) })}

                    >
                        {({ handleSubmit, dirty, isSubmitting, isValid }) => (
                            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                <MyTextInput name='displayName' placeholder='Display Name' />
                                <MyTextArea rows={3} name='bio' placeholder='Add your bio' />
                                <Button
                                    positive
                                    content='Edit'
                                    type='submit'
                                    loading={isSubmitting}
                                    disabled={isSubmitting || !dirty || !isValid}
                                />

                            </Form>
                        )}

                    </Formik>
                )
            }



        </Tab.Pane>





    )

})