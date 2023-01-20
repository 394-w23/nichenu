import { Button, Text, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { RiGoogleFill } from "@react-icons/all-files/ri/RiGoogleFill"
import { FirebaseSignIn, useAuth } from '../utils/firebase';

export default function Auth({setCurrDisplay}) {
    // Sign in the user if they are not signed in already
    const user = useAuth();

    useEffect(() => {
        console.log(user)
        if(user){
        setCurrDisplay('hobbies')
        }
    },[user])
    
    
  
    return (
        <div style={{ padding: 30, overflow: "hidden" }}>
            <img src="/people.jpg" height="300" />
            <Text >Welcome to</Text>
            <Title>NicheNu</Title>
            <Text style={{ marginTop: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            <div style={{ height: 70 }}></div>
            <Button onClick={FirebaseSignIn} leftIcon={<RiGoogleFill />}>Signin with Google</Button>
        </div>
    )
}

// styled Components
const StyledPage = styled.div`
`