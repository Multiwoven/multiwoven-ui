import {
    Flex,
    Text,
    Button
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { emptyUIConfig } from '@/services/common';
interface EmptyProps {
    emptyUI: emptyUIConfig;
    cancelPop: ((type: string) => void) | null;
}
export const Empty = (props: EmptyProps): JSX.Element => {
    const navigate = useNavigate()

    const handleAdd = (type: string) => {
        if (type === 'model') {
            navigate('/models/new')
        } else if (type === 'exit') {
            navigate('/models')
        } else if (type === 'cancel' && props.cancelPop) {
            props.cancelPop(type);
        }

    }

    return (
        <Flex minW={'100%'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <img src={props.emptyUI.image} alt='' />
            <Text mt={4} mb={2} fontWeight={500} fontSize={'24px'}>{props.emptyUI.heading}</Text>
            <Text mb={8} fontWeight={'normal'} fontSize={'14px'}>{props.emptyUI.description}</Text>

            {props.emptyUI.type === 'exit' ? <Flex>
                <Button onClick={() => handleAdd('cancel')} color={'dark_gray'} fontWeight={'600'} bg={'light_gray'} _hover={{ background: 'light_gray' }}>
                    <Text>Cancel</Text>
                </Button>
                <Button minW={'80px'} ml={4} onClick={() => handleAdd(props.emptyUI.type)} fontWeight={'600'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                    <Text ml={0}>{props.emptyUI.button_text}</Text>
                </Button>
            </Flex> :
                <Button onClick={() => handleAdd(props.emptyUI.type)} fontWeight={'600'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                    <FiPlus /> <Text ml={2}>{props.emptyUI.button_text}</Text>
                </Button>
            }
        </Flex>
    );
}

