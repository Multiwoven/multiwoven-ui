import {
    Box,
    Container,
    Stack,
} from '@chakra-ui/react';
import ModelTable from "./table";
import TopBar from './topBar';
import { topBarConfigType, emptyUIConfig } from "../../services/common";
import { useEffect, useState } from 'react';
import { getAllModels } from '@/services/common';
import { Empty } from './empty';
const topBarConfig: topBarConfigType = {
    heading: 'Model',
    button_text: 'Add Model',
    Step: 0,
}

const emptyUI: emptyUIConfig = {
    heading: 'No models added',
    description: 'Add a model to describe how your data source will be queried',
    type: 'model',
    button_text: 'Add Model'
}

const Models = (): JSX.Element => {
    const [modelList, setModelsList] = useState<any>([]);
    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        const result = await getAllModels();
        if (result.success) {
            setModelsList(result?.response?.data);
        }
    };

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
            ) : <Empty emptyUI={emptyUI} />}
        </>
    );
}

export default Models;
