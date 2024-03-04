import { Stack, Tab, TabIndicator, TabList, Tabs, Box } from '@chakra-ui/react';
import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';

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
            <Tabs size='md' variant='indicator' background='gray.400' padding={1}>
              <TabList>
                <Tab _selected={{ backgroundColor: 'white' }}>All Connectors</Tab>
                <Tab>By Destination</Tab>
                <Tab>By Source</Tab>
              </TabList>
              <TabIndicator />
            </Tabs>
          </Stack>
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Dashboard;
