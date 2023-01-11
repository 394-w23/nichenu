import './Event.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';

export const CreateHobby = ({ user }) => {
  const [update, result] = useDbUpdate(`/hobbies/${uuid()}`)
  const submit = (e) => {
    e.preventDefault();
    if (!e.target[0].value) return;
    update({
      name:e.target[0].value,
      desc:e.target[1].value,
      tags: getTags(e.target),
      owner:user.id,
      img:"",
      message_chat:[],
      
    })

  }
  return (
    <form onSubmit={(submit)}>
      <div class="form-group row">
        <label for="" class="col-4 col-form-label">Hobby Name</label>
        <div class="col-8">
          <input id="" name="" placeholder="e.g. Ukuleles, Badminton, Competitive Smash" type="text" class="form-control" required="required" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="textarea">Description</label>
        <div class="col-8">
          <textarea id="textarea" name="textarea" placeholder="Describe your hobby here" cols="40" rows="3" class="form-control" required="required"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-4">Checkboxes</label>
        <div class="col-8">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_0" type="checkbox" class="custom-control-input" value="indoor" />
            <label for="checkbox_0" class="custom-control-label">Indoor</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_1" type="checkbox" class="custom-control-input" value="outdoor" />
            <label for="checkbox_1" class="custom-control-label">Outdoor</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_2" type="checkbox" class="custom-control-input" value="sports" />
            <label for="checkbox_2" class="custom-control-label">Sports</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_3" type="checkbox" class="custom-control-input" value="music" />
            <label for="checkbox_3" class="custom-control-label">Music</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_4" type="checkbox" class="custom-control-input" value="arts" />
            <label for="checkbox_4" class="custom-control-label">Arts</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_5" type="checkbox" class="custom-control-input" value="travel" />
            <label for="checkbox_5" class="custom-control-label">Travel</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_6" type="checkbox" class="custom-control-input" value="food" />
            <label for="checkbox_6" class="custom-control-label">Food</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_7" type="checkbox" class="custom-control-input" value="videogames" />
            <label for="checkbox_7" class="custom-control-label">Video Games</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_8" type="checkbox" class="custom-control-input" value="social" />
            <label for="checkbox_8" class="custom-control-label">Social</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_9" type="checkbox" class="custom-control-input" value="academic" />
            <label for="checkbox_9" class="custom-control-label">Academic</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_10" type="checkbox" class="custom-control-input" value="volunteer" />
            <label for="checkbox_10" class="custom-control-label">Volunteer</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_11" type="checkbox" class="custom-control-input" value="boardgames" />
            <label for="checkbox_11" class="custom-control-label">Board Games</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_12" type="checkbox" class="custom-control-input" value="crafts" />
            <label for="checkbox_12" class="custom-control-label">Crafts</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_13" type="checkbox" class="custom-control-input" value="nature" />
            <label for="checkbox_13" class="custom-control-label">Nature</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_14" type="checkbox" class="custom-control-input" value="animal" />
            <label for="checkbox_14" class="custom-control-label">Animals</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_15" type="checkbox" class="custom-control-input" value="tv-and-film" />
            <label for="checkbox_15" class="custom-control-label">TV & Film</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_16" type="checkbox" class="custom-control-input" value="dance" />
            <label for="checkbox_16" class="custom-control-label">Dance</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_17" type="checkbox" class="custom-control-input" value="making" />
            <label for="checkbox_17" class="custom-control-label">Making</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_18" type="checkbox" class="custom-control-input" value="niche" />
            <label for="checkbox_18" class="custom-control-label">Niche</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_19" type="checkbox" class="custom-control-input" value="collecting" />
            <label for="checkbox_19" class="custom-control-label">Collecting</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_20" type="checkbox" class="custom-control-input" value="books" />
            <label for="checkbox_20" class="custom-control-label">Books</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_21" type="checkbox" class="custom-control-input" value="clothes" />
            <label for="checkbox_21" class="custom-control-label">Clothing</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_22" type="checkbox" class="custom-control-input" value="fitness" />
            <label for="checkbox_22" class="custom-control-label">Fitness</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_23" type="checkbox" class="custom-control-input" value="garden" />
            <label for="checkbox_23" class="custom-control-label">Garden</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_24" type="checkbox" class="custom-control-input" value="theatre" />
            <label for="checkbox_24" class="custom-control-label">Theatre</label>
          </div>
          <div class="custom-control custom-checkbox custom-control-inline">
            <input name="checkbox" id="checkbox_25" type="checkbox" class="custom-control-input" value="visual" />
            <label for="checkbox_25" class="custom-control-label">Visual</label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="offset-4 col-8">
          <button name="submit" type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CreateHobby;