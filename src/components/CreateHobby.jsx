import './CreateHobby.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon, Button, MultiSelect, Textarea, TextInput  } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';
import { useRef, useState } from 'react';
import { useForm } from '@mantine/form';


export const CreateHobby = ({ user, setCurrDisplay }) => {
  const hobbyId = uuid();
  const messageChatId = uuid(); ////////////////////////////////////// Do we want to make hobbyId and messageChatId the same?
  const messageId = uuid(); ////////////////////////////////////////// Added initial welcome message because the messages object can't be empty
  const [update, result] = useDbUpdate(`/hobbies/${hobbyId}`);
  const [updateInitialMessage, resultInitialMessage] = useDbUpdate(`/hobbies/${hobbyId}/message_chat/messages/${messageId}`);
  const [tags, setTags] = useState([]);
 
  const submit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;

    const currDate = Date.now();

    update({
      id: hobbyId,
      name: e.target[0].value,
      desc: e.target[1].value,
      tags: tags,
      owner: 1001, ///////////////////////////////////////////////////// Change later 
      img: "",
      message_chat: {
        id: messageChatId,
        users: [1001] ///////////////////////////////////////////////////// Change later 
      },
    });

    updateInitialMessage({
      content: "Welcome to \"" + e.target[0].value + "\"!",
      date: new Date(currDate).toISOString(),
      id: messageId,
      user: 1001,
    });

    e.target.reset()
    setTags([])
    setCurrDisplay('hobbies')
  }


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
      owner: 1001,
      img: "",
      message_chat: {
        id: messageChatId,
        users: [1001] //FIXME: change this to the signed in user's ID
      },

    },


    validate: {
      name: (value) => value == '' && 'Please enter event name',
      desc: (value) => desc == "" && 'Please enter event desc'
    },

    // proceed
  });








  const tagsData = [
  { value: 'academic', label: 'Academic' },
  { value: 'animals', label: 'Animals' },
  { value: 'arts', label: 'Arts' },
  { value: 'board-games', label: 'Board Games' },
  { value: 'books', label: 'Books' }, 
  { value: 'clothing', label: 'Clothing'},
  { value: 'collecting', label: 'Collecting'},
  { value: 'crafts', label: 'Crafts'},
  { value: 'dance', label: 'Dance'},
  { value: 'fitness', label: 'Fitness'},
  { value: 'food', label: 'Food'},
  { value: 'garden', label: 'Garden'},
  { value: 'indoor', label: 'Indoor'},
  { value: 'making', label: 'Making'},
  { value: 'music', label: 'Music'},
  { value: 'nature', label: 'Nature' },
  { value: 'niche', label: 'Niche' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'social', label: 'Social' },
  { value: 'sports', label: 'Sports' },
  { value: 'tv-film', label: 'TV Film' },
  { value: 'theatre', label: 'Theatre' },
  { value: 'travel', label: 'Travel' },
  { value: 'video-games', label: 'Video Games' },
  { value: 'visual', label: 'Visual' },
  { value: 'volunteer', label: 'Volunteer' }
];



const submitForm = (e) => {
  form.validate() // mantine 
  e.preventDefault()
  let formData = form.values
  // if there issues with the form, show an alert
  if (
    Object.values(form.errors).length > 0
  ) {
    setRaiseAlert(true);
  } else {
    setRaiseAlert(false);
    // update(formData)
    console.log(formData)
    form.reset();
    // navigate to show events.
    // setCurrDisplay("events");
  }
}
  
  return (

    <>
    
    <form onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>
      {/* {raiseAlert && <Alert icon={<RiErrorWarningLine />} title="Missing Fields" color="red">
        {alertMessage}
      </Alert>
      } */}

      <TextInput
        style={{ marginBottom: 10 }}
        {...form.getInputProps('name')}
        label="Hobby Name" placeholder="e.g. Ukuleles, Badminton, Competitive Smash" withAsterisk />
      
      <Textarea
        style={{ marginBottom: 10 }}
        placeholder="Describe your hobby here"
        label="Description"
        {...form.getInputProps('desc')}
        withAsterisk
      />




      <div style={{ textAlign: "center" }}>
        <Button style={{ marginTop: 10 }} type="submit">Submit</Button>
      </div>


    </form>


    {/* <form onSubmit={(submit)}>
      <div className="form-group row">
        <label htmlFor="" className="col-4 col-form-label">Hobby Name</label>
        <div className="col-8">
          <input id="" name="" placeholder="e.g. Ukuleles, Badminton, Competitive Smash" type="text" className="form-control" required="required" />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-4 col-form-label" htmlFor="textarea">Description</label>
        <div className="col-8">
          <textarea id="textarea" name="textarea" placeholder="Describe your hobby here" cols="40" rows="3" className="form-control" required="required"></textarea>
        </div>
      </div>

      <div className="form-group row">
      <label className="col-4">Tags</label>
      <div className="col-8">
      <MultiSelect value={tags} searchable onChange={setTags} data={tagsData} clearable/>
      </div>
      </div>
      <div className="form-group row">
        <div className="offset-4 col-8">
        <button name="submit" type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>


    </form> */}

    </>

  );
};

export default CreateHobby;