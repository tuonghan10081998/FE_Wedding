import React, { useRef, useState,useEffect,useMemo,useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import RoundTable from '../layoutEven/RoundTable';
import SquareTableRender from '~/layoutEven/Square';
import BenchTableRender from '~/layoutEven/Bench';
import GenericItem from '~/layoutEven/ItemLayout'; 
import type {LayoutItem} from '../layoutEven/ItemLayout'
import ModalElement from '~/layoutEven/ModalElement';
import TableForm from '~/layoutEven/Table';
import ItemForm from '~/layoutEven/Item';
import ModalCustomer from '~/layoutEven/ModalCustomer';
import LayoutModal from '~/layoutEven/ModalSave';
import ModalSelect from '~/layoutEven/ModalSelect';
import DeleteList from '~/layoutEven/DeleteList';
import ExcelImporter from '~/layoutEven/ImportExCustomer';
import GuestInfoModal from '~/layoutEven/GuestInfo';
import ConfirmDeleteModal from '~/layoutEven/ModalNotiDelete';
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './layoutEven.css';
import { v4 as uuidv4 } from "uuid";
import ModalSelectProject from '~/layoutEven/ModalSelectProject';
export interface ImportResult {
  data: (string | number)[][];
  range: {
    startColumn: string;
    endColumn: string;
    startRow: number;
    endRow: string | number;
    totalRows: number;
    totalColumns: number;
  };
}
export interface UnifiedTableData {
  tableNumber: number;
  shape: 'bench' | 'round' | 'square';
  width?: number;       // dùng cho bench hoặc square
  height?: number;      // dùng cho bench hoặc square
  size?: number;        // dùng cho round
  top: number;
  left: number;
  rotation: number;
  currentSeatCount?: number;
  sourceType: number;
  nameTable: string;
  
}

export interface Guest {
  guestID: string;
  name: string;
  phone: string;
  seatID?: string | null;
  seatName?: string,
  gender: "Nam" | "Nữ";
  qr: string;
  nhom?:number;
  tableName?:string,
  tableID?:string;
  isActive?:boolean
  sort?:number
  groupID?:number
  groupInfo?:{
    groupID?:number
    groupName?:string
    parentID?:number
  }
}

interface layOutContainer {
  zoomLevel: number;
  x: number;
  y: number;
}
export interface Project {
  projectName: string;
  description: string;
  layout:object;
  userID: string;
  createdAt?:Date
  invitation?:string
  invitationID?:string
  status?:string
  updatedAt?:Date
  user?:string
  projectID?:string
}
export interface GroupGuest {
  parentID: string;
  parentName:string
  createDate?:Date
}
export default function TablePlanner() {
  const navigate = useNavigate();
  const [isUser, setUser] = useState<string | null>(null);
  const [isUserID, setUserID] = useState<string | null>("");
  const [tables, setTables] = useState<UnifiedTableData[]>([]);
  const [layoutItems, setLayoutItems] = useState<LayoutItem[]>([]);
  const [layoutContainer, setLayoutContainer] = useState<layOutContainer>({ zoomLevel: 0.7, x: 0, y: 0});
  const [nextTableNumber, setNextTableNumber] = useState(1);
  const [nextTableNumberItem, setNextTableNumberItem] = useState(1);
  const [nextTableNumberGuest, setNextTableNumberGuest] = useState(1);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number | null>(null);
  const [selectedLayoutIndex, setSelectedLayoutIndex] = useState<number | null>(null);
  const [selectedBenchIndex, setSelectedBenchIndex] = useState<number | null>(null);
  const [selectedSquareIndex, setSelectedSquareIndex] = useState<number | null>(null);
  const [seatInput, setSeatInput] = useState<string | number>('');
  const [seatInputMaxSize, setSeatInputMaxSize] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0.7);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef(0.7);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [layoutBackZoom,setlayoutBackZoom] = useState< number>(0.7);
  const [idTable,setIdtable]= useState<number>(0)
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenKH, setModalOpenKH] = useState(false);
  const [itemDelete,setItemDelete] = useState<any>([]);
  const [itemDeleteID,setItemDeleteID] = useState<number>(0);
  const [checkLoai,setCheckLoai] = useState<number>(0)
  const [tableShape,setTableShape] = useState<string>("");
  const [isModalSaveOpen, setIsModalSaveOpen] = useState(false);
  const [isModalSaveOpenProject, setIsModalSaveOpenProject] = useState(true);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [multiSelectedItems, setMultiSelectedItems] = useState<UnifiedTableData[]>([]);
  const [multiSelected, setMultiSelected] = useState<LayoutItem[]>([]);
  const [multiSelectedSeat, setMultiSelectedSeat] = useState<string>("");
  const [isNameTable,setNameTable] = useState<string>("")
  const [isGuestItem,setGuestItem]= useState<Guest[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const prevGuestsRef = useRef(guests);
  const prevTablesRef = useRef(tables);
  const [isNotiDelete,setNotiDelete] = useState<boolean>(false)
  const [isGuestName,setGuestName] = useState<string>("")
  const [isGuestID,setGuestID] = useState<string>("")
  const [isExporting, setIsExporting] = useState(false);
  const [data,setData] = useState<Project[]>([])
  const [isProjectID,setProjectID] = useState<string>("")
  const [isProjectName,setProjectName] = useState<string>("")
  const [isDataParentGroup,setDataParentGroup] = useState<GroupGuest[]>([])
  const [isParentGroup,setParentGroup] = useState<string>("0")
  useEffect(() => {
    const storedUser = localStorage.getItem("userInvitation");
     !storedUser && navigate("/");
    setUser(storedUser);
  }, []);
 
 const handleDeleteData = (projectid:string) => {
     setData((prev) => prev.filter((p) => p.projectID !== projectid));
     Delete(projectid)
 }

const getDataParentGroup = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/GroupInfo/ParentGroup`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      setDataParentGroup(data)
    } catch (error) {
        console.error(error);
    }
  };
    // GetData
const getDataProject = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Project/user/${isUserID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      setData(data)
    } catch (error) {
        console.error(error);
    }
  };
  const getDataUser = async () => {
    if (isUser == "") return;
    const url = `${import.meta.env.VITE_API_URL}/api/User`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      var dataUser = data.find((x:any) => x.mail === isUser)
      setUserID(dataUser.userID)
      
    } catch (error) {
        console.error(error);
    }
  };
   useEffect(()=> {
    getDataParentGroup()
  },[])
  useEffect(()=> {
   isUserID && getDataProject()
  },[isUserID])
  useEffect(() => {
    isUser && getDataUser()
  },[isUser])
  const handleConfirm =async (projectid:string) => {
      setTables([]);
      setLayoutItems([]);
      setLayoutContainer({ x: 0, y: 0, zoomLevel: 0.7 });
      setGuests([])
      zoomRef.current = 0.7;
      offsetRef.current = { x: 0, y: 0 };
      setNextTableNumber(1)
      setNextTableNumberItem(1)
      if (projectid !== "0") {
        // ✅ Đợi một chút để state reset hoàn toàn
        await new Promise(resolve => setTimeout(resolve, 10));
        await getDataProjectID(projectid);
      }
  }
  const getDataProjectID = async (projectid: string) => {
    const url = `${import.meta.env.VITE_API_URL}/api/Project/${projectid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      
      const dataLayout = data;
      const layoutRaw = (dataLayout as any).layout ?? (dataLayout as any).layoutData;
      
      if (layoutRaw) {
      const parsed = JSON.parse(layoutRaw);
      
      // ✅ Batch update tất cả state cùng lúc
      const normalizedTables:UnifiedTableData[] = (parsed.Table || []).map((t: any) => ({
        tableNumber: t.TableNumber,
        shape: t.Shape?.toLowerCase() ?? "",
        width: t.Width,
        height: t.Height,
        size: t.Size,
        top: t.Top,
        left: t.Left,
        rotation: t.Rotation,
        currentSeatCount: t.CurrentSeatCount,
        sourceType: t.SourceType,
        nameTable: t.NameTable,
      }));
     const maxTableNumber =
        normalizedTables.length > 0
          ? Math.max(...normalizedTables.map(t => t.tableNumber ?? 0)) + 1
          : 1;

      setNextTableNumber(maxTableNumber);
      const normalizedItemLayout:LayoutItem[] = (parsed.ItemLayout || []).map((item: any) => ({
        id: item.Id,
        name: item.Name,
        x: item.X,
        y: item.Y,
        nameItem: item.NameItem,
        type: item.Type,
        sourceType: item.SourceType,
        width: item.Width,
        height: item.Height,
        size: item.Size,
        rotation: item.Rotation,
        color: item.Color ?? "transparent",
      }));
      const maxTableNumberItem =
        normalizedItemLayout.length > 0
          ? (() => {
              const lastId = normalizedItemLayout[normalizedItemLayout.length - 1].id as string;

              const num = Number(lastId.replace("item", "")) || 0;
              return num + 1;
            })()
          : 1;

      setNextTableNumberItem(maxTableNumberItem);
      const normalizedLayoutContainer = {
        x: parsed.LayoutContainer?.X ?? 0,
        y: parsed.LayoutContainer?.Y ?? 0,
        zoomLevel: parsed.LayoutContainer?.ZoomLevel ?? 0.7,
      };
     
      // ✅ Sử dụng requestAnimationFrame để đảm bảo DOM đã clear
      requestAnimationFrame(() => {
        setTables(normalizedTables);
        setLayoutItems(normalizedItemLayout);
        setLayoutContainer(normalizedLayoutContainer);
        zoomRef.current = normalizedLayoutContainer.zoomLevel;
        offsetRef.current = { x: normalizedLayoutContainer.x, y: normalizedLayoutContainer.y };
        setlayoutBackZoom(normalizedLayoutContainer.zoomLevel)
        setZoomLevel(normalizedLayoutContainer.zoomLevel)
      });
      
    }
  } catch (error) {
    console.error(error);
  }
};
const GetGuest = async (projectid:string) => {
    if (isUser == "" || isProjectID === "0") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Guest/prroject/${projectid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      if(data.length > 0)
         setGuests(data)
    } catch (error) {
        console.error(error);
    }
  };
