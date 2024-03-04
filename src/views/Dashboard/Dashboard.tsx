import { Stack, Tab, TabIndicator, TabList, Tabs, Box, Text } from '@chakra-ui/react';
import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['2024-03-04T10:10:00.000Z'],
  datasets: [
    {
      label: 'Total',
      data: [2],
      backgroundColor: 'skyblue',
    },
    {
      label: 'Failed',
      data: [0],
      backgroundColor: 'lightcoral',
    },
    {
      label: 'Success',
      data: [2],
      backgroundColor: 'lightgreen',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const TabName = ({ title }: { title: string }) => (
  <Tab
    _selected={{
      backgroundColor: 'gray.100',
      borderRadius: '4px',
      color: 'black.500',
    }}
    color='black.200'
  >
    <Text size='xs' fontWeight='semibold'>
      {title}
    </Text>
  </Tab>
);

const Dashboard = (): JSX.Element => {
  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <ContentContainer>
        <TopBar
          name={'Dashboard'}
          ctaName=''
          ctaButtonVariant='solid'
          onCtaClicked={() => {}}
          isCtaVisible={false}
        />
        <Box>
          <Stack spacing='16'>
            <Tabs
              size='md'
              variant='indicator'
              background='gray.300'
              padding={1}
              borderRadius='8px'
              borderStyle='solid'
              borderWidth='1px'
              borderColor='gray.400'
              width='352px'
            >
              <TabList>
                <TabName title='All Connectors' />
                <TabName title='By Destination' />
                <TabName title='By Source' />
              </TabList>
              <TabIndicator />
            </Tabs>
          </Stack>
        </Box>
        <Bar options={options} data={data} />
      </ContentContainer>
    </Box>
  );
};

export default Dashboard;
