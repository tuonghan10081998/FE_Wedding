import React, {useEffect} from "react";
import DateRangeWithPresets from "~/Invitationpage/DateRangeWithPresets";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { Project } from "~/layoutEven/layoutEven";
import { ToastContainer, toast } from "react-toastify";
interface OptionType {
  value: string;
  label: string;
}
interface WeddingFormModalProps {
  onClose: () => void;
  groomName: string;
  setGroomName: (v: string) => void;
  groomParents: string;
  setGroomParents: (v: string) => void;
  groomAddress: string;
  setGroomAddress: (v: string) => void;
  brideName: string;
  setBrideName: (v: string) => void;
  brideParents: string;
  setBrideParents: (v: string) => void;
  brideAddress: string;
  setBrideAddress: (v: string) => void;
  weddingDateTime: string;
  setWeddingDateTime: (v: string) => void;
  weddingVenue: string;
  setWeddingVenue: (v: string) => void;
  partyDateTime: string;
  setPartyDateTime: (v: string) => void;
  partyVenue: string;
  setPartyVenue: (v: string) => void;
  weddingDateTimeAm: string;
  setWeddingDateTimeAm: (v: string) => void;
  partyDateTimeAm: string;
  setPartyDateTimeAm: (v: string) => void;
  groomMother: string;
  setGroomMother: (v: string) => void;
  brideMother: string;
  setBrideMother: (v: string) => void;
  weddingTime: string;
  setWeddingTime: (v: string) => void;
  tuGia: string;
  setTuGia: (v: string) => void;
  partyTime: string;
  setPartyTime: (v: string) => void;
  weddingRank: string;
  setWeddingRank: (v: string) => void;
  partyRank: string;
  setPartyRank: (v: string) => void;
  checkNhaHang:boolean
  setCheckNhaHang:(v:boolean) => void
  partyAddress: string;
  setpartyAddress: (v: string) => void;
  data:Project[]
  setProjectID:(v:string) => void
  projectID:string
  onSummit: (e: React.FormEvent) => void;
}
// Dữ liệu thiệp


