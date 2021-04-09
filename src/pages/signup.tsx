import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    Container,
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Button,
    InputLeftAddon
 } from '@chakra-ui/react'

 import { Icon } from '@chakra-ui/icons'
 import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'

import { Logo } from '../components'

const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
    username: yup.string().required('Preenchimento obrigatório'),
})

import firebase from '../config/Firebase'

export default function Home() {

const {
    isSubmitting,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
} = useFormik({
    initialValues: {
        email: '',
        password: '',
        username: ''
    },
    validationSchema,
    onSubmit: async ({email , password, username}) => {
        try{
            const userData =  await firebase.auth()
            .createUserWithEmailAndPassword(email, password);
            console.log(userData)
        }catch(e){
            console.log('Error', e)
        }

    }



})

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => setIsVisible(!isVisible);
  return (
      <Container mt={10} centerContent>
          <Logo />

          <Box mt={'8'} mb={'8'}>
            <Text>Crie sua agenda compartilhada</Text>
          </Box>

          <Box>

            <form onSubmit={handleSubmit}>



            <FormControl id="email" mt={'8'} isRequired>
                <FormLabel>E - mail</FormLabel>
                <InputGroup>
                    <InputLeftElement>
                        <Icon as={FiMail} />
                    </InputLeftElement>
                    <Input
                        name="email"
                        size={'lg'}
                        type="email"
                        placeholder="seu@email.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </InputGroup>

                {
                    touched.email && <FormHelperText textColor={'red.400'}>{errors.email}</FormHelperText>
                }


            </FormControl>

            <FormControl id="password" mt={'8'}>
                <FormLabel>Senha</FormLabel>
                <InputGroup alignItems="center">
                    <InputLeftElement>
                        <Icon as={FiLock} />
                    </InputLeftElement>
                    <Input
                        name="password"
                        size={'lg'}
                        type={isVisible ? "text" : "password"}
                        placeholder="Sua senha segura"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <InputRightElement>

                        {
                            isVisible ? <Icon onClick={handleClick} as={FiEyeOff} />
                                    : <Icon onClick={handleClick} as={FiEye} />
                        }


                    </InputRightElement>
                </InputGroup>

                {
                    touched.password && <FormHelperText textColor={'red.400'}>{errors.password}</FormHelperText>
                }


            </FormControl>

            <FormControl id="username" mt={'8'} >
                <InputGroup  size={'lg'}>
                    <InputLeftAddon children={'clocker.work/'} />
                    <Input
                        name="username"
                        size={'lg'}
                        type="username"
                        placeholder="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </InputGroup>

                {
                    touched.username && <FormHelperText textColor={'red.400'}>{errors.username}</FormHelperText>
                }

                </FormControl>
            <Button
                type={'submit'}
                mt="8" w={'full'} size={'lg'} colorScheme='blue'
                isLoading={isSubmitting}

                >
                Entrar
            </Button>
            </form>
          </Box>


      </Container>
  )
}
