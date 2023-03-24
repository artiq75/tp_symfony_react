import React from 'react'

const InfoIconLabel = ({icon, label, value }) => {
    const styleIcon = { width: '25px', height: '25px' }
    return (
        <div className='flex items-center p-1 m-1 pb-5'>
            <icon.iconName className='mr-1' style={styleIcon} />
            <span className='font-bold mr-1'>
                {label} : {value}
            </span>
        </div>
    )
}

export default InfoIconLabel