import {
    Flex,
    Text,
    Button
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import emptIcon from '../../assets/images/empty.svg';
import { useNavigate } from 'react-router-dom';
import { emptyUIConfig } from '@/services/common';

export const Empty = (props: { emptyUI: emptyUIConfig }): JSX.Element => {
    const navigate = useNavigate()

    const handleAdd = (type: string) => {
        if (type === 'model') {
            navigate('/models/new')
        }
    }

    return (
        <Flex minW={'100%'} direction={'column'} justifyContent={'center'} alignItems={'center'}>
            <img src={emptIcon} alt='' />
            <Text mt={4} mb={2} fontWeight={500} fontSize={'24px'}>{props.emptyUI.heading}</Text>
            <Text mb={8} fontWeight={'normal'} fontSize={'14px'}>{props.emptyUI.description}</Text>
            <Button onClick={() => handleAdd(props.emptyUI.type)} fontWeight={'light'} bg={'mw_orange'} _hover={{ background: 'mw_orange' }}>
                <FiPlus /> <Text ml={2}>{props.emptyUI.button_text}</Text>
            </Button>
        </Flex>
    );
}

