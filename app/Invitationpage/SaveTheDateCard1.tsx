import React from "react";
interface SaveTheDateCard1Props {
  width?: number;
  height?:number;
  groomName?:string;
  brideName?:string;
  nameCutomer?:string;
   type?:string
}
const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const SaveTheDateCard1: React.FC<SaveTheDateCard1Props> = ({width = 550,height = 650,groomName,brideName,nameCutomer}) => {
  return (
    <div
      className="rounded-lg shadow-lg flex justify-center items-center  text-[#b38b2b]"
      style={{
        backgroundImage:
          "url('/image/imageBG7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width:`${width}px`,
        height:`${height}px`,
      }}
    >
      <div className="text-center"
       style={{ width:`${width}px`}}

        >
        {/* SAVE THE DATE */}
        <div className="relative h-[220px] flex flex-col justify-center items-center">
          <p className="text-[30px] leading-none font-normal tracking-wide">
            SAVE
          </p>
          <div className="flex items-center w-full justify-center my-1">
            <hr className="border-b border-[#bb9140] w-16" />
            <p className="font-[Great_Vibes] text-[34px] mx-3 leading-none">
              the
            </p>
            <hr className="border-b border-[#bb9140] w-16" />
          </div>
          <p className="text-[30px] leading-none font-normal tracking-wide">
            DATE
          </p>
        </div>

        {/* Tên cô dâu chú rể */}
        <div className="mt-2 text-center mb-10">
           <p className="script-font text-[40px] text-700 mb-2 font-normal leading-tight tracking-wide capitalize">
           {withDefault(groomName, "Hà Xuân Vinh")}
            </p>
            <p className="script-font text-2xl text-700 mb-2 font-normal leading-tight">
            &amp;
            </p>
            <p className="script-font text-[40px] text-700 mb-4 font-normal leading-tight tracking-wide capitalize">
            {withDefault(brideName, "Nguyễn Thị Kim Hiền")}
            </p>
          </div>

        {/* Lời mời */}
        <div className="mt-2 text-center">
          <p className="text-[16px] font-normal text-center mb-1">
            Rất hân hạnh được đón tiếp!
          </p>
         
          <div className="text-center w-full flex justify-center flex-col items-center">
             <p className="text-[16px] font-normal mt-6 mb-2">TRÂN TRỌNG KÍNH MỜI</p>
           <div className="w-[40%]">
             <p className="text-[16px] font-normal h-[10px]">{withDefault(nameCutomer, "Em Mạnh +")}</p>
              <div
              style={{
                height: "5px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "left top",
                backgroundSize: "6px 2px",
                display: "inline-block",
                width: "100%",
                backgroundImage:
                  "radial-gradient(circle, rgb(186, 82, 82) 1px, transparent 1px)",
              }}
            />
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveTheDateCard1;
