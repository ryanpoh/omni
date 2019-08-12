import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const meetingImageStyle = {
    filter: 'brightness(30%)'
};

const meetingImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const MeetingDetailedHeader = ({meeting}) => {
    return (
           <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${meeting.category}.jpg`} fluid style={meetingImageStyle} />
        
                <Segment basic style= {meetingImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size="huge"
                          content={meeting.title}
                          style={{ color: 'white' }}
                        />
                        <p>{meeting.date}</p>
                        <p>
                          Chaired by <strong>{meeting.chairedBy}</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>
        
                <Button as={Link} to={`/manage/${meeting.id}`} color="orange" floated="right">
                  Manage Meeting
                </Button>
              </Segment>
            </Segment.Group>
    )
}

export default MeetingDetailedHeader
