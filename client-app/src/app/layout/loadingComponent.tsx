import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';


interface Props {
    inverted?: boolean;
    content?: string;

}

export default function LoadingComponent({ inverted = false, content = 'Loading...' }: Props) {

    return (
        <Dimmer active={true} inverted={inverted} style={{width: '100%' , hight: '100%'}}>
            <Loader content={content} />
        </Dimmer>
    )
}