const WeddingFormModal: React.FC<WeddingFormModalProps> = (props) => {
  const filterOptions: OptionType[] = [
   
    ...(props.data?.map((card) => ({
      value: card.projectID ?? "",
      label: card.projectName,
    })) ?? []),
  ];
  const [selectedOption, setSelectedOption] = React.useState<SingleValue<OptionType>>();  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    props.onSummit(e);
    props.onClose();
  };
   useEffect(() => {
    if (props.projectID && filterOptions.length > 0) {
      const foundOption = filterOptions.find(option => option.value === props.projectID);
      if (foundOption) {
        setSelectedOption(foundOption);
      }
    }
  }, [props.projectID, filterOptions]);
  // Hàm helper để lấy label từ placeholder với validation message tùy chỉnh
  const renderInput = (
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    type: "input" | "textarea" = "input",
    rows: number = 1,
    required: boolean = true,
    nhahang:boolean = false
  ) => {
    // Tạo validation message tùy chỉnh
    const validationMessage = `Vui lòng nhập ${placeholder.toLowerCase()}`;
    
    return (
      <div className="mb-2">
        <div className="block text-gray-700 font-medium mb-1 flex justify-between">
          <div>
            {placeholder} {required && <span className="text-red-500">(*)</span>}
          </div>
          {nhahang && (
            <div className="flex justify-center items-center gap-1">
              <p className="text-[11px]">(Tên nhà hàng hoặc tư gia)</p>
              <input
                type="checkbox"
                checked={props.checkNhaHang}
                onChange={() => props.setCheckNhaHang(!props.checkNhaHang)}
              />
            </div>
          )}
        </div>
        {type === "input" ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)} 
            placeholder=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            required={required}
            title={validationMessage}
            onInvalid={(e) => {
               if (required) {
                e.currentTarget.setCustomValidity(validationMessage);
              } else {
                e.currentTarget.setCustomValidity("");
              }
            }}
            onInput={(e) => {
              e.currentTarget.setCustomValidity('');
            }}
          />
        ) : (
          <textarea
            value={value}
           onChange={(e) => onChange(e.target.value)} 
            placeholder=""
            rows={rows}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            required={required}
            title={validationMessage}
            onInvalid={(e) => {
              if (required) {
                e.currentTarget.setCustomValidity(validationMessage);
              } else {
                e.currentTarget.setCustomValidity("");
              }
            }}
            onInput={(e) => {
              e.currentTarget.setCustomValidity('');
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4 flex-shrink-0 mb-0">
          <h2 className="text-2xl font-semibold text-black-700">
            Nhập Thông Tin Thiệp Đám Cưới
          </h2>
          <button
            onClick={props.onClose}
            className="text-gray-500 hover:text-black-600 transition text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Body (cuộn được) */}
        <form
          id="wedding-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-4 flex-1 space-y-6"
        >

       {/* Chọn dự án */}
          <div className="flex flex-col md:flex-row gap-6 ">
            <div className="md:w-1/2 hidden">
              <div className="mb-1">
                  Chọn ngày
              </div>
             <DateRangeWithPresets 
                onDateChange={(range) => {
                if (range === "all") {
                  console.log("Chọn tất cả ngày");
                  // setWeddingDateTime("Tất cả");
                } else {
                  console.log("Ngày chọn:", range.from, "->", range.to);
                }
              }}
              />
            </div>
            <div className="md:w-1/2">
            <div className="mb-1">
                  Chọn dự án <span className="text-red-500">(*)</span>
              </div>
                 <Select
                  options={filterOptions}
                  value={selectedOption}
                  onChange={(option: SingleValue<OptionType>) =>{
                     setSelectedOption(option)
                     props.setProjectID(option?.value ?? "")
                  } }
                  className="mb-0"
                  classNamePrefix="react-select"
                  isSearchable={true}
                  placeholder=""
                />
            </div>
          </div>

          {/* Thông tin cô dâu chú rể */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              {renderInput(props.groomName, props.setGroomName, "Tên chú rể", "input", 1, true)}
              {renderInput(props.groomParents, props.setGroomParents, "Tên cha chú rể")}
              {renderInput(props.groomMother, props.setGroomMother, "Tên mẹ chú rể")}
              {renderInput(props.groomAddress, props.setGroomAddress, "Địa chỉ nhà chú rể", "textarea", 2)}
            </div>
            <div className="md:w-1/2">
              {renderInput(props.brideName, props.setBrideName, "Tên cô dâu")}
              {renderInput(props.brideParents, props.setBrideParents, "Tên cha cô dâu")}
              {renderInput(props.brideMother, props.setBrideMother, "Tên mẹ cô dâu")}
              {renderInput(props.brideAddress, props.setBrideAddress, "Địa chỉ nhà cô dâu", "textarea", 2)}
            </div>
          </div>

          {/* Thông tin hôn lễ */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black-600 ">Thông Tin Tổ Chức Hôn Lễ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
               <div className="md:pe-3"> {renderInput(props.weddingTime, props.setWeddingTime, "Giờ tổ chức hôn lễ")}</div>
                <div className="md:ps-3"> 
                 <div className="flex">
                  <div className="me-1 w-[40%]"> {renderInput(props.weddingRank, props.setWeddingRank, "Thứ", "input", 1,false)}</div>
                   <div className="ms-1  w-[60%]"> {renderInput(props.weddingDateTime, props.setWeddingDateTime, " Ngày dự tiệc", "input", 1)}</div>
                  </div>
                </div>
               <div className="md:pe-3"> {renderInput(props.weddingDateTimeAm, props.setWeddingDateTimeAm, "Nhằm ngày", "input", 1)}</div>
               <div className="md:ps-3"> {renderInput(props.tuGia, props.setTuGia, "Tư gia","input",1)}</div>
               <div className="md:pe-3"> {renderInput(props.weddingVenue, props.setWeddingVenue, "Địa điểm hôn lễ","textarea",1)}</div>
            </div>
          </div>

          {/* Thông tin dự tiệc */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black-600">Thông Tin Dự Tiệc</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="md:pe-3"> {renderInput(props.partyTime, props.setPartyTime, "Giờ dự tiệc", "input", 1)}</div>
              <div className="md:ps-3"> 
                 <div className="flex">
                  <div className="me-1 w-[40%]"> {renderInput(props.partyRank, props.setPartyRank, "Thứ", "input", 1,false)}</div>
                   <div className="ms-1  w-[60%]"> {renderInput(props.partyDateTime, props.setPartyDateTime, " Ngày dự tiệc", "input", 1)}</div>
                  </div>
                </div>
              <div className="md:pe-3"> {renderInput(props.partyDateTimeAm, props.setPartyDateTimeAm, "Nhằm ngày", "input", 1)}</div>
              <div className="md:ps-3">{renderInput(props.partyVenue, props.setPartyVenue, props.checkNhaHang ? "Tên nhà hàng" : "Tại tư gia","input",1,true,true)}</div>
              <div className="md:pe-3"> {renderInput(props.partyAddress, props.setpartyAddress, "Địa điểm dự tiệc", "textarea", 1)}</div>
            </div>
          </div>
        </form>

        {/* Footer cố định */}
        <div className="flex justify-end gap-4 border-t border-gray-300 px-6 py-4 flex-shrink-0">
          <button
            type="button"
            onClick={props.onClose}
            className="px-5 py-2 rounded-md border border-pink-600 text-black-600 hover:bg-pink-50 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            form="wedding-form"
            className="px-5 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition"
          >
            Xác nhận thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingFormModal;