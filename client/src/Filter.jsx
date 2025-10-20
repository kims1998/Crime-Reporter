import React, {useState} from 'react';
import Select, { components } from 'react-select';

const CheckboxOption = ({isSelected, ...props}) => {
    return (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={ isSelected }
                onChange={() => null }
            />
            <label style={{ marginLeft: '10px' }}>
                { props.label }
            </label>
        </components.Option>
    );
};

const options = [
    { value: '1', label: 'Arson' },
    { value: '2', label: 'Theft' },
    { value: '3', label: 'Murder' },
    { value: '4', label: 'Property Damage' }
]

const MultiSelectWithCheckboxes = () => {
    const [ selectedOptions, setSelectedOptions ] = useState([]);

    const handleChange = (selected) => {
        setSelectedOptions(selected);
    };

    return (
        <Select
            isMulti
            name={"Crime"}
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            components={{ Option: CheckboxOption }}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
        />
    );
};

export default MultiSelectWithCheckboxes;