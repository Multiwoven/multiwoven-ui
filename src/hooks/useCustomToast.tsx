
import { useToast, type UseToastOptions } from "@chakra-ui/react";
import Toast, {type customToastStatus} from "../components/Toast/index"

interface showToastProps {
  text: string
}



export default function useCustomToast() {
    const toast = useToast();

    
    const showToast = ({text, status, ...toastOptions}: showToastProps  & UseToastOptions) => {
   
        return toast({
        ...toastOptions,
        render: ({ onClose }) => (<Toast text={text} status={status as customToastStatus} onClose={onClose}/>)
       
      });
    };
  
    return showToast;
}
