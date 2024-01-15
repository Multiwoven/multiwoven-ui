import { Box, Button, Stack, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const TopBar = (props: any): JSX.Element => {
    const [barConfig, setBarConfig] = useState<any>({});
    const navigate = useNavigate()
    useEffect(() => {
        console.log('props', props);
        setBarConfig(props.topBarConfig);
    }, [props]); // Add props as a dependency to useEffect

    const handleAddExit = (actionType: string) => {
        if (actionType === 'Add') {
            navigate('/models/new')
        } else {
            navigate('/models')
        }
    }
    return (
        <Box bgColor={'transparent'} as="section" pt={{ base: '4', md: '10' }} pb={{ base: '12', md: '12' }}>
            <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
                <Stack spacing="1">
                    <Heading size={{ base: 'xs', md: 'sm' }} fontWeight="medium">
                        {barConfig.heading}
                    </Heading>
                </Stack>
                <Stack direction="row" spacing="3">
                    {barConfig.button_text == "Exit" ?
                        <Button onClick={() => handleAddExit('Exit')} fontWeight={'light'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                            <Text>{barConfig.button_text}</Text>
                        </Button> :
                        <Button onClick={() => handleAddExit('Add')} fontWeight={'light'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                            <FiPlus /> <Text ml={2}>{barConfig.button_text}</Text>
                        </Button>
                    }
                </Stack>
            </Stack>
        </Box>
    );
};

export default TopBar;
