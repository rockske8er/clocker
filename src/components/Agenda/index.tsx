import { Button } from "@chakra-ui/button"
import firebase from "./../../config/Firebase";
export const Agenda = () => {
    const logout = () => firebase.auth().signOut();
  return (


    <>
         <h1>Agenda</h1>
        <Button onClick={logout}>
            LOGOUT
        </Button>
    </>
  );
}

