import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Guest, UnifiedTableData } from '../layoutEven/layoutEven';
import Badge from '~/layoutEven/ItemSVGUser';
import BadgeMan from '~/layoutEven/ItemSVGUserMan';
import BlingDot from '~/layoutEven/BlingDot';
interface BenchTableRenderProps {
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
}

const seatSize = 35;
const seatGap = 4;

function renderBenchSeats(
  table: UnifiedTableData,
  guests: Guest[],
  createSeat: (x: number, y: number, seatID: string, guest?: Guest) => React.JSX.Element
) {
  const seatElements: React.JSX.Element[] = [];
  const w = table.width ?? 195;
  const count = Math.min(table.currentSeatCount ?? 0, Math.floor(w / (seatSize + seatGap)));
  const idPrefix = `bench${table.tableNumber}`;
  let seatIndex = 1;

  for (let i = 0; i < count; i++) {
    const ratio = count === 1 ? 0.5 : i / (count - 1);
    const x = ratio * (w - seatSize);
    const y = 2;
    const seatID = `${idPrefix}_${seatIndex++}`;
    const guest = guests.find(g => g.seatID === seatID);
    seatElements.push(createSeat(x, y, seatID, guest));
  }

  return seatElements;
}

const BenchTableRender: React.FC<BenchTableRenderProps> = ({
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
  isActive
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const startAngleRef = useRef<number>(0);
  const currentPosition = useRef({ top: table.top, left: table.left });
  const currentRotate = useRef({ rotation: table.rotation });

  const [localTop, setLocalTop] = useState(table.top);
  const [localLeft, setLocalLeft] = useState(table.left);
  const [localSize, setLocalSize] = useState(table.width ?? 150);
  const [localRotation, setLocalRotation] = useState(table.rotation);
  const [localSeat, setLocalSeat] = useState(table.currentSeatCount);

  // Sync với props khi table thay đổi
  useEffect(() => {
    setLocalTop(table.top);
    setLocalLeft(table.left);
    setLocalSize(table.width ?? 150);
    setLocalRotation(table.rotation);
    setLocalSeat(table.currentSeatCount);
    currentPosition.current = { top: table.top, left: table.left };
    currentRotate.current = { rotation: table.rotation };
  }, [table]);

  const wrapperStyle = {
    top: localTop,
    left: localLeft,
    width: localSize,
    height: table.height,
    transform: `rotate(${localRotation}rad)`,
  };

  const createSeat = useCallback((x: number, y: number, id: string, guest?: Guest) => (
    <div
      key={id}
      id={id}
      className="seat absolute border border-gray-400 rounded-full text-xs flex items-center justify-center"
      style={{
        top: -27,
        left: x,
        width: seatSize,
        height: seatSize,
        backgroundColor: guest ? '#fafffcc15' : '#fff',
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
                rotate={-90}
                centerX={0} 
                viewbox="-21 -67 95 85" 
                height={55}
                centerY={0} 
                customer={0} 
              />
            ) : (
              <BadgeMan 
                text={guest.name} 
                rotate={-90}
                centerX={0} 
                viewbox="-21 -67 95 85" 
                height={55}
                centerY={0} 
                customer={0} 
              />
            )}
          </div>
        ) : (
          id.replace(`bench${table.tableNumber}_`, '')
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
      width: localSize,
      height: table.height ?? 10,
    };
  }, [localSize, table.height]);

  const handleRotateMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    centerRef.current = { x: centerX, y: centerY };
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    startAngleRef.current = Math.atan2(dy, dx) - localRotation;
    
    setIsRotating(true);
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

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isResizing) {
        const dx = e.clientX - startPos.current.x;
        const newWidth = Math.max(80, Math.min(400, startPos.current.width + dx));
        const newSeatCount = Math.floor(newWidth / (seatSize + seatGap));

        setLocalSize(newWidth);
        setLocalSeat(newSeatCount);
        return;
      }

      if (isRotating && wrapperRef.current) {
        const dx = e.clientX - centerRef.current.x;
        const dy = e.clientY - centerRef.current.y;
        const angle = Math.atan2(dy, dx);
        const newRotation = angle - startAngleRef.current;
        
        setLocalRotation(newRotation);
        currentRotate.current = { rotation: newRotation };
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
        const updatedTable: UnifiedTableData = {
          ...table,
          width: localSize,
          currentSeatCount: localSeat,
        };
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
        onDrag?.(index, currentPosition.current.top, currentPosition.current.left, 2);
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
    localSize,
    localSeat,
    table,
    zoomLevel,
  ]);

  const localTable: UnifiedTableData = {
    ...table,
    width: localSize,
    currentSeatCount: localSeat,
    top: localTop,
    left: localLeft,
    rotation: localRotation,
  };

  const seatElements = renderBenchSeats(localTable, guests, createSeat);

  return (
    <div
      id={`banghe_@${table.tableNumber}`}
      className={`table-wrapper item_banghe absolute cursor-pointer ${
        selected ? "zindexitem border-2 border-blue-500" : ""
      } item_save`}
      style={wrapperStyle}
      data-indexsave={index}
      data-type="bench"
      data-indexnumber={table.tableNumber}
      data-parentid={table.groupParentID}
      ref={wrapperRef}
      onClick={(e) => onClick(index, e)}
    >
      <div
        onMouseDown={handleDragMouseDown}
        className={`list_save itemgd absolute ${
          isActive ? "activeSelect" : ""
        } ${table.isSearch ? "activeSearch" : ""}  bg-green-300 border border-gray-400 rounded-md flex items-center justify-center text-lg text-gray-800`}
        style={{
          top: 1,
          width: localSize,
          height: 12,
          fontWeight: '600',
          zIndex: 100,
        }}
      >
        {table.nameTable}
      </div>

      {seatElements}

      <div 
        className="resizer resizer-gd" 
        onMouseDown={handleResizeMouseDown}
      >
        <i style={{ fontSize: "17px" }} className="fa-solid fa-circle-right"></i>
      </div>
      
      <div 
        className="rotate-handle rotate-gd" 
        onMouseDown={handleRotateMouseDown}
      ></div>
    </div>
  );
};

export default BenchTableRender;