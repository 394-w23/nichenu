import { Button, Text, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { RiGoogleFill } from "@react-icons/all-files/ri/RiGoogleFill"
import { FirebaseSignIn, useAuth, useDbData, useDbUpdate } from '../utils/firebase';

export default function Auth({setCurrDisplay}) {
    // Sign in the user if they are not signed in already
    const user = useAuth();
    const [data, error] = useDbData("/");
    const [update, result] = useDbUpdate(`/users/${user? user.uid : "unknown"}`);
   

    
    //TODO: Auth emulator on port 9099
    //TODO: DB emulator port 9000
    //TODO: Hosting port 5000
    //TODO: Storage on 9199
    
    
  
    return (
        <div style={{ padding: 30, overflow: "hidden" }}>
            <img src="/people.jpg" height="300" />
            <Text >Welcome to</Text>
            <Title>nicheNU</Title>
            <Text style={{ marginTop: 20 }}>Find your niche!</Text>
            <div style={{ height: 70 }}></div>
            <Button onClick={FirebaseSignIn} leftIcon={<RiGoogleFill />}>Sign in with Google</Button>
        </div>
    )
}

// styled Components
const StyledPage = styled.div`
`