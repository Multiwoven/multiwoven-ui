import {
    Box,
    Container,
    Flex,
    Stack,
    Text,
    Button
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import ModelTable from "./table";
import TopBar from './topBar';
import { topBarConfigType } from "../../services/common";
import { useEffect, useState } from 'react';
import { getAllModels } from '@/services/common';
import emptIcon from '../../assets/images/empty.svg';
import { useNavigate } from 'react-router-dom';
const topBarConfig: topBarConfigType = {
    heading: 'Model',
    button_text: 'Add Model',
    Step: 0,
}

const Models = (): JSX.Element => {
    const [modelList, setModelsList] = useState<any>([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        const result = await getAllModels();
        if (result.success) {
            setModelsList(result?.response?.data);
        }
    };
    const handleAdd = () => {
        navigate('/models/new')
    }

    return (
        <>
            {modelList.length > 0 ? (
                <Container minW={'100%'}>
                    <TopBar topBarConfig={topBarConfig} />
                    <Box
                        bg="bg.surface"
                        boxShadow={{ base: 'none', md: 'sm' }}
                        borderRadius={{ base: 'none', md: 'lg' }}
                    >
                        <Stack spacing="5">
                            <Box overflowX="auto">
                                <ModelTable modelList={modelList} mode_screen_type='models' />
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            ) : <Flex minW={'100%'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <img src={emptIcon} alt='' />
                <Text mt={4} mb={2} fontWeight={500} fontSize={'24px'}>No models added</Text>
                <Text mb={8} fontWeight={'normal'} fontSize={'14px'}>Add a model to describe how your data source will be queried</Text>
                <Button onClick={() => handleAdd()} fontWeight={'light'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                    <FiPlus /> <Text ml={2}>Add Model</Text>
                </Button>
            </Flex>}
        </>
    );
}

export default Models;
