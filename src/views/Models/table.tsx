import {
    Avatar,
    HStack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Box,
    Text
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { getAllModels } from '@/services/common';
const members = [
    {
        id: '1',
        method: 'SQL Query',
        name: 'Model 1',
        update_date: '11/08/2024',
        avatarUrl: 'https://bit.ly/code-beast',
    },
]
const ModdelTable = (): JSX.Element => {

    useEffect(() => {
        fetchModels();
    }, [])

    const fetchModels = async () => {
        const result = await getAllModels();
        if (result.success) {
        }
    };

    return (
        <Table>
            <Thead>
                <Tr className='custom_th_fonts'>
                    <Th>Name</Th>
                    <Th>Method</Th>
                    <Th>Last Updated</Th>
                </Tr>
            </Thead>
            <Tbody>
                {members.map((member) => (
                    <Tr key={member.id}>
                        <Td display={'flex'} alignItems={'center'}>
                            <Avatar mr={2} name={member.name} src={member.avatarUrl} boxSize="10" />
                            <Text fontWeight="medium">{member.name}</Text>
                        </Td>
                        <Td><Text color="fg.muted">{member.method}</Text></Td>
                        <Td><Text color="fg.muted">{member.update_date}</Text></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
export default ModdelTable;