useEffect(() => {
  document.querySelectorAll('.item_save').forEach(item => {
    item.querySelectorAll('.resizer, .resize-handle, .rotateSvg').forEach(child => {
      (child as HTMLElement).classList.add('hidden');
    });
  });
}, [tables, layoutItems]);
useEffect(() => {
     const resetAndFetch = async () => {
      setTables([]);
      setLayoutItems([]);
      setLayoutContainer({ x: 0, y: 0, zoomLevel: 0.7 });
      
      zoomRef.current = 0.7;
      offsetRef.current = { x: 0, y: 0 };
      if (isProjectID !== "0") {
        // ✅ Đợi một chút để state reset hoàn toàn
        await new Promise(resolve => setTimeout(resolve, 10));
        await getDataProjectID(isProjectID);
         await GetGuest(isProjectID)
      }
    };
    
    resetAndFetch();
 
},[isProjectID])
   
  const handleSaveLayout = () => {
  
     const layoutCurent: layOutContainer = {
        x: offsetRef.current.x,
        y: offsetRef.current.y,
        zoomLevel: zoomRef.current,
      };
     const layout = {
        table: tables,
        itemLayout:layoutItems,
        layoutContainer:layoutCurent
      };
      if (!layout) {
        toast.error("Chưa có bàn nào để lưu!");
        return;
      }
      const Save:Project = {
        projectName: isProjectName,
        description: "", 
        layout:layout,
        userID: isUserID ?? "",
        projectID:isProjectID
    };
    isProjectID === "0" &&  PostProject(Save,true);
    isProjectID !== "0" &&  PostProject(Save,false);
  };
  const PostProject = async (save: Project,checkSave :boolean) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/api/Project`, {
      method: checkSave ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(save), // 👈 stringify object Save
    });

    let response = await fetch(request);
    let data = await response.json();
    if (response.status === 201 || response.status === 200) {
      await getDataProject()  
      if(checkSave){
        toast.success("Lưu thành công");
        await setProjectID(data.projectID)
        await setProjectName(data.projectName)
        handleSaveGuest(data.projectID)

      }else {
        toast.success("Cập nhật thành công");
         handleSaveGuest(isProjectID)
      }
    }
  };
  const handleSaveGuest = (projectid:string) => {
        const arrSaveGuest = guests.map(x => ({
            name: x.name,
            phone: x.phone,
            tableID: x.tableID ?? "", // nếu bạn lưu table là string
            seatID: x.seatID ?? "",
            seatName:x.seatName,
            isConfirm: 0,
            partnerCount: 0,
            groupName:`${x.groupInfo?.groupName}`,
            groupParentID: x.groupInfo?.parentID ?? 0,
            sort: x.sort,
            groupID: x.groupID,
            projectID: projectid, // có thể lấy từ props/state
            userID: isUserID,    // tuỳ bạn set
            guestID: x.guestID ,
            gender:x.gender ,
            tableName:x.tableName                               // lấy id đã generateUUID
      }));
       PostGuest(arrSaveGuest,projectid)
  }
const PostGuest = async (save: any,projectid:string) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/api/Guest`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(save), // 👈 stringify object Save
    });

    let response = await fetch(request);
    let data = await response.json();
    if (response.status === 201 || response.status === 200) {
        // setGuests(data)

    }
     
  };
