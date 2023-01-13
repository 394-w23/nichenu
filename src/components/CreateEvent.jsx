import './CreateEvent.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon, MultiSelect  } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';
import { useState } from 'react';


export const CreateEvent = ({ user, setCurrDisplay }) => {
  const eventId = uuid();
  const [update, result] = useDbUpdate(`/events/${eventId}`)
  const [tags, setTags] = useState([]);
 
  const submit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;

    update({
      id: eventId,
      name: e.target[0].value,
      desc: e.target[1].value,
      tags: tags,
      owner: 1001, ///////////////////////////////////////////////////// Change later 
      img: "",
      message_chat: [],
    });
    e.target.reset()
    setTags([])
    setCurrDisplay('events')
  }




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


  
  return (
    <form onSubmit={(submit)}>
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
      <MultiSelect value={tags} searchable onChange={setTags} data={tagsData} />
      </div>
      </div>
    

      <div className="form-group row">
        <div className="offset-4 col-8">
          <button name="submit" type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CreateEvent;