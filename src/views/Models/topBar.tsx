import {
    Box,
    Button,
    Stack,
    Heading,
    Text
} from '@chakra-ui/react'
import { FiPlus } from "react-icons/fi";
const TopBar = (): JSX.Element => {
    return (
        <Box bgColor={'transparent'} as="section" pt={{ base: '4', md: '10' }} pb={{ base: '12', md: '12' }}>
            <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
                <Stack spacing="1">
                    <Heading size={{ base: 'xs', md: 'sm' }} fontWeight="medium">
                        Models
                    </Heading>
                    
                </Stack>
                <Stack direction="row" spacing="3">
                    <Button fontWeight={'light'} bg={'mw_orange'} _hover={{background: 'mw_orange'}}><FiPlus /> <Text ml={2}>Add Model</Text></Button>
                </Stack>
            </Stack>
        </Box>
    )
}
export default TopBar;






