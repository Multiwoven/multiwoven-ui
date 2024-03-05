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
import Badge from '@/components/Badge';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string;
};

type ChartData = {
  labels: string[];
  datasets: Dataset[];
};

type ChartCardProps = {
  chartData: ChartData;
  tooltipLabel: string;
  cardTitle: string;
  chartEmptyText?: string;
  tooltipPosition?: 'top' | 'top-start' | 'top-end' | undefined;
};

const mode = 'index' as const;

export const ChartCard = ({
  chartData,
  tooltipLabel,
  cardTitle,
  tooltipPosition = 'top',
  chartEmptyText = 'No Data found',
}: ChartCardProps): JSX.Element => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: mode,
    },
    scales: {
      x: {
        stacked: true,
        barThickness: '10px',
        ticks: {
          maxTicksLimit: 4,
          fontFamily: 'Manrope',
        },
        grid: { color: '#F2F4F7' },
      },
      y: {
        stacked: true,
        ticks: {
          stepSize: 1,
          fontFamily: 'Manrope',
          maxTicksLimit: 4,
        },
        grid: { color: '#F2F4F7' },
      },
    },
  };

  const totalSum = chartData.datasets.reduce((total, dataset) => {
    const datasetSum = dataset.data.reduce((sum, value) => sum + value, 0);
    return total + datasetSum;
  }, 0);

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
      <Box opacity={totalSum > 0 ? '100%' : '40%'}>
        <Bar height='180px' width='316px' options={options} data={chartData} />
      </Box>
      {totalSum === 0 ? (
        <Box position='relative' left='40%' bottom='60%'>
          <Badge text={chartEmptyText} variant='default' width='fit-content' />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};
