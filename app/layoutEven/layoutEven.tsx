import React, { useRef, useState,useEffect,useMemo,useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import RoundTable from './RoundTable';
import SquareTableRender from '~/layoutEven/Square';
import BenchTableRender from '~/layoutEven/Bench';
import GenericItem from '~/layoutEven/ItemLayout'; 
import type {LayoutItem} from './ItemLayout'
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
import ZoneManager from '~/layoutEven/ZoneManager';
import ZoneForm from '~/layoutEven/ZoneForm';
import ModalSearchGuest from '~/layoutEven/ModalSearchGuest';
import type { Plan } from '~/Plan/PlanSelection';
import UpgradeModal from '~/layoutEven/UpgradeModalLayout';
import LimitNotificationModal from '~/layoutEven/LimitNotificationModalProps ';
import ItemLayout from '~/layoutEven/ItemLayout';
import ModalNotiGuest from '~/layoutEven/ModalNotiGuest';
export interface ZoneRegion {
  zoneId: string;
  zoneName: string;
  xPosition: number;
  yPosition: number;
  zoneWidth: number;
  zoneHeight: number;
  zoneColor?: string;
  alphaLevel?: number;
  active?:boolean
}
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
  groupParentID?:number
  isComeback?:number,
  isSearch?:boolean
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
  partnerCount?:number
  groupInfo?:{
    groupID?:number
    groupName?:string
    parentID?:number
  },
  mail?:string,
  isView?:boolean
  isSearch?:boolean
  status?: 'pending' | 'sent' ;
  projectID?:string
  subGuests?:any[]
  isConfirm?:number
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
  projectID?:string,
  fontSize?:object
}
export interface GroupGuest {
  parentID: string;
  parentName:string
  createDate?:Date
}
export interface FontSize {
  fontSizeTable: number;
  fontSizeSeat:number
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

  const [fontSize, setFontSize] = useState<FontSize>({
    fontSizeTable: 14,
    fontSizeSeat: 12
  });
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
  const [isModalSaveOpenProject, setIsModalSaveOpenProject] = useState(false);
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [multiSelectedItems, setMultiSelectedItems] = useState<UnifiedTableData[]>([]);
  const [multiSelected, setMultiSelected] = useState<LayoutItem[]>([]);
  const [multiSelectedSeat, setMultiSelectedSeat] = useState<string>("");
  const [isNameTable,setNameTable] = useState<string>("")
  const [isGuestItem,setGuestItem]= useState<Guest[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [subget, setSubget] = useState<Guest[]>([]);
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
  const [selectedParentGroup, setSelectedParentGroup] = useState<string>("0");
  const [isViewIconUser, setViewIconUser] = useState<boolean>(true);

  const [zoneCollection, setZoneCollection] = useState<ZoneRegion[]>([]);
  const [activeZoneIdx, setActiveZoneIdx] = useState<number | null>(null);
  const [isZoneMode, setIsZoneMode] = useState<boolean>(true)
  const [isConfirm,setConfirm] = useState<boolean>(false)
  const [isProjectLocal,setProjectLocal] = useState<string | null >(null)
  const [isProjectNameLocal,setProjectNameLocal] = useState<string | null >(null)
  const [isOpen, setIsOpen] = useState(false);
  const[isModalSearchGuest,setModalSearchGuest] = useState<boolean>(false)
  const[isParentGroupSearch,setParentGroupSearch]= useState<string>("0")
  const [isInvatition,setInvatition] = useState<string>("")
  const [side, setSide] = useState("left");
  // plan
  const [maxTable,setMaxTable] = useState<number>(0)
  const [maxGuest,setMaxGuest] = useState<number>(0)
  const [isExportLayout,setExportLayout] = useState<boolean>(false)
  const [maxProject,setMaxProject] = useState<number>(0)
  const [countMaxProject,setCountMaxProject] = useState<number>(0)
  const [checkmaxProject,setCheckMaxProject] = useState<boolean>(false)
  const [planID,setPlanID] = useState<string>("")
  const [plans, setPlans] = useState<Plan | null>(null);

  // token
  const [accessToken,setAccessToken] = useState<string>("")
  const [refreshToken,setRefreshToken] = useState<string>("") 

  const [isModalOpenUpgra, setIsModalOpenUpgra] = useState<boolean>(false);
  const [isTableLimitModalOpen, setIsTableLimitModalOpen] = useState(false);
  const [isGuestLimitModalOpen, setIsGuestLimitModalOpen] = useState(false);
  const [isExportlimit, setExportlimit] = useState(false);

  const [isModalNotiGuest,setModalNotiGuest] = useState<boolean>(false)

  const [ismessNotiGuest,setmessNotiGuest] = useState<string>("")
    const [isNumberDay,setNumberDay] = useState<number>(3)
  const handleUpgrade = () => {
    navigate("/layout/Plan");
    setIsModalOpenUpgra(false);
  };

  // Thêm handleToggleZoneMode function
  const handleToggleZoneMode = () => {
    // setIsZoneMode(!isZoneMode);

    // Đóng các modal khác khi bật zone mode
    if (!isZoneMode) {
      setIsModalSelectOpen(false);
      setModalOpen(false);
      setModalOpenKH(false);
    }
  };


    // Cập nhật handleZoneSelect 
  const handleZoneSelect = (zoneIndex: number | null) => {
    setActiveZoneIdx(zoneIndex);
    if (zoneIndex !== null) {
      setCheckLoai(5); // Set để hiển thị ZoneForm
       setIsModalSelectOpen(false)
        setModalOpen(false)
         setModalOpenKH(false)
     }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("userInvitation");
    const storedProject = localStorage.getItem("projectid");
    const storedProjectName = localStorage.getItem("projectidName");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
     !storedUser && navigate("/");
    setUser(storedUser);
    setProjectLocal(storedProject || "0")
    setProjectNameLocal(storedProjectName || "")
    
    setAccessToken(storedAccessToken ?? "")
    setRefreshToken(storedRefreshToken ?? "")
  }, []);
  const handleVisiableVung = () => {
    setZoneCollection((prev) => 
        prev.map(x => ({
          ...x,
          active: !x.active
        }))
      );
  };
  useEffect(()=>{
    planID && getDataPlan(planID)
  },[planID])
  const getDataPlan = async (planID:string) => {
    const url = `${import.meta.env.VITE_API_URL}/api/Plan/${planID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error(error);
    }
  };
useEffect(() => {
  if (!plans) return;
  setMaxGuest(plans.maxGuests);
  setMaxTable(plans.maxTable);
  setExportLayout(plans.isExport === 1);
  setMaxProject(plans.maxLayOut)
}, [plans]);
useEffect(() => {
 if(zoneCollection.length === 0) {
   setConfirm(!isConfirm)
 }
},[zoneCollection])
useEffect(() => {   
  const handleClick = (e: MouseEvent) => {     
    const target = e.target as HTMLElement;
    
    // Kiểm tra xem click có nằm trong tableContainer không
    const tableContainer = document.getElementById('tableContainer');
    if (!tableContainer || !tableContainer.contains(target)) {
      return; // Nếu click ngoài tableContainer thì không làm gì
    }
          
    // Nếu không click vào zone wrapper thì clear active zone     
    if (!target.closest('.zone-display-wrapper') && isZoneMode) {       
      setActiveZoneIdx(null);     
    }   
  };    

  document.addEventListener('click', handleClick);   
  return () => document.removeEventListener('click', handleClick); 
}, [isZoneMode]);
 const handleDeleteData = (projectid:string) => {
     setData((prev) => prev.filter((p) => p.projectID !== projectid));
     Delete(projectid)
 }
useEffect(() => {
  if(!isProjectLocal) return
  if(isProjectLocal === "0"){
    setIsModalSaveOpenProject(true)
  }
  else{
    setProjectID(isProjectLocal)
    setProjectName(isProjectNameLocal ?? "")
  }
},[isProjectLocal])
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
      setCountMaxProject(data.length)
      const dataProjectLocal = data.find((x:any) => x.projectID === isProjectLocal)
      if(!dataProjectLocal){
        setProjectLocal("0")
        setProjectNameLocal("0")
        setTables([]);
        setLayoutItems([]);
        setLayoutContainer({ x: 0, y: 0, zoomLevel: 0.7 });
        setGuests([])
        setZoneCollection([])
      }
      setData(data)
    } catch (error) {
        console.error(error);
    }
  };
  const getDataUser = async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/User`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      const data = await response.json();
      var dataUser = data.find((x:any) => x.mail === isUser)
      setUserID(dataUser.userID)
      setPlanID(dataUser.planID)
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
      setZoneCollection([])
      setIsModalSelectOpen(false)
      setModalOpen(false)
      setModalOpenKH(false)
      handleZoneSelect(null)
      setModalSearchGuest(false)
      setSelectedParentGroup("0")
      setParentGroup("0")
      zoomRef.current = 0.7;
      offsetRef.current = { x: 0, y: 0 };
      setNextTableNumber(1)
      setNextTableNumberItem(1)
      
      if (projectid !== "0") {
        // ✅ Đợi một chút để state reset hoàn toàn
        await new Promise(resolve => setTimeout(resolve, 10));
        await getDataProjectID(projectid);
        setCheckMaxProject(false)
      }else{
          if(countMaxProject >= maxProject){
            setCheckMaxProject(true)
            setIsModalOpenUpgra(true)
            
          }else{
            toast.success(`Tạo dự án thành công`);
          }
      }
  }

