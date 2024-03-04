import { Box, HStack, Spacer, Text, Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ChartCardProps = {
  chartData: any;
  tooltipLabel: string;
  cardTitle: string;
  tooltipPosition?: 'top' | 'top-start' | 'top-end' | undefined;
};

export const ChartCard = ({
  chartData,
  tooltipLabel,
  cardTitle,
  tooltipPosition = 'top',
}: ChartCardProps): JSX.Element => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: 'index' as 'index',
    },
    scales: {
      x: {
        stacked: true,
        barThickness: '10px',
        ticks: {
          maxTicksLimit: 4,
          fontFamily: 'Manrope',
        },
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 1,
          fontFamily: 'Manrope',
        },
      },
    },
  };

  return (
    <Box
      w='356px'
      h='240px'
      px='20px'
      py='16px'
      display='flex'
      gap='3'
      flexDir='column'
      border='1'
      bgColor='gray.100'
      borderWidth='1px'
      borderRadius='8px'
      borderColor='gray.400'
    >
      <HStack>
        <Text size='sm' fontWeight='semibold'>
          {cardTitle}
        </Text>
        <Spacer />
        <ChakraTooltip hasArrow label={tooltipLabel} fontSize='sm' placement={tooltipPosition}>
          <Text color='gray.600'>
            <FiInfo />
          </Text>
        </ChakraTooltip>
      </HStack>
      <Box>
        <Bar height='180px' width='316px' options={options} data={chartData} />
      </Box>
    </Box>
  );
};
