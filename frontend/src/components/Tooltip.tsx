import React, { useState } from 'react';

export enum TooltipType {
    Hover = 0,
    LeftClick = 1
}

interface TooltipProps {
    tooltipType: TooltipType;
    text: string;
    children: React.ReactNode;
}

const Tooltip = ({ tooltipType, text, children }: TooltipProps) => {
    const [tooltipActive, setTooltipActive] = useState<boolean>(false);

    const handleClick = () => {
        setTooltipActive((prev) => !prev);
    }

    const handleMouseEnter = () => {
        setTooltipActive(true);
    }

    const handleMouseLeave = () => {
        setTooltipActive(false);
    }

    const triggerProps = tooltipType === TooltipType.Hover
        ? { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
        : { onClick: handleClick };
    
    return (
        <div {...triggerProps} className='relative block'>
            <div
                className={`
                    bg-[#4545459a]
                    absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                    w-max max-w-xs px-2 py-1
                    text-center text-sm rounded-lg
                    transition-opacity duration-100 ease-linear
                    text-white
                    ${tooltipActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
            >
                {text}
            </div>
            {children}
        </div>
    );
}

export default Tooltip;