import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box, Button, FormControl, Input, Image, Heading, Text, Link, Container, Flex, Spacer, Checkbox
} from '@chakra-ui/react';
import MultiwovenLogo from '../../assets/images/multiwoven-logo.png';
import { axiosInstance as axios } from "../../services/axios";
import Cookies from 'js-cookie';
// Yup validation schema
const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        let data = JSON.stringify(values)
        await axios.post('/login', data).then(response => {
            let token = response?.data?.token;
            Cookies.set('authToken', token);
            navigate('/')
        }).catch(error => {
            console.error('Login error:', error);
        })
    }
    return (

        <Container display='flex' flexDir='column' justifyContent='center' maxW='650' minH='100vh' className='flex flex-col align-center justify-center'>
            <div className='top_side_back'></div>
            <div className='bottom_side_back'></div>
            <Box width='100%' className="flex min-h-full flex-1 flex-col align-center justify-center py-12 sm:px-6 lg:px-8">
                <Box display='flex' justifyContent='center' className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        maxW="300px"
                        w="95%"
                        src={MultiwovenLogo}
                        alt="Multiwoven"
                    />

                </Box>

                <Box mt="14" className="sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <Box bg="white" border='1px' borderColor="#E2E8F0" px="24" py="12" rounded="lg" className="sm:px-12">
                        <Heading fontSize='40px' as="h2" mt="0" mb='10' fontWeight="normal" textAlign="center" >
                            Log in to your account
                        </Heading>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={SignUpSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ getFieldProps, touched }) => (
                                <Form>
                                    <FormControl mb='24px' id="email" isInvalid={touched.email}>
                                        <Input variant='outline' placeholder='Email' {...getFieldProps('email')} />
                                        {/* <FormErrorMessage>{errors.email}</FormErrorMessage> */}
                                    </FormControl>

                                    <FormControl mb='24px' id="password" isInvalid={touched.password}>
                                        <Input type="password" placeholder='Password' {...getFieldProps('password')} />
                                        {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
                                    </FormControl>

                                    <Button type="submit" background="#731447" color='white' width="full" _hover={{ background: "#731447" }}>
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Box width='100%' className="flex min-h-full flex-1 flex-col align-center justify-center py-12 sm:px-6 lg:px-8">
                            <Flex paddingBottom='5' borderBottom='1px' borderColor='#CCBBDD5E'>
                                <Text mt="4" textAlign="left" fontSize="sm" color="black">
                                    <Checkbox size='md' colorScheme='blue'>
                                        Remember me
                                    </Checkbox>
                                </Text>
                                <Spacer />
                                <Text mt="4" textAlign="right" fontSize="sm" color="gray.500">
                                    <Link fontWeight="500" as={RouterLink} to="/login" color="#5383EC" _hover={{ color: '#5383EC' }}>
                                        Forgot password
                                    </Link>
                                </Text>
                            </Flex>
                            <Text display='flex' mt="5" textAlign="left" fontSize="sm" color="gray.500">
                                Don't have an account?
                                <Link ml='1' as={RouterLink} to="/sign-up" color="#5383EC" _hover={{ color: '#5383EC' }}>
                                    Sign Up
                                </Link>
                            </Text>
                        </Box>
                    </Box>


                </Box>
            </Box>

        </Container>

    )
}

export default Login;