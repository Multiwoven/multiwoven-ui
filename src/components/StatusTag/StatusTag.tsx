import { Tag, Text } from '@chakra-ui/react';

type StatusTagVariants = 'success' | 'error';

type StatusTagProps = {
  variant?: StatusTagVariants;
  status: string;
};

type VariantTheme = Record<
  StatusTagVariants,
  {
    bgColor: string;
    borderColor: string;
    textColor: string;
  }
>;

const StatusTag = ({ status, variant = 'success' }: StatusTagProps) => {
  const theme: VariantTheme = {
    success: {
      bgColor: 'success.100',
      borderColor: 'success.300',
      textColor: 'success.600',
    },
    error: {
      bgColor: 'error.100',
      borderColor: 'error.300',
      textColor: 'error.600',
    },
  };
  return (
    <Tag
      colorScheme='teal'
      size='xs'
      bgColor={theme[variant].bgColor}
      paddingX={2}
      fontWeight={600}
      borderColor={theme[variant].borderColor}
      borderWidth='1px'
      borderStyle='solid'
      height='22px'
      borderRadius='4px'
    >
      <Text size='xs' fontWeight='semibold' color={theme[variant].textColor}>
        {status}
      </Text>
    </Tag>
  );
};

export default StatusTag;
