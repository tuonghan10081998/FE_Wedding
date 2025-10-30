import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Guest, UnifiedTableData,FontSize } from './layoutEven';
import Badge from '~/layoutEven/ItemSVGUser';
import BadgeMan from '~/layoutEven/ItemSVGUserMan';
import BlingDot from '~/layoutEven/BlingDot';
interface SquareTableRenderProps {
  table: UnifiedTableData;
  index: number;
  selected: boolean;
  guests: Guest[];
  zoomLevel?: number;
  onGuestSeatChange?: (guestId: string, newSeatID: string | null) => void;
  onResize: (index: number, newTable: UnifiedTableData) => void;
  onRotate?: (index: number, newRotation: number) => void;
  onDrag?: (index: number, newTop: number, newLeft: number, type: number) => void;
  onClick: (index: number, event: React.MouseEvent) => void;
  isActive: boolean;
  fontSize:FontSize,
  isViewBan:boolean
}

const seatSize = 32;
const seatGap = 4;

function renderSeatsBV(
  table: UnifiedTableData,
  guests: Guest[],
  createSeat: (x: number, y: number, seatID: string, guest?: Guest, side?: string) => React.JSX.Element,
  inputSeatCount?: number
) {
  const seatElements: React.JSX.Element[] = [];

  const w = table.width ?? 160;
  const h = table.height ?? 80;
  const idPrefix = `bvuong${table.tableNumber}`;
  let seatIndex = 1;

  const seatSlotSize = seatSize + seatGap;
  const topMax = Math.floor(w / seatSlotSize);
  const leftMax = Math.floor(h / seatSlotSize);

  let remainingSeats = inputSeatCount ?? 0;

  const makeSeat = (x: number, y: number, side: string) => {
    const seatID = `${idPrefix}_${seatIndex++}`;
    const guest = guests.find((g) => g.seatID === seatID);
    return createSeat(x, y, seatID, guest, side);
  };

  const getPositionCoords = (pos: string, i: number, count: number) => {
    const ratio = count === 1 ? 0.5 : i / (count - 1);

    switch (pos) {
      case "top":
        return {
          x: ratio * (w - seatSize),
          y: -seatSize - seatGap,
        };
      case "bottom":
        return {
          x: ratio * (w - seatSize),
          y: h + seatGap,
        };
      case "left":
        return {
          x: -seatSize - seatGap,
          y: ratio * (h - seatSize),
        };
      case "right":
        return {
          x: w + seatGap,
          y: ratio * (h - seatSize),
        };
      default:
        return { x: 0, y: 0 };
    }
  };

  const sides = ["top", "bottom", "left", "right"];
  for (const side of sides) {
    const max = side === "top" || side === "bottom" ? topMax : leftMax;
    const count = Math.min(remainingSeats, max);
    
    for (let i = 0; i < count; i++) {
      const { x, y } = getPositionCoords(side, i, count);
      seatElements.push(makeSeat(x, y, side));
    }
    
    remainingSeats -= count;
    if (remainingSeats <= 0) break;
  }

  return seatElements;
}

