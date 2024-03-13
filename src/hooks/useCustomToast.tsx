import { useToast, type UseToastOptions } from '@chakra-ui/react';
import Toast, { CustomToastStatus } from '../components/Toast/index';

interface showToastProps {
  text: string;
  status?: CustomToastStatus;
}

export default function useCustomToast() {
  const toast = useToast();

  const showToast = ({
    text,
    status = CustomToastStatus.Default,
    ...toastOptions
  }: Omit<UseToastOptions, 'status'> & showToastProps) => {
    return toast({
      ...toastOptions,
      render: ({ onClose }) => <Toast text={text} status={status} onClose={onClose} />,
    });
  };

  return showToast;
}
