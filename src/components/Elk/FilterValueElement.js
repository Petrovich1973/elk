import React from 'react'
import InputMask from "react-input-mask";

export default function FilterValueElement({
                                               acceptedFilters = '',
                                               acceptedValues = '',
                                               acceptedValues2 = '',
                                               setAcceptedValues = () => console.log('setAcceptedValues'),
                                               setAcceptedValues2 = () => console.log('setAcceptedValues'),
                                               getFieldType = ''
                                           }) {

    const getMask = type => {
        switch (type) {
            case 'NUMBER':
                return '999999999999999999999999'
            case 'DATE_TIME':
                return '9999-99-99T99:99:99.999999'
            case 'DATE':
                return '9999-99-99'
            default:
                return ''
        }
    }

    // const getExtension = () => {
    //     switch (acceptedFilters) {
    //         case "EQUAL":
    //             return mask
    //         case "BETWEEN":
    //             return mask
    //         case 'GT':
    //             return mask
    //         case 'GTE':
    //             return mask
    //         case 'LT':
    //             return mask
    //         case 'LTE':
    //             return mask
    //         case 'LIKE':
    //             return mask
    //         case 'IS_NULL':
    //             return mask
    //         case 'IS_NOT_NULL':
    //             return mask
    //         default:
    //             return mask
    //     }
    // }

    return (
        <div className={'elk_filter_input-double'}>
            <InputMask
                mask={getMask(getFieldType)}
                format="####"
                maskChar={null}
                disabled={!acceptedFilters}
                type="text"
                placeholder={getFieldType}
                value={acceptedValues}
                onChange={e => setAcceptedValues(e.target.value)}/>
            {acceptedFilters === 'BETWEEN'
                && <InputMask
                    mask={getMask(getFieldType)}
                    maskChar={null}
                    disabled={!acceptedFilters}
                    type="text"
                    placeholder={getFieldType}
                    value={acceptedValues2}
                    onChange={e => setAcceptedValues2(e.target.value)}/>}
        </div>
    )
}