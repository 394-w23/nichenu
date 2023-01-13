import './CreateHobby.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon, MultiSelect  } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';
import { useState } from 'react';


export const CreateHobby = ({ user }) => {
  const hobbyId = uuid();
  const [update, result] = useDbUpdate(`/hobbies/${hobbyId}`)
  const [tags, setTags] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;

    update({
      id: hobbyId,
      name: e.target[0].value,
      desc: e.target[1].value,
      tags: getTags(e.target),
      owner: 1001, ///////////////////////////////////////////////////// Change later 
      img: "",
      message_chat: [],
    });
  }

  const getTags = (targets) => {
    let tagList = [];
    // target.length equals number of tags, hobby name, description, and submit button
    for (let i = 2; i < targets.length - 1; i++) {
      if (targets[i].checked) {
        tagList.push(targets[i].value);
      }
    }
    //tagList = Object.values(targets).filter((t) => {t.getAttribute("type") == "checkbox" && t.checked})

    return tagList;
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
      <MultiSelect value={tags} onChange={setTags} data={tagsData} />
      </div>
      </div>
    
{/* 
      <div className="form-group row">
        <label className="col-4">Tags</label>
        <div className="col-8">
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_0" type="checkbox" className="custom-control-input" value="indoor" />
            <label htmlFor="checkbox_0" className="custom-control-label">Indoor</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_1" type="checkbox" className="custom-control-input" value="outdoor" />
            <label htmlFor="checkbox_1" className="custom-control-label">Outdoor</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_2" type="checkbox" className="custom-control-input" value="sports" />
            <label htmlFor="checkbox_2" className="custom-control-label">Sports</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_3" type="checkbox" className="custom-control-input" value="music" />
            <label htmlFor="checkbox_3" className="custom-control-label">Music</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_4" type="checkbox" className="custom-control-input" value="arts" />
            <label htmlFor="checkbox_4" className="custom-control-label">Arts</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_5" type="checkbox" className="custom-control-input" value="travel" />
            <label htmlFor="checkbox_5" className="custom-control-label">Travel</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_6" type="checkbox" className="custom-control-input" value="food" />
            <label htmlFor="checkbox_6" className="custom-control-label">Food</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_7" type="checkbox" className="custom-control-input" value="videogames" />
            <label htmlFor="checkbox_7" className="custom-control-label">Video Games</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_8" type="checkbox" className="custom-control-input" value="social" />
            <label htmlFor="checkbox_8" className="custom-control-label">Social</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_9" type="checkbox" className="custom-control-input" value="academic" />
            <label htmlFor="checkbox_9" className="custom-control-label">Academic</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_10" type="checkbox" className="custom-control-input" value="volunteer" />
            <label htmlFor="checkbox_10" className="custom-control-label">Volunteer</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_11" type="checkbox" className="custom-control-input" value="boardgames" />
            <label htmlFor="checkbox_11" className="custom-control-label">Board Games</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_12" type="checkbox" className="custom-control-input" value="crafts" />
            <label htmlFor="checkbox_12" className="custom-control-label">Crafts</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_13" type="checkbox" className="custom-control-input" value="nature" />
            <label htmlFor="checkbox_13" className="custom-control-label">Nature</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_14" type="checkbox" className="custom-control-input" value="animal" />
            <label htmlFor="checkbox_14" className="custom-control-label">Animals</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_15" type="checkbox" className="custom-control-input" value="tv-and-film" />
            <label htmlFor="checkbox_15" className="custom-control-label">TV & Film</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_16" type="checkbox" className="custom-control-input" value="dance" />
            <label htmlFor="checkbox_16" className="custom-control-label">Dance</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_17" type="checkbox" className="custom-control-input" value="making" />
            <label htmlFor="checkbox_17" className="custom-control-label">Making</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_18" type="checkbox" className="custom-control-input" value="niche" />
            <label htmlFor="checkbox_18" className="custom-control-label">Niche</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_19" type="checkbox" className="custom-control-input" value="collecting" />
            <label htmlFor="checkbox_19" className="custom-control-label">Collecting</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_20" type="checkbox" className="custom-control-input" value="books" />
            <label htmlFor="checkbox_20" className="custom-control-label">Books</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_21" type="checkbox" className="custom-control-input" value="clothes" />
            <label htmlFor="checkbox_21" className="custom-control-label">Clothing</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_22" type="checkbox" className="custom-control-input" value="fitness" />
            <label htmlFor="checkbox_22" className="custom-control-label">Fitness</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_23" type="checkbox" className="custom-control-input" value="garden" />
            <label htmlFor="checkbox_23" className="custom-control-label">Garden</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_24" type="checkbox" className="custom-control-input" value="theatre" />
            <label htmlFor="checkbox_24" className="custom-control-label">Theatre</label>
          </div>
          <div className="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_25" type="checkbox" className="custom-control-input" value="visual" />
            <label htmlFor="checkbox_25" className="custom-control-label">Visual</label>
          </div>
        </div>
      </div> */}

      <div className="form-group row">
        <div className="offset-4 col-8">
          <button name="submit" type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CreateHobby;