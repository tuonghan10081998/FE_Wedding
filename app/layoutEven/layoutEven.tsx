import React, { useRef, useState,useEffect } from 'react';
import RoundTable from '../layoutEven/RoundTable';
import type { TableData } from '../layoutEven/RoundTable';
import SquareTableRender from '~/layoutEven/Square';
import type {SquareTableData} from '../layoutEven/Square'
import BenchTableRender from '~/layoutEven/Bench';
import type {BenchTableData} from '../layoutEven/Bench'
import GenericItem from '~/layoutEven/ItemLayout'; 
import type {LayoutItem} from '../layoutEven/ItemLayout'
import ModalElement from '~/layoutEven/ModalElement';
import TableForm from '~/layoutEven/Table';
import ItemForm from '~/layoutEven/Item';
import './layoutEven.css';

interface Guest {
  id: number;
  name: string;
  phone: string;
  seatId: string | null;
}

interface TableLayout {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  seats: number;
  type: string;
}
interface layOutContainer {
  zoomLevel: number;
  x: number;
  y: number;
}
export default function RoundTablePlanner() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [tablesSquare, setTablesSquare] = useState<SquareTableData[]>([]);
  const [benchTables, setBenchTables] = useState<BenchTableData[]>([]);
  const [layoutItems, setLayoutItems] = useState<LayoutItem[]>([]);
  const [layoutContainer, setLayoutContainer] = useState<layOutContainer>(
  {
    zoomLevel: 1,
    x: 0,
    y: 0
  }
);
  const [nextTableNumber, setNextTableNumber] = useState(1);
  const [nextTableNumberBen, setNextTableNumberBen] = useState(1000);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number | null>(null);
  const [seatInput, setSeatInput] = useState<string | number>('');
  const [seatInputMaxSize, setSeatInputMaxSize] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [layoutName, setLayoutName] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [seatCheck, setSeatCheck] = useState<string | number>('');
  const [idTable,setIdtable]= useState<number>(0)
  const [idTableSquare,setIdtableSquare]= useState<number>(0)
  const [idTableBench,setIdtableBench]= useState<number>(0)
  const [isModalOpen, setModalOpen] = useState(false);
  const [savedLayouts, setSavedLayouts] = useState<string[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<string>("");
  const [itemDelete,setItemDelete] = useState<any>([]);
  const [itemDeleteID,setItemDeleteID] = useState<number>(0);
  const [checkLoai,setCheckLoai] = useState<number>(0)
  const [tableName,setTableName] = useState<string>("");
  const [tableShape,setTableShape] = useState<string>("");
 
  useEffect(() => {
  const layouts: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("layout_")) {
      layouts.push(key.replace("layout_", ""));
    }
  }
  setSavedLayouts(layouts);
  }, []);

const handleLoadLayout = () => {
  if (!selectedLayout) {
    alert("Vui lòng chọn một layout!");
    return;
  }

  const data = localStorage.getItem(`layout_${selectedLayout}`);
  if (!data) {
    alert("Không tìm thấy layout!");
    return;
  }

  try {
    const parsed = JSON.parse(data);

    // Truy cập trực tiếp từng loại bàn
    setTables(parsed.roundTables || []);
    setTablesSquare(parsed.squareTables || []);
    setBenchTables(parsed.benchTables || []);
    setLayoutItems(parsed.itemlayout || [])
    setLayoutContainer(parsed.layoutContainer || [])
  } catch (error) {
    console.error("Lỗi khi parse layout:", error);
    alert("Dữ liệu layout không hợp lệ!");
  }
};
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: 'Nguyễn A', phone: '0900000001', seatId: null },
    { id: 2, name: 'Trần B', phone: '0900000002', seatId: null },
    { id: 3, name: 'Lê C', phone: '0900000003', seatId: null },
    { id: 4, name: 'Phạm D', phone: '0900000004', seatId: null },
    { id: 5, name: 'Hoàng E', phone: '0900000005', seatId: null },
    { id: 6, name: 'Võ F', phone: '0900000006', seatId: null },
    { id: 7, name: 'Đỗ G', phone: '0900000007', seatId: null },
    { id: 8, name: 'Bùi H', phone: '0900000008', seatId: null },
    { id: 9, name: 'Ngô I', phone: '0900000009', seatId: null },
  ]);

