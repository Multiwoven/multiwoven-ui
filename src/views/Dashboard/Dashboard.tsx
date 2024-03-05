import { Box } from '@chakra-ui/react';
import ContentContainer from '@/components/ContentContainer';
import TopBar from '@/components/TopBar';
import { useQuery } from '@tanstack/react-query';

import { getAllConnectors } from '@/services/connectors';
import { useEffect, useState } from 'react';
import ListConnectors from './ListConnectors';
import { ConnectorItem } from '../Connectors/types';

const Dashboard = (): JSX.Element => {
  const [filteredConnectorsList, setFilteredConnectorsList] = useState<ConnectorItem[]>();

  const { data } = useQuery({
    queryKey: ['models'],
    queryFn: () => getAllConnectors(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setFilteredConnectorsList(data?.data);
  }, [data]);

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
          <ListConnectors
            connectorsList={data?.data}
            filteredConnectorsList={filteredConnectorsList}
            setFilteredConnectorsList={setFilteredConnectorsList}
          />
        </Box>
      </ContentContainer>
    </Box>
  );
};

export default Dashboard;
