import React, { useRef, useEffect, useState } from 'react';
export interface BenchTableData {
  tableNumber: number;
  shape: 'bench';
  width: number;
  height: number;
  top: number;
  left: number;
  rotation: number;
  currentSeatCount: number;
    sourceType: number;
}

interface Guest {
  id: number;
  seatId: string;
}

interface BenchTableRenderProps {
  table: BenchTableData;
  index: number;
  selected: boolean;
  guests: any[];
  zoomLevel?: number;
  onGuestSeatChange?: (guestId: number, newSeatId: string | null) => void;
  onResize: (index: number, newTable: BenchTableData) => void;
  onRotate?: (index: number, newRotation: number) => void;
  onDrag?: (index: number, newTop: number, newLeft: number, type: number) => void;
  onClick: (index: number,event:React.MouseEvent) => void;
}

const seatSize = 26;
const seatGap = 4; // Tổng mỗi ghế: 30 (26 + 4)

function renderBenchSeats(
  table: BenchTableData,
  guests: Guest[],
  createSeat: (x: number, y: number, seatId: string, guest?: Guest) => React.JSX.Element
) {
  const seatElements: React.JSX.Element[] = [];

  const w = table.width;
  const maxSeatsPerRow = Math.floor(w / (seatSize + seatGap)); // Ví dụ: 150 / 30 = 5 ghế
  const totalSeats = Math.min(table.currentSeatCount, maxSeatsPerRow);

  const idPrefix = `bench${table.tableNumber}`;
  let seatIndex = 1;

  // Tính vị trí ghế sao cho căn giữa theo chiều ngang
  const totalSeatWidth = totalSeats * seatSize + (totalSeats - 1) * seatGap;
  const startX = (w - totalSeatWidth) / 2;

  for (let i = 0; i < totalSeats; i++) {
    const x = startX + i * (seatSize + seatGap);
    const y = 2; // Ghế đặt phía trên
    const seatId = `${idPrefix}_${seatIndex++}`;
    const guest = guests.find(g => g.seatId === seatId);
    seatElements.push(createSeat(x, y, seatId, guest));
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
  zoomLevel,
  onDrag,
  onClick
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const centerRef = useRef({ x: 0, y: 0 });
  const startAngleRef = useRef<number>(0);
  const [initialRotation, setInitialRotation] = useState(table.rotation);
 const [localTop, setLocalTop] = useState(table.top);
  const [localLeft, setLocalLeft] = useState(table.left);
  const [localSize, setLocalSize] = useState(table.width);
  const [localRotation, setLocalRotation] = useState(table.rotation);
   const [localSeat, setLocalSeat] = useState(table.currentSeatCount);
  const wrapperStyle = {
    top: localTop,
    left: localLeft,
    width: localSize,
    height: table.height,
    transform: `rotate(${localRotation}rad)`,
  };

  const createSeat = (x: number, y: number, id: string, guest?: Guest) => (
    <div
      key={id}
      id={id}
      className="seat absolute border border-gray-400 rounded-full text-xs flex items-center justify-center"
      style={{
        top: -27,
        left: x,
        width: seatSize,
        height: seatSize,
        backgroundColor: guest ? '#facc15' : '#fff',
      }}
    >
      <div
        draggable
        onDragStart={(e) => e.dataTransfer.setData('guestId', guest?.id.toString() || '')}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const guestIdStr = e.dataTransfer.getData('guestId');
          const guestId = parseInt(guestIdStr, 10);
          if (!isNaN(guestId) && !guests.some((g) => g.seatId === id)) {
            onGuestSeatChange?.(guestId, id);
          }
        }}
        className="cursor-move fa-user usercutomer"
      >
        {guest ? '👤' : id.replace(`bench${table.tableNumber}_`, '')}
      </div>
    </div>
  );

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: localSize,
      height: table.height,
    };
  };

  const handleRotateMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    centerRef.current = { x: centerX, y: centerY };
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    startAngleRef.current = Math.atan2(dy, dx) - table.rotation;
    setInitialRotation(table.rotation);
    setIsRotating(true);
  };

  const handleDragMouseDown = (e: React.MouseEvent) => {
  if (
    (e.target as HTMLElement).classList.contains('resizer') ||
    (e.target as HTMLElement).classList.contains('rotate-handle') ||
    (e.target as HTMLElement).classList.contains('fa-user')
  ) return;

      e.stopPropagation();
      setIsDragging(true);

      const rect = wrapperRef.current?.getBoundingClientRect();
      const containerRect = wrapperRef.current?.offsetParent?.getBoundingClientRect();
      if (!rect || !containerRect) return;

      // Ghi lại chính xác vị trí chuột (so với container)
      const mouseX = (e.clientX - containerRect.left) / (zoomLevel || 1);
      const mouseY = (e.clientY - containerRect.top) / (zoomLevel || 1);

      // Lưu lại chênh lệch giữa chuột và vị trí hiện tại của bàn
      dragOffset.current = {
        x: mouseX - localLeft,
        y: mouseY - localTop,
      };
    };

    useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isResizing) {
        const dx = e.clientX - startPos.current.x;
        const newWidth = Math.max(80, Math.min(400, startPos.current.width + dx));
        const newSeatCount = Math.floor(newWidth / (seatSize + seatGap));

        setLocalSize(newWidth);
        setLocalSeat(newSeatCount);
      }

      if (isRotating && wrapperRef.current) {
        const dx = e.clientX - centerRef.current.x;
        const dy = e.clientY - centerRef.current.y;
        const angle = Math.atan2(dy, dx);
        const newRotation = angle - startAngleRef.current;
        setLocalRotation(newRotation); // local update
      }

      if (isDragging && wrapperRef.current) {
        const containerRect = wrapperRef.current.offsetParent?.getBoundingClientRect();
        if (!containerRect) return;

        const mouseX = (e.clientX - containerRect.left) / (zoomLevel || 1);
        const mouseY = (e.clientY - containerRect.top) / (zoomLevel || 1);
        const newLeft = mouseX - dragOffset.current.x;
        const newTop = mouseY - dragOffset.current.y;

        setLocalLeft(newLeft);
        setLocalTop(newTop);
      }
    };

    const handleUp = () => {
      if (isResizing) {
        setIsResizing(false);

        const updatedTable: BenchTableData = {
          ...table,
          width: localSize,
          currentSeatCount: localSeat,
        };

        onResize(index, updatedTable);
      }

      if (isRotating) {
        setIsRotating(false);
        onRotate?.(index, localRotation);
      }

      if (isDragging) {
        setIsDragging(false);
        onDrag?.(index, localTop, localLeft, 2);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
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
    localRotation,
    localTop,
    localLeft,
    table,
    zoomLevel,
  ]);
    const localTable: BenchTableData = {
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
      className={`table-wrapper item_banghe absolute cursor-pointer item_save ${selected ? 'border-2 border-blue-500' : ''}`}
      style={wrapperStyle}
      data-indexsave={index}
      data-type="bench"
      onMouseDown={handleDragMouseDown}
      ref={wrapperRef}
      onClick={(e) => onClick(index,e)}
    >
      <div
        className="list_save itemgd absolute bg-green-300 border border-gray-400 rounded-md flex items-center justify-center text-lg font-bold text-gray-800"
        style={{
          top: 1,
          width: localSize,
          height: table.height,
        //   transform: `translate(-50%, -50%) rotate(${table.rotation}rad)`,
        }}
      >
        {index + 1}
      </div>

      {seatElements}

      <div className="resizer resizer-gd" onMouseDown={handleResizeMouseDown}><i style={{fontSize:"17px"}} className="fa-solid fa-circle-right"></i></div>
      <div className="rotate-handle rotate-gd" onMouseDown={handleRotateMouseDown}></div>
    </div>
  );
};

export default BenchTableRender;
