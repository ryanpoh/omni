import React, { Component } from 'react';
import { Segment, Item, Icon, Label, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; //curly braces are functions. non-curly are classes. data fns doesnt recognize ISO date format
import { connect } from 'react-redux';


class JobListItem extends Component {
  render() {
    const { job } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={job.chairPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/client/${job.client}`} >{job.title}</Item.Header>
                <Item.Description>
                  Person In-Charge: <Link as={Link} to={`/profile/${job.chairUid}`}>{job.chairedBy}</Link> 
                </Item.Description>
                {job.cancelled && (
                  <Label
                    style={{ top: '-40px' }}
                    ribbon='right'
                    color='red'
                    content='This job has been cancelled'
                  />
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='clock' />
            {format(job.date.toDate(), 'EEEE do LLL')} at{' '}
            {format(job.date.toDate(), 'h:mm a')} |
          </span>
        </Segment>
        <Segment secondary>
                  <Header content='hello' />
        </Segment>
        <Segment clearing>
          <span>{job.description}</span>

        </Segment>
      </Segment.Group>
    );
  }
}

// passes meeting into selectedMeeting function
// onClick evt ordering is important

export default connect(
  null,
)(JobListItem);
