import { topBarConfigType, emptyUIConfig } from '@/services/common';
import { Box, Button, Stack, Heading, Text, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Empty } from './empty';
import ExitIcon from '../../assets/images/exit.svg';

const emptyUI: emptyUIConfig = {
    heading: 'Are you sure you want to exit?',
    description: 'Your progress will be lost',
    type: 'exit',
    button_text: 'Exit',
    image: ExitIcon
}

const TopBar = (props: { topBarConfig: topBarConfigType }): JSX.Element => {
    const [barConfig, setBarConfig] = useState<any>({});
    const [exitPop, setExitPop] = useState<Boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        setBarConfig(props.topBarConfig);
    }, [props]); // Add props as a dependency to useEffect

    const handleAddExit = (actionType: string) => {
        if (actionType === 'Add') {
            navigate('/models/new')
        } else {
            setExitPop(true)
        }
    }
    const handleCancel=()=>{
        setExitPop(false)
    }
    return (
        <>
            <Box bgColor={'transparent'} as="section" pt={{ base: '4', md: '10' }} pb={{ base: '12', md: '12' }}>
                <Stack spacing="4" direction={{ base: 'column', md: 'row' }} justify="space-between">
                    <Stack spacing="1">
                        <Heading size={{ base: 'xs', md: 'sm' }} fontWeight="medium">
                            {barConfig.heading}
                        </Heading>
                    </Stack>
                    <Stack direction="row" spacing="3">
                        {barConfig.button_text == "Exit" ?
                            <Button color={'dark_gray'} onClick={() => handleAddExit('Exit')} fontWeight={'600'} bg={'light_gray'} _hover={{ background: 'light_gray' }}>
                                <Text>{barConfig.button_text}</Text>
                            </Button> :
                            <Button onClick={() => handleAddExit('Add')} fontWeight={'light'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                                <FiPlus /> <Text ml={2}>{barConfig.button_text}</Text>
                            </Button>
                        }
                    </Stack>
                </Stack>
            </Box>
            {exitPop && <Container className='custom_main_model_form' minW={'100%'}><Empty emptyUI={emptyUI} cancelPop={()=>handleCancel()} /></Container>}
        </>
    );
};

export default TopBar;