  const getDataProjectID = async (projectid: string) => {
    if(!projectid) return
    const url = `${import.meta.env.VITE_API_URL}/api/Project/${projectid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data = await response.json();
      
      const dataLayout = data;
      setInvatition(dataLayout.invitationID)
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
        groupParentID:t.GroupParentID,
        isComeback:0
      }));
      const fontSizeData = parsed.FontSize

    const normalizedFontSize: FontSize | null = 
       {
          fontSizeTable: fontSizeData ? fontSizeData.FontSizeTable : 14,
          fontSizeSeat:fontSizeData ?   fontSizeData.FontSizeSeat : 12,
        }
     
      console.log(normalizedFontSize)
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
     const normalizedZone:ZoneRegion[] = (parsed.ZoneRegion || []).map((item: any) => ({
        zoneId: item.ZoneId,
        zoneName: item.ZoneName,
        xPosition: item.XPosition,
        yPosition: item.YPosition,
        zoneWidth: item.ZoneWidth,
        zoneHeight: item.ZoneHeight,
        zoneColor: item.ZoneColor,
        alphaLevel: (item.AlphaLevel / 100),
        active:item.Active
      }));
      requestAnimationFrame(() => {
        setTables(normalizedTables);
        setLayoutItems(normalizedItemLayout);
        setLayoutContainer(normalizedLayoutContainer);
        setZoneCollection(normalizedZone)
        zoomRef.current = normalizedLayoutContainer.zoomLevel;
        offsetRef.current = { x: normalizedLayoutContainer.x, y: normalizedLayoutContainer.y };
        setlayoutBackZoom(normalizedLayoutContainer.zoomLevel)
        setZoomLevel(normalizedLayoutContainer.zoomLevel)
       
        normalizedFontSize && setFontSize(normalizedFontSize)
      });
      
    }
  } catch (error) {
    console.error(error);
  }
};

const GetGuest = async (projectid: string) => {
    if (isUser == "" || isProjectID === "0") return;
    const url = `${import.meta.env.VITE_API_URL}/api/Guest/project/${projectid}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const data = await response.json();
        if (data.length > 0) {
            // Xử lý guests chính
            const processedGuests = data.map((x: Guest) => ({
                ...x,
                isView: true
            }));

            // Tách subGuests thành mảng riêng
            const allSubGuests: Guest[] = [];
            
            data.forEach((guest: any) => {
                if (guest.subGuests && guest.subGuests.length > 0) {
                    guest.subGuests.forEach((subGuest: any) => {
                        // Tạo subGuest object với thông tin kế thừa từ parent
                        const processedSubGuest: Guest = {
                            guestID: subGuest.subGuestID, // Đổi subGuestID thành guestID
                            name: `${guest.name}`, // Hoặc tên khác tùy logic
                            phone: guest.phone, // Kế thừa từ parent
                            seatID: subGuest.seatID || null,
                            seatName: subGuest.seatName || '',
                            gender: guest.gender, // Kế thừa từ parent
                            qr: '', // Có thể tạo QR mới hoặc để trống
                            tableName: subGuest.tableName || '',
                            tableID: subGuest.tableID || '',
                            isActive: guest.isActive,
                            
                            // Các trường kế thừa từ parent
                            sort: guest.sort,
                            groupID: guest.groupID,
                            groupInfo: {
                                groupID: guest.groupInfo?.groupID,
                                groupName: guest.groupInfo?.groupName,
                                parentID: guest.groupInfo?.parentID
                            },
                            
                            mail: guest.mail,
                            isView: true,
                            isSearch: false,
                            status: 'pending'
                        };
                        
                        allSubGuests.push(processedSubGuest);
                    });
                }
            });
           
           setGuests([...processedGuests, ...allSubGuests]);
           setSubget(allSubGuests);
        }
        else{
           setGuests([]);
           setSubget([]);
        }
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
      setZoneCollection([])
      setLayoutContainer({ x: 0, y: 0, zoomLevel: 0.7 });
      setZoneCollection([])
      setIsModalSelectOpen(false)
      setModalOpen(false)
      setModalOpenKH(false)
      handleZoneSelect(null)
      setModalSearchGuest(false)
      setSelectedParentGroup("0")
      setParentGroup("0")
      zoomRef.current = 0.7;
      offsetRef.current = { x: 0, y: 0 };
      setViewIconUser(true)
      if (isProjectID !== "0") {
        // ✅ Đợi một chút để state reset hoàn toàn
        await new Promise(resolve => setTimeout(resolve, 10));
        await getDataProjectID(isProjectID);
        setTimeout(() => {
           GetGuest(isProjectID)
        }, 2000);
      }else{
       await handleAddItem("sankhau",200,200,"#155DFC","Sân khấu",(window.innerWidth / 2) + 182,150,1);
       await handleAddItem("cong",150,200,"transparent","Cổng",(window.innerWidth / 2) + 182,window.innerHeight + 200,2);
      }
    };
    resetAndFetch();
},[isProjectID])
useEffect(() => {
  if(!isProjectName) return
   localStorage.setItem("projectid", isProjectID); 
   localStorage.setItem("projectidName", isProjectName);
},[isProjectName])
  const handleSaveLayout = (access:string) => {
      const layoutCurent: layOutContainer = {
        x: offsetRef.current.x,
        y: offsetRef.current.y,
        zoomLevel: zoomRef.current,
      };

      const dataZone = zoneCollection.map(x => ({
        ...x,
        alphaLevel: (x.alphaLevel ?? 0) * 100
      }));

      const layout = {
        table: tables,
        itemLayout: layoutItems,
        layoutContainer: layoutCurent,
        zoneRegion: dataZone,
        fontSize:fontSize
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
        projectID:isProjectID,
        invitationID:isInvatition,
       
    };
    
     isProjectID === "0" &&  PostProject(Save,true,access);
     isProjectID !== "0" &&  PostProject(Save,false,access);
  };
 
  const ReFreshToken = async (value: number) => {
     const encodedRefreshToken = encodeURIComponent(refreshToken);
    const request = new Request(
      `${import.meta.env.VITE_API_URL}/api/User/refresh-token/${isUserID}?refreshtoken=${encodedRefreshToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
  );

  let response = await fetch(request);
  const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      if (value === 2) {
        hadleCheckExportPDF(data.accessToken);
      }else{
        handleSaveLayout(data.accessToken)
      }
    }else{
      navigate("/")
    }
  };

  const PostProject = async (save: Project,checkSave :boolean,access:string) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/api/Project`, {
      method: checkSave ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
      },
      body: JSON.stringify(save), // 👈 stringify object Save
    });

    let response = await fetch(request);
    let data: any = null;
    const text = await response.text();
    if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
    }
    if (response.status === 201 || response.status === 200) {
     
      if(checkSave){
        toast.success("Lưu thành công");
        await setProjectID(data.projectID)
        await setProjectName(data.projectName)
        await getDataProject()  
        localStorage.setItem("projectid", data.projectID); 
        localStorage.setItem("projectidName", data.projectName);
        handleSaveGuest(data.projectID,access)
        setIsModalSaveOpenProject(false)
      }else {
        toast.success("Cập nhật thành công");
         handleSaveGuest(isProjectID,access)
      }
    }
     else if(response.status === 401){
       ReFreshToken(1)
    
    }
     
  };
