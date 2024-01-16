import TopBar from './topBar';
import { topBarConfigType } from "../../services/common";
import { Container, Box, Stack, Flex, Button, Heading, Text } from "@chakra-ui/react";
import Editor from '@monaco-editor/react';

const topBarConfig: topBarConfigType = {
    heading: 'Define your model',
    button_text: 'Exit',
    Step: 3,
}
const optionsEditor = {
    minimap: {
        enabled: false
    },
    'renderLineHighlight': 'none' as 'none',
}

const Define = (): JSX.Element => {

    const handleEditorChange = (value: any) => {
        console.log("value", value);
    }
    return (
        <Container className='custom_main_model_form' minW={'100%'}>
            <Flex width={'100%'} maxW={'75%'} flexDirection={'column'}>
                <TopBar topBarConfig={topBarConfig} />
                <Flex justifyContent={'space-between'}
                    bg="bg.surface"
                    borderRadius={{ base: 'none', md: 'lg' }}>
                    <Box borderRadius={'5px'} borderColor={'#EAECF0'} minW={'100%'} maxW="100%" borderWidth="1px">
                        <Box mb={4} p={3} bgColor={'#F9FAFB'} as="section">
                            <Stack direction={'row'} alignItems={'center'} justify="space-between">
                                <Stack>
                                    <Heading lineHeight={'normal'} fontSize={'md'} fontWeight="medium">
                                        Amazon Redshift
                                    </Heading>
                                </Stack>
                                <Stack direction="row">
                                    <Button border={'1px'} borderStyle={'solid'} borderColor={'border'} fontSize={'sm'} color={'dark_gray'} fontWeight={'600'} bg={'light_gray'} _hover={{ background: 'light_gray' }}>
                                        <Text>Run Query</Text>
                                    </Button>
                                    <Button border={'1px'} borderStyle={'solid'} borderColor={'border'} fontSize={'sm'} color={'dark_gray'} fontWeight={'600'} bg={'light_gray'} _hover={{ background: 'light_gray' }}>
                                        {/* <FiPlus /> */}
                                        <Text ml={2}>Beautify</Text>
                                    </Button>

                                </Stack>
                            </Stack>
                        </Box>
                        <Editor
                            className='editor_model'
                            options={optionsEditor}
                            width='100%'
                            height="300px"
                            defaultLanguage="sql"
                            defaultValue="// select * from users;"
                            onChange={handleEditorChange}
                        />
                    </Box>
                </Flex>
            </Flex>

        </Container>
    )
}
export default Define;