const Delete = async (projectId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Project/${projectId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok)  throw new Error(`Lỗi xoá: ${response.status}`);
    
    if (response.status === 204) {
      toast.success("Đã xoá dự án");
      setProjectID("")
      setProjectName("")
    }

  } catch (error) {
    console.error("Delete error:", error);
  }
};

const handleExportPDF = async () => {
  if (!containerRef.current) return;
  setIsExporting(true);

  try {
    // ✅ Ẩn các element trước khi chụp
    document.querySelectorAll('.item_save').forEach(item => {
      item.querySelectorAll('.resizer, .resize-handle, .rotateSvg').forEach(child => {
        (child as HTMLElement).style.display = 'none';
      });
    });

    // Đợi DOM cập nhật
    await new Promise(resolve => setTimeout(resolve, 50));

    const dataUrl = await toPng(containerRef.current, { 
      cacheBust: true,
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      style: {
        margin: "0",
        padding: "0"
      }
    });

    // ✅ Hiện lại các element sau khi chụp xong
    document.querySelectorAll('.item_save').forEach(item => {
      item.querySelectorAll('.resizer, .resize-handle, .rotateSvg').forEach(child => {
        (child as HTMLElement).style.display = '';
      });
    });

    const pdf = new jsPDF("p", "mm", "a2");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = 320;

    const img = new Image();
    img.src = dataUrl;

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        try {
          const imgWidth = pageWidth;
          const imgHeight = (img.height * imgWidth) / img.width;

          if (imgHeight > pageHeight) {
            const scaledHeight = pageHeight;
            const scaledWidth = (img.width * scaledHeight) / img.height;
            pdf.addImage(
              img,
              "PNG",
              (pageWidth - scaledWidth) / 2,
              0,
              scaledWidth,
              scaledHeight
            );
          } else {
            pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);
          }

          pdf.save("layout.pdf");
          setIsExporting(false);
          resolve();
        } catch (error) {
          setIsExporting(false);
          reject(error);
        }
      };

      img.onerror = () => {
        setIsExporting(false);
        reject(new Error("Failed to load image"));
      };
    });
  } catch (error) {
    console.error("Export failed:", error);
    setIsExporting(false);
    
  }
};

const generateQR = (id: string, name: string) => `QR-${id}-${name}`;
 const handleSetGuest = (newGuests: Guest[]) => {
    setGuests(newGuests);
  };

const handleDataImported = (result: ImportResult): void => {
  let hasDuplicate = false;

  const processedGuests = processImportedData(result.data)
    .filter((guest) => {
      const isDuplicate = guests.some((g) => g.phone === guest.phone);
      if (isDuplicate) {
        hasDuplicate = true;
        return false; // bỏ qua guest này
      }
      return true;
    });

  if (processedGuests.length > 0) {
    const newTable = [...guests, ...processedGuests];
    setGuests(newTable);
  }
  if (hasDuplicate) {
    toast.warning("Có số điện thoại trùng, nên một số khách không được thêm vào danh sách!");
  }
};
  const processImportedData = (importData: any[][]) => {
     const maxTableNumber = guests.length > 0
          ? Math.max(...guests.map(t => t.sort ?? 0)) + 1
          : 1;

    const guestsTable = importData.map((row, index) => {
      return {
        guestID: uuidv4(),
        sort:maxTableNumber + index ,
        name: row[1] || '',
        gender: (row[2] === "Nam" || row[2] === "Nữ") ? row[2] : "Nam",
        phone: row[3]?.toString() || '',
        seatID:  null,
        groupID: typeof row[4] === 'number' ? row[4] : 0,
        qr: generateQR(`${Date.now()}-${Math.floor(Math.random() * 10000)}`, row[1] || ""),
        groupInfo:{
          parentID:parseInt(isParentGroup),
          groupName: `Nhóm ${row[4]}`  ,
        }
      } as Guest;
    });
    
    return guestsTable;
  };

  
const handleCtrlClick = (item: UnifiedTableData, event: React.MouseEvent,checkClick:boolean = false) => {
    setIsModalSelectOpen(false)
    setModalOpen(false)
    setModalOpenKH(false)
  if(checkClick ){
      setCheckLoai(3)
      setMultiSelectedItems((prev) => {
        const exists = prev.some(x => x.tableNumber === item.tableNumber);
        if (exists) {
          return prev.filter(x => x.tableNumber !== item.tableNumber);
        } else {
          return [...prev, item];
        }
      });
  }else {
    setMultiSelectedItems([])
  }
};
const handleConfirmChangeTableName =(newtable:string) => {
   // Tạo mảng mới với nameTable đã được cập nhật
  const updatedTables = tables.map((table) => {
    const isSelected = multiSelectedItems.some(
      (item) => item.tableNumber === table.tableNumber
    );
    if (isSelected) {
      return {
        ...table,
        nameTable: newtable, // update
      };
    }

    return table;
  });

   setTables(updatedTables);
}
const handleCtrlClickSeat = (item: string, event: React.MouseEvent,checkClick:boolean = false) => {
  if(checkClick){
      setMultiSelectedSeat(item)
  
  }else {
    setMultiSelectedSeat("")
  }
};