const handleSaveGuest = (projectid: string,access:string) => {
  // Lấy danh sách guestID trong subget
  const subGuestIds = new Set(subget.map(x => x.guestID));

  // Loại bỏ những guest nào có guestID nằm trong subget
  const arrSaveGuest = guests
    .filter(x => !subGuestIds.has(x.guestID))
    .map(x => ({
      name: x.name,
      phone: x.phone,
      tableID: x.tableID ?? "",
      seatID: x.seatID ?? "",
      seatName: x.seatName,
      isConfirm: 0,
      partnerCount: 0,
      groupName: `${x.groupInfo?.groupName}`,
      groupParentID: x.groupInfo?.parentID ?? 0,
      sort: x.sort,
      groupID: x.groupID,
      projectID: projectid,
      userID: isUserID,
      guestID: x.guestID,
      gender: x.gender,
      tableName: x.tableName,
      mail: x.mail ?? ""
    }));
    if(arrSaveGuest.length > 0)
     PostGuest(arrSaveGuest, projectid,access);
};
const PostGuest = async (save: any,projectid:string,access:string) => {
    const request = new Request(`${import.meta.env.VITE_API_URL}/api/Guest`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
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
const DeleteGuest = async (guestid: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/Guest/${guestid}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok)  throw new Error(`Lỗi xoá: ${response.status}`);
    
    if (response.status === 204) {
      toast.success("Đã xoá khách mời");
    }

  } catch (error) {
    console.error("Delete error:", error);
  }
};
const handleEmportTemplates = async () => {
   const url = `${import.meta.env.VITE_API_URL}/api/Project/download-template`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    // Lấy dữ liệu dạng blob
    const blob = await response.blob();

    // Tạo URL cho blob
    const urlBlob = window.URL.createObjectURL(blob);

    // Tạo thẻ <a> để tải file
    const link = document.createElement("a");
    link.href = urlBlob;

    // Lấy tên file từ header (nếu có) hoặc đặt mặc định
    const disposition = response.headers.get("content-disposition");
    let fileName = "template.xlsx";
    if (disposition && disposition.includes("filename=")) {
      fileName = disposition.split("filename=")[1].split(";")[0].replace(/"/g, "");
    }

    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Xóa link và giải phóng URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlBlob);
  } catch (error) {
    console.error("Download error:", error);
  }
}
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
const hadleCheckExportPDF = async (access:string) => {
  const request = new Request(`${import.meta.env.VITE_API_URL}/api/Project/IsExport`, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access}`
      },
      //body: JSON.stringify(save), // 👈 stringify object Save
    });

    let response = await fetch(request);
    if (response.status === 201 || response.status === 200) {
      handleExportPDF()
    }
    else if(response.status === 401){
      ReFreshToken(2)
    }
    else if(response.status === 400){
      setExportlimit(true)
    }
}
const generateQR = (id: string, name: string) => `QR-${id}-${name}`;
 const handleSetGuest = (newGuests: Guest[]) => {
    setGuests(newGuests);
  };

const handleDataImported = (result: ImportResult): void => {
 
  if(isParentGroup === "0"){
      toast.error("Vui lòng chọn bên !");
       return
  }
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
    
  // Lọc bỏ những row có name rỗng trước khi xử lý
  const validRows = importData.filter(row => row[1] && row[1].toString().trim() !== '');
  
  // KIỂM TRA GIỚI HẠN KHÁCH MỜI
  const currentGuestCount = guests.length;
  const maxGuestLimit = maxGuest; // Giới hạn của gói (bạn có thể thay đổi)
  
  // Tính số khách còn có thể thêm
  const availableSlots = maxGuestLimit - currentGuestCount;
  
  // Nếu đã đầy hoàn toàn
  if (availableSlots <= 0) {
    setIsGuestLimitModalOpen(true);
    return []; // Không thêm khách nào
  }
  
  // Nếu số khách muốn import vượt quá chỗ trống
  let rowsToProcess = validRows;
  let showWarning = false;
  
  if (validRows.length > availableSlots) {
    rowsToProcess = validRows.slice(0, availableSlots); // Chỉ lấy số khách còn lại
    showWarning = true; // Đánh dấu để hiện thông báo sau
  }
  
  const guestsTable = rowsToProcess.map((row, index) => {
    return {
      guestID: uuidv4(),
      sort: maxTableNumber + index,
      name: row[1] || '',
      gender: (row[2] === "Nam" || row[2] === "Nữ") ? row[2] : "Nam",
      phone: row[3]?.toString() || '',
      seatID: null,
      groupID: typeof row[4] === 'number' ? row[4] : 0,
      qr: generateQR(`${Date.now()}-${Math.floor(Math.random() * 10000)}`, row[1] || ""),
      groupInfo: {
        parentID: parseInt(isParentGroup),
        groupName: `${row[4]}`,
      },
      mail: row[5] ?? "",
      isView: isViewIconUser,
    } as Guest;
  });
  
  // Hiển thị modal cảnh báo SAU KHI đã import xong
  if (showWarning) {
    setTimeout(() => {
      setIsGuestLimitModalOpen(true);
    }, 100);
  }
  
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
  position: string,  // thêm biến này
  groupParentID:string
) => {
   
  if (!row || row === '') {
    toast.error("Vui lòng nhập dãy!");

    return;
  }

  if (!seatCount || seatCount === 0 || seatCount === '') {
    toast.error("Vui lòng nhập số lượng ghế!");
    return;
  }
  if(groupParentID === "0"){
    toast.error("Vui lòng chọn bên!");
    return
  }
  const count = Number(seatCount); 
  const rowNum = Number(row);
  const newTables: UnifiedTableData[] = [];
  let  maxTableNumber =
  tables.length > 0 ? Math.max(...tables.map(t => t.tableNumber ?? 0)) : 0;
   let maxTableComback =
  tables.length > 0 ? Math.max(...tables.map(t => t.isComeback ?? 0)) + 1 : 1;
  const createTable = (
    tableNumber: number,
    top: number,
    left: number,
    type: string,
    layout: string
  ): UnifiedTableData => {
    
    maxTableNumber++;
    if (type === 'tron') {
      return {
        tableNumber : maxTableNumber,
        shape: 'round',
        size: 100,
        top,
        left,
        rotation: 0,
        currentSeatCount: 10,
        width: 0,
        height: 0,
        sourceType: 1,
        nameTable:`Bàn ${maxTableNumber}`,
        groupParentID:parseInt(groupParentID),
        isComeback:maxTableComback
      };
    } else if (type === 'vuong') {
      const width =  160 ;
      const height = 80 ;
      const totalSeats = (Math.floor(width / 36) + Math.floor(height / 36)) * 2;

      return {
        tableNumber : maxTableNumber,
        shape: 'square',
        width,
        height,
        size: 0,
        top,
        left,
        rotation: 0,
        currentSeatCount: totalSeats,
        sourceType: 2,
       nameTable:`Bàn ${maxTableNumber}`,
       groupParentID:parseInt(groupParentID),
        isComeback:maxTableComback
      };
    } else { 
      const width = 195 
      const height = 10 

      return {
        tableNumber : maxTableNumber,
        shape: 'bench',
        width,
        height,
        size: 0,
        top,
        left,
        rotation: 0,
        currentSeatCount: 5,
        sourceType: 3,
        nameTable:`${maxTableNumber}`,
        groupParentID:parseInt(groupParentID),
        isComeback:maxTableComback
      };
    }
  };

const rowNumA = Number(row);
const totalRows = checkRow === 'nhieuday' ? rowNumA : rowNumA;
const startRow = checkRow === 'nhieuday' ? 1 : rowNumA;

// chia ghế cho từng row
const baseSeatsPerRow = Math.floor(count / totalRows);
const remainder = checkRow === 'nhieuday' ? count % totalRows : count;

for (let r = startRow; r <= totalRows; r++) {
  const seatsInThisRow = checkRow === 'nhieuday' ? baseSeatsPerRow + (r - startRow < remainder ? 1 : 0) : count;
  const dataSanKhan = layoutItems.find((x:LayoutItem) => x.id === `item1`);
  
  // Lọc bàn theo left (trái/phải sân khán)
  const tablesLeft = tables.filter(t => t.left < (dataSanKhan?.x ?? 0));
  const tablesRight = tables.filter(t => t.left > (dataSanKhan?.x ?? 0));
  
  let minLeft = Math.min(...tablesLeft.map(t => t.left)) ?? 0;
  if (!isFinite(minLeft)) {
    minLeft = 0;
  }
  
  let maxRight = Math.max(...tablesRight.map(t => t.left)) ?? 0;
  if (!isFinite(maxRight)) {
    maxRight = 0;
  }
  
  // Tìm top lớn nhất (bàn thấp nhất) ở bên trái và phải
  let maxTopLeft = Math.max(...tablesLeft.map(t => t.top)) ?? 0;
  if (!isFinite(maxTopLeft)) {
    maxTopLeft = 0;
  }
  
  let maxTopRight = Math.max(...tablesRight.map(t => t.top)) ?? 0;
  if (!isFinite(maxTopRight)) {
    maxTopRight = 0;
  }
  
  for (let i = 0; i < seatsInThisRow; i++) {
    const currentTableCount = tables.length + newTables.length + 1;
    const maxTableLimit = maxTable;
    
    if(currentTableCount > maxTableLimit){
      setIsTableLimitModalOpen(true);
      break;
    }
    
    const padLeftPx = (dataSanKhan?.x ?? 0) - (type === 'tron' ? 180 : type === 'vuong' ? 240 : 260);
    const padRightPx = (dataSanKhan?.x ?? 0) + (type === 'tron' ? 280 : type === 'vuong' ? 340 : 360);
    const padTopPx = (dataSanKhan?.y ?? 0) + (type === 'tron' ? 53 : type === 'vuong' ? 60 : 53);

    // Tọa độ bàn bắt đầu
    let left = minLeft == 0 ? padLeftPx : padLeftPx;
    if(position === 'right'){
      left = maxRight == 0 ? padRightPx : padRightPx;
    }
    
    // Tính top: nếu đã có bàn thì tiếp tục từ bàn cuối + khoảng cách
    let top = padTopPx + 70;
    if(position === 'left' && maxTopLeft > 0){
      top = maxTopLeft + (type === 'tron' ? 225 : type === 'vuong' ? 230 : 110);
    } else if(position === 'right' && maxTopRight > 0){
      top = maxTopRight + (type === 'tron' ? 225 : type === 'vuong' ? 230 : 110);
    }

    const containerWidth = (dataSanKhan?.x ?? 0) + (type === 'tron' ? 50 : type === 'vuong' ? -10 : 30);
    const rowOffset = (r - 1) * (type === 'tron' ? 225 : type === 'vuong' ? 230 : 110);
    const rowOffsetD = (r - 1) * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);
    
    if (layout === 'ngang') {
      top += rowOffset;
      if (position === 'left') {
        left -= i * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);
      } else if (position === 'right') {
        left = containerWidth + (i + 1) * (type === 'tron' ? 225 : type === 'vuong' ? 310 : 230);
      }
    } else if (layout === 'doc') {
      // Với layout dọc: bàn xếp theo chiều dọc (top tăng dần)
      top += (i * (type === 'tron' ? 225 : type === 'vuong' ? 230 : 110));

      if (position === 'left') {
        left -= rowOffsetD;
      } else if (position === 'right') {
        left += rowOffsetD;
      }
    }
    
    const table = createTable(1, top, left, type, layout);
    if (table !== null) {
      newTables.push(table);
    }
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
  // Giảm delta từ 0.05 xuống 0.02 hoặc 0.01 để zoom chậm hơn
  const delta = e.deltaY < 0 ? 0.05 : -0.05; // Thay đổi từ 0.05 -> 0.02
  
  // Hoặc nếu muốn zoom rất chậm:
  // const delta = e.deltaY < 0 ? 0.01 : -0.01;
  
  zoomRef.current = Math.min(Math.max(zoomRef.current + delta, 0.01), 2);
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
const handleResetSeat = () => {
  const newGuests = guests.map(guest => {
    if (guest.groupInfo?.parentID === parseInt(isParentGroup)) {
      return {
        ...guest,
        seatID: "",
        tableID: "",
        tableName: "",
        seatName: ""
      };
    }
    return guest;
  });

  setGuests(newGuests);
};

const handleAssignGuestsToSeats = () => {
  const newGuests = [...guests];
  const newGuestsFilter = newGuests.filter(x => x.groupInfo?.parentID === parseInt(isParentGroup));

  const unassignedGuests = newGuestsFilter.filter((g) => !g.seatID);
  var tableSetNameTable = tables
  
  // Nhóm khách theo groupName
  const guestsByGroup = unassignedGuests.reduce((acc, guest) => {
    const groupName = guest.groupInfo?.groupName || 'default';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(guest);
    return acc;
  }, {} as Record<string, typeof unassignedGuests>);
  
  console.log(guestsByGroup)
  
  const tableElements = Array.from(document.querySelectorAll('.item_banghe'));
  const tablesWithNumbers = tableElements.map((el) => {
    const id = el.id;
    const parts = id.split('_@');
    return { el, tableNumber: parseInt(parts[1]) };
  });
  const dataSanKhan = layoutItems.find((x: LayoutItem) => x.id === "item1");
  const sortedTables = tablesWithNumbers.sort((a, b) => a.tableNumber - b.tableNumber);
const mergedTables = sortedTables.map(item => {
  const found = tables.find(t => t.tableNumber === item.tableNumber);
  return {
    ...item,
    top: Number(found?.top ?? 0),
    left: Number(found?.left ?? 0),
    groupParentID: found?.groupParentID ?? null
  };
});

const filteredTables = mergedTables.filter(item => {
  if (isParentGroup && item.groupParentID != null) {
    return String(item.groupParentID) === String(isParentGroup);
  }
  return true;
});

const sanKhanX = Number(dataSanKhan?.x || 0);

// Phân loại
const leftTables = filteredTables.filter(t => t.left < sanKhanX);
const rightTables = filteredTables.filter(t => t.left >= sanKhanX);

// Sắp xếp từng nhóm theo top
const sortedLeft = [...leftTables].sort((a, b) => Number(a.top) - Number(b.top));
const sortedRight = [...rightTables].sort((a, b) => Number(a.top) - Number(b.top));

// ✅ Xác định bàn nhỏ nhất
const minTable = filteredTables.reduce((prev, curr) => {
  return curr.tableNumber < prev.tableNumber ? curr : prev;
}, filteredTables[0]);

// ✅ Quyết định thứ tự ghép
let finalSortedTables = [];
if (minTable.left < sanKhanX) {
  // Bàn nhỏ nhất nằm bên trái → trái trước
  finalSortedTables = [...sortedLeft, ...sortedRight];
} else {
  // Bàn nhỏ nhất nằm bên phải → phải trước
  finalSortedTables = [...sortedRight, ...sortedLeft];
}

console.log(finalSortedTables)

  // Theo dõi bàn nào đã được sử dụng bởi nhóm nào
  const tableUsedByGroup: Record<string, string[]> = {}; // groupName -> [maBan1, maBan2, ...]
  
  // Helper function: Kiểm tra xem bàn có khách ngồi chưa và lấy groupName của khách đang ngồi
  const getTableOccupancyInfo = (maBan: string) => {
    const occupiedGuests = newGuests.filter(guest => guest.tableID === maBan);
    
    if (occupiedGuests.length === 0) {
      return { isOccupied: false, groupName: null };
    }
    
    // Lấy groupName của khách đầu tiên (giả định tất cả khách trong 1 bàn cùng nhóm)
    const occupiedGroupName = occupiedGuests[0].groupInfo?.groupName || 'default';
    return { isOccupied: true, groupName: occupiedGroupName };
  };
  
  // Xử lý từng nhóm khách
  Object.entries(guestsByGroup).forEach(([groupName, groupGuests]) => {
    let currentGuestIndex = 0;
    
    for (const table of finalSortedTables) {
      if (currentGuestIndex >= groupGuests.length) break;
      
      const seatElements = table.el.querySelectorAll('.seat');
      let hasAssignedInThisTable = false;
      
      for (const seatEl of seatElements) {
        if (currentGuestIndex >= groupGuests.length) break;
        
        const seatID = seatEl.id;
        const tableWrapper = seatEl.closest(".table-wrapper");
        const maBan = tableWrapper?.getAttribute("data-indexnumber") || "";
        const parentID = tableWrapper?.getAttribute("data-parentID") || "";
        
        // Kiểm tra thông tin bàn
        const tableOccupancy = getTableOccupancyInfo(maBan);
        
        // Kiểm tra logic mới:
        // 1. Nếu bàn có người ngồi rồi
        if (tableOccupancy.isOccupied) {
          // Kiểm tra groupName có giống không
          if (tableOccupancy.groupName !== groupName) {
            // GroupName khác nhau -> không được add vào bàn này
            continue;
          }
          // GroupName giống nhau -> có thể add vào (tiếp tục kiểm tra các điều kiện khác)
        }
        
        // Kiểm tra xem ghế cụ thể đã có người ngồi chưa
        const isSeatTaken = newGuests.some((g) => g.seatID === seatID);
        
        // Kiểm tra xem bàn này đã được nhóm khác sử dụng chưa (logic cũ)
        const isTableUsedByOtherGroup = Object.entries(tableUsedByGroup).some(
          ([otherGroup, usedTables]) => 
            otherGroup !== groupName && usedTables.includes(maBan)
        );
        
        // Chỉ phân bố nếu:
        // 1. Ghế chưa có người
        // 2. Bàn chưa được nhóm khác sử dụng (hoặc nếu có người thì phải cùng groupName)
        // 3. parentID khớp với guest
        if (!isSeatTaken && !isTableUsedByOtherGroup && currentGuestIndex < groupGuests.length) {
          const guest = groupGuests[currentGuestIndex];
          
          if (guest && guest.groupInfo?.parentID === parseInt(parentID)) {
            const tenGhe = seatEl.textContent;
            
            guest.seatID = seatID;
            guest.tableID = maBan;
            guest.tableName = `${seatEl.textContent}`;
            guest.seatName = tenGhe;
            
            tableSetNameTable = tableSetNameTable.map((t) => {
              if (t.tableNumber === parseInt(maBan)) {
                return {
                  ...t,
                  nameTable: guest.groupInfo?.groupName || t.nameTable, 
                  isComeback: 0
                };
              }
              return t;
            });
            
            // Đánh dấu bàn này đã được nhóm này sử dụng
            if (!tableUsedByGroup[groupName]) {
              tableUsedByGroup[groupName] = [];
            }
            if (!tableUsedByGroup[groupName].includes(maBan)) {
              tableUsedByGroup[groupName].push(maBan);
            }
            
            hasAssignedInThisTable = true;
            currentGuestIndex++;
          }
        }
      }
      
      if (hasAssignedInThisTable) {
        continue;
      }
    }
  });
  
  setTables(tableSetNameTable);
  setGuests(newGuests);
}
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

        // 🔹 tìm table-wrapper chứa item
        const tableWrapper = item.closest('.table-wrapper');
        // 🔹 tìm list_save bên trong table-wrapper
        const listSave = tableWrapper?.querySelector('.list_save');

        item.querySelectorAll('.resizer, .rotate-handle, .rotateSvg').forEach(child => {
          if (isClicked) {
            (child as HTMLElement).classList.remove('hidden');
            listSave?.classList.add('highlight');
          } else {
            (child as HTMLElement).classList.add('hidden');
            listSave?.classList.remove('highlight');
          }
        });
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}


const handleAddItem = async (
  type: LayoutItem['type'],
  width: number,
  height: number,
  color?: string,
  nameItem?: string,
  x?: number,
  y?: number,
  id?:number
): Promise<void> => {
  return new Promise((resolve) => {
    const maxTableNumberItem = 
      layoutItems.length > 0
        ? (() => {
            const lastId = layoutItems[layoutItems.length - 1].id as string;
            const num = Number(lastId.replace("item", "")) || 0;
            return num + 1;
          })()
        : 1;

    const centerX = x ?? toLocalX(window.innerWidth / 2);
    const centerY = y ?? toLocalY(window.innerHeight / 2);

    const newItem: LayoutItem = {
      id: `item${id ?? maxTableNumberItem}`,
      type,
      x: centerX - width / 2,
      y: centerY - height / 2,
      size: Math.min(width, height) * 1,
      width,
      height,
      rotation: type === "hd3" || type === "hd4" ? 4.7124 : 0,
      name: `${type} ${layoutItems.length + 1}`,
      color: color || "",
      sourceType: 4,
      nameItem,
    };
    setLayoutItems((prev) => [...prev, newItem]);
    setNextTableNumberItem((prev) => prev + 1);

    resolve(); // ✅ báo cho await biết là xong
  });
};
const handleAddBan = (index: number,groupParentID:number,type:string = "left") => {
  if(groupParentID === 0){
    toast.error("Vui lòng chọn bên!");
    return
  }
  let topTable = 0;
let leftTable = 0;

const currentTableCount = tables.length + 1;
const maxTableLimit = maxTable; // Giới hạn tổng bàn
if (currentTableCount > maxTableLimit) {
  setIsTableLimitModalOpen(true);
  return;
}
 
const dataSanKhan = layoutItems.find((x: LayoutItem) => x.id === "item1");

if (dataSanKhan) {
  if (type === "right") {
    const containerWidth = (dataSanKhan?.x ?? 0) + (index === 1 ? 50 : index === 2 ? -10 : 30);
    const tablesRight = tables.filter(t => t.left > dataSanKhan.x);
    
    // Sửa: Tìm bàn có top lớn nhất (thấp nhất), nếu bằng nhau thì lấy left lớn nhất (xa nhất)
    const lastTable = tablesRight.length > 0 
      ? tablesRight.reduce((prev, curr) => {
          if (curr.top > prev.top) return curr;
          if (curr.top === prev.top && curr.left > prev.left) return curr;
          return prev;
        })
      : null;
    
    if (!lastTable) {
      leftTable = containerWidth + (index === 1 ? 225 : index === 2 ? 310 : 230);
      topTable = (dataSanKhan?.y ?? 0) + (index === 1 ? 53 : index === 2 ? 60 : 53) + 70;
    } else {
      const sameRowTables = tablesRight.filter(
        t => Math.abs(t.top - lastTable.top) < 1
      );
      
        if (sameRowTables.length >= isNumberDay) {
          // Rớt xuống hàng mới
          const maxTop = lastTable?.top ?? 0;
          topTable = maxTop + (index === 1 ? 225 : index === 2 ? 230 : 110);
          leftTable = containerWidth + (index === 1 ? 225 : index === 2 ? 310 : 230);
        } else {
          // Thêm vào cùng hàng, bên phải bàn cuối
          topTable = lastTable.top;
          leftTable = lastTable.left + (index === 1 ? 225 : index === 2 ? 310 : 230);
        }
      } 
  } else {
    // type === "left"
    const containerWidth = (dataSanKhan?.x ?? 0) - (index === 1 ? 180 : index === 2 ? 240 : 260);
    const tablesLeft = tables.filter(t => t.left < dataSanKhan.x);
    
    // Sửa: Tìm bàn có top lớn nhất (thấp nhất), nếu bằng nhau thì lấy left nhỏ nhất (xa nhất bên trái)
    const lastTable = tablesLeft.length > 0
      ? tablesLeft.reduce((prev, curr) => {
          if (curr.top > prev.top) return curr;
          if (curr.top === prev.top && curr.left < prev.left) return curr;
          return prev;
        })
      : null;
    
    if (!lastTable) {
      leftTable = containerWidth;
      topTable = (dataSanKhan?.y ?? 0) + (index === 1 ? 53 : index === 2 ? 60 : 53) + 70;
    } else {
      const sameRowTables = tablesLeft.filter(
        t => Math.abs(t.top - lastTable.top) < 1
      );
      if (sameRowTables.length >= isNumberDay) {
          const maxTop = lastTable?.top ?? 0;
          topTable = maxTop + (index === 1 ? 225 : index === 2 ? 230 : 110);
          leftTable = containerWidth;
        } else {
          // Thêm vào cùng hàng, bên trái bàn cuối
          topTable = lastTable.top;
          leftTable = lastTable.left - (index === 1 ? 225 : index === 2 ? 310 : 230);
      }
    }
  }
}
 
  let newTable: UnifiedTableData;
   const maxTableNumber =
        tables.length > 0
          ? Math.max(...tables.map(t => t.tableNumber ?? 0)) + 1
          : 1;
  const centerX = toLocalX(window.innerWidth / 2);
  const centerY = toLocalY(window.innerHeight / 2);
  if (index === 1) {
    // Round table
    newTable = {
      tableNumber: maxTableNumber,  
      shape: 'round',
      width: 0,
      height: 0,
      size: 100,
      top: topTable,   // size/2
      left: leftTable,
      rotation: 0,
      currentSeatCount: 10,
      sourceType: 1,
      nameTable:`Bàn ${maxTableNumber}`,
      groupParentID:groupParentID,
      isComeback:0
    };
  } else if (index === 2) {
    // Square table
    const width = 160;
    const height = 80;
    const seatCountTop = Math.floor(width / 36);
    const seatCountLeft = Math.floor(height / 36);
    const totalSeats = (seatCountTop + seatCountLeft) * 2;

    newTable = {
      tableNumber: maxTableNumber,
      shape: 'square',
      width,
      height,
      size: 0,
      top: topTable,   // size/2
      left: leftTable,
      rotation: 0,
      currentSeatCount: totalSeats,
      sourceType: 2,
      nameTable:`Bàn ${maxTableNumber}`,
      groupParentID:groupParentID,
       isComeback:0
    };
  } else {
    // Bench table
    newTable = {
      tableNumber: maxTableNumber,
      shape: 'bench',
      width: 195,
      height: 10,
      size: 0,
       top: topTable,   // size/2
      left: leftTable,
      rotation: 0,
      currentSeatCount: 5,
      sourceType: 3,
      nameTable:`${maxTableNumber}`,
      groupParentID:groupParentID,
      isComeback:0
    };
  }

  setTables((prev) => [...prev, newTable]);
  setNextTableNumber((prev) => prev + 1);
};
const handleDelete = (e:React.MouseEvent) => {

    if (itemDeleteID === 1) {
      const deletingTableIDs = tables
        .filter((m) => m.tableNumber === itemDelete.tableNumber)
        .map((m) => m.tableNumber); // 👈 lấy mảng các số tableNumber

      const guestsInTables = guests.filter(
        (g) => g.tableID && deletingTableIDs.includes(Number(g.tableID))
      );

      setTables(prev => prev.filter(i => i.tableNumber !== itemDelete.tableNumber));

    } else if (itemDeleteID === 4) {
      setLayoutItems(prev => prev.filter(i => i.id !== itemDelete.id));
    }
     setGuests(prev =>
    prev.map(g => (g.seatID && g.seatID.includes(`${itemDelete.tableNumber}`) ? { ...g, seatId: null } : g))
  );
};
const handleDeleteList = (e: React.MouseEvent) => {
  if (multiSelectedItems.length === 0) {
    toast.warn("⚠️ Vui lòng chọn bàn cần xoá!");
    return;
  }

  // 🔹 Danh sách bàn sẽ bị xoá
  const deletingTableIDs = multiSelectedItems.map((m) => m.tableNumber);

  // 🔹 Kiểm tra xem có khách nào thuộc các bàn đó không
  const guestsInTables = guests.filter(
    (g) => g.tableID && deletingTableIDs.includes(Number(g.tableID))
  );

  // 🔹 Nếu có khách trong bàn
  if (guestsInTables.length > 0) {
        const tablesWithGuests = [
          ...new Set(guestsInTables.map((g) => g.tableName || g.tableID)),
        ];
     setmessNotiGuest(tablesWithGuests.join(", "))
    setModalNotiGuest(true)
  }else{
    handleDeleteTable(false)
  }
}
// const handleDeleteSingle = (itemDelete:number) => {
//   // 🔹 Lấy danh sách tableNumber cần xoá (ở đây chỉ 1)
//   const deletingTableIDs = itemDelete;

//   // 🔹 Kiểm tra khách trong bàn
//   const guestsInTables = guests.filter(
//     (g) => g.tableID && deletingTableIDs.includes(Number(g.tableID))
//   );

//   // 🔹 Nếu có khách → reset khách ra khỏi bàn đó
//   if (guestsInTables.length > 0) {
//     setGuests((prevGuests) =>
//       prevGuests.map((g) =>
//         deletingTableIDs.includes(Number(g.tableID))
//           ? {
//               ...g,
//               seatID: "",
//               tableID: "",
//               tableName: "",
//               seatName: "",
//             }
//           : g
//       )
//     );
//   }

//   // ✅ Xoá bàn khỏi danh sách
//   setTables((prev) =>
//     prev.filter((t) => !deletingTableIDs.includes(t.tableNumber))
//   );

//   // ✅ Xoá khỏi layout nếu có
//   setLayoutItems((prev) =>
//     prev.filter((t) => t.tableNumber !== itemDelete.tableNumber)
//   );

//   toast.success("🗑️ Đã xoá bàn thành công!");
// };

const handleDeleteTable =(checkGuest:boolean = true) => {
  // 🔹 Danh sách bàn sẽ bị xoá
  const deletingTableIDs = multiSelectedItems.map((m) => m.tableNumber);

  
  setGuests((prevGuests) =>
      prevGuests.map((g) => {
        if (g.tableID && deletingTableIDs.includes(Number(g.tableID))) {
          return {
            ...g,
            seatID: "",
            tableID: "",
            tableName: "",
            seatName: "",
          };
        }
        return g;
      })
    );

     // ✅ Tiến hành xoá bàn
  setTables((prevTables) =>
    prevTables.filter(
      (t) => !multiSelectedItems.some((m) => m.tableNumber === t.tableNumber)
    )
  );

  // ✅ Xoá layout item tương ứng
  setLayoutItems((prevTables) =>
    prevTables.filter((t) => !multiSelected.some((x) => x.id === t.id))
  );

  // ✅ Reset danh sách chọn
  setMultiSelectedItems([]);
  if(checkGuest)
     toast.success("🗑️ Đã xoá bàn và cập nhật khách mời thành công!");
  else  toast.success("🗑️ Đã xoá bàn thành công!");
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
useEffect(() => {
  if(!isModalSearchGuest) {
    setGuests(prev => 
      prev.map((x)=> ({
        ...x,
        isSearch:false
      }))
    )
     setTables(prev => 
      prev.map((x)=> ({
        ...x,
        isSearch:false
      }))
    )
  }
},[isModalSearchGuest])
  return (
    <div >
      <>
       <UpgradeModal
        isOpen={isModalOpenUpgra}
        onClose={() =>{
          setIsModalOpenUpgra(false)
          setIsModalSaveOpenProject(true)
          setProjectID("")
          setProjectName("Dự án")
        }}
        onUpgrade={handleUpgrade}
      />
      <LimitNotificationModal
        isOpen={isTableLimitModalOpen}
        onClose={() => setIsTableLimitModalOpen(false)}
        limitType="tables"
        currentCount={maxTable}
        maxLimit={maxTable}
      />
       <LimitNotificationModal
        isOpen={isGuestLimitModalOpen}
        onClose={() => setIsGuestLimitModalOpen(false)}
        limitType="guests"
        currentCount={maxGuest}
        maxLimit={maxGuest}
      />
      <LimitNotificationModal
        isOpen={isExportlimit}
        onClose={() => setExportlimit(false)}
        limitType="export"
      />
      </>
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
       <div className="absolute top-[3px] right-[452px] cursor-pointer p-1 px-3 rounded-lg  bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
          <button
            type="button"
            aria-label="file"
            onClick={() => {
              if (isProjectID == "") {
                toast.error("Vui lòng tạo dự án mới !");
                return;
              }
              setIsOpen(!isOpen);
            }}
            className="relative"
          >
            <i className="fas fa-file-pdf fa-lg me-1"></i>
            Xuất file
          </button>
          
          {isOpen && (
            <div className="absolute right-[0px] top-[35px] bg-white border border-gray-200 rounded-lg shadow-xl min-w-[180px] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Xuất file mẫu */}
              <button 
                className="w-full cursor-pointer flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition-colors duration-200 text-left text-sm group"
                onClick={() => {
                  // Logic xuất file mẫu
                  handleEmportTemplates()
                  setIsOpen(false);
                }}
              >
                <i className="fa-solid fa-file-lines text-[16px] mr-3 text-blue-500 group-hover:text-blue-600"></i>
                <span className="font-medium">File mẫu import khách</span>
              </button>
              
              {/* Xuất PDF */}
              <button 
                className="w-full cursor-pointer flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition-colors duration-200 text-left text-sm group"
                onClick={() => {
                  // Logic xuất PDF
                if( isProjectID == "" ) {
                        toast.error("Vui lòng tạo dự án mới !");
                        return
                  }
                 
                  hadleCheckExportPDF(accessToken)
                  setIsOpen(false);
                }}
              >
                <i className="fa-solid fa-file-pdf text-[16px] mr-3 text-red-500 group-hover:text-red-600"></i>
                <span className="font-medium">Xuất PDF</span>
              </button>
              
              {/* Xuất file Hướng dẫn */}
              <button 
                className="w-full cursor-pointer flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 focus:bg-gray-100 focus:outline-none transition-colors duration-200 text-left text-sm group"
                onClick={() => {
                  // Logic xuất file hướng dẫn
                  console.log("Xuất file Hướng dẫn");
                  setIsOpen(false);
                }}
              >
                <i className="fa-solid fa-book-open text-[16px] mr-3 text-green-500 group-hover:text-green-600"></i>
                <span className="font-medium">Xuất file H.Dẫn</span>
              </button>
            </div>
          )}
        </div>
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
              className="absolute top-[3px] right-[573px] cursor-pointer p-1 px-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <i className="fas fa-save fa-lg me-1"></i>
              Lưu layout
            </button>
            <LayoutModal
              isOpen={isModalSaveOpen}
              onClose={() => setIsModalSaveOpen(false)}
             onSave={() => handleSaveLayout(accessToken)}
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
                 handleZoneSelect(null)
                 setModalSearchGuest(false)
              }}
              className="absolute top-[3px] right-[180px] cursor-pointer p-1 px-3 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <i className="fas fa-layer-group fa-lg me-1"></i>
              Tạo layout
            </button>
            <ModalSelect
              isOpen={isModalSelectOpen}
              onClose={() => setIsModalSelectOpen(false)}
              selectedValue={selectedParentGroup}
              onSelectedChange={(v) => setSelectedParentGroup(v)}
              onConfirm={

                 (row: number | string, layout: string, type: string, seatCount: number | string,
                  checkRow:string,position:string,groupParentID:string) =>
                   handleConfirmModal(row,layout,type,seatCount,checkRow,position,groupParentID)}
                  data={isDataParentGroup}
                  onComBack={() => {
                    let maxTableComback =
                    tables.length > 0 ? Math.max(...tables.map(t => t.isComeback ?? 0)) : 1;
                    setTables((prev) =>
                      prev.filter(x =>
                        x.isComeback === 0 || x.isComeback !== maxTableComback
                    )
                );
              }}
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
              className="hidden absolute top-[3px] right-[450px] cursor-pointer p-1 px-3 rounded-lg  bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <i className="fas fa-file-pdf fa-lg me-1"></i>
              Xuất Layout
            </button>    
           
          </>
            <>
             <button
              type="button"
              aria-label="Export Templates"
              onClick={() =>{
                if( isProjectID == "" ) {
                  toast.error("Vui lòng tạo dự án mới !");
                  return
                }
              
              }}
              className="hidden absolute top-[3px] right-[593px] cursor-pointer p-1 px-3 rounded-lg  bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              <i className="fas fa-file-pdf fa-lg me-1"></i>
              Xuất file mẫu
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
                handleZoneSelect(null)
                setModalSearchGuest(false)
           }} className="absolute top-[3px] right-[5px]">
            {isModalOpen && (
                  <ModalElement
                    onClose={() => setModalOpen(false)}
                    onAddItem={handleAddItem} // ✅ Truyền hàm xuống
                    onAddTable={handleAddBan}
                    selectedValue={selectedParentGroup}
                    onSelectedChange={(v) => setSelectedParentGroup(v)}
                    data={isDataParentGroup}
                    isSide={side}
                    setSide={(side:string) => setSide(side)}
                    numberDay={isNumberDay}
                    setNumberDay={(numberDay:number) => setNumberDay(numberDay)}
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
                <div className='flex items-center absolute top-[2px] left-[3px] gap-2'>
                  <button
                type="button"
                aria-label="Select Project"
                onClick={() => setIsModalSaveOpenProject(true)}
                className=" flex items-center space-x-2 cursor-pointer p-1 px-3 rounded-lg bg-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-1 transition font-semibold select-none"
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
              handleConfirmXN={(projectid:string) =>{
                  handleConfirm(projectid)}
              } 
             
            />
            <label 
                htmlFor="totalTables" 
                    className="text-lg  text-black bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 whitespace-nowrap flex items-center gap-1"
                  >
                Tổng bàn:
              </label>
                  <label
                className="text-blue-700 font-semibold rounded-lg px-2 py-1 text-center  inline-block"
              >
                {tables.length}
              </label>
                </div>
         </>
         
          <>
          {isModalSearchGuest && (
              <ModalSearchGuest
                  isOpen={isModalSearchGuest}
                  onClose={() =>setModalSearchGuest(false)}
                 onSearch={(guestid: string,tableid:string) => {
                    setGuests(prev =>
                      prev.map(x => ({
                        ...x,
                        isSearch: x.guestID === guestid
                      }))
                    );
                    setTables(prev =>
                      prev.map(x => ({
                        ...x,
                        isSearch: x.tableNumber.toString() === tableid
                      }))
                    );
                  }}
                  data={isDataParentGroup}
                  selectedValue={isParentGroupSearch}
                  onSelectedChange={(v) => setParentGroupSearch(v)}
                  dataGuest={guests}
              />
          )} 
          </>
          <>
            {isModalNotiGuest && (
              <ModalNotiGuest
                isOpen = {isModalNotiGuest}
                onClose = {() => setModalNotiGuest(false)}
                onSave = {() => handleDeleteTable()}
                Noti={ismessNotiGuest}
               />

            )}
          </>
          <div onClick={() => {
             if( isProjectID == "" ) {
              toast.error("Vui lòng tạo dự án mới !");
              return
             }
               setIsModalSelectOpen(false)
               setModalOpen(false)
               setModalOpenKH(true)
               handleZoneSelect(null)
               setModalSearchGuest(false)
          }} 
            className="absolute top-[3px] right-[315px]">
            {isModalOpenKH && (
                  <ModalCustomer
                    onClose={() => setModalOpenKH(false)}
                    table={guests}
                    onSetLimit={() => setIsGuestLimitModalOpen(true)}
                    maxGuest={maxGuest}
                    onAddSeat={() => {
                    if(isParentGroup === "0"){
                       toast.error("Vui lòng chọn bên!");
                        return
                    }
                    handleAssignGuestsToSeats()
                   }}
                   onClickSeat= {(customerid:string,checkseatid:boolean) => handleAddSeatOnTable(customerid,checkseatid)}
                   onDelete ={(customerid:string,customer:string) => handleDeleteGuest(customerid,customer)}
                    handleDataImported={handleDataImported}
                    data={isDataParentGroup}
                    setParentGroup={setParentGroup}
                    setGuest={handleSetGuest}
                    onResetGhe={handleResetSeat}
                    selectedValue={isParentGroup}
                    onSelectedChange={(v) => setParentGroup(v)}
                    isView={isViewIconUser}
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
    <div className="flex gap-2"  onClick={() => setIsOpen(false)}>
     
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
          {!isExporting && ( <div className="absolute bottom-[55px] left-[10px] z-[99999] space-y-2">
                  <div className="flex items-center bg-white rounded-lg px-2 py-1 shadow-sm">
                    <input
                      type="checkbox"
                      id="userToggle"
                      checked={isViewIconUser}
                      onChange={() => {
                        setGuests(prev => 
                          prev.map((x) => ({
                            ...x,
                            isView:!isViewIconUser
                          }))
                        )
                        setViewIconUser(!isViewIconUser)
                      }}
                      className="w-4 h-4 text-purple-600 bg-gray-100  rounded "
                    />
                    <label 
                      htmlFor="userToggle" 
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer select-none"
                    >
                      Khách mời
                    </label>
                  </div>
                 
                  
                </div>)}
          {!isExporting && (

              <div className="absolute top-[5px] right-[40px] z-[99999] space-y-2">
                   <div className="flex items-center bg-white rounded-lg px-2 py-1 shadow-sm">
                    <div onClick={() => {
                        setIsModalSelectOpen(false)
                        setModalOpen(false)
                        setModalOpenKH(false)
                        handleZoneSelect(null)
                        setModalSearchGuest(true)
                    }}>
                      
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                  </div>
                </div>
          )}
          <ZoneManager
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
            innerRef={innerRef as React.RefObject<HTMLDivElement>} 
            zoomFactor={zoomRef.current}
            offsetPosition={offsetRef.current}
            isZoneMode={isZoneMode}
            onZoneModeToggle={handleToggleZoneMode}
            projectId={isProjectID}
            isExportMode={isExporting}
            // ✅ Truyền zone states
            zoneCollection={zoneCollection}
            onZoneCollectionChange={setZoneCollection}
            activeZoneIdx={activeZoneIdx}
            onActiveZoneChange={handleZoneSelect}
            handleVisiableVung={handleVisiableVung}
            isConfirm={isConfirm}
          />
          <div className='absolute' style={{border: "1px solid #ccc",
            padding: "1px 10px",
            display: isExporting ? "none" : "",
            top: `${32 }px`}}></div>
            <div className='absolute' style={{border: "1px solid #ccc",
            padding: "1px 10px", display: isExporting ? "none" : "",
            top: `${32 }px`,right: "0"}}></div>
            <div className='absolute' style={{border: "1px solid #ccc",
            padding: "10px 1px", display: isExporting ? "none" : "",
            left: `${29 }px`,}}></div>
            <div className='absolute' style={{border: "1px solid #ccc",
            padding: "10px 1px", display: isExporting ? "none" : "",
            top: `${0 }px`,right: "29px"}}></div>
         <div 
            ref={innerRef}
            className='relative z-30'
            style={{
              willChange: 'transform',
              transform: `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px) scale(${zoomRef.current}) `,
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
                      fontSize={fontSize}
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
                      fontSize={fontSize}
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
                      fontSize={fontSize}
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
               fontSizeTable= {fontSize.fontSizeTable}
               fontSizeSeat = {fontSize.fontSizeSeat}
              onChangeFontSizeTable={(val: number) =>
                setFontSize(prev => ({ ...prev, fontSizeTable: val }))
              }
              onChangeFontSizeSeat={(val: number) =>
                setFontSize(prev => ({ ...prev, fontSizeSeat: val }))
              }
            />
          )}
          {checkLoai === 2 && (
            <ItemForm
              itemName={isNameTable}
              idItem={itemDelete.id}
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
              table={isGuestItem[0]}
              onReset={(customerid:string) => {
                setGuests(prev => 
                   prev.map(g =>
                    g.guestID === customerid
                      ? { ...g, seatID: null, tableID: "", tableName: "", seatName: "" }
                      : g
                  )
                  )
              }}
              />
          )}
          {checkLoai === 5 && activeZoneIdx !== null && zoneCollection[activeZoneIdx] && (
              <ZoneForm 
                zoneData={{
                  selectedZone: zoneCollection[activeZoneIdx],
                  activeZoneIdx,
                  zoneCollection,
                  onZoneCollectionChange: setZoneCollection,
                  onActiveZoneChange: setActiveZoneIdx,
                  // Thêm các màu sắc cho ZoneForm
                  zoneColorOptions: [
                    '#ff4757', '#5352ed', '#2ed573', '#ffa502',
                    '#a55eea', '#26d0ce', '#fd9644', '#485460',
                    '#fdd835', '#7dc383'
                  ]
                }} 
              />
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
          DeleteGuest(isGuestID)
          setNotiDelete(false);
        }}
      />
    )}
     </div>
  );
}
