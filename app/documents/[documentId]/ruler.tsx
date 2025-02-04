'use client'
import React, { useRef, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { useStorage, useMutation } from '@liveblocks/react';

const markers = Array.from({ length: 83 }, (_, i) => i);
const Ruler = () => {
    const leftMargin = useStorage((root) => root.leftMargin) ?? 56
    const setLeftMargin = useMutation(({ storage }, position: number) => {
        storage.set("leftMargin", position)
    },[])

    const rightMargin = useStorage((root) => root.rightMargin) ?? 56
    const setRightMargin = useMutation(({ storage }, position: number) => {
        storage.set("rightMargin", position)
    }, [])

    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);
    const rulerRef = useRef<HTMLDivElement>(null);

    const handleMouseDownLeft = () => {
        setIsDraggingLeft(true);
    }
    const handleMouseDownRight = () => {
        setIsDraggingRight(true);
    }
    const handleMouseMove = (e: React.MouseEvent) => {
        if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
            const container = rulerRef.current.querySelector('#ruler-container');
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const relativeX = e.clientX - containerRect.left;
                const rawPosition = Math.max(0, Math.min(816, relativeX));

                if (isDraggingLeft) {
                    const maxLeftPosition = 816 - rightMargin - 100;
                    const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
                    setLeftMargin(newLeftPosition); // make collab
                } else if (isDraggingRight) {
                    const maxRightPosition = 816 - (leftMargin + 100);
                    const newRightPosition = Math.max(816 - rawPosition, 0);
                    const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
                    setRightMargin(constrainedRightPosition);
                }
            }
        }

    }
    const handleMouseUp = () => {
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
    }

    const handleLeftDoubleClick = () => {
        setLeftMargin(56);
    }
    const handleRightDoubleClick = () => {
        setRightMargin(56);
    }
    return (
        <div ref={rulerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
            className='border-b border-gray-300 h-6 flex items-end relative select-none print:hidden'>
            <div className='max-w-[816px] h-full w-full relative mx-auto' id='ruler-container'>
                <Marker position={leftMargin} isLeft={true} isDragging={isDraggingLeft} onMouseDown={handleMouseDownLeft} onDoubleClick={handleLeftDoubleClick} />
                <Marker position={rightMargin} isLeft={false} isDragging={isDraggingRight} onMouseDown={handleMouseDownRight} onDoubleClick={handleRightDoubleClick} />
                <div className='absolute h-full inset-x-0 bottom-0'></div>
                <div className='relative h-full w-[816px]'></div>
                {markers.map((marker) => {
                    const position = (marker * 816) / 82;
                    return (
                        <div key={marker}
                            className='absolute bottom-0'
                            style={{ left: `${position}px` }}>
                            {marker % 10 === 0 && (
                                <>
                                    <div className='absolute bottom-0  w-[1px] h-2 bg-neutral-500' />
                                    <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                                        {marker / 10 + 1}
                                    </span>
                                </>
                            )}
                            {marker % 5 === 0 && marker % 10 !== 0 && (
                                <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                            )}
                            {marker % 5 !== 0 && (
                                <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

const Marker = ({
    position,
    isLeft,
    isDragging,
    onMouseDown,
    onDoubleClick,
}: MarkerProps) => {
    return (
        <div className='absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2'
            style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className='fill-blue-500 top-0 left-1/2 absolute h-full transform -translate-x-1/2' />
            <div style={{ height: '100vh', width: '1px', transform: 'scaleX(0.5)', backgroundColor: '#3b72f6', display: isDragging ? 'block' : 'none' }} className='absolute top-4 left-1/2 transform -translate-x-1/2 duration-150' />
        </div>
    )
}

export default Ruler
