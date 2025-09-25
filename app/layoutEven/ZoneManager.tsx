// ZoneManager.tsx - Version with Preview Resize functionality
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import type { ZoneRegion } from '~/layoutEven/layoutEven';
import ConfirmDeleteZoneModal from '~/layoutEven/ModalNotiDeleteZone';

interface ZoneManagerProps {
  containerRef: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null>;
  innerRef: React.RefObject<HTMLDivElement>;
  zoomFactor: number;
  offsetPosition: { x: number; y: number };
  isZoneMode: boolean;
  onZoneModeToggle: () => void;
  projectId: string;
  isExportMode?: boolean;
  zoneCollection: ZoneRegion[];
  onZoneCollectionChange: (zones: ZoneRegion[]) => void;
  activeZoneIdx: number | null;
  onActiveZoneChange: (index: number | null) => void;
  handleVisiableVung: () => void;
  isConfirm: boolean;
}

const ZoneManager = React.forwardRef<any, ZoneManagerProps>(({
  containerRef,
  zoomFactor,
  offsetPosition,
  isZoneMode,
  onZoneModeToggle,
  projectId,
  isExportMode = false,
  zoneCollection,
  onZoneCollectionChange,
  activeZoneIdx,
  onActiveZoneChange,
  innerRef,
  handleVisiableVung,
  isConfirm
}, ref) => {
  const [isCreatingZone, setIsCreatingZone] = useState(false);
  const [zoneStartCoords, setZoneStartCoords] = useState<{x: number, y: number} | null>(null);
  const [previewZone, setPreviewZone] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const [zoneIdCounter, setZoneIdCounter] = useState(1);
  
  // ✅ Thêm state cho resize preview
  const [isResizing, setIsResizing] = useState(false);
  const [resizeType, setResizeType] = useState<'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | null>(null);
  const [resizeStartCoords, setResizeStartCoords] = useState<{x: number, y: number} | null>(null);
  const [originalZone, setOriginalZone] = useState<ZoneRegion | null>(null);
  const [previewResizeZone, setPreviewResizeZone] = useState<ZoneRegion | null>(null); // ✅ Thêm state preview

  const [isModalDelete, setModalDelete] = useState<boolean>(false);
  const [isZoneVisible, setZoneVisible] = useState(true);

  useEffect(() => {
    setZoneVisible(true);
    onZoneModeToggle();
  }, [isConfirm]);

  // Màu sắc riêng cho zones
  const zoneColorOptions = [
    '#ff4757', '#5352ed', '#2ed573', '#ffa502',
    '#a55eea', '#26d0ce', '#fd9644', '#485460',
    '#fdd835', '#7dc383'
  ];

  const getZoneColorByIndex = () => {
    return zoneColorOptions[(zoneIdCounter - 1) % zoneColorOptions.length];
  };

  const convertScreenToZoneX = (clientX: number, containerBounds: DOMRect) => {
    return (clientX - containerBounds.left - offsetPosition.x) / zoomFactor;
  };

  const convertScreenToZoneY = (clientY: number, containerBounds: DOMRect) => {
    return (clientY - containerBounds.top - offsetPosition.y) / zoomFactor;
  }

  // ✅ Xử lý resize logic với preview
  const handleResizeStart = (e: React.MouseEvent, type: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w') => {
    if (activeZoneIdx === null) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const containerBounds = containerRef.current?.getBoundingClientRect();
    if (!containerBounds) return;

    setIsResizing(true);
    setResizeType(type);
    setResizeStartCoords({
      x: convertScreenToZoneX(e.clientX, containerBounds),
      y: convertScreenToZoneY(e.clientY, containerBounds)
    });
    const currentZone = zoneCollection[activeZoneIdx];
    setOriginalZone({ ...currentZone });
    setPreviewResizeZone({ ...currentZone }); // ✅ Khởi tạo preview với zone hiện tại
  };

  // ✅ Effect xử lý resize với preview
  useEffect(() => {
    if (!isResizing || !resizeStartCoords || !originalZone || activeZoneIdx === null) return;

    const handleResizeMove = (e: MouseEvent) => {
      const containerBounds = containerRef.current?.getBoundingClientRect();
      if (!containerBounds) return;

      const currentX = convertScreenToZoneX(e.clientX, containerBounds);
      const currentY = convertScreenToZoneY(e.clientY, containerBounds);
      
      const deltaX = currentX - resizeStartCoords.x;
      const deltaY = currentY - resizeStartCoords.y;

      let newX = originalZone.xPosition;
      let newY = originalZone.yPosition;
      let newWidth = originalZone.zoneWidth;
      let newHeight = originalZone.zoneHeight;

      // Xử lý resize theo từng hướng
      switch (resizeType) {
        case 'nw': // Top-left
          newX = originalZone.xPosition + deltaX;
          newY = originalZone.yPosition + deltaY;
          newWidth = originalZone.zoneWidth - deltaX;
          newHeight = originalZone.zoneHeight - deltaY;
          break;
        case 'ne': // Top-right
          newY = originalZone.yPosition + deltaY;
          newWidth = originalZone.zoneWidth + deltaX;
          newHeight = originalZone.zoneHeight - deltaY;
          break;
        case 'sw': // Bottom-left
          newX = originalZone.xPosition + deltaX;
          newWidth = originalZone.zoneWidth - deltaX;
          newHeight = originalZone.zoneHeight + deltaY;
          break;
        case 'se': // Bottom-right
          newWidth = originalZone.zoneWidth + deltaX;
          newHeight = originalZone.zoneHeight + deltaY;
          break;
        case 'n': // Top
          newY = originalZone.yPosition + deltaY;
          newHeight = originalZone.zoneHeight - deltaY;
          break;
        case 's': // Bottom
          newHeight = originalZone.zoneHeight + deltaY;
          break;
        case 'w': // Left
          newX = originalZone.xPosition + deltaX;
          newWidth = originalZone.zoneWidth - deltaX;
          break;
        case 'e': // Right
          newWidth = originalZone.zoneWidth + deltaX;
          break;
      }

      // Đảm bảo kích thước tối thiểu
      const minSize = 40 / zoomFactor;
      if (newWidth < minSize || newHeight < minSize) return;

      // ✅ Cập nhật preview thay vì zone chính
      setPreviewResizeZone({
        ...originalZone,
        xPosition: newX,
        yPosition: newY,
        zoneWidth: newWidth,
        zoneHeight: newHeight
      });
    };

    const handleResizeEnd = () => {
      // ✅ Khi thả chuột mới cập nhật zone chính
      if (previewResizeZone) {
        const updatedZones = zoneCollection.map((zone, idx) => 
          idx === activeZoneIdx ? previewResizeZone : zone
        );
        onZoneCollectionChange(updatedZones);
      }

      // Reset states
      setIsResizing(false);
      setResizeType(null);
      setResizeStartCoords(null);
      setOriginalZone(null);
      setPreviewResizeZone(null); // ✅ Clear preview
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, resizeStartCoords, originalZone, resizeType, activeZoneIdx, zoomFactor, previewResizeZone, zoneCollection, onZoneCollectionChange]);

  // Xử lý tạo zone
  useEffect(() => {
    if (!isZoneMode || isResizing) return;

    const handleZoneMouseMove = (e: MouseEvent) => {
      if (!isCreatingZone || !zoneStartCoords || !containerRef.current) return;

      const containerBounds = containerRef.current.getBoundingClientRect();
      const currentX = convertScreenToZoneX(e.clientX, containerBounds);
      const currentY = convertScreenToZoneY(e.clientY, containerBounds);

      const width = Math.abs(currentX - zoneStartCoords.x);
      const height = Math.abs(currentY - zoneStartCoords.y);
      const x = Math.min(currentX, zoneStartCoords.x);
      const y = Math.min(currentY, zoneStartCoords.y);

      setPreviewZone({x, y, width, height});
    };

    const handleZoneMouseUp = () => {
      if (!isCreatingZone || !previewZone || !zoneStartCoords) return;

      const rect = localRectToContainerRect(previewZone);

      if (rect && previewZone.width > 40 && previewZone.height > 40) {
        const newZoneRegion: ZoneRegion = {
          zoneId: `zone_${zoneIdCounter}_${Date.now()}`,
          zoneName: `Vùng `,
          xPosition: rect.left,
          yPosition: rect.top,
          zoneWidth: rect.width,
          zoneHeight: rect.height,
          zoneColor: getZoneColorByIndex(),
          alphaLevel: 0.15,
        };

        onZoneCollectionChange([...zoneCollection, newZoneRegion]);
        setZoneIdCounter(prev => prev + 1);
        toast.success(`Đã tạo ${newZoneRegion.zoneName}`);
      }

      setIsCreatingZone(false);
      setZoneStartCoords(null);
      setPreviewZone(null);
    };

    if (isCreatingZone) {
      document.addEventListener('mousemove', handleZoneMouseMove);
      document.addEventListener('mouseup', handleZoneMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleZoneMouseMove);
      document.removeEventListener('mouseup', handleZoneMouseUp);
    };
  }, [isCreatingZone, zoneStartCoords, previewZone, zoneIdCounter, isZoneMode, offsetPosition, zoomFactor, isResizing]);

  const handleZoneMouseDown = (e: React.MouseEvent) => {
    if (!isZoneMode || isResizing) return;

    if ((e.target as HTMLElement).closest('.table-wrapper')) return;
    if ((e.target as HTMLElement).closest('.zone-display-wrapper')) return;

    if (e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();

      const local = getLocalFromClient(e.clientX, e.clientY);
      if (!local) return;

      setZoneStartCoords({ x: local.x, y: local.y });
      setPreviewZone({ x: local.x, y: local.y, width: 0, height: 0 });
      setIsCreatingZone(true);
    }
  };

  // ✅ Component hiển thị zone với preview resize
  const ZoneDisplay = ({ zone, zoneIndex, isHighlighted }: {
    zone: ZoneRegion;
    zoneIndex: number;
    isHighlighted: boolean;
  }) => {
    // ✅ Sử dụng preview zone nếu đang resize zone này
    const displayZone = isResizing && isHighlighted && previewResizeZone ? previewResizeZone : zone;
    
    return (
      <div>
         <div 
          className={`absolute z-[999999999] bg-white/90 px-2 py-1 rounded text-xs font-semibold shadow-sm pointer-events-none text-[15px] relavtive ${zone.active ? "hidden" : ""}`} 
              style={{
              left: displayZone.xPosition + 10,
              top: displayZone.yPosition  + 5
            }}
       >
          
          {displayZone.zoneName}
        </div>
         <div
        className={`zone-display-wrapper absolute cursor-pointer transition-all duration-200 ${
          isHighlighted ? 'z-30' : 'z-10' } ${zone.active ? "hidden" : ""}
        }`}
        style={{
          left: displayZone.xPosition,
          top: displayZone.yPosition,
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleZoneSelect(zoneIndex);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
       
        <div className='w-100 h-100'
          style={{
            opacity: displayZone.alphaLevel,
            width: displayZone.zoneWidth,
            height: displayZone.zoneHeight,
            backgroundColor: displayZone.zoneColor,
            border: `${isHighlighted ? `5px dotted ` : '5px dotted'}`,
            borderWidth: isHighlighted ? '5px' : '5px',
            borderRadius: '6px',
            boxShadow: isHighlighted ? `0 4px 12px ${displayZone.zoneColor}50` : 'none',
            display:  'block',
            pointerEvents: 'auto',
            cursor: isHighlighted ? 'move' : 'pointer',
            // ✅ Thêm visual feedback khi đang resize
            transform: isResizing && isHighlighted ? 'scale(1.02)' : 'scale(1)',
            transition: isResizing ? 'none' : 'all 0.2s ease',
          
          }}
        >
        </div>

        {/* ✅ Resize handles */}
        {isHighlighted && !isExportMode && (
          <>
            {/* Corner handles */}
            <div 
              className="absolute -top-2 -left-2 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'nw')}
            ></div>
            <div 
              className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'ne')}
            ></div>
            <div 
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'sw')}
            ></div>
            <div 
              className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'se')}
            ></div>

            {/* Edge handles */}
            <div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-n-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'n')}
            ></div>
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-s-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 's')}
            ></div>
            <div 
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-w-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'w')}
            ></div>
            <div 
              className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full cursor-e-resize hover:bg-blue-600 hover:scale-110 transition-all"
              onMouseDown={(e) => handleResizeStart(e, 'e')}
            ></div>
          </>
        )}
      </div>
      </div>
     
    );
  };

  // Helper functions
  const getLocalFromClient = (clientX: number, clientY: number) => {
    if (!innerRef?.current) return null;
    const innerBounds = innerRef.current.getBoundingClientRect();
    const x = (clientX - innerBounds.left) / zoomFactor;
    const y = (clientY - innerBounds.top) / zoomFactor;
    return { x, y, innerBounds };
  };

  const localRectToContainerRect = (localRect: { x: number; y: number; width: number; height: number; }) => {
    if (!innerRef?.current || !containerRef?.current) return null;
    const innerBounds = innerRef.current.getBoundingClientRect();
    const containerBounds = containerRef.current.getBoundingClientRect();

    const left = (innerBounds.left - containerBounds.left) + localRect.x * zoomFactor;
    const top = (innerBounds.top - containerBounds.top) + localRect.y * zoomFactor;
    const width = localRect.width * zoomFactor;
    const height = localRect.height * zoomFactor;

    return { left, top, width, height };
  };

  const handleZoneSelect = (zoneIndex: number) => {
    const newActiveIndex = activeZoneIdx === zoneIndex ? null : zoneIndex;
    onActiveZoneChange(newActiveIndex);
  };

  // Zone management functions
  const removeZone = () => {
    if (activeZoneIdx === null) return;
    onZoneCollectionChange(zoneCollection.filter((_, idx) => idx !== activeZoneIdx));
    onActiveZoneChange(null);
    toast.success("Đã xóa vùng");
  };

  const updateZonePosition = (newX: number, newY: number) => {
    if (activeZoneIdx === null) return;
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, xPosition: newX, yPosition: newY } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  const updateZoneSize = (newWidth: number, newHeight: number) => {
    if (activeZoneIdx === null) return;
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, zoneWidth: newWidth, zoneHeight: newHeight } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  const updateZoneName = (newName: string) => {
    if (activeZoneIdx === null) return;
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, zoneName: newName } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  const updateZoneColor = (newColor: string) => {
    if (activeZoneIdx === null) return;
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, zoneColor: newColor } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  const updateZoneOpacity = (newOpacity: number) => {
    if (activeZoneIdx === null) return;
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, alphaLevel: newOpacity } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  const getZoneConfigPanel = () => {
    if (activeZoneIdx === null || !zoneCollection[activeZoneIdx]) {
      return null;
    }
    
    const selectedZone = zoneCollection[activeZoneIdx];
    
    return {
      selectedZone,
      updateZoneName,
      updateZoneColor,
      updateZoneOpacity,
      removeZone: () => {
        // Modal xác nhận xóa
      },
      copyZone: () => {
        const copiedZone: ZoneRegion = {
          ...selectedZone,
          zoneId: `zone_${zoneIdCounter}_${Date.now()}`,
          zoneName: `${selectedZone.zoneName} (Copy)`,
          xPosition: selectedZone.xPosition + 20,
          yPosition: selectedZone.yPosition + 20,
        };
        onZoneCollectionChange([...zoneCollection, copiedZone]);
        setZoneIdCounter(prev => prev + 1);
        toast.success(`Đã sao chép ${copiedZone.zoneName}`);
      },
      zoneColorOptions
    };
  };

  React.useImperativeHandle(ref, () => ({
    getZoneConfigPanel,
    zoneCollection,
    activeZoneIdx
  }), [activeZoneIdx, zoneCollection]);

  return (
    <>
      {/* Button toggle zone mode */}
      <div className="absolute bottom-[20px] left-[10px] z-[99999] space-y-2">
        <div className="flex items-center bg-white rounded-lg px-2 py-1 shadow-sm hidden">
          <input
            type="checkbox"
            id="zoneZoneModeToggle"
            checked={isZoneMode}
            onChange={() => {
              if (projectId === "") {
                toast.error("Vui lòng tạo dự án mới!");
                return;
              }
              onZoneModeToggle();
            }}
            className="w-4 h-4 text-purple-600 bg-gray-100  rounded "
          />
          <label 
            htmlFor="zoneZoneModeToggle" 
            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer select-none"
          >
            Tạo vùng
          </label>
        </div>
       
        <div className="flex items-center bg-white rounded-lg px-2 py-1 shadow-sm "
          style={{
             display: isExportMode ? 'none' : 'block',
          }}
        >
          <input
            type="checkbox"
            id="zoneVisibilityToggle"
            checked={isZoneVisible}
            onChange={() => {
              setZoneVisible(!isZoneVisible);
              handleVisiableVung();
            }}
            className="w-4 h-4 text-purple-600 bg-gray-100  rounded "
          />
          <label 
            htmlFor="zoneVisibilityToggle" 
            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer select-none"
          >
            Hiển thị vùng
          </label>
        </div>
      </div>

      {/* Zones render */}
      {zoneCollection.map((zone, index) => (
        <ZoneDisplay
          key={zone.zoneId}
          zone={zone}
          zoneIndex={index}
          isHighlighted={activeZoneIdx === index}
        />
      ))}

      {/* Preview zone khi đang tạo */}
      {previewZone && isCreatingZone && (() => {
        const rect = localRectToContainerRect(previewZone);
        if (!rect) return null;

        return (
          <div
            className="absolute border-2 border-dashed border-purple-500 bg-purple-200 pointer-events-none"
            style={{
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
              opacity: 0.4,
              borderRadius: '6px',

            }}
          />
        );
      })()}

      {/* Mouse down handler */}
      <div
        className="absolute inset-0"
        style={{ 
          pointerEvents: isZoneMode && !isResizing ? 'auto' : 'none',
          zIndex: isZoneMode ? 1 : -1
        }}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest('.zone-display-wrapper')) {
            return;
          }
          handleZoneMouseDown(e);
        }}
      />
    </>
  );
});

export default ZoneManager;