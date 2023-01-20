import { Button, Text, Title } from '@mantine/core'
import React from 'react'
import styled from 'styled-components'
import {RiGoogleFill} from "@react-icons/all-files/ri/RiGoogleFill"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";



export default function Auth() {

    const provider = new GoogleAuthProvider();


const auth = getAuth();
const signIn = async () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}






    return (
        <div style={{padding: 30, overflow: "hidden"}}>
            <img src="/people.jpg" height="300" />
            <Text >Welcome to</Text>
            <Title>NicheNu</Title>
            <Text style={{marginTop: 20}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            <div style={{height: 70}}></div>
            <Button onClick={signIn} leftIcon={<RiGoogleFill/>}>Signin with Google</Button>
        </div>
    )
}

// styled Components
const StyledPage = styled.div`
`