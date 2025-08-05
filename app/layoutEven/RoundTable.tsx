import React, { useRef, useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
export interface TableData {
  tableNumber: number;
  shape: 'round';
  size: number;
  top: number;
  left: number;
  rotation: number;
  currentSeatCount: number;
  sourceType: number;
}

interface RoundTableProps {
  table: TableData;
  index: number;
  selected: boolean;
  setNextTableNumber:number;
  onClick: (index: number ,event: React.MouseEvent) => void;
  onResize: (index: number, newTable: TableData) => void; // callback để parent cập nhật state
  onRotate?: (index: number, newRotation: number) => void; 
  onDrag?: (index: number, newTop: number, newLeft: number) => void;
  zoomLevel?: number;
  guests: any[];
 onGuestSeatChange?: (guestId: number, newSeatId: string | null) => void;
}

const RoundTable: React.FC<RoundTableProps> = ({ table, index, selected,setNextTableNumber,
   onClick, onResize ,onRotate,onDrag,zoomLevel,guests,onGuestSeatChange}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0, size: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const centerRef = useRef({ x: 0, y: 0 });
 
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [initialRotation, setInitialRotation] = useState(0);
  const startAngleRef = useRef(0);
  const [localTop, setLocalTop] = useState(table.top);
  const [localLeft, setLocalLeft] = useState(table.left);
  const [localSize, setLocalSize] = useState(table.size);
  const [localRotation, setLocalRotation] = useState(table.rotation);
  const getSeatCount = (size: number) => {
  return Math.min(20, Math.max(2, Math.round(size / 10)));};

 const handleMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
  setIsResizing(true);
  startPos.current = {
    x: e.clientX,
    y: e.clientY,
    size: localSize // dùng localSize thay vì table.size
  };
};

 useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    const delta = Math.max(dx, dy);
    const newSize = Math.max(100, Math.min(200, startPos.current.size + delta));

    setLocalSize(newSize); // ✅ local update
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);

      const updatedTable = {
        ...table,
        size: localSize,
        currentSeatCount: getSeatCount(localSize),
      };
      onResize(index, updatedTable); // ✅ chỉ gọi khi thả chuột
    }
  };

  if (isResizing) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, [isResizing, localSize, table, index, onResize]);
 const handleRotateMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
  setIsRotating(true);

  const rect = wrapperRef.current?.getBoundingClientRect();
  if (!rect) return;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  centerRef.current = { x: centerX, y: centerY };

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;
  const startAngle = Math.atan2(dy, dx); // 🧠 Lưu lại góc chuột ban đầu

  startAngleRef.current = startAngle;
  setInitialRotation(localRotation); // Lưu lại rotation hiện tại
};

    useEffect(() => {
const handleMouseMove = (e: MouseEvent) => {
  if (isRotating && centerRef.current) {
    const dx = e.clientX - centerRef.current.x;
    const dy = e.clientY - centerRef.current.y;
    const currentAngle = Math.atan2(dy, dx);

    const deltaAngle = currentAngle - startAngleRef.current;

    const newRotation = initialRotation + deltaAngle;
    setLocalRotation(newRotation)
   
  }
};

  const handleMouseUp = () => {
    if (isRotating) {
      setIsRotating(false);
    }
     if (onRotate) {
      onRotate(index, localRotation);
    }
  };

  if (isRotating) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, [isRotating, table, index, onRotate]);


const renderSeats = (idBT: number, inputSeatCount?: number) => {
   const seatCount = getSeatCount(localSize); ;
    const seatSize = 30;
    const center = localSize / 2;              // 👈 dùng localSize để tính vị trí trung tâm
     const radius = center + seatSize / 2;    
  return Array.from({ length: seatCount }).map((_, i) => {
    const angle = (2 * Math.PI / seatCount) * i + localRotation;
    const x = center + radius * Math.cos(angle) - seatSize / 2;
    const y = center + radius * Math.sin(angle) - seatSize / 2;
    const seatId = `btron${idBT}${i}`;

    const guest = guests.find((g: any) => g.seatId === seatId);

    return (
      <div
        key={i}
        id={seatId}
        className="seat relative border border-gray-400 rounded-full text-xs flex items-center justify-center"
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: seatSize,
          height: seatSize,
          backgroundColor: guest ? '#facc15' : '#fff',
        }}
      >
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, guest?.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, seatId)}
          onDragEnd={handleDragEnd}
          className="cursor-move fa-user usercutomer"  >
          {guest ? '👤' : i + 1}
        </div>
      </div>
    );
  });
};
const handleDragStart = (e: React.DragEvent, guestId: number) => {
  e.dataTransfer.setData('guestId', guestId.toString()); // ✅ chuyển số thành chuỗi để lưu
};

