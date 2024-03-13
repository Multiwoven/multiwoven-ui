import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, Icon, CloseIcon } from '@chakra-ui/icons';

export enum CustomToastStatus {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Default = 'default',
}
interface CustomToastIconProps {
  status: CustomToastStatus;
}
interface ToastProps {
  text: string;
  status: CustomToastStatus;
  toastContainerStyle?: Record<string, string>;
  onClose: () => void;
}

const CustomToastIcon: React.FC<CustomToastIconProps> = ({
  status = CustomToastStatus.Default,
}) => {
  const color: string = status ? `${status}.400` : 'info.400';
  return (
    <Icon
      as={status === CustomToastStatus.Success ? CheckCircleIcon : InfoIcon}
      color={color}
      marginRight='16px'
      boxSize='20px'
    />
  );
};

const Toast: React.FC<ToastProps> = ({
  text = '',
  status = CustomToastStatus.Default,
  toastContainerStyle = {},
  onClose = () => {},
}) => {
  let backgroundColor: string = `${status}.100`;
  let borderColor: string = `${status}.200`;

  if (status === CustomToastStatus.Default) {
    backgroundColor = 'info.100';
    borderColor = 'info.200';
  }

  return (
    <Box
      bg={backgroundColor}
      border='1px solid'
      borderColor={borderColor}
      width='400px'
      paddingX='16px'
      paddingY='25px'
      borderRadius='8px'
      display='flex'
      justifyContent='space-between'
      style={toastContainerStyle}
    >
      <Box display='flex' justifyContent='flex-start' alignItems='center'>
        <CustomToastIcon status={status as CustomToastStatus} />
        <Text>{text}</Text>
      </Box>

      <Button variant='unstyled' width='auto' onClick={onClose} marginX='16px'>
        <Icon as={CloseIcon} color='black.100' boxSize='20px' />
      </Button>
    </Box>
  );
};

export default Toast;
