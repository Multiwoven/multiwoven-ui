import {
    Box,
    Container,
    Flex,
    Stack,
} from '@chakra-ui/react'
import ModdelTable from "./table";
import TopBar from './topBar';
import { topBarConfigType, emptyUIConfig } from "../../services/common";
import { useEffect, useState } from 'react';
import { getAllConnectors } from '@/services/common';
import { Empty } from './empty';
import emptIcon from '../../assets/images/empty.svg';

const emptyUI: emptyUIConfig = {
    heading: 'No source added',
    description: 'Before you add a model, you need to first configure a data source',
    type: 'source',
    button_text: 'Add Source',
    image: emptIcon
}

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
        <>
            <Container className='custom_main_model_form' minW={'100%'}>
                {connectorList.length > 0 ? (
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
                    </Flex>)
                    : <Empty emptyUI={emptyUI} cancelPop={null} />}
            </Container>
        </>
    )
}
export default ModelNew;