const handleDrop = (e: React.DragEvent, targetSeatId: string) => {
  const guestIdStr = e.dataTransfer.getData('guestId');
  if (!guestIdStr) return;

  const guestId = parseInt(guestIdStr, 10); // ✅ convert về number

  const guestIndex = guests.findIndex((g: any) => g.id === guestId);
  if (guestIndex === -1) return;

  const seatTaken = guests.some((g: any) => g.seatId === targetSeatId);
  if (seatTaken) return;

  if (typeof onGuestSeatChange === 'function') {
    onGuestSeatChange(guestId, targetSeatId); // ✅ đúng kiểu rồi
  }
};
const handleDragEnd = (e: React.DragEvent) => {
  setIsDragging(false);
};
// drapdrop
const handleDragMouseDown = (e: React.MouseEvent) => {
  if (
    (e.target as HTMLElement).classList.contains('resizer') ||
    (e.target as HTMLElement).classList.contains('rotate-handle') ||
    (e.target as HTMLElement).classList.contains('fa-user')
  ) {
    return;
  }

  e.stopPropagation();
  setIsDragging(true);

  const rect = wrapperRef.current?.getBoundingClientRect();
  const containerRect = wrapperRef.current?.offsetParent?.getBoundingClientRect();

  if (!rect || !containerRect) return;

  const offsetX = (e.clientX - rect.left) / (zoomLevel || 1);
  const offsetY = (e.clientY - rect.top) / (zoomLevel || 1);

  dragOffset.current = { x: offsetX, y: offsetY };
};
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !wrapperRef.current) return;

    const containerRect = wrapperRef.current.offsetParent?.getBoundingClientRect();
    if (!containerRect) return;

    const mouseX = (e.clientX - containerRect.left) / (zoomLevel || 1);
    const mouseY = (e.clientY - containerRect.top) / (zoomLevel || 1);

    const newLeft = mouseX - dragOffset.current.x;
    const newTop = mouseY - dragOffset.current.y;
    setLocalLeft(newLeft);  // 🧠 local update
    setLocalTop(newTop);
    
  };

  const handleMouseUp = () => {
    setIsDragging(false);
      if (onDrag) {
       onDrag?.(index, localTop, localLeft);
    }
    // setLocalTop(localTop);
    //  setLocalLeft(localLeft);
  };

  if (isDragging) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
}, [isDragging, zoomLevel, index, onDrag]);
useEffect(() => {
  (window as any).__guests = guests;
}, [guests]);

  return (
    <div
      ref={wrapperRef}
      id={`banghe_@${table.tableNumber}`}
      className={`table-wrapper data-indexnumber="${table.tableNumber}" item_banghe item_save absolute ${selected ? 'border-2 border-blue-400' : ''}`}
      style={{
        top: localTop,
        left: localLeft,
        width: localSize,
        height: localSize,
      }}
     onClick={(e) => onClick(index, e)}
        onMouseDown={handleDragMouseDown}
      data-index={index}
      data-type={"round"}
    >
      <div
        className="listBanTron list_save absolute bg-purple-200 border border-gray-400 rounded-full flex items-center justify-center text-lg font-bold text-gray-700"
        style={{
          width: localSize,
          height: localSize,
          transform: `translate(-50%, -50%) rotate(${localRotation}rad)`,
          top: '50%',
          left: '50%',
        }}
      >
        Bàn {table.tableNumber}
      </div>

      <div className="resizer resizerbt hidden" onMouseDown={handleMouseDown}><i style={{fontSize:"17px"}} className="fa-solid fa-circle-right"></i></div>

     <div className="rotate-handle rotatebantron hidden" onMouseDown={handleRotateMouseDown}></div>

      {renderSeats(table.tableNumber,getSeatCount(localSize))}
    </div>
  );
};

export default React.memo(RoundTable);
