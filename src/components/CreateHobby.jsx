import './CreateHobby.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon, Alert, Button, FileInput, MultiSelect, Textarea, TextInput } from '@mantine/core';
import { useDbData, useDbUpdate, getDbStorage } from '../utils/firebase';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { RiErrorWarningLine } from '@react-icons/all-files/ri/RiErrorWarningLine';
import { HiOutlineUpload } from '@react-icons/all-files/hi/HiOutlineUpload';
import { showNotification } from '@mantine/notifications';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';

export const CreateHobby = ({ user, setCurrDisplay }) => {
  const hobbyId = uuid();
  const messageChatId = uuid(); ////////////////////////////////////// Do we want to make hobbyId and messageChatId the same?
  const messageId = uuid(); ////////////////////////////////////////// Added initial welcome message because the messages object can't be empty
  const [update, result] = useDbUpdate(`/hobbies/${hobbyId}`);
  const [updateUser, resultUser] = useDbUpdate(`/users/${user.id}/hobby_ids/`);
  const [updateInitialMessage, resultInitialMessage] = useDbUpdate(`/hobbies/${hobbyId}/message_chat/messages/${messageId}`);
  const [tags, setTags] = useState([]);
  const [data, error] = useDbData("/");
  const [image, setImage] = useState(null);

  const [duplicateHobby, setDuplicateHobby] = useState(false);


  const [currentHobbyNames, setCurrentHobbyNames] = useState([]);
  useEffect(() => {
    if(data && data.hobbies){
    setCurrentHobbyNames(Object.values(data.hobbies).map(x=> x.name))
    }
  }, [data])


  const formRef = useRef(null); // to disable form submission on enter

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const form = useForm({

    initialValues: {
      id: hobbyId,
      name: '',
      desc: '',
      tags: tags,
      owner: user.id,
      img: "",
      message_chat: {
        id: messageChatId,
        users: {
          [user.id]: user.id,    //FIXME: change this to the signed in user's ID
        }
      },
    },

    validate: {
      // name: (value) => 
      desc: (value) => (value == '' ? 'Please enter hobby description' : null)
    },

    // proceed
  });



  const tagsData = [
    { value: 'academic', label: 'Academic' },
    { value: 'animals', label: 'Animals' },
    { value: 'arts', label: 'Arts' },
    { value: 'board-games', label: 'Board Games' },
    { value: 'books', label: 'Books' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'collecting', label: 'Collecting' },
    { value: 'crafts', label: 'Crafts' },
    { value: 'dance', label: 'Dance' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'food', label: 'Food' },
    { value: 'garden', label: 'Garden' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'making', label: 'Making' },
    { value: 'music', label: 'Music' },
    { value: 'nature', label: 'Nature' },
    { value: 'niche', label: 'Niche' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'social', label: 'Social' },
    { value: 'sports', label: 'Sports' },
    { value: 'theatre', label: 'Theatre' },
    { value: 'travel', label: 'Travel' },
    { value: 'tv-film', label: 'TV & Film' },
    { value: 'video-games', label: 'Video Games' },
    { value: 'visual', label: 'Visual' },
    { value: 'volunteer', label: 'Volunteer' }
  ];


  const [raiseAlert, setRaiseAlert] = useState(false) // 
  const [alertMessage, setAlertMessage] = useState("Please fill in the required fields")

  const submitForm = (e) => {
    form.validate() // mantine 


    // form.validateField('name')

    e.preventDefault()
   
    // FIXME: something wrong with the form validation
    // !form.values.desc && form.setFieldError('desc', "Please enter desc")
    let formData = { ...form.values, tags: tags, id: hobbyId }
    // if there issues with the form, show an alert
    // handle the hobby name

    let hobbyNameExists = currentHobbyNames.includes(form.values.name)
    if (hobbyNameExists) {
      setDuplicateHobby(true)
    }else{
      setDuplicateHobby(false)
    }


    if (
      Object.values(form.errors).length > 0 ||
      !form.values.desc ||
      !form.values.name ||
      hobbyNameExists
    ) {
      setRaiseAlert(true);
    } else {
      setRaiseAlert(false);

      if (image) {
        // Upload hobby with image
        const imageName = user.id + "_" + Date.now();
        const storageRef = sRef(getDbStorage(), `/hobby_images/${imageName}`);

        uploadBytes(storageRef, image).then((snapshot) => {
          console.log('Uploaded a hobby image file!');
        }).then(() => {
          getDownloadURL(storageRef).then((url) => {
            formData.img = url;
          }).then(() => {
            update(formData)
  
            updateUser({
              [hobbyId]: hobbyId,
            })
      
            updateInitialMessage({
              content: "Welcome to \"" + e.target[0].value + "\"!",
              date: new Date().toISOString(),
              id: messageId,
              user: user.id,
            });
            // setCurrDisplay("hobbies");
          });
        });
      } else {
        // Upload hobby without image (default image)
        update(formData)

        updateUser({
          [hobbyId]: hobbyId,
        })
  
        updateInitialMessage({
          content: "Welcome to \"" + e.target[0].value + "\"!",
          date: new Date().toISOString(),
          id: messageId,
          user: user.id,
        });
        setCurrDisplay("hobbies");
      }    
    }
    showNotification({
      title: `You created the ${form.values.name} hobby!`,
      message: 'Go to "My Hobbies" to see your new hobby!',
      autoClose: 3000,
    })
  }

  return (

    <>
      <form data-cy="create-hobby-form" onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>

        {raiseAlert && <Alert data-cy="alert" icon={<RiErrorWarningLine />} title="Missing Fields" color="red">
          {duplicateHobby ? "Hobby name already exists": "Please fill in the required fields"}
        </Alert>
        }

        <TextInput
        data-cy="add-hobby-name"
          // required
          style={{ marginBottom: 10 }}
          {...form.getInputProps('name')}
          label="Hobby Name" placeholder="e.g. Ukuleles, Badminton, Competitive Smash" withAsterisk 
          caption={duplicateHobby? "Hobby already exists": ""}
          status={duplicateHobby? "error": "basic"}
          />
          
        <Textarea
                // required
          style={{ marginBottom: 10 }}
          placeholder="Describe your hobby here"
          label="Description"
          {...form.getInputProps('desc')}
          withAsterisk
          autosize
          minRows={3}
          data-cy="add-hobby-desc"
        />

        <MultiSelect label="Tags" value={tags} searchable onChange={setTags} data={tagsData} clearable/>

        <FileInput className="hobby-image-upload" label="Image" placeholder="Upload Hobby Image" icon={<HiOutlineUpload/>} accept="image/png,image/jpeg" value={image} onChange={setImage} />

        <div style={{ textAlign: "center" }}>
          <Button data-cy="create-hobby-submit-button" style={{ marginTop: 10 }} type="submit">Create Hobby</Button>
        </div>
      </form>
    </>
  );
};

export default CreateHobby;