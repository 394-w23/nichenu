import './Event.css'
import {parseTimeString} from '../utils/helpers' // TODO: use moment js
import {RiAddCircleLine} from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';

export const CreateEvent = () => {
    const [update, result] = useDbUpdate()

}