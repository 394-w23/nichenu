import './Event.css'
import {parseTimeString} from '../utils/helpers' // TODO: use moment js
import {RiAddCircleLine} from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';

export const CreateEvent = ({user}) => {
    const [update, result] = useDbUpdate(`/hobbies/${uuid()}`)
    return ( 

        <form>
            <div class="form-group row"> 
                <label for="text" class="col-4 col-form-label">Text Field</label> 
                <div class="col-8">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-address-card"></i>
                    </div>
                    </div> 
                    <input id="text" name="text" type="text" class="form-control"/>
                </div>
                </div>
            </div>


            <div class="form-group row">
                <label for="text" class="col-4 col-form-label">Text Field2</label> 
                <div class="col-8">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-address-card"></i>
                    </div>
                    </div> 
                    <input id="text" name="text" type="text" class="form-control"/>
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

export default CreateEvent;