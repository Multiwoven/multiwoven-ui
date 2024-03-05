import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, Icon, CloseIcon } from '@chakra-ui/icons';

export type customToastStatus = 'success' | 'info' | 'warning' | 'error' | undefined;

interface CustomToastIconProps {
  status?: customToastStatus;
}
interface ToastProps {
  text?: string;
  status?: customToastStatus;
  style?: Record<string, string>;
  onClose?: () => void;
}

const CustomToastIcon: React.FC<CustomToastIconProps> = ({ status }) => {
  const color: string = status ? `${status}.400` : 'info.400';
  return (
    <Icon
      as={status === 'success' ? CheckCircleIcon : InfoIcon}
      color={color}
      marginRight='16px'
      boxSize='20px'
    />
  );
};

const Toast: React.FC<ToastProps> = ({
  text,
  status = undefined,
  style = {},
  onClose = () => {},
}) => {
  if (status) {
    const bg: string = `${status}.100`;
    const borderColor: string = `${status}.200`;
    return (
      <Box
        bg={bg}
        border='1px solid'
        borderColor={borderColor}
        width='400px'
        paddingX='16px'
        paddingY='25px'
        borderRadius='8px'
        display='flex'
        justifyContent='space-between'
      >
        <Box display='flex' justifyContent='flex-start' alignItems='center'>
          <CustomToastIcon status={status} />
          <Box>{text}</Box>
        </Box>

        <Button variant='unstyled' width='auto' onClick={onClose} marginX='16px'>
          <Icon as={CloseIcon} color='black.100' boxSize='20px' />
        </Button>
      </Box>
    );
  }

  <Box style={style}>
    <CustomToastIcon status={status} />
    {text}
  </Box>;
};

export default Toast;
