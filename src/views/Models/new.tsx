import {
    Box,
    Container,
    Flex,
    Stack,
} from '@chakra-ui/react'
import ModdelTable from "./table";
import TopBar from './topBar';
import { topBarConfigType } from "../../services/common";
import { useEffect, useState } from 'react';
import { getAllConnectors } from '@/services/common';


const topBarConfig: topBarConfigType = {
    heading: 'Select a data source',
    button_text: 'Exit',
    Step: 1,
}

const ModelNew = (): JSX.Element => {
    const [connectorList, setConnectorList] = useState<any>([]);
    useEffect(() => {
        fetchConnectors();
    }, [])

    const fetchConnectors = async () => {
        const result = await getAllConnectors();
        if (result.success) {
            setConnectorList(result?.response?.data);
        }
    };
    return (
        <Container className='custom_main_model_form' minW={'100%'}>
            <Flex width={'100%'} maxW={'75%'} flexDirection={'column'}>
                <TopBar topBarConfig={topBarConfig} />
                <Box
                    bg="bg.surface"
                    boxShadow={{ base: 'none', md: 'sm' }}
                    borderRadius={{ base: 'none', md: 'lg' }}
                >
                    <Stack spacing="5">
                        <Box overflowX="auto">
                            <ModdelTable modelList={connectorList} mode_screen_type='sources' />
                        </Box>
                    </Stack>
                </Box>
            </Flex>

        </Container>
    )
}
export default ModelNew;