const saveLayoutToJSON = ():string => {
  const layout = {
    roundTables: tables,
    squareTables: tablesSquare,
    benchTables: benchTables,
    itemlayout:layoutItems,
    layoutContainer:layoutContainer
  };

  return JSON.stringify(layout, null, 2); // pretty-print JSON

 
};
  const handleSaveLayout = () => {
    if (!layoutName.trim()) {
      alert('Vui lòng nhập tên layout!');
      return;
    }

    const layout  = saveLayoutToJSON();
    if (layout.length === 0) {
      alert('Chưa có bàn nào để lưu!');
      return;
    }

    localStorage.setItem(`layout_${layoutName}`, layout);
    alert(`✅ Layout "${layoutName}" đã được lưu!`);
  };

  

  const handleResize = (index: number, newTable: TableData) => {
    setTables((prev) => {
      const updated = [...prev];
      updated[index] = newTable;
      return updated;
    });
  };
  const handleResizeSquare = (index: number, newTable: SquareTableData) => {
      setTablesSquare((prev) => {
        const updated = [...prev];
        updated[index] = newTable;
        return updated;
      });
    };
  const handleResizeBench = (index: number, newTable: BenchTableData) => {
      setBenchTables((prev) => {
        const updated = [...prev];
        updated[index] = newTable;
        return updated;
      });
  };
   const handleResizeItem = (index: number, newTable: LayoutItem) => {
       setLayoutItems((prev) => {
          const updated = [...prev];
          updated[index] = newTable;
          return updated;
  });
  };
  const handleRotate = (index: number, newRotation: number) => {
    setTables((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rotation: newRotation };
      return updated;
    });
  };
  const handleRotateSquare = (index: number, newRotationDegree: number) => {
    const newRotationRad = newRotationDegree;
    setTablesSquare((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rotation: newRotationRad };
      return updated;
    });
  };
  const handleRotateBench = (index: number, newRotationDegree: number) => {
    const newRotationRad = newRotationDegree;
    setBenchTables((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rotation: newRotationRad };
      return updated;
    });
  };
 const handleRotateItem = (index: number, newRotationDegree: number) => {
    const newRotationRad = newRotationDegree;
    setLayoutItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rotation: newRotationRad };
      return updated;
    });
  };
  const handleDrag = (index: number, top: number, left: number) => {
  setTables((prev) => {
    const current = prev[index];
    if (!current) return prev;

    if (current.top === top && current.left === left) return prev;

    const updated = [...prev];
    updated[index] = { ...current, top, left };
    return updated;
  });
};

const handleDragSquare = (index: number, top: number, left: number, type: number) => {
  if (type === 1) {
    setTablesSquare((prev) => {
      const current = prev[index];
      if (!current) return prev;

      if (current.top === top && current.left === left) return prev;

      const updated = [...prev];
      updated[index] = { ...current, top, left };
      return updated;
    });
  }

  if (type === 2) {
    setBenchTables((prev) => {
      const current = prev[index];
      if (!current) return prev;

      if (current.top === top && current.left === left) return prev;

      const updated = [...prev];
      updated[index] = { ...current, top, left };
      return updated;
    });
  }
};

  
const handleDragItem = (index: number, top: number, left: number) => {
  setLayoutItems((prev) => {
    const currentItem = prev[index];
    if (!currentItem) return prev;

    // Nếu không có thay đổi vị trí thì không update
    if (currentItem.x === left && currentItem.y === top) {
      return prev;
    }

    const updated = [...prev];
    updated[index] = {
      ...currentItem,
      x: left,
      y: top,
    };
    return updated;
  });
};

  const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
     const newZoom = Math.min(Math.max(layoutContainer.zoomLevel + delta, 0.5), 2);

    setZoomLevel(newZoom);
    setLayoutContainer((prev) => ({
      ...prev,
      zoomLevel: newZoom,
    }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.table-wrapper')) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initOffset = { x: layoutContainer.x, y: layoutContainer.y };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setLayoutContainer((prev) => ({
        ...prev,
        x: initOffset.x + dx,
        y: initOffset.y + dy,
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

  };

  const handleAssignGuestsToSeats = () => {
    const newGuests = [...guests];
    const unassignedGuests = newGuests.filter((g) => !g.seatId);

    const tableElements = Array.from(document.querySelectorAll('.item_banghe'));
    const tablesWithNumbers = tableElements.map((el) => {
      const id = el.id;
      const parts = id.split('_@');
      return { el, tableNumber: parseInt(parts[1]) };
    });

    const sortedTables = tablesWithNumbers.sort((a, b) => a.tableNumber - b.tableNumber);
    for (const table of sortedTables) {
      const seatElements = table.el.querySelectorAll('.seat');
      for (const seatEl of seatElements) {
        const seatId = seatEl.id;
        const isSeatTaken = newGuests.some((g) => g.seatId === seatId);

        if (!isSeatTaken && unassignedGuests.length > 0) {
          const guest = unassignedGuests.shift();
          if (guest) guest.seatId = seatId;
        }
      }
    }

    setGuests(newGuests);
  };

  const handleGuestSeatChange = (guestId: number, newSeatId: string | null) => {
    setGuests((prev) =>
      prev.map((guest) => (guest.id === guestId ? { ...guest, seatId: newSeatId } : guest))
    );
  };
    const hanldleRenderSeatInput = (seat:number) => {
      setSeatInput(seat)
      console.log(seatCheck)
      if(seatCheck === 0){
        setTables(prevTables =>
          prevTables.map(table =>
            table.tableNumber === idTable
              ? { ...table, currentSeatCount: seat }
              : table
          )
        );
      }
      if(seatCheck === 1){
       setTablesSquare(prevTables =>
        prevTables.map(table =>
          table.tableNumber === idTableSquare
            ? { ...table, currentSeatCount: Number(seat) }
            : table
          )
        );
      }
       if(seatCheck === 2){
       setBenchTables(prevTables =>
        prevTables.map(table =>
          table.tableNumber === idTableBench
            ? { ...table, currentSeatCount: Number(seat) }
            : table
          )
        );
      }
    }

 function useClickOutsideItemSave() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickedItem = target.closest('.item_save');
      document.querySelectorAll('.item_save').forEach(item => {
        const isClicked = item === clickedItem;

        item.querySelectorAll('.resizer, .rotate-handle,.rotateSvg').forEach(child => {
          if (isClicked) {
            (child as HTMLElement).classList.remove('hidden');
          } else {
            (child as HTMLElement).classList.add('hidden');
          }
        });
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

const handleAddItem = (type: LayoutItem['type'],width:number,height:number,color?:string,nameItem?:string) => {
  const newItem: LayoutItem = {
    id: crypto.randomUUID(),
    type,
    x: 100,
    y: 100,
    size: Math.min(width, height) * 1,
    width: width,
    height: height,
    rotation: 0,
    name: `${type} ${layoutItems.length + 1}`,
    color:color || "",
    sourceType:4,
    nameItem:nameItem
  };
  setLayoutItems((prev) => [...prev, newItem]);
  // setModalOpen(false)
};
const handleAddBan = (index:number) =>{
  if(index === 1){
     const newTable: TableData = {
      tableNumber: nextTableNumber,
      shape: 'round',
      size: 100,
      top: 100,
      left: 100,
      rotation: 0,
      currentSeatCount:  10,
      sourceType:1
    };
    setTables((prev) => [...prev, newTable]);
    setNextTableNumber((prev) => prev + 1);
  }
  else if (index === 2){
      const width = 160;
      const height = 80;
      const seatCountTop = Math.floor(width / 36);
      const seatCountLeft = Math.floor(height / 36);
      const totalSeats = (seatCountTop + seatCountLeft) * 2;

      const newTable: SquareTableData = {
        tableNumber: nextTableNumber,
        shape: 'square',
        width,
        height,
        top: 100,
        left: 100,
        rotation: 0,
        currentSeatCount: totalSeats,
        sourceType:2
      };

      setTablesSquare((prev) => [...prev, newTable]);
      setNextTableNumber((prev) => prev + 1);
  }
  else {
    const newTable: BenchTableData = {
        tableNumber: nextTableNumberBen,
        shape: 'bench',
        width: 150,    
        height: 10,
        top: 100,
        left: 100,
        rotation: 0,
        currentSeatCount: 5,
        sourceType:3
      };

      setBenchTables([...benchTables, newTable]);
      setNextTableNumberBen(prev => prev + 1);
  }
  // setModalOpen(false)
}
const handleDelete = (e:React.MouseEvent) => {

    if (itemDeleteID === 1) {
      setTables(prev => prev.filter(i => i.tableNumber !== itemDelete.tableNumber));
    } else if (itemDeleteID === 2) {
    
      setTablesSquare(prev => prev.filter(i => i.tableNumber !== itemDelete.tableNumber));
    } else if (itemDeleteID === 3) {
      setBenchTables(prev => prev.filter(i => i.tableNumber !== itemDelete.tableNumber));
    } else if (itemDeleteID === 4) {
      setLayoutItems(prev => prev.filter(i => i.id !== itemDelete.id));
    }
  };
useClickOutsideItemSave();

  return (
    <div className="flex gap-2">
      <div className="mb-4 flex gap-4 items-center">
        
        {/* <button onClick={handleAssignGuestsToSeats} className="px-4 py-2 bg-green-600 text-white rounded">
          Thêm khách vào ghế
        </button>
       
       
        <label className="font-bold">Số ghế:</label> */}
        {/* <input
          type="number"
          value={seatInput}
          onChange={(e) => {
            const value = e.target.value;

            // Cho phép input rỗng (đang xóa để nhập lại)
            if (value === '') {
              setSeatInput('');
              return;
            }

            const parsed = parseInt(value);
            if (!isNaN(parsed) && parsed <= seatInputMaxSize && parsed >= 0) {
              setSeatInput(parsed);
              hanldleRenderSeatInput(parsed)
            }
          }}
          min={0}
          max={seatInputMaxSize}
          className="border px-2 py-1 rounded w-20 text-center"
        /> */}
        {/* <input
          type="text"
          value={layoutName}
          onChange={(e) => setLayoutName(e.target.value)}
          placeholder="Tên layout"
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleSaveLayout} className="px-4 py-2 bg-purple-600 text-white rounded">
          💾 Lưu layout
        </button> */}
      </div>
      {/* <select value={selectedLayout} onChange={(e) => setSelectedLayout(e.target.value)}>
        <option value="">-- Chọn layout đã lưu --</option>
        {savedLayouts.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <button onClick={handleLoadLayout}>Tải layout</button> */}
      <div
        id="tableContainer"
        ref={containerRef}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        className="relative border-2 border-dashed w-full h-[700px] overflow-hidden"
         style={{
            backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: `${layoutContainer.zoomLevel * 39}px ${layoutContainer.zoomLevel * 39}px`,
            transition: 'background-size 0.2s ease',
          }}
        >
           <div onClick={() => setModalOpen(true)} className="absolute top-[3px] right-[5px]">
            {isModalOpen && (
                  <ModalElement
                    onClose={() => setModalOpen(false)}
                    onAddItem={handleAddItem} // ✅ Truyền hàm xuống
                    onAddTable={handleAddBan}
                  />
                )}
              <button
                className="flex cursor-pointer items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-md px-4 py-2"
                type="button"
              >
                
                <i className="fas fa-plus"></i>
                <span>Add element</span>  
              </button>
            </div>
          <div
            style={{
              transform: `scale(${layoutContainer.zoomLevel})`,
              transformOrigin: 'top left',
              position: 'absolute',
              left: layoutContainer.x,
              top: layoutContainer.y,
            }}
        >
          
          {tables.map((table, index) => (
            <RoundTable
              key={index}
              table={table}
              index={index}
              selected={selectedTableIndex === index}
              setNextTableNumber={nextTableNumber}
              onClick={(i: number, event: React.MouseEvent) => {

               if ((event.target as HTMLElement).closest('.seat')) {
                   
                }
                else{
                  setSelectedTableIndex(i);
                  setSeatInput(tables[i].currentSeatCount);
                  setSeatInputMaxSize(tables[i].size / 10);
                  setSeatCheck(0)
                  setIdtable(tables[i].tableNumber);
                  setItemDelete(table)
                  setItemDeleteID(tables[i].sourceType)
                  setTableName(`Bàn ${tables[i].tableNumber}`)
                  setCheckLoai(1)
                  setTableShape("Bàn tròn")
                }
              }}
              onResize={handleResize}
              onRotate={handleRotate}
              onDrag={handleDrag}
              zoomLevel={zoomLevel}
              guests={guests}
              onGuestSeatChange={handleGuestSeatChange}
            />
          ))}
           {tablesSquare.map((table, index) => (
            <SquareTableRender
              key={index}
              table={table}
              index={index}
              selected={selectedTableIndex === index}
               guests={guests}
              onGuestSeatChange={handleGuestSeatChange}
              onResize={handleResizeSquare}
               onRotate={handleRotateSquare}
               onDrag={handleDragSquare}
              zoomLevel={zoomLevel}
               onClick={(i,event) => {

                if ((event.target as HTMLElement).closest('.seat')) {
                }else{
                   setSeatInput(tablesSquare[i].currentSeatCount);
                  const width = tablesSquare[i].width;
                  const height = tablesSquare[i].height;
                  const seatCountTop = Math.floor(width / 36);
                  const seatCountLeft = Math.floor(height / 36);
                  const totalSeats = (seatCountTop + seatCountLeft) * 2;

                  setSeatInputMaxSize(totalSeats); // gán max ghế
                  setSeatCheck(1)
                  setIdtableSquare(tablesSquare[i].tableNumber);
                   setItemDelete(table)
                  setItemDeleteID(tablesSquare[i].sourceType)
                  setTableName(`Bàn ${tablesSquare[i].tableNumber}`)
                  setCheckLoai(1)
                  setTableShape("Bàn vuông")
                }
              }}
            />
          ))}
          {benchTables.map((table, index) => (
            <BenchTableRender
              key={index}
              table={table}
              index={index}
              selected={selectedTableIndex === index}
              guests={guests}
              onClick={(i,event) => {
                if ((event.target as HTMLElement).closest('.seat')) {
                }else{
                 setSeatInput(benchTables[i].currentSeatCount);
                 setSeatInputMaxSize(benchTables[i].width / 30); // gán max ghế
                 setSeatCheck(2)
                 setIdtableBench(benchTables[i].tableNumber);
                 setItemDelete(table)
                  setItemDeleteID(benchTables[i].sourceType)
                  setTableName(`Ghế ${index + 1}`)
                  setCheckLoai(1)
                  setTableShape("Ghế dài")
                }
              }}
              onResize={handleResizeBench}
              zoomLevel={zoomLevel}
              onDrag={handleDragSquare}
              onRotate={handleRotateBench}
              onGuestSeatChange={handleGuestSeatChange}
            />
          ))}
          {layoutItems.map((item, index) => (
            <GenericItem
              key={item.id}
              item={item}
              index={index}
              selected={selectedTableIndex === index}
              zoomLevel={zoomLevel}
               onClick={(i,event) =>{
                setItemDelete(item)
                setItemDeleteID(layoutItems[i].sourceType)
                setCheckLoai(2)
                setTableName(`${layoutItems[i].nameItem}`)
               }}
              onRotate={handleRotateItem}
              onDrag={handleDragItem}
               onResize={handleResizeItem}
               onDelete={handleDelete}
               
            />
          ))}
           
        </div>
      </div>
      <div className='detailItem'>
         {checkLoai === 1 && (
            <TableForm
              tableName={tableName}
              tableShape={tableShape}
              seatInputMaxSize={seatInputMaxSize}
              onChange={hanldleRenderSeatInput}
              seatInput={seatInput}
               onDelete={(e) => handleDelete(e)}
            />
          )}
          {checkLoai === 2 && (
            <ItemForm
              itemName={tableName}
              onDelete={(e) => handleDelete(e)}
            />
          )}
      </div>
    </div>
  );
}
