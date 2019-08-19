import React, { useState, useEffect } from 'react';
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card
} from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';

// practicing using React hooks
// 1. Convert to stateless arrow functions and remove {Component} import
// 2. Remove render with its curly braces
// 3. Refresh app to make sure that nothing is broken
// 4. add useState and useEffect hooks

// preview in <Image /> tag will be still be rectangular even if we pass a rectangular img (no change), because we set min settings. which means that we will only expand images which are smaller than that

const PhotosPage = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos' />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 &&
          < CropperInput setImage={setImage} imagePreview={files[0].preview} /> }
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {files.length > 0 && 
           <div className='img-preview' style={{minHeight:'200px', minWidth:'200px', overflow:'hidden' }}  />
           }
        </Grid.Column> 
      </Grid>

      <Divider />
      <Header sub color='teal' content='All Photos' />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
          <Button positive>Main Photo</Button>
        </Card>

        <Card>
          <Image src='https://randomuser.me/api/portraits/men/20.jpg' />
          <div className='ui two buttons'>
            <Button basic color='green'>
              Main
            </Button>
            <Button basic icon='trash' color='red' />
          </div>
        </Card>
      </Card.Group>
    </Segment>
  );
};

export default PhotosPage;