const handleCtrlClickITem = (item: LayoutItem, event: React.MouseEvent,checkClick:boolean = false) => {
      setIsModalSelectOpen(false)
    setModalOpen(false)
    setModalOpenKH(false)
  if(checkClick ){
      setCheckLoai(3)
      setMultiSelected((prev) => {
        const exists = prev.some(x => x.id === item.id);
        if (exists) {
          return prev.filter(x => x.id !== item.id);
        } else {
          return [...prev, item];
        }
      });
  }else {
    setMultiSelected([])
  }
};
 const toLocalX = (px: number) => (px - offsetRef.current.x) / zoomRef.current;
  const toLocalY = (px: number) => (px - offsetRef.current.y) / zoomRef.current;

 const handleConfirmModal = (
  row: number | string,
  layout: string,
  type: string,
  seatCount: number | string,
  checkRow: string,
  position: string  // thêm biến này
) => {
  if (!row || row === '') {
    toast.error("Vui lòng nhập dãy!");

    return;
  }

  if (!seatCount || seatCount === 0 || seatCount === '') {
    toast.error("Vui lòng nhập số lượng ghế!");
    return;
  }

  const count = Number(seatCount); 
  const rowNum = Number(row);
  const newTables: UnifiedTableData[] = [];

  const createTable = (
    tableNumber: number,
    top: number,
    left: number,
    type: string,
    layout: string
  ): UnifiedTableData => {
    if (type === 'tron') {
      return {
        tableNumber,
        shape: 'round',
        size: 100,
        top,
        left,
        rotation: 0,
        currentSeatCount: 10,
        width: 0,
        height: 0,
        sourceType: 1,
        nameTable:`Bàn ${tableNumber}`
      };
    } else if (type === 'vuong') {
      const width =  160 ;
      const height = 80 ;
      const totalSeats = (Math.floor(width / 36) + Math.floor(height / 36)) * 2;

      return {
        tableNumber,
        shape: 'square',
        width,
        height,
        size: 0,
        top,
        left,
        rotation: 0,
        currentSeatCount: totalSeats,
        sourceType: 2,
       nameTable:`Bàn ${tableNumber}`
      };
    } else { 
      const width = 195 
      const height = 10 

      return {
        tableNumber,
        shape: 'bench',
        width,
        height,
        size: 0,
        top,
        left,
        rotation: 0,
        currentSeatCount: 5,
        sourceType: 3,
        nameTable:`${tableNumber}`
      };
    }
  };

  const rowNumA = Number(row);
const totalRows = checkRow === 'nhieuday' ? rowNumA : rowNumA;
const startRow = checkRow === 'nhieuday' ? 1 : rowNumA;

// chia ghế cho từng row
const baseSeatsPerRow = Math.floor(count / totalRows);
const remainder = count % totalRows;

for (let r = startRow; r <= totalRows; r++) {
  // số ghế thực tế của row hiện tại
  const seatsInThisRow = baseSeatsPerRow + (r - startRow < remainder ? 1 : 0);

  for (let i = 0; i < seatsInThisRow; i++) {
    const padLeftPx = type === 'tron' ? 50 : type === 'vuong' ? 55 : 30;
    const padTopPx = type === 'tron' ? 53 : type === 'vuong' ? 60 : 53;
    let left = toLocalX(padLeftPx);
    let top = toLocalY(padTopPx);

    const containerWidth = toLocalX(
      window.innerWidth - (type === 'tron' ? 270 : type === 'vuong' ? 258 : 315)
    );
    const containerWidthd = containerWidth;

    const rowOffset = (r - 1) * (type === 'tron' ? 225 : type === 'vuong' ? 230 : 110);
    const rowOffsetD = (r - 1) * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);

    if (layout === 'ngang') {
      top += rowOffset;
      if (position === 'left') {
        left += i * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);
      } else if (position === 'right') {
        left = containerWidth - (i + 1) * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);
      }
    } else if (layout === 'doc') {
      top += i * (type === 'tron' ? 225 : type === 'vuong' ? 230 : 110);

      if (position === 'left') {
        left += rowOffsetD;
      } else if (position === 'right') {
        left = containerWidthd - r * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);
      }
    }

    newTables.push(
      createTable(nextTableNumber + newTables.length, top, left, type, layout)
    );
  }
}
  setTables((prev) => [...prev, ...newTables]);
  setNextTableNumber((prev) => prev + newTables.length);
};

  const handleResize = (index: number, newTable: UnifiedTableData) => {
    setTables((prev) => {
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
 
 const handleRotateItem = (index: number, newRotationDegree: number) => {
    const newRotationRad = newRotationDegree;
    setLayoutItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rotation: newRotationRad };
      return updated;
    });
  };
  const handleDrag = (index: number, top: number, left: number,type?: number) => {
  setTables((prev) => {
    const current = prev[index];
    if (!current) return prev;

    if (current.top === top && current.left === left) return prev;

    const updated = [...prev];
    updated[index] = { ...current, top, left };
    return updated;
  });
};

