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
    
    const getIcon = () => {
        const color: string = status ? `${status}.400` : 'info.400';
        
        if (status === 'success') {
          return <Icon as={CheckCircleIcon} color={color} marginRight="16px"  boxSize="20px" />;
        } else {
          return <Icon as={InfoIcon} color={color} marginRight="16px" boxSize="20px" />;
        }
        // Add more conditions for other statuss if needed
      };

    if(status === 'success') return (
        <Box 
            bg="success.100" 
            border="1px solid" 
            borderColor="success.200" 
            width="400px"
            paddingX="16px" 
            paddingY="20px" 
            borderRadius="8px" 
            >
                {getIcon()}
                {title}
        </Box>
    );  

    if(status === 'info') return (
        <Box 
            bg="info.100" 
            border="1px solid" 
            borderColor="info.200" 
            width="400px"
            paddingX="16px" 
            paddingY="20px" 
            borderRadius="8px" 
            >
                {getIcon()}
                {title}
        </Box>
    ); 


    if(status === 'warning') return (
        <Box 
            bg="warning.100" 
            border="1px solid" 
            borderColor="warning.200" 
            width="400px"
            paddingX="16px" 
            paddingY="20px" 
            borderRadius="8px" 
            >
                {getIcon()}
                {title}
        </Box>
    ); 


    if(status === 'error') return (
        <Box 
            bg="error.100" 
            border="1px solid" 
            borderColor="error.200" 
            width="400px"
            paddingX="16px" 
            paddingY="20px" 
            borderRadius="8px" 
            >   
                {getIcon()}
                {title}
        </Box>
    ); 
    
    <Box style={style}> {getIcon()} {title}</Box>
}

export default CustomToast