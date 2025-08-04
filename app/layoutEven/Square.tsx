import React, { useRef, useEffect, useState } from 'react';
export interface SquareTableData {
  tableNumber: number;
  shape: 'square';
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

interface SquareTableRenderProps {
  table: SquareTableData;
  index: number;
  selected: boolean;
  guests: any[];
  zoomLevel?: number;
  onGuestSeatChange?: (guestId: number, newSeatId: string | null) => void;
  onResize: (index: number, newTable: SquareTableData) => void; // ✅ callback resize
  onRotate?: (index: number, newRotation: number) => void;
  onDrag?: (index: number, newTop: number, newLeft: number, type: number) => void;
  onClick: (index: number ,event: React.MouseEvent) => void;
}

const seatSize = 32;
const seatGap = 4;

function renderSeatsBV(
  table: SquareTableData,
  guests: Guest[],
  createSeat: (x: number, y: number, seatId: string, guest?: Guest) => React.JSX.Element,
  inputSeatCount?: number
) {
  const seatElements: React.JSX.Element[] = [];

  const w = table.width;
  const h = table.height;
  const idPrefix = `bvuong${table.tableNumber}`;
  let seatIndex = 1;

  const seatSlotSize = seatSize + seatGap; // ví dụ = 40
  const topMax = Math.floor(w / seatSlotSize);
  const leftMax = Math.floor(h / seatSlotSize);

  const totalPositions = [...Array(topMax).fill("top"), ...Array(topMax).fill("bottom"), ...Array(leftMax).fill("left"), ...Array(leftMax).fill("right")];

  let remainingSeats = inputSeatCount ?? 0;

  const makeSeat = (x: number, y: number) => {
    const seatId = `${idPrefix}_${seatIndex++}`;
    const guest = guests.find((g) => g.seatId === seatId);
    return createSeat(x, y, seatId, guest);
  };

  const getPositionCoords = (pos: string, i: number, count: number) => {
    switch (pos) {
      case "top":
        return {
          x: (w / (count + 1)) * (i + 1) - seatSize / 2,
          y: -seatSize - seatGap
        };
      case "bottom":
        return {
          x: (w / (count + 1)) * (i + 1) - seatSize / 2,
          y: h + seatGap
        };
      case "left":
        return {
          x: -seatSize - seatGap,
          y: (h / (count + 1)) * (i + 1) - seatSize / 2
        };
      case "right":
        return {
          x: w + seatGap,
          y: (h / (count + 1)) * (i + 1) - seatSize / 2
        };
    }
  };

  const sides = ["top", "bottom", "left", "right"];
  for (const side of sides) {
    let max = side === "top" || side === "bottom" ? topMax : leftMax;
    let count = Math.min(remainingSeats, max);
    for (let i = 0; i < count; i++) {
      const { x, y } = getPositionCoords(side, i, count)!;
      seatElements.push(makeSeat(x, y));
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
  onResize, // ✅ nhận onResize từ parent
  onRotate,
  zoomLevel,
  onDrag,
  onClick
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const [initialRotation, setInitialRotation] = useState(table.rotation || 0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startAngleRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const wrapperStyle = {
    top: table.top,
    left: table.left,
    width: table.width,
    height: table.height,
    transform: `rotate(${table.rotation}rad)`,
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: table.width,
      height: table.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;

      const newWidth = Math.max(80, Math.min(400, startPos.current.width + dx));
      const newHeight = Math.max(40, Math.min(300, startPos.current.height + dy));


      const seatCountTop = Math.floor(newWidth / 36);
      const seatCountLeft = Math.floor(newHeight / 36);
      const totalSeats = (seatCountTop + seatCountLeft) * 2;


      const updatedTable: SquareTableData = {
        ...table,
        width: newWidth,
        height: newHeight,
        currentSeatCount: totalSeats,
      };

      onResize(index, updatedTable);
    };

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false);
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
  }, [isResizing, index, onResize, table]);

  const createSeat = (x: number, y: number, id: string, guest?: Guest) => (
    <div
      key={id}
      id={id}
      className="seat absolute border border-gray-400 rounded-full text-xs flex items-center justify-center"
      style={{
        top: y,
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
        {guest ? '👤' : id.replace(`bvuong${table.tableNumber}_`, '')}
      </div>
    </div>
  );
  const handleRotateMouseDownSquare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    centerRef.current = { x: centerX, y: centerY };

    const startX = e.clientX - centerX;
    const startY = e.clientY - centerY;

    const currentRotation = table.rotation || 0; // rotation đang lưu (đơn vị độ)
    const startAngle = Math.atan2(startY, startX) - (currentRotation * Math.PI / 180);


    startAngleRef.current = startAngle;
    setInitialRotation(currentRotation);
    setIsRotating(true);
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isRotating) return;

      const dx = e.clientX - centerRef.current.x;
      const dy = e.clientY - centerRef.current.y;

      const currentAngle = Math.atan2(dy, dx); // Góc hiện tại của chuột
      const deltaAngle = currentAngle - startAngleRef.current; // Chênh lệch so với lúc bắt đầu

      const deg = initialRotation + (deltaAngle * 3) / Math.PI; // Tổng góc mới = rotation ban đầu + delta
      if (onRotate) {
        onRotate(index, deg);
      }
    };

    const handleMouseUp = () => {
      if (isRotating) setIsRotating(false);
    };

    if (isRotating) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isRotating, index, onRotate, initialRotation]);
  // drapdrop
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
          x: mouseX - table.left,
          y: mouseY - table.top,
        };
      };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !wrapperRef.current) return;
      const containerRect = wrapperRef.current.offsetParent?.getBoundingClientRect();
      if (!containerRect) return;

      const mouseX = (e.clientX - containerRect.left) / (zoomLevel || 1);
      const mouseY = (e.clientY - containerRect.top) / (zoomLevel || 1);

      // Trừ đúng offset lúc mousedown
      const newLeft = mouseX - dragOffset.current.x;
      const newTop = mouseY - dragOffset.current.y;

      onDrag?.(index, newTop, newLeft, 1);
      
    };

    const handleMouseUp = () => {
      setIsDragging(false);
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


  const seatElements = renderSeatsBV(table, guests, createSeat, table.currentSeatCount);

  return (
    <div
      id={`banghe_@${table.tableNumber}`}
      className={`table-wrapper item_save item_banghe absolute ${selected ? 'border-2 border-blue-400' : ''}`}
      style={wrapperStyle}
      data-indexbv={index}
      data-indexsave={table.tableNumber}
      data-type="square"
      onMouseDown={handleDragMouseDown}
      ref={wrapperRef}
      onClick={(e) => onClick(index,e)}
    >
      <div

        className="table-rect list_save flex items-center justify-center bg-yellow-200 border border-gray-500 text-center"
        style={{
          width: '100%',
          height: '100%',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Bàn {table.tableNumber}
      </div>

      {seatElements}

      <div className="rotate-handle rotate-banvuong hidden" onMouseDown={handleRotateMouseDownSquare}></div>
      <div className="resizer resize-icon" onMouseDown={handleMouseDown}><i style={{ fontSize: "17px" }} className="fa-solid fa-circle-right"></i></div>
    </div>
  );
};

export default SquareTableRender;
