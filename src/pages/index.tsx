import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import {
    Container,
    Box,
    Input,
    Button,
    Text,
    FormControl,
    FormLabel,
    FormHelperText,
    InputGroup,
    InputRightElement,
    InputLeftElement
 } from '@chakra-ui/react'

 import { Icon } from '@chakra-ui/icons'
 import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi'

import { Logo } from '../components'
import firebase from '../config/Firebase'

const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
    password: yup.string().required('Preenchimento obrigatório'),
})

export default function Login() {

    const router = useRouter()

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = useFormik({
        onSubmit: async ({email , password }) => {
            try{
                const userData =  await firebase.auth()
                .signInWithEmailAndPassword(email, password);
                console.log(userData)
            }catch(e){
                console.log('Error', e)
            }

        },
        validationSchema,
        initialValues: {
            email: '',
            password: ''
        }
    })

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => setIsVisible(!isVisible);

    return (
        <Container  centerContent>
            <Logo />
            <Box mb={8} mt={8}>
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


                    <Button
                    colorScheme="blue"
                    width="100%"
                    type="submit"
                    isLoading={isSubmitting}>Entrar</Button>
  </form>
            </Box>

            <Link href="/signup">Ainda não tem uma conta? Cadastre-se</Link>
        </Container>
    )
}

