import React,{useEffect, useState} from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { Project } from "~/layoutEven/layoutEven";
import LayoutModalDelete from "~/layoutEven/ModalSaveDelete";
import { ToastContainer, toast } from "react-toastify";
interface ModalSelectProjectProps {
  isOpen: boolean;
  onClose: () => void;
  data: Project[];
  onDeleteData:(project:string) => void
  setProjectID?: (v:string) => void;
  setProjectName: (v:string) => void;
  handleConfirmXN:(project:string)  => void
}

interface OptionType {
  value: string;
  label: string;
}

const ModalSelectProject: React.FC<ModalSelectProjectProps> = ({ isOpen, onClose, data,onDeleteData,setProjectID,setProjectName,handleConfirmXN }) => {
  const filterOptions: OptionType[] = [
    { value: "0", label: "Tạo dự án mới" },
    ...(data?.map((card) => ({
      value: card.projectID ?? "",
      label: card.projectName,
    })) ?? []),
  ];

  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>();
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [isOpenDelete,setOpenDelete] = useState<boolean>(false)

  const handleConfirm = () => {
    if (selectedOption?.value === "0") {
      if (!newProjectName.trim()) {
        toast.error("Vui lòng nhập tên dự án mới!");
        return;
      }
      toast.success(`Tạo dự án mới: ${newProjectName}`);
      setProjectID?.("0")
      setProjectName(newProjectName ?? "")
      setNewProjectName("");
      handleConfirmXN("0")
    } else {
      toast.success(`Chọn dự án: ${selectedOption?.label}`);
       setProjectID?.(selectedOption?.value ?? "")
      setProjectName(selectedOption?.label ?? "")
    }
    onClose();
  };
  const handleDelete = () => {
    onDeleteData(selectedOption?.value ?? "") 
  }
  useEffect(() =>{
    setSelectedOption(filterOptions[0])
  },[data])
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
       

        {/* Nút X để đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          <i className="fas fa-xmark"></i>
        </button>

        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2">Chọn dự án</div>
            <Select
              options={filterOptions}
              value={selectedOption}
              onChange={(option: SingleValue<OptionType>) => setSelectedOption(option)}
              className="mb-0"
              classNamePrefix="react-select"
              isSearchable={true}
              placeholder=""
            />
          </div>

          {/* Input chỉ hiển thị khi chọn "Tạo dự án mới" */}
          {selectedOption?.value === "0" && (
            <div>
              <div className="mb-2">Tên dự án </div>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full border border-[#CCCCCC] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder=""
              />
            </div>
          )}
        </div>
        {isOpenDelete && (<LayoutModalDelete
            isOpen={isOpenDelete}
            onClose={() => setOpenDelete(false)}
             onConfirm={handleDelete}
             projectName={selectedOption?.label}
         />)} 
        <div className={`flex ${selectedOption?.value !== "0" ? "justify-between" : "justify-end"}  gap-2 mt-6`}>
          {selectedOption?.value !== "0" && (
            <>
              <button
                onClick={() => setOpenDelete(true)}
                className="inline-flex items-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="button"
              >
                <i className="fas fa-trash-alt mr-2"></i>
                Delete
              </button>

             
            </>
          )}
          <button
            onClick={handleConfirm}
            type="button"
            aria-label="Confirm"
            className="flex items-center space-x-2 px-3 h-10 rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition font-semibold select-none"
            title="Confirm"
          >
            <i className="fas fa-check fa-lg"></i>
            <span className="whitespace-nowrap">{selectedOption?.value === "0" ? "Tạo dự án" :"Chọn dự án"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectProject;
