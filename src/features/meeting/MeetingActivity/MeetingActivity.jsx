import React, {Fragment} from 'react'
import { Header, Segment } from 'semantic-ui-react';

//Fragment is needed because we can only pass in 1 element. so we need to wrap up our adjacent elements
const MeetingActivity = () => {
    return (
        <Fragment>
            <Header attached='top' content='Recent Activity' />
            <Segment attached>
                <p>Recent activity</p>
            </Segment>
        </Fragment>

    )
}

export default MeetingActivity
