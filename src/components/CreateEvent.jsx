import './CreateEvent.css'
import { parseTimeString } from '../utils/helpers' // TODO: use moment js
import { RiAddCircleLine } from "@react-icons/all-files/ri/RiAddCircleLine"
import { ActionIcon, MultiSelect, Textarea, TextInput, Input, Button, Alert } from '@mantine/core';
import { useDbUpdate } from '../utils/firebase';
import uuid from 'react-uuid';
import { useEffect, useRef, useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import moment from 'moment';
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine"


export const CreateEvent = ({ user, setCurrDisplay }) => {
  const eventId = uuid();
  const [update, result] = useDbUpdate(`/events/${eventId}`)
  const [tags, setTags] = useState([]);
  const currentTime = new Date();
  // handle event dates
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [formattedStartDateTime, setFormattedStartDateTime] = useState();
  const [formattedEndDateTime, setFormattedEndDateTime] = useState();

  const formRef = useRef(null); // to disable form submission on enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  // handle the event date and time
  useEffect(() => {
    if (startTime && startDate) {
      let s_date = moment(startDate, "MM/DD/YYYY");
      let s_time = moment(startTime, "hh:mm a");
      let startDateTime = s_date.add(s_time.hours(), 'hours').add(s_time.minutes(), 'minutes');
      console.log(startDateTime.format());


      if (startDateTime.format()) {
        setFormattedStartDateTime(startDateTime.format());
      }

    }

    if (endDate && endTime) {
      let e_date = moment(endDate, "MM/DD/YYYY");
      let e_time = moment(endTime, "hh:mm a");
      let endDateTime = e_date.add(e_time.hours(), 'hours').add(e_time.minutes(), 'minutes');
      console.log(endDateTime.format());

      if (endDateTime.format()) {
        setFormattedEndDateTime(endDateTime.format())
      }
    }
  }, [startDate, endDate, startTime, endTime])

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
    { value: 'tv-film', label: 'TV Film' },
    { value: 'theatre', label: 'Theatre' },
    { value: 'travel', label: 'Travel' },
    { value: 'video-games', label: 'Video Games' },
    { value: 'visual', label: 'Visual' },
    { value: 'volunteer', label: 'Volunteer' }
  ];

  const form = useForm({
    initialValues: {
      id: eventId,
      name: '',
      desc: '',
      start_timestamp: '', ///////////////////////////////////////////////////// Change later 
      end_timestamp: '', ///////////////////////////////////////////////////// Change later 
      owner: user.id,
      message_chat: [],
      users: {[user.id]: user.id}
    },
    
    validate: {
      name: (value) => value == '' && 'Please enter event name'
    },

    // proceed
  });

  const [raiseAlert, setRaiseAlert] = useState(false); // to show the missing fields
  const [alertMessage, setAlertMessage] = useState("Please fill in the required fields before submitting");

  const submitForm = (e) => {
    form.validate() // mantine 
    e.preventDefault()
    let formData = { ...form.values, start_timestamp: formattedStartDateTime, end_timestamp: formattedEndDateTime }
    // validate start and end date and time
    let now = moment(formattedStartDateTime);
    let futureDate = moment(formattedEndDateTime);
    if (futureDate.diff(now) > 0) {
      console.log("The date is in the future.");
      setAlertMessage("Please fill in the required fields before submitting");
    } else {
      console.log("The date is in the past or is the current date.");
      setAlertMessage("The provided start date and time, and end date and time is not valid")
      setRaiseAlert(true)
    }
    // if there issues with the form, show an alert
    if (
      !formData.start_timestamp ||
      !formData.end_timestamp ||
      Object.values(form.errors).length > 0 ||
      futureDate.diff(now) <= 0
    ) {
      setRaiseAlert(true);
    } else {
      setRaiseAlert(false);
      update(formData)
      form.reset();
      // navigate to show events.
      setCurrDisplay("events");

    }
  }

  return (
    <form onSubmit={submitForm} ref={formRef} onKeyDown={handleKeyDown}>
      {raiseAlert && <Alert icon={<RiErrorWarningLine />} title="Missing Fields" color="red">
        {alertMessage}
      </Alert>
      }

      <TextInput
        style={{ marginBottom: 10 }}
        {...form.getInputProps('name')}
        label="Event name" placeholder="e.g. Rihanna Concert, Knitfest, Smash tournament" withAsterisk />
      <Textarea
        style={{ marginBottom: 10 }}
        placeholder="Describe your event here"
        label="Description"
        {...form.getInputProps('desc')}
      />

      <Input.Wrapper style={{ marginBottom: 10 }} label="Start date and start time" withAsterisk>
        <div className="date-time">
          <DatePicker onChange={(value) => setStartDate(value)} value={startDate} placeholder="Pick Start Date" firstDayOfWeek="sunday" withAsterisk minDate={new Date()} />
          <TimeInput onChange={(value) => setStartTime(value)} value={startTime} format="12"
            required
          />
        </div>
      </Input.Wrapper>


      <Input.Wrapper style={{ marginBottom: 10 }} label="End date and start time" withAsterisk>
        <div className="date-time">
          <DatePicker onChange={(value) => setEndDate(value)} value={endDate} placeholder="Pick End Date" firstDayOfWeek="sunday" withAsterisk minDate={startDate ? startDate : new Date()} />
          <TimeInput onChange={(value) => setEndTime(value)} format="12" />
        </div>
      </Input.Wrapper>

      <div style={{ textAlign: "center" }}>
        <Button style={{ marginTop: 10 }} type="submit">Submit</Button>
      </div>


    </form>

  );
};

export default CreateEvent;