const handleDragItem = (index: number, top: number, left: number) => {
  setLayoutItems((prev) => {
    const currentItem = prev[index];
    if (!currentItem) return prev;

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
      zoomRef.current = Math.min(Math.max(zoomRef.current + delta, 0.5), 2);
      setlayoutBackZoom(zoomRef.current)
      if (innerRef.current) {
        innerRef.current.style.transform = `scale(${zoomRef.current}) translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`;
      }
       clearTimeout((handleZoom as any).timer);
          (handleZoom as any).timer = setTimeout(() => {
            setZoomLevel(zoomRef.current);
             setLayoutContainer((prev) => ({
              ...prev,
              zoomLevel: zoomRef.current,
            }));
        }, 1000);
  };
useEffect(() => {
  if (innerRef.current) {
    innerRef.current.style.transform = `scale(${zoomRef.current}) translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`;
  }
}, []);
const handleMouseDown = (e: React.MouseEvent) => {
  if ((e.target as HTMLElement).closest('.table-wrapper')) return;

  const startX = e.clientX;
  const startY = e.clientY;
  const initOffset = { ...offsetRef.current };

let frameId: number | null = null;

const handleMouseMove = (moveEvent: MouseEvent) => {
  if (frameId) cancelAnimationFrame(frameId);

  frameId = requestAnimationFrame(() => {
    const dx = moveEvent.clientX - startX;
    const dy = moveEvent.clientY - startY;
    offsetRef.current = { x: initOffset.x + dx, y: initOffset.y + dy };

    if (innerRef.current) {
      innerRef.current.style.transform =
        `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px) scale(${zoomRef.current})`;
    }
  });
};
  const handleMouseUp = () => {
    // ✅ chỉ cập nhật React state 1 lần khi kết thúc kéo
    setLayoutContainer(prev => ({
      ...prev,
      x: offsetRef.current.x,
      y: offsetRef.current.y,
      zoomLevel: zoomRef.current,
    }));

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

   
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
};
  const handleAssignGuestsToSeats = () => {
    const newGuests = [...guests];
    const newGuestsFilter = newGuests.filter(x => x.groupInfo?.parentID === parseInt(isParentGroup))
    
    const unassignedGuests = newGuestsFilter.filter((g) => !g.seatID);

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
        const seatID = seatEl.id;
        const tableWrapper = seatEl.closest(".table-wrapper");
         const maBan = tableWrapper?.getAttribute("data-indexnumber") || "";
         const tenGhe= seatEl.textContent
        const isSeatTaken = newGuests.some((g) => g.seatID === seatID);

        if (!isSeatTaken && unassignedGuests.length > 0) {
          const guest = unassignedGuests.shift();
          if (guest) {
            guest.seatID = seatID;
            guest.tableID = maBan; 
            guest.tableName = `${seatEl.textContent}`
            guest.seatName = tenGhe
          }
        }
      }
    }

    setGuests(newGuests);
  };

useEffect(() => {
  // Kiểm tra xem có thay đổi thực sự không
  const guestsChanged = prevGuestsRef.current !== guests;
  const tablesChanged = prevTablesRef.current !== tables;
  
  if (guests.length === 0 || tables.length === 0) return;
  
  if (guestsChanged || tablesChanged) {
    const updatedGuests = guests.map((guest) => {
      const table = tables.find(t => t.tableNumber === Number(guest.tableID));
      const newBan = table ? table.nameTable : guest.tableName;
      // Chỉ tạo object mới nếu thực sự có thay đổi
      if (guest.tableName !== newBan) {
        return { ...guest, tableName: newBan };
      }
      return guest;
    });
    
    // Kiểm tra có thay đổi ban name không
    const hasChanges = updatedGuests.some((guest, index) => 
      guest.tableName !== guests[index].tableName
    );
    
    if (hasChanges) {
      setGuests(updatedGuests);
    }
    
    // Cập nhật refs
    prevGuestsRef.current = guests;
    prevTablesRef.current = tables;
  }
}, [guests, tables]);
const getSeatInfo = (seatID: string) => {
  const seatElement = document.getElementById(seatID);
  if (!seatElement) return null;
  
  const tableWrapper = seatElement.closest(".table-wrapper");
  const maBan = tableWrapper?.getAttribute("data-indexnumber") || "";
  const seatText = seatElement.textContent || "";
  
  return { maBan, seatText };
};
const getSeatText = (seatID: string): string | null => {
  const seatElement = document.getElementById(seatID);
  if (!seatElement) return null;

  return seatElement.textContent?.trim() || null;
};
  const handleGuestSeatChange = (guestId: string, newSeatID: string | null) => {
      setGuests((prev) =>
        prev.map((guest) => {
          if (guest.guestID === guestId.toString()) {
            if (newSeatID) {
              const seatInfo = getSeatInfo(newSeatID);
              const seatTextNew = getSeatText(newSeatID)
              if (seatInfo) {
                return { 
                  ...guest, 
                  seatID: newSeatID,
                  tableID: seatInfo.maBan,
                  tableName: seatInfo.seatText,
                  seatName:seatTextNew ?? ""
                };
              }
              return { ...guest, seatID: newSeatID };
            }
          }
          return guest;
        })
      );
};
const hanldleRenderSeatInput = (seat:number ) => {
    setSeatInput(seat)
     setTables(prevTables =>
       prevTables.map(table =>
         table.tableNumber === idTable
           ? { ...table, currentSeatCount: seat }
           : table
       )
    );
}
const hanldleRenderTableNameInput = (nameTable:string ) => {
   setNameTable(nameTable)
     setTables(prevTables =>
       prevTables.map(table =>
         table.tableNumber === idTable
           ? { ...table, nameTable: nameTable }
           : table
       )
   );
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
  const centerX = toLocalX(window.innerWidth / 2);
  const centerY = toLocalY(window.innerHeight / 2);
  const newItem: LayoutItem = {
    id: `item${nextTableNumberItem}`,
    type,
    x: centerX - width / 2,   // cho nằm chính giữa item
    y: centerY - height / 2,
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
  setNextTableNumberItem((prev) => prev + 1);
};

const handleAddBan = (index: number) => {
  let newTable: UnifiedTableData;
  const centerX = toLocalX(window.innerWidth / 2);
  const centerY = toLocalY(window.innerHeight / 2);
  if (index === 1) {
    // Round table
    newTable = {
      tableNumber: nextTableNumber,
      shape: 'round',
      width: 0,
      height: 0,
      size: 100,
      top: centerY - 50,   // size/2
      left: centerX - 50,
      rotation: 0,
      currentSeatCount: 10,
      sourceType: 1,
      nameTable:`Bàn ${nextTableNumber}`
    };
  } else if (index === 2) {
    // Square table
    const width = 160;
    const height = 80;
    const seatCountTop = Math.floor(width / 36);
    const seatCountLeft = Math.floor(height / 36);
    const totalSeats = (seatCountTop + seatCountLeft) * 2;

    newTable = {
      tableNumber: nextTableNumber,
      shape: 'square',
      width,
      height,
      size: 0,
       top: centerY - height / 2,
      left: centerX - width / 2,
      rotation: 0,
      currentSeatCount: totalSeats,
      sourceType: 2,
       nameTable:`Bàn ${nextTableNumber}`
    };
  } else {
    // Bench table
    newTable = {
      tableNumber: nextTableNumber,
      shape: 'bench',
      width: 195,
      height: 10,
      size: 0,
     top: centerY - 5,
      left: centerX - 195 / 2,
      rotation: 0,
      currentSeatCount: 5,
      sourceType: 3,
       nameTable:`${nextTableNumber}`
    };
  }

  setTables((prev) => [...prev, newTable]);
  setNextTableNumber((prev) => prev + 1);
};
const handleDelete = (e:React.MouseEvent) => {

    if (itemDeleteID === 1) {
      setTables(prev => prev.filter(i => i.tableNumber !== itemDelete.tableNumber));
    } else if (itemDeleteID === 4) {
      setLayoutItems(prev => prev.filter(i => i.id !== itemDelete.id));
    }
     setGuests(prev =>
    prev.map(g => (g.seatID && g.seatID.includes(`${itemDelete.tableNumber}`) ? { ...g, seatId: null } : g))
  );
};
const handleDeleteList = (e:React.MouseEvent) =>{
     setTables((prevTables) =>
        prevTables.filter(
          (t) => !multiSelectedItems.some((m) => m.tableNumber === t.tableNumber)
        )
      );
      setLayoutItems((prevTables) =>
          prevTables.filter((t) => !multiSelected.some((x) => x.id === t.id))
      )
}
useClickOutsideItemSave();
const handleResetZoom =() => {
    zoomRef.current = 0.7;
    offsetRef.current.x = 0
    offsetRef.current.y = 0
      setlayoutBackZoom(zoomRef.current)
      if (innerRef.current) {
        innerRef.current.style.transform = `scale(${zoomRef.current}) translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`;
      }
       setZoomLevel(zoomRef.current);
             setLayoutContainer((prev) => ({
              ...prev,
              zoomLevel: zoomRef.current,
            }));
}
const handleClickSeat = (e: React.MouseEvent,seatid:string) => {

}

const handleAddSeatOnTable = (customerid:string,checkSeatID:boolean)=>{
  if(!multiSelectedSeat){
    toast.error("Vui lòng chọn ghế!");
    return
  }
  var guestItem = guests.find(x => x.seatID === multiSelectedSeat)
 
  if(guestItem){
     toast.error("Ghế này đã có người ngồi!");
     return
  }
  setGuests((prev) =>
   prev.map((guest) => {
   
    if (guest.guestID === customerid) {
      // tìm được đúng customer
      const seatInfo = getSeatInfo(multiSelectedSeat);
      const seatTextNew =getSeatText(multiSelectedSeat)
      if (seatInfo) {
        return {
          ...guest,
          seatID: multiSelectedSeat,
          tableID: seatInfo.maBan,
          tableName: seatInfo.seatText,
          seatName:seatTextNew ?? ""
        };
      }
      return { ...guest, seatId: multiSelectedSeat };
    }
    console.log(guest)
    return guest;
    
  })

  );
 document.querySelectorAll('.seat.text_num').forEach(el => {
      el.classList.remove('text_num');
  });
}
const handleInfoCustomer =(seatID:string) => {
    setMultiSelectedSeat("")
    var guestItem = guests.filter(x => x.seatID === seatID)
    setGuestItem(guestItem)
    setCheckLoai(4)
    setIsModalSelectOpen(false)
    setModalOpen(false)
    setModalOpenKH(false)
}
const handleDeleteGuest = (customerid:string,customer:string) => {
    setGuestID(customerid)
    setGuestName(customer)
    setNotiDelete(true)
}
useEffect(() => {
  if(!isGuestItem) return
  var guestItemInfo = guests.filter(x => x.guestID === isGuestItem[0]?.guestID)
  setGuestItem(guestItemInfo)
},[guests])
  return (
    <div>
       <>
          <button
              type="button"
                onClick={() => handleResetZoom()}
              className="fixed right-[320px] h-[40px] w-[40px] top-[calc(100vh-80px)] z-[9] cursor-pointer rounded-lg border border-gray-300 bg-white flex items-center justify-center shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <i className="fas fa-crosshairs text-purple-600 text-xl"></i>
            </button>
           
          </>
       <div className='relative'>
        <>
            <button
              type="button"
              aria-label="Save"
              onClick={() => {
                 if( isProjectID == "" ) {
                    toast.error("Vui lòng tạo dự án mới !");
                    return
                  }
                setIsModalSaveOpen(true)
              }}
              className="absolute top-[3px] left-[593px] cursor-pointer p-1 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <i className="fas fa-save fa-lg me-1"></i>
              Lưu layout
            </button>
            <LayoutModal
              isOpen={isModalSaveOpen}
              onClose={() => setIsModalSaveOpen(false)}
             onSave={handleSaveLayout}
             checkProject={isProjectID}
             projectName={isProjectName}
            />
          </>
           <>
            <button
              type="button"
              aria-label="Add Multiple Elements"
                onClick={() => {
                  if( isProjectID == "" ) {
                    toast.error("Vui lòng tạo dự án mới !");
                    return
                  }
                  setIsModalSelectOpen(true)
                  setModalOpen(false)
                 setModalOpenKH(false)
              }}
              className="absolute top-[3px] left-[180px] cursor-pointer p-1 px-3 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <i className="fas fa-layer-group fa-lg me-1"></i>
              Tạo layout
            </button>
            <ModalSelect
              isOpen={isModalSelectOpen}
              onClose={() => setIsModalSelectOpen(false)}
             onConfirm={(row: number | string, layout: string, type: string, seatCount: number | string,checkRow:string,position:string) => handleConfirmModal(row,layout,type,seatCount,checkRow,position)}
            />
          </>
            <>
             <button
              type="button"
              aria-label="Export PDF"
              onClick={() =>{
                if( isProjectID == "" ) {
                  toast.error("Vui lòng tạo dự án mới !");
                  return
                }
                 handleExportPDF()
              }}
              className="absolute top-[3px] left-[450px] cursor-pointer p-1 px-3 rounded-lg  bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <i className="fas fa-file-pdf fa-lg me-1"></i>
              Xuất Layout
            </button>    
           
          </>
           
           <div onClick={() => {
              if( isProjectID == "" ) {
                toast.error("Vui lòng tạo dự án mới !");
                return
              }
               setIsModalSelectOpen(false)
               setModalOpen(true)
               setModalOpenKH(false)
           }} className="absolute top-[3px] left-[5px]">
            {isModalOpen && (
                  <ModalElement
                    onClose={() => setModalOpen(false)}
                    onAddItem={handleAddItem} // ✅ Truyền hàm xuống
                    onAddTable={handleAddBan}
                  />
                )}
              <button
                type="button"
                aria-label="Add Single Element"
                className="bg-yellow-600 cursor-pointer p-1 px-3 rounded-lg text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <i className="fas fa-plus fa-lg me-1"></i>
                Thêm đối tượng
              </button>
            </div>
             <>
                <button
                type="button"
                aria-label="Select Project"
                onClick={() => setIsModalSaveOpenProject(true)}
                className="absolute top-[3px] left-[726px] flex items-center space-x-2 cursor-pointer p-1 px-3 rounded-lg bg-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 transition font-semibold select-none"
                title="Select Project"
              >
                <i className="fas fa-folder-open fa-lg me-1"></i>
                <span className="whitespace-nowrap font-roboto font-normal">{isProjectID === "" ? "Dự án" : isProjectName}</span>
           
            </button>
             <ModalSelectProject
              isOpen={isModalSaveOpenProject}
              onClose={() => setIsModalSaveOpenProject(false)}
              data={data}
              onDeleteData= {(project:string) => handleDeleteData(project)}
              setProjectID={setProjectID }
              setProjectName={setProjectName}
              handleConfirmXN={(projectid:string) => handleConfirm(projectid)}
            />
             </>
          
          <div onClick={() => {
             if( isProjectID == "" ) {
              toast.error("Vui lòng tạo dự án mới !");
              return
             }
               setIsModalSelectOpen(false)
                setModalOpen(false)
                 setModalOpenKH(true)
          }} 
            className="absolute top-[3px] left-[315px]">
            {isModalOpenKH && (
                  <ModalCustomer
                    onClose={() => setModalOpenKH(false)}
                    table={guests}
                   onAddSeat={handleAssignGuestsToSeats}
                   onClickSeat= {(customerid:string,checkseatid:boolean) => handleAddSeatOnTable(customerid,checkseatid)}
                   onDelete ={(customerid:string,customer:string) => handleDeleteGuest(customerid,customer)}
                    handleDataImported={handleDataImported}
                    data={isDataParentGroup}
                    setParentGroup={setParentGroup}
                    setGuest={handleSetGuest}
                   />
                )}
              <button
                type="button"
                aria-label="Customer List"
                className="cursor-pointer p-1 px-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <i className="fas fa-users fa-lg me-1"></i>
                Khách mời
              </button>
            </div>
      </div>
    <div className="flex gap-2">
     
       <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div
        id="tableContainer"
        ref={containerRef}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        className="relative w-full h-[700px] overflow-hidden"
        style={{
            backgroundImage: isExporting
              ? "none"
              : `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: `${layoutBackZoom * 39}px ${layoutBackZoom * 39}px`,
            transition: "background-size 0.2s ease",
          }}
        >
          <div className='absolute' style={{border: "1px solid #ccc",
            padding: "1px 10px",
            top: `${32 }px`}}></div>
            <div className='absolute' style={{border: "1px solid #ccc",
            padding: "1px 10px",
            top: `${32 }px`,right: "0"}}></div>
            <div className='absolute' style={{border: "1px solid #ccc",
            padding: "10px 1px",
            left: `${29 }px`,}}></div>
            <div className='absolute' style={{border: "1px solid #ccc",
            padding: "10px 1px",
            top: `${0 }px`,right: "29px"}}></div>
         <div 
            ref={innerRef}
            style={{
              willChange: 'transform',
              transform: `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px) scale(${zoomRef.current})`,
              transformOrigin: 'top left',
            }}
          
        >
          {tables.map((table, index) => {
              switch (table.shape) {
                case 'round':
                  return (
                    <RoundTable
                      key={`${isProjectID}-${table.tableNumber}`}
                      table={table}
                      index={index}
                      selected={selectedTableIndex === index}
                      setNextTableNumber={nextTableNumber}
                      onClick={(i, event) => {
                        const seatEl = (event.target as HTMLElement).closest('.seat');

                        if (seatEl) {
                          document.querySelectorAll('.seat.text_num').forEach(el => {
                              el.classList.remove('text_num');
                          });
                          const seatId= seatEl.getAttribute("id")?.toString();
                           const hasChildWithClass = seatEl.querySelector('.leading-tight') !== null;

                          if (hasChildWithClass || multiSelectedSeat === seatId) {
                              handleInfoCustomer(seatId ?? "")  
                          } else {
                               seatEl.classList.add('text_num');
                               setMultiSelectedSeat(seatId ?? "")
                              
                          }
                           return
                        }
                        if (event.ctrlKey) {
                          handleCtrlClick(table, event, true);
                          return
                        } 
                          handleCtrlClick(table, event);
                          setSelectedSquareIndex(null);
                          setSelectedTableIndex(i);
                          setSelectedBenchIndex(null);
                          setSelectedLayoutIndex(null);
                          setSeatInput(table.currentSeatCount?? 0);
                          setSeatInputMaxSize(table.size! / 10); 
                          setIdtable(table.tableNumber);
                          setItemDelete(table);
                          setItemDeleteID(1);
                          setNameTable(`${table.nameTable}`);
                          setCheckLoai(1);
                          setTableShape("Bàn tròn");
                      }}
                      onResize={handleResize}
                      onRotate={handleRotate}
                      onDrag={handleDrag}
                      zoomLevel={zoomLevel}
                      guests={guests}
                      onGuestSeatChange={handleGuestSeatChange}
                      isActive={multiSelectedItems.some(x => x.tableNumber === table.tableNumber)} 
                      onClickSeat={handleClickSeat}
                    />
                  );

                case 'square':
                  return (
                    <SquareTableRender
                      key={table.tableNumber}
                      table={table}
                      index={index}
                      selected={selectedSquareIndex === index}
                      guests={guests}
                      onGuestSeatChange={handleGuestSeatChange}
                      onResize={handleResize}
                      onRotate={handleRotate}
                      onDrag={handleDrag}
                      zoomLevel={zoomLevel}
                      isActive={multiSelectedItems.some(x => x.tableNumber === table.tableNumber)} 
                      onClick={(i, event) => {
                       const seatEl = (event.target as HTMLElement).closest('.seat');
                        if (seatEl) {
                          document.querySelectorAll('.seat.text_num').forEach(el => {
                              el.classList.remove('text_num');
                          });
                          const seatId= seatEl.getAttribute("id")?.toString();
                           const hasChildWithClass = seatEl.querySelector('.leading-tight') !== null;

                          if (hasChildWithClass || multiSelectedSeat === seatId) {
                              handleInfoCustomer(seatId ?? "")  
                          } else {
                               seatEl.classList.add('text_num');
                               setMultiSelectedSeat(seatId ?? "")
                              
                          }
                           return
                        }
                        if (event.ctrlKey) {
                          handleCtrlClick(table, event,true);
                          return; 
                        }
                        handleCtrlClick(table, event);
                          setSeatInput(table.currentSeatCount ?? 0);
                          const width = table.width!;
                          const height = table.height!;
                          const seatCountTop = Math.floor(width / 36);
                          const seatCountLeft = Math.floor(height / 36);
                          const totalSeats = (seatCountTop + seatCountLeft) * 2;
                          setSelectedSquareIndex(i);
                          setSelectedTableIndex(null);
                          setSelectedBenchIndex(null);
                          setSelectedLayoutIndex(null);
                          setSeatInputMaxSize(totalSeats);
                          setIdtable(table.tableNumber);
                          setItemDelete(table);
                          setItemDeleteID(1);
                          setNameTable(` ${table.nameTable}`);
                          setCheckLoai(1);
                          setTableShape("Bàn vuông");
                        
                      }}
                    />
                  );

                case 'bench':
                  return (
                    <BenchTableRender
                      key={table.tableNumber}
                      table={table}
                      index={index}
                      selected={selectedBenchIndex === index}
                      guests={guests}
                      onClick={(i, event) => {
                        const seatEl = (event.target as HTMLElement).closest('.seat');
                       if (seatEl) {
                          document.querySelectorAll('.seat.text_num').forEach(el => {
                              el.classList.remove('text_num');
                          });
                          const seatId= seatEl.getAttribute("id")?.toString();
                           const hasChildWithClass = seatEl.querySelector('.leading-tight') !== null;

                          if (hasChildWithClass || multiSelectedSeat === seatId) {
                              handleInfoCustomer(seatId ?? "")  
                          } else {
                               seatEl.classList.add('text_num');
                               setMultiSelectedSeat(seatId ?? "")
                              
                          }
                           return
                        }
                        if (event.ctrlKey) {
                          handleCtrlClick(table, event,true);
                          return; 
                        }
                        handleCtrlClick(table, event);
                          setSeatInput(table.currentSeatCount ?? 0);
                          setSeatInputMaxSize(table.width! / 30);
                          setIdtable(table.tableNumber);
                          setItemDelete(table);
                          setItemDeleteID(1);
                          setNameTable(`${table.nameTable}`);
                          setCheckLoai(1);
                          setTableShape("Ghế dài");
                          setSelectedBenchIndex(i);
                          setSelectedLayoutIndex(null);
                          setSelectedTableIndex(null);
                          setSelectedSquareIndex(null);
                     }}
                       
                      onResize={handleResize}
                      zoomLevel={zoomLevel}
                      onDrag={handleDrag}
                      onRotate={handleRotate}
                      onGuestSeatChange={handleGuestSeatChange}
                       isActive={multiSelectedItems.some(x => x.tableNumber === table.tableNumber)} 
                    />
                  );

                default:
                  return null;
              }
            })}
         
          {layoutItems.map((item, index) => (
            <GenericItem
             key={`${isProjectID}-${item.id}`}
              item={item}
              index={index}
              selected={selectedLayoutIndex  === index}
              zoomLevel={zoomLevel}
               onClick={(i,event) =>{
                 if (event.ctrlKey) {
                    handleCtrlClickITem(item, event,true);
                    return; 
                  }
                  setSelectedLayoutIndex(i);
                  setSelectedBenchIndex(null);
                  setItemDelete(item)
                  setItemDeleteID(item.sourceType)
                  setCheckLoai(2)
                  setNameTable(`${item.nameItem}`)
                  setSelectedTableIndex(null)
                  setSelectedTableIndex(null)
               }}
              onRotate={handleRotateItem}
              onDrag={handleDragItem}
               onResize={handleResizeItem}
               onDelete={handleDelete}
               isActive={multiSelected.some(x => x.id === item.id)} 
            />
          ))}
           
        </div>
      </div>
      <div className='detailItem'>
         {checkLoai === 1 && (
            <TableForm
              tableName={isNameTable}
              tableShape={tableShape}
              seatInputMaxSize={seatInputMaxSize}
              onChangeInput={hanldleRenderSeatInput}
              seatInput={seatInput}
               onDelete={(e) => handleDelete(e)}
               onChangeName = {hanldleRenderTableNameInput}
            />
          )}
          {checkLoai === 2 && (
            <ItemForm
              itemName={isNameTable}
              onDelete={(e) => handleDelete(e)}
            />
          )}
          {checkLoai === 3 && (
            <DeleteList
              onDelete={(e) => handleDeleteList(e)}
             onConfirm={(newtable:string) => handleConfirmChangeTableName(newtable)}
            />

          )}
          {checkLoai === 4 && isGuestItem?.length > 0 && (
            <GuestInfoModal
             onClickSeat= {(customerid:string,checkseatid:boolean) => handleAddSeatOnTable(customerid,checkseatid)}
            onDelete ={(customerid:string,customer:string) => handleDeleteGuest(customerid,customer)}
            table={isGuestItem[0]} />
          )}
      </div>
      
    </div>
     {isNotiDelete && (
      <ConfirmDeleteModal
        guestName={isGuestName}
        onClose={() => setNotiDelete(false)}
        onConfirm={() => {
          setGuests((prev) => prev.filter(x => x.guestID !== isGuestID))
          setGuestItem((prev) => prev.filter(x => x.guestID !== isGuestID))
          setNotiDelete(false);
        }}
      />
    )}
     </div>
  );
}
