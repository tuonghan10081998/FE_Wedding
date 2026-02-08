import React from "react";
interface SaveTheDateCard1Props {
  width?: number;
  height?:number;
  groomName?:string;
  brideName?:string;
  nameCutomer?:string;
  type?:string
  backgroundImage?: string;
}
const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const SaveTheDateCard3: React.FC<SaveTheDateCard1Props> = ({width = 550,height = 650,groomName,brideName,nameCutomer,backgroundImage}) => {
  console.log(groomName)
  
  return (
    <div
      className="rounded-lg shadow-lg  flex justify-center items-center  text-[#b38b2b]"
      style={{
         backgroundImage: backgroundImage 
          ? `url('${backgroundImage}')` 
          : "url('/image/imageBG4.jpg')",   
        backgroundSize: "cover",
        backgroundPosition: "center",
        width:`${width}px`,
        height:`${height}px`,
      }}
    >
       <div className="flex items-center justify-center w-[340px] h-[320px] relative">
          {/* Diamond container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[340px] h-[340px] bg-[#f7f7f1] rotate-45 border border-[#bfbfb7] shadow-sm">
              <div className="absolute inset-6 border border-[#bfbfb7]"></div>
              <div className="absolute inset-12 flex flex-col items-center justify-center text-center rotate-[-45deg] px-8">
                {/* Hình nhỏ trên SAVE THE DATE */}
                <img
                  src="/image/itemhoa1.png"
                  alt="flower icon"
                  className="w-12 h-12 mb-2 object-contain"
                />

                <p className="text-[18px] text-[#9b9b8f] uppercase mb-4 tracking-widest">
                  SAVE THE DATE
                </p>
                <p className="font-['Great_Vibes'] text-[30px] whitespace-nowrap text-[#7a7c6f] leading-[1.1] tracking-wide capitalize">
                  {withDefault(groomName, "Hà Xuân Vinh")}
                </p>
                <p className="font-['Great_Vibes'] text-[32px] text-[#7a7c6f] leading-[1.1]">
                  &amp;
                </p>
                <p className="font-['Great_Vibes'] text-[30px] whitespace-nowrap text-[#7a7c6f] leading-[1.1] tracking-wide capitalize">
                  {withDefault(brideName, "Nguyễn Thị Kim Hiền")}
                </p>

                <div className="text-center w-full flex justify-center flex-col items-center">
             <p className="text-[16px] font-normal mt-6 mb-2 text-[#9b9b8f]">TRÂN TRỌNG KÍNH MỜI</p>
           <div className="w-[65%]">
             <p className="text-[16px] font-normal h-[10px] text-[#9b9b8f]">{withDefault(nameCutomer, "Em Mạnh + NT")}</p>
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
        </div>
    </div>
  );
};
SaveTheDateCard3.displayName = "SaveTheDateCard3"
export default SaveTheDateCard3;
