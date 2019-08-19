import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react';


// we have to be careful when using URL.createObjectURL because it will create an object in memory which remain there until manually erased.
// that's why we will be using useEffect hook (with URL.revokeObjectURL) which will help clean it up for us after preview is succesfully painted/rendered on screen
const DropzoneInput = ({setFiles}) => {
  const onDrop = useCallback(acceptedFiles => {
      // Do something with files
      setFiles(acceptedFiles.map(file => Object.assign(file, { //updating the file itself with a new property
          preview: URL.createObjectURL(file) //  which contains an object url which is generated from the file itself using the URL.createObjectURL 
      }))) // accepted file is an array eventhough there is only 1 item in uploaded
  }, [setFiles]) // key in dependancies in this array. it will still work if we forget but we will still see the annoying warnings
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      multiple: false,
      accept: 'image/*'
    })
// dropzone and dropzone--isActive are syling in the index.css. btw take note that there is a space in 'dropzone '
  return (
    <div {...getRootProps()} className={'dropzone ' + (isDragActive && 'dropzone--isActive')} > 
      <input {...getInputProps()} />
<Icon name='upload' size='huge' />
<Header content= 'Drop image here'/>
    </div>
  )
}

export default DropzoneInput