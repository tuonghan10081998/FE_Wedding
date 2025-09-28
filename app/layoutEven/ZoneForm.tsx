// ZoneForm.tsx - Fixed Version
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ConfirmDeleteZoneModal from '~/layoutEven/ModalNotiDeleteZone';

interface ZoneFormProps {
  zoneData: {
    selectedZone: any; // ZoneRegion type
    activeZoneIdx: number;
    zoneCollection: any[];
    onZoneCollectionChange: (zones: any[]) => void;
    onActiveZoneChange: (index: number | null) => void;
    zoneColorOptions: string[];
  };
}

const ZoneForm: React.FC<ZoneFormProps> = ({ zoneData }) => {
  if (!zoneData || !zoneData.selectedZone) {
    return null;
  }

  const { selectedZone, activeZoneIdx, zoneCollection, onZoneCollectionChange, onActiveZoneChange, zoneColorOptions } = zoneData;
  
  // Thêm màu trắng vào bộ màu nếu chưa có
  const enhancedColorOptions = zoneColorOptions.includes('#ffffff') 
    ? zoneColorOptions 
    : [...zoneColorOptions, '#ffffff'];
  const [isModalDelete, setModalDelete] = useState<boolean>(false);
  
  // Local state cho tất cả các thuộc tính
  const [localZoneName, setLocalZoneName] = useState<string>(selectedZone.zoneName);
  const [localZoneColor, setLocalZoneColor] = useState<string>(selectedZone.zoneColor);
  const [localAlphaLevel, setLocalAlphaLevel] = useState<number>(selectedZone.alphaLevel);

  // Sync local state khi selectedZone thay đổi (fix race condition)
  useEffect(() => {
    if (selectedZone) {
      setLocalZoneName(selectedZone.zoneName || '');
      setLocalZoneColor(selectedZone.zoneColor || '#000000');
      setLocalAlphaLevel(selectedZone.alphaLevel || 0.5);
    }
  }, [activeZoneIdx]); // Chỉ depend vào activeZoneIdx

  // Hàm commit tất cả thay đổi
  const commitAllChanges = () => {
    if (!selectedZone) return;
    
    const hasChanges = 
      localZoneName !== selectedZone.zoneName ||
      localZoneColor !== selectedZone.zoneColor ||
      localAlphaLevel !== selectedZone.alphaLevel;

    if (hasChanges) {
      const updatedZones = zoneCollection.map((zone, idx) => 
        idx === activeZoneIdx ? { 
          ...zone, 
          zoneName: localZoneName,
          zoneColor: localZoneColor,
          alphaLevel: localAlphaLevel
        } : zone
      );
      onZoneCollectionChange(updatedZones);
    }
  };

  // Handle Enter key cho tên zone
  const handleZoneNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      commitAllChanges();
      (e.target as HTMLInputElement).blur();
    }
  };

  // Immediate update cho color preset
  const handleColorPresetClick = (color: string) => {
    setLocalZoneColor(color);
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, zoneColor: color } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  // Immediate update cho zone name - cả local và global
  const handleZoneNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setLocalZoneName(newName); // Update local state
    
    // Update zoneCollection ngay lập tức
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, zoneName: newName } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  // Immediate update cho alpha level
  const handleAlphaChange = (newAlpha: number) => {
    setLocalAlphaLevel(newAlpha);
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, alphaLevel: newAlpha } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  // Immediate update cho color input
  const handleColorInputChange = (newColor: string) => {
    setLocalZoneColor(newColor);
    const updatedZones = zoneCollection.map((zone, idx) => 
      idx === activeZoneIdx ? { ...zone, zoneColor: newColor } : zone
    );
    onZoneCollectionChange(updatedZones);
  };

  const removeZone = () => {
    setModalDelete(true);
  };

  const handleConfirmDelete = () => {
    onZoneCollectionChange(zoneCollection.filter((_, idx) => idx !== activeZoneIdx));
    onActiveZoneChange(null);
    toast.success("Đã xóa vùng");
    setModalDelete(false);
  };

  const copyZone = () => {
    const copiedZone = {
      ...selectedZone,
      zoneId: `zone_${Date.now()}`,
      zoneName: `${selectedZone.zoneName} (Copy)`,
      xPosition: selectedZone.xPosition + 20,
      yPosition: selectedZone.yPosition + 20,
      creationDate: new Date()
    };
    onZoneCollectionChange([...zoneCollection, copiedZone]);
    toast.success(`Đã sao chép ${copiedZone.zoneName}`);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-lg border">
        <h3 className="font-semibold mb-3 text-gray-800">
          <i className="fas fa-cog mr-2 text-purple-600"></i>
          Cấu hình vùng
        </h3>
        
        {/* Tên vùng */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Tên vùng:</label>
          <input
            type="text"
            value={localZoneName}
            onChange={(e) => setLocalZoneName(e.target.value)}
            onBlur={commitAllChanges}
            onKeyDown={handleZoneNameKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Màu sắc */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">Màu sắc:</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={localZoneColor}
              onChange={(e) => handleColorInputChange(e.target.value)}
              className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-500">{localZoneColor}</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {enhancedColorOptions.map((color: string) => (
              <button
                key={color}
                onClick={() => handleColorPresetClick(color)}
                className={`w-6 h-6 rounded border-2 hover:scale-110 transition-transform ${
                  color === '#ffffff' ? 'border-gray-400' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Độ trong suốt */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Độ trong suốt: {Math.round(localAlphaLevel * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="0.8"
            step="0.05"
            value={localAlphaLevel}
            onChange={(e) => handleAlphaChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Thông tin */}
        <div className="bg-gray-50 p-3 rounded mb-3">
          <div className="text-sm text-gray-600">
            <p>Kích thước: {Math.round(selectedZone.zoneWidth)} × {Math.round(selectedZone.zoneHeight)}px</p>
            <p>Vị trí: ({Math.round(selectedZone.xPosition)}, {Math.round(selectedZone.yPosition)})</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button  
            onClick={copyZone} 
            className="hidden w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <i className="fas fa-copy mr-1"></i> Sao chép vùng
          </button>
          
          <button 
            onClick={removeZone} 
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
          >
            <i className="fas fa-trash mr-1"></i> Xóa vùng
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalDelete && (
        <ConfirmDeleteZoneModal
          onClose={() => setModalDelete(false)}
          onConfirm={handleConfirmDelete}
          zoneName={selectedZone.zoneName}
        />
      )}
    </>
  );
};

export default ZoneForm;