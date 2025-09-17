import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Guest, UnifiedTableData } from '../layoutEven/layoutEven';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Badge from '~/layoutEven/ItemSVGUser';
import BadgeMan from '~/layoutEven/ItemSVGUserMan';

interface RoundTableProps {
  table: UnifiedTableData;
  index: number;
  selected: boolean;
  setNextTableNumber: number;
  onClick: (index: number, event: React.MouseEvent) => void;
  onResize: (index: number, newTable: UnifiedTableData) => void;
  onRotate?: (index: number, newRotation: number) => void;
  onDrag?: (index: number, newTop: number, newLeft: number) => void;
  zoomLevel?: number;
  guests: Guest[];
  onGuestSeatChange?: (guestId: string, newSeatID: string | null) => void;
  isActive: boolean;
  onClickSeat: (e: React.MouseEvent, seatID: string) => void;
}

const RoundTable: React.FC<RoundTableProps> = ({
  table,
  index,
  selected,
  setNextTableNumber,
  onClick,
  onResize,
  onRotate,
  onDrag,
  zoomLevel = 1,
  guests,
  onGuestSeatChange,
  isActive,
  onClickSeat
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, size: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ top: table.top, left: table.left });
  const dragOffset = useRef({ x: 0, y: 0 });
  const startAngleRef = useRef(0);

  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialRotation, setInitialRotation] = useState(0);

  const [localTop, setLocalTop] = useState(table.top);
  const [localLeft, setLocalLeft] = useState(table.left);
  const [localSize, setLocalSize] = useState(table.size ?? 100);
  const [localRotation, setLocalRotation] = useState(table.rotation);
  const [localSeat, setLocalSeat] = useState(table.currentSeatCount);

  const getSeatCount = useCallback((size: number) => {
    return Math.min(20, Math.max(2, Math.round(size / 10)));
  }, []);

  // Sync với props khi table thay đổi
  useEffect(() => {
    setLocalTop(table.top);
    setLocalLeft(table.left);
    setLocalSize(table.size ?? 100);
    setLocalRotation(table.rotation);
    setLocalSeat(table.currentSeatCount);
    setInitialRotation(table.rotation);
    currentPosition.current = { top: table.top, left: table.left };
  }, [table]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      size: localSize
    };
  }, [localSize]);

  const handleRotateMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotating(true);

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    centerRef.current = { x: centerX, y: centerY };

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const startAngle = Math.atan2(dy, dx);

    startAngleRef.current = startAngle;
    setInitialRotation(localRotation);
  }, [localRotation]);

  const handleDragMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('resizer') ||
      target.classList.contains('rotate-handle') ||
      target.classList.contains('fa-user') ||
      target.closest('.seat')
    ) {
      return;
    }

    e.stopPropagation();
    setIsDragging(true);

    const rect = wrapperRef.current?.getBoundingClientRect();
    const containerRect = wrapperRef.current?.offsetParent?.getBoundingClientRect();

    if (!rect || !containerRect) return;

    const mouseX = (e.clientX - containerRect.left) / zoomLevel;
    const mouseY = (e.clientY - containerRect.top) / zoomLevel;

    dragOffset.current = {
      x: mouseX - localLeft,
      y: mouseY - localTop,
    };
  }, [localLeft, localTop, zoomLevel]);

  const handleDragStart = useCallback((e: React.DragEvent, guestId: string) => {
    e.dataTransfer.setData('guestId', guestId.toString());
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetSeatID: string) => {
    e.preventDefault();
    const guestIdStr = e.dataTransfer.getData('guestId');
    if (!guestIdStr) return;

    const guestIndex = guests.findIndex((g: Guest) => g.guestID === guestIdStr.toString());
    if (guestIndex === -1) return;

    const seatTaken = guests.some((g: Guest) => g.seatID === targetSeatID);
    if (seatTaken) return;

    onGuestSeatChange?.(guestIdStr, targetSeatID);
  }, [guests, onGuestSeatChange]);

  const handleClick = useCallback((e: React.MouseEvent, seatID: string) => {
    onClickSeat(e, seatID);
  }, [onClickSeat]);

  const getOffsetValues = useCallback((degree: number) => {
    let offsetx = 0, offsety = 0, degxy = 0;

    if (degree >= 0 && degree < 10) {
      offsetx = 2; offsety = 3;
    } else if (degree >= 10 && degree < 20) {
      offsetx = 1; offsety = 4;
    } else if (degree >= 20 && degree < 30) {
      offsetx = 3; offsety = 4;
    } else if (degree >= 30 && degree < 40) {
      offsetx = 2; offsety = 4;
    } else if (degree >= 40 && degree < 50) {
      offsetx = 0; offsety = 3;
    } else if (degree >= 50 && degree < 60) {
      offsetx = 0; offsety = 3;
    } else if (degree >= 60 && degree < 70) {
      offsetx = 2; offsety = 2;
    } else if (degree >= 70 && degree < 80) {
      offsetx = 2; offsety = 2;
    } else if (degree >= 80 && degree < 90) {
      offsetx = 2; offsety = 2;
    } else if (degree >= 90 && degree < 100) {
      offsetx = -0; offsety = 2;
    } else if (degree >= 140 && degree < 150) {
      offsetx = 0; offsety = -2;
    } else if (degree >= 150 && degree < 160) {
      offsetx = -2; offsety = -2;
    } else if (degree >= 160 && degree < 170) {
      offsetx = -2; offsety = -2;
    } else if (degree >= 171 && degree < 180) {
      offsetx = -2; offsety = -3;
    } else if (degree >= 180 && degree < 190) {
      offsetx = -2; offsety = -3;
    } else if (degree >= 190 && degree < 200) {
      offsetx = -2; offsety = -2;
    } else if (degree >= 200 && degree < 210) {
      offsetx = -3; offsety = -5;
    } else if (degree >= 210 && degree < 220) {
      offsetx = -3; offsety = -5;
    } else if (degree >= 220 && degree < 230) {
      offsetx = 0; offsety = -12;
    } else if (degree >= 230 && degree <= 239) {
      offsetx = -5; offsety = -12;
    } else if (degree >= 240 && degree < 250) {
      offsetx = -12; offsety = -12;
    } else if (degree >= 250 && degree < 260) {
      offsetx = -10; offsety = -30;
    } else if (degree >= 260 && degree < 270) {
      offsetx = -20; offsety = -25;
    } else if (degree >= 270 && degree < 280) {
      offsetx = -59; offsety = -55; degxy = -5;
    } else if (degree >= 280 && degree < 290) {
      offsetx = 25; offsety = 25;
    } else if (degree >= 290 && degree < 300) {
      offsetx = 15; offsety = 15;
    } else if (degree >= 300 && degree < 310) {
      offsetx = 10; offsety = 15;
    } else if (degree >= 310 && degree < 320) {
      offsetx = 5; offsety = 15;
    } else if (degree >= 320 && degree < 330) {
      offsetx = 5; offsety = 7;
    } else if (degree >= 330 && degree < 340) {
      offsetx = 5; offsety = 7;
    } else if (degree >= 340 && degree < 350) {
      offsetx = 5; offsety = 5;
    } else if (degree >= 350 && degree <= 369) {
      offsetx = 3; offsety = 5;
    }

    return { offsetx, offsety, degxy };
  }, []);

  const renderSeats = useCallback((idBT: number, localSeat: number, rotate: number) => {
    const seatCount = localSeat;
    const seatSize = 28;
    const center = localSize / 2;
    const radius = center + seatSize / 2;

    return Array.from({ length: seatCount }).map((_, i) => {
      const angle = (2 * Math.PI / seatCount) * i + localRotation;
      const seatID = `btron${idBT}${i}`;
      const deg = angle * 180 / Math.PI;
      const x = center + radius * Math.cos(angle) - seatSize / 2;
      const y = center + radius * Math.sin(angle) - seatSize / 2;
      const guest = guests.find((g: Guest) => g.seatID === seatID);
      
      const degree = (angle * 180 / Math.PI - 90 + 360) % 360;
      const { offsetx, offsety, degxy } = getOffsetValues(degree);

      return (
        <div
          key={i}
          id={seatID}
          className="seat relative border border-gray-400 rounded-full text-xs flex items-center justify-center"
          style={{
            position: 'absolute',
            top: y,
            left: x,
            width: seatSize,
            height: seatSize,
            backgroundColor: guest ? '#fff' : '#fff',
          }}
        >
          <div
            draggable
            onDragStart={(e) => guest && handleDragStart(e, guest.guestID)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, seatID)}
            onClick={(e) => handleClick(e, seatID)}
            className="cursor-move fa-user usercutomer"
          >
            {guest ? (
              <div className="flex flex-col items-center justify-center text-[10px] leading-tight">
                {guest.gender === "Nữ" ? (
                  <Badge 
                    text={guest.name} 
                    rotate={deg + degxy} 
                    centerX={(30 - offsetx) - ((2 * Math.PI / seatCount))} 
                    centerY={(30 + offsety) - ((2 * Math.PI / seatCount))} 
                  />
                ) : (
                  <BadgeMan 
                    text={guest.name} 
                    rotate={deg + degxy} 
                    centerX={(30 - offsetx) - ((2 * Math.PI / seatCount))} 
                    centerY={(30 + offsety) - ((2 * Math.PI / seatCount))} 
                  />
                )}
              </div>
            ) : (
              i + 1
            )}
          </div>
        </div>
      );
    });
  }, [localSize, localRotation, guests, handleDragStart, handleDrop, handleClick, getOffsetValues]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isResizing) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        const delta = Math.max(dx, dy);
        const newSize = Math.max(100, Math.min(200, startPos.current.size + delta));
        
        setLocalSize(newSize);
        setLocalSeat(getSeatCount(newSize));
        return;
      }

      if (isRotating && centerRef.current) {
        const dx = e.clientX - centerRef.current.x;
        const dy = e.clientY - centerRef.current.y;
        const currentAngle = Math.atan2(dy, dx);
        const deltaAngle = currentAngle - startAngleRef.current;
        const newRotation = initialRotation + deltaAngle;
        
        setLocalRotation(newRotation);
        return;
      }

      if (isDragging && wrapperRef.current) {
        const containerRect = wrapperRef.current.offsetParent?.getBoundingClientRect();
        if (!containerRect) return;

        const mouseX = (e.clientX - containerRect.left) / zoomLevel;
        const mouseY = (e.clientY - containerRect.top) / zoomLevel;

        const newLeft = mouseX - dragOffset.current.x;
        const newTop = mouseY - dragOffset.current.y;
        
        setLocalLeft(newLeft);
        setLocalTop(newTop);
        currentPosition.current = { top: newTop, left: newLeft };
        return;
      }
    };

    const handleUp = () => {
      if (isResizing) {
        setIsResizing(false);
        const updatedTable = {
          ...table,
          size: localSize,
          currentSeatCount: getSeatCount(localSize),
        };
        onResize(index, updatedTable);
        return;
      }

      if (isRotating) {
        setIsRotating(false);
        onRotate?.(index, localRotation);
        return;
      }

      if (isDragging) {
        setIsDragging(false);
        onDrag?.(index, currentPosition.current.top, currentPosition.current.left);
        return;
      }
    };

    if (isResizing || isRotating || isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);

      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
      };
    }
  }, [
    isResizing,
    isRotating,
    isDragging,
    localSize,
    table,
    index,
    onResize,
    onRotate,
    onDrag,
    zoomLevel,
    initialRotation,
    localRotation,
    getSeatCount,
  ]);

  return (
    <div
      ref={wrapperRef}
      id={`banghe_@${table.tableNumber}`}
      className={`table-wrapper ${selected ? "zindexitem border-2 border-blue-400" : ""} item_banghe item_save absolute`}
      style={{
        top: localTop,
        left: localLeft,
        width: localSize,
        height: localSize,
      }}
      onClick={(e) => onClick(index, e)}
      data-index={index}
      data-type="round"
      data-indexnumber={table.tableNumber}
    >
      <div
        onMouseDown={handleDragMouseDown}
        className={`listBanTron list_save absolute bg-purple-200 ${
          isActive ? "activeSelect" : ""
        } border border-gray-400 rounded-full flex items-center justify-center text-lg text-gray-700`}
        style={{
          width: localSize,
          height: localSize,
          transform: `translate(-50%, -50%) rotate(${localRotation}rad)`,
          top: '50%',
          left: '50%',
          fontWeight: '600',
          zIndex: 99999,
        }}
      >
        {table.nameTable}
      </div>

      <div 
        className="resizer resizerbt hidden" 
        onMouseDown={handleResizeMouseDown}
      >
        <i style={{ fontSize: "17px" }} className="fa-solid fa-circle-right"></i>
      </div>

      {renderSeats(table.tableNumber, localSeat ?? 0, localRotation)}
    </div>
  );
};

export default React.memo(RoundTable);