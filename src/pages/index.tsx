import { useEffect, useState } from 'react';
import firebase from './../config/Firebase'
import { Login, Agenda } from './../components'
import { Container } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

export default function Home(){
    //const authenticatedUser = firebase.auth().currentUser;

    const [isAutheticated, setIsAutheticated] = useState({
        loading: true,
        user: false
    })

    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
          setIsAutheticated({
              loading: false,
              user
          });
      })
    }, [])

    if(isAutheticated.loading){
        return(
            <Container centerContent justifyContent="center" alignItems="center">
                <Spinner  />
            </Container>
        )
    }
    return isAutheticated.user ? <Agenda /> : <Login />
}

