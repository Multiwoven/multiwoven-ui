import {
    Box,
    Container,
    Stack,
} from '@chakra-ui/react'
import ModdelTable from "./table";
import TopBar from './topBar';
import { topBarConfigType } from "../../services/common";


const topBarConfig: topBarConfigType = {
    heading: 'Model',
    button_text: 'Add Model',
    Step: 0,
}
const Models = (): JSX.Element => {

    return (
        <Container minW={'100%'}>
            <TopBar topBarConfig={topBarConfig} />
            <Box
                bg="bg.surface"
                boxShadow={{ base: 'none', md: 'sm' }}
                borderRadius={{ base: 'none', md: 'lg' }}
            >
                <Stack spacing="5">
                    <Box overflowX="auto">
                        <ModdelTable mode_screen_type='models' />
                    </Box>
                </Stack>
            </Box>

        </Container>
    )
}
export default Models;