const SquareTableRender: React.FC<SquareTableRenderProps> = ({
  table,
  index,
  selected,
  guests,
  onGuestSeatChange,
  onResize,
  onRotate,
  zoomLevel = 1,
  onDrag,
  onClick,
  isActive,
   fontSize,
   isViewBan
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startAngleRef = useRef<number>(0);
  const dragOffset = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ top: table.top, left: table.left });
  const currentRotate = useRef({ rotation: table.rotation });

  const [localTop, setLocalTop] = useState(table.top);
  const [localLeft, setLocalLeft] = useState(table.left);
  const [localWidth, setLocalWidth] = useState(table.width ?? 160);
  const [localHeight, setLocalHeight] = useState(table.height ?? 80);
  const [localRotation, setLocalRotation] = useState(table.rotation);
  const [localSeat, setLocalSeat] = useState(table.currentSeatCount);
  const [initialRotation, setInitialRotation] = useState(table.rotation || 0);

  // Sync với props khi table thay đổi
  useEffect(() => {
    setLocalTop(table.top);
    setLocalLeft(table.left);
    setLocalWidth(table.width ?? 160);
    setLocalHeight(table.height ?? 80);
    setLocalRotation(table.rotation);
    setLocalSeat(table.currentSeatCount);
    setInitialRotation(table.rotation || 0);
    currentPosition.current = { top: table.top, left: table.left };
    currentRotate.current = { rotation: table.rotation };
  }, [table]);

  const wrapperStyle = {
    top: localTop,
    left: localLeft,
    width: localWidth,
    height: localHeight,
    transform: `rotate(${localRotation}rad)`,
  };

  const createSeat = useCallback((x: number, y: number, id: string, guest?: Guest, side?: string) => (
    <div
      key={id}
      id={id}
      className="seat absolute border border-gray-400 rounded-full text-xs flex items-center justify-center"
      style={{
        top: side === "top" ? y + 7 : y,
        left: x,
        width: seatSize,
        height: seatSize,
        backgroundColor: guest ? '#fff' : '#fff',
        fontSize:fontSize.fontSizeSeat
      }}
    >
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('guestId', guest?.guestID?.toString() || '');
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const guestIdStr = e.dataTransfer.getData('guestId');
          if (guestIdStr && !guests.some((g) => g.seatID === id)) {
            onGuestSeatChange?.(guestIdStr, id);
          }
        }}
        className="cursor-move fa-user usercutomer"
      >
         <div className={`absolute z-[10]`}>
              {guest?.isSearch &&  <BlingDot/>} 
          </div>
        {(guest && guest.isView) ? (
          <div className="flex flex-col items-center justify-center text-[10px] leading-tight">
            
            {guest.gender === "Nữ" ? (
              <Badge 
                text={guest.name} 
                rotate={side === "top" ? -90 : side === "left" ? -180 : side === "bottom" ? 90 : 0}
                centerX={0} 
                viewbox={side === "right" ? "-20 -15 95 85" : side === "left" ? "-72 -70 95 85" : side === "bottom" ? "-75 -20 95 85" : "-21 -67 95 85"} 
                height={55}
                centerY={0} 
                customer={0} 
              />
            ) : (
              <BadgeMan 
                text={guest.name} 
                rotate={side === "top" ? -90 : side === "left" ? -180 : side === "bottom" ? 90 : 0}
                centerX={0} 
                viewbox={side === "right" ? "-20 -15 95 85" : side === "left" ? "-72 -70 95 85" : side === "bottom" ? "-75 -20 95 85" : "-21 -67 95 85"} 
                height={55}
                centerY={0} 
                customer={0} 
              />
            )}
          </div>
        ) : (
          id.replace(`bvuong${table.tableNumber}_`, '')
        )}
      </div>
    </div>
  ), [guests, onGuestSeatChange, table.tableNumber]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: localWidth,
      height: localHeight,
    };
  }, [localWidth, localHeight]);

  const handleRotateMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    centerRef.current = { x: centerX, y: centerY };

    const startX = e.clientX - centerX;
    const startY = e.clientY - centerY;

    const currentRotation = localRotation || 0;
    const startAngle = Math.atan2(startY, startX) - (currentRotation * Math.PI / 180);

    startAngleRef.current = startAngle;
    setInitialRotation(currentRotation);
    setIsRotating(true);
  }, [localRotation]);

  const handleDragMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('resizer') ||
      target.classList.contains('rotate-handle') ||
      target.classList.contains('leading-tight') ||
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

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isResizing) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;

        const newWidth = Math.max(80, Math.min(400, startPos.current.width + dx));
        const newHeight = Math.max(40, Math.min(300, startPos.current.height + dy));

        const seatCountTop = Math.floor(newWidth / (seatSize + seatGap));
        const seatCountLeft = Math.floor(newHeight / (seatSize + seatGap));
        const totalSeats = (seatCountTop + seatCountLeft) * 2;

        setLocalWidth(newWidth);
        setLocalHeight(newHeight);
        setLocalSeat(totalSeats);
        return;
      }

      if (isRotating) {
        const dx = e.clientX - centerRef.current.x;
        const dy = e.clientY - centerRef.current.y;

        const currentAngle = Math.atan2(dy, dx);
        const deltaAngle = currentAngle - startAngleRef.current;

        const deg = initialRotation + (deltaAngle * 3) / Math.PI;
        setLocalRotation(deg);
        currentRotate.current = { rotation: deg };
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

        const seatCountTop = Math.floor(localWidth / (seatSize + seatGap));
        const seatCountLeft = Math.floor(localHeight / (seatSize + seatGap));
        const totalSeats = (seatCountTop + seatCountLeft) * 2;

        const updatedTable: UnifiedTableData = {
          ...table,
          width: localWidth,
          height: localHeight,
          currentSeatCount: totalSeats,
        };

        setLocalSeat(totalSeats);
        onResize(index, updatedTable);
        return;
      }

      if (isRotating) {
        setIsRotating(false);
        onRotate?.(index, currentRotate.current.rotation);
        return;
      }

      if (isDragging) {
        setIsDragging(false);
        onDrag?.(index, currentPosition.current.top, currentPosition.current.left, 1);
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
    index,
    onResize,
    onRotate,
    onDrag,
    localWidth,
    localHeight,
    table,
    zoomLevel,
    initialRotation,
  ]);

  const localTable: UnifiedTableData = {
    ...table,
    width: localWidth,
    height: localHeight,
    currentSeatCount: localSeat,
    top: localTop,
    left: localLeft,
    rotation: localRotation,
  };

  const seatElements = renderSeatsBV(localTable, guests, createSeat, localTable.currentSeatCount);

  return (
    <div
      id={`banghe_@${table.tableNumber}`}
      className={`table-wrapper item_save item_banghe absolute ${
        selected ? "zindexitem border-2 border-blue-400" : ""
      }`}
      style={wrapperStyle}
      data-indexbv={index}
      data-indexsave={table.tableNumber}
      data-type="square"
      data-indexnumber={table.tableNumber}
      data-parentid={table.groupParentID}
      ref={wrapperRef}
      onClick={(e) => onClick(index, e)}
    >
      <div
        onMouseDown={handleDragMouseDown}
        className={`table-rect list_save flex ${
          isActive ? "activeSelect" : ""
        } ${table.isSearch ? "activeSearch" : ""} items-center justify-center bg-yellow-200 border border-gray-500 text-center`}
        style={{
          width: '100%',
          height: '100%',
          fontWeight: '600',
          fontSize:fontSize.fontSizeTable
        }}
      >
        {isViewBan ? table.nameTable : table.nameNhom}
      </div>

      {seatElements}

      <div 
        className="rotate-handle rotate-banvuong hidden" 
        onMouseDown={handleRotateMouseDown}
      ></div>
      
      <div 
        className="resizer resize-icon" 
        onMouseDown={handleResizeMouseDown}
      >
        <i style={{ fontSize: "17px" }} className="fa-solid fa-circle-right"></i>
      </div>
    </div>
  );
};

export default SquareTableRender;