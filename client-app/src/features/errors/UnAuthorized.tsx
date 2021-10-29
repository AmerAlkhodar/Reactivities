import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";



export default function unAuthorized(){

    return(

        <Segment placeholder>

        <Header icon>
            <Icon name = 'warning'/>
            Oops - Access denied 
        </Header>

        <Segment.Inline>
            <Button as = {Link} to='/' primary>
                Return to Homepage
            </Button>
        </Segment.Inline>

            
        </Segment>
    )


}