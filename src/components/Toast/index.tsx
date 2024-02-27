import React from 'react';
import {
    Box,
  } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, Icon } from '@chakra-ui/icons'

interface ToastProps {
    title?: string;
    status?: "success" | "info" | "warning" | "error" | undefined ;
    style?: Object;
}

const CustomToast: React.FC<ToastProps> = ({
    title = '',
    status = undefined,
    style={}
}) => {
    
    const getIcon: () => JSX.Element = () => {
        const color: string = status ? `${status}.400` : 'info.400';

        if (status === 'success') {
          return <Icon as={CheckCircleIcon} color={color} marginRight="16px"  boxSize="20px" />;
        } else {
          return <Icon as={InfoIcon} color={color} marginRight="16px" boxSize="20px" />;
        }
        
    };

    if(status) {
        const bg : string = `${status}.100`;
        const borderColor: string = `${status}.200`;
        return (
            <Box 
                bg={bg} 
                border="1px solid" 
                borderColor={borderColor} 
                width="400px"
                paddingX="16px" 
                paddingY="25px" 
                borderRadius="8px" 
                >
                    {getIcon()}
                    {title}
            </Box>
        );  
    }

    <Box style={style}> {getIcon()} {title}</Box>
}

export default CustomToast