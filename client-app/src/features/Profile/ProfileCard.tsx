import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";
import FollowButton from "./FollowButton";


interface Props {
    profile: Profile
}

export default observer( function ProfileCard({profile}: Props){

    function truncate(str: string | undefined){
        if(str){
            return str.length > 40 ? str.substring(0, 37) + '...': str
        }
    }

    return(
        <Card as={Link} to= {`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'}/>
            <CardContent>
                <CardHeader content={profile.displayName}/>
                <CardDescription content={truncate(profile.bio)}/>
            </CardContent>
            <CardContent extra>
            <Icon name='user'/>
            {profile.followersCount} followers
            </CardContent>
            <FollowButton profile={profile}/>
        </Card>
    );
})