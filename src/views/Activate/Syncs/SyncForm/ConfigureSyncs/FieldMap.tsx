import EntityItem from '@/components/EntityItem';
import { Box, Select } from '@chakra-ui/react';
import TemplateDropdown from './TemplateDropdown';

type FieldMapProps = {
  id: number;
  fieldType: 'model' | 'destination';
  icon: string;
  entityName: string;
  options: string[];
  disabledOptions?: string[];
  isDisabled: boolean;
  onChange: (id: number, type: 'model' | 'destination', value: string) => void;
  selectedConfigOptions?: string[];
};

const FieldMap = ({
  id,
  fieldType,
  icon,
  entityName,
  options,
  disabledOptions = [],
  onChange,
  isDisabled,
  selectedConfigOptions,
}: FieldMapProps): JSX.Element => {
  return (
    <Box width='100%'>
      <Box marginBottom='10px'>
        <EntityItem icon={icon} name={entityName} />
      </Box>
      <Box position='relative'>
        {fieldType === 'destination' ? (
          <Select
            value={selectedConfigOptions?.[id]}
            placeholder={`Select a field from ${entityName}`}
            backgroundColor={isDisabled ? 'gray.300' : 'gray.100'}
            isDisabled={isDisabled}
            onChange={(e) => onChange(id, fieldType, e.target.value)}
            isRequired
            borderWidth='1px'
            borderStyle='solid'
            borderColor={isDisabled ? 'gray.500' : 'gray.400'}
            color='black.500'
          >
            {options.map((option) => (
              <option key={option} value={option} disabled={disabledOptions.includes?.(option)}>
                {option}
              </option>
            ))}
          </Select>
        ) : (
          <TemplateDropdown entityName={entityName} isDisabled={isDisabled} />
        )}
      </Box>
    </Box>
  );
};

export default FieldMap;
