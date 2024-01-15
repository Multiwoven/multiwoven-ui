import {
    Avatar,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
const ModdelTable = (props: any): JSX.Element => {
    const [list, setList] = useState<any>([])
    useEffect(() => {
        setList(props?.modelList);
    }, [props])
    return (
        <Table>
            <Thead>
                <Tr className='custom_th_fonts'>
                    <Th>Name</Th>
                    <Th>Method</Th>
                    <Th>Last Updated</Th>
                    {props.mode_screen_type === 'sources' && <Th>Status</Th>}
                </Tr>
            </Thead>
            <Tbody>
                {list?.map((member: any) => (
                    <Tr key={member.id}>
                        <Td display={'flex'} alignItems={'center'}>
                            <Avatar mr={2} name={member.name} src={member.avatarUrl} boxSize="10" />
                            <Text fontWeight="medium">{member.name}</Text>
                        </Td>
                        <Td><Text color="fg.muted">{member.method}</Text></Td>
                        <Td><Text color="fg.muted">{member.update_date}</Text></Td>
                        {props.mode_screen_type === 'sources' && <Td><Text color="fg.muted">Active</Text></Td>}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}
export default ModdelTable;






