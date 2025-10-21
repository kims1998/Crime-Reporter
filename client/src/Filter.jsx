import React, { useState } from 'react';
import Select, { components } from 'react-select';
import './Styles/Filter.css';

//Variable makes it so that no filter names pop up
const MAX_VISIBLE_TAGS = 1;

const CustomMultiValueContainer = (props) => {
    const { children, data, selectProps } = props;
    const selected = selectProps.value || [];

    if (!data) return <components.MultiValueContainer {...props}>{children}</components.MultiValueContainer>;

    const index = selected.findIndex((val) => val.value === data.value);
    const hiddenCount = selected.length - MAX_VISIBLE_TAGS;

    if (index === MAX_VISIBLE_TAGS) {
        return (
            <div className="more-indicator" style={{ padding: '0 6px', color: '#aaa' }}>
                +{hiddenCount} more
            </div>
        );
    }

    if (index > MAX_VISIBLE_TAGS) return null;

    return <components.MultiValueContainer {...props}>
        {children}
    </components.MultiValueContainer>;
};

const CustomMultiValue = (props) => {
    return <components.MultiValue {...props} />;
};

const customStyles = {
    control: (base) => ({
        ...base,
        minHeight:'40px',
        maxHeight: '40px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        flexWrap: 'nowrap'
    }),
    valueContainer: (base) => ({
        ...base,
        overflowX: 'auto',
        overflowY: 'hidden',
        flexWrap: 'nowrap',
        display: 'flex',
        paddingRight: '10px',
        alignItems: 'center',
        scrollbarWidth: 'thin'
    }),
    multiValue: (base) => ({
        ...base,
        flex: '0 0 auto',
        marginRight: '6px'
    })
};

const CheckboxOption = (props) => {
    return (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={ props.isSelected }
                onChange={() => null }
                style={{ pointerEvents: 'none' }}
            />
            <label style={{ marginLeft: '10px' }}>
                { props.label }
            </label>
        </components.Option>
    );
};

const propertyDamage = [
    { value: '1', label: 'Arson' },
    { value: '2', label: 'Burglary' },
    { value: '3', label: 'Larceny-Theft' },
    { value: '4', label: 'Motor-Theft' }
]

const violentCrimes = [
    { value: '1', label: 'Aggravated Assault' },
    { value: '2', label: 'Manslaughter' },
    { value: '3', label: 'Murder' },
    { value: '4', label: 'Sexual Assault' }
]

const organizedCrimes = [
    { value: '1', label: 'Drug-Trafficking' },
    { value: '2', label: 'Extortion' },
    { value: '3', label: 'Racketeering' },
    { value: '4', label: 'Placeholder' },
]

const victimlessCrimes = [
    { value: '1', label: 'Illegal Gambling' },
    { value: '2', label: 'Drug Possession' },
    { value: '3', label: 'Public Intoxication' },
    { value: '4', label: 'Placeholder' },
]

const misdemeanors = [
    { value: '1', label: 'Disorderly Conduct' },
    { value: '2', label: 'Resisting Arrest' },
    { value: '3', label: 'Trespassing' },
    { value: '4', label: 'Underage Drinking' },
]

//variable created to reduce duplicates name and options
const crimeCategories = [
    { name: 'Property Damage', options: propertyDamage },
    { name: 'Violent Crime', options: violentCrimes },
    { name: 'Organized Crime', options: organizedCrimes },
    { name: 'Victimless Crime', options: victimlessCrimes },
    { name: 'Misdemeanor Crime', options: misdemeanors}
];

const DropdownMenu = () => {
    const [selectedOptions, setSelectedOptions] = useState({
        'Property Damage': [],
        'Violent Crime': [],
        'Organized Crime': [],
        'Victimless Crime': [],
        'Misdemeanor Crime': []
    });

    const handleChange = (selected, actionMeta) => {
        const categoryName = actionMeta.name;

        setSelectedOptions((prev) => ({
            ...prev,
            [categoryName]: selected || []
        }));
    };

    //Removes all Filters Selected
    const handleReset = () => {
        const clearSelections = {};
        crimeCategories.forEach(category => {
            clearSelections[category.name] = [];
        });
        setSelectedOptions(clearSelections);
    };

    return (
        <div className="filter-section">
            {crimeCategories.map((category) => (
                <Select
                    key={ category.name }
                    isMulti
                    isSearchable={ false }
                    placeholder={ category.name }
                    name={ category.name}
                    options={ category.options }
                    styles={ customStyles }
                    value={ selectedOptions[category.name] }
                    onChange={ handleChange }
                    components={{
                        Option: CheckboxOption,
                        MultiValueContainer: CustomMultiValueContainer,
                        MultiValue: CustomMultiValue
                    }}
                    closeMenuOnSelect={ false }
                    hideSelectedOptions={ false }
                />
            ))}
            <button onClick={ handleReset } className="resetBtn">
                Reset Filters
            </button>
        </div>
    );
};

export default DropdownMenu;