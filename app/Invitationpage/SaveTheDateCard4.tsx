import React from "react";
interface SaveTheDateCard1Props {
  width?: number;
  height?:number;
  groomName?:string;
  brideName?:string;
  nameCutomer?:string;
}
const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const SaveTheDateCard4: React.FC<SaveTheDateCard1Props> = ({width = 550,height = 650,groomName,brideName,nameCutomer}) => {
  return (
    <div
      className="rounded-lg shadow-lg  flex justify-center items-center  text-[#b38b2b]"
      style={{
        backgroundImage:
          "url('/image/imageBG6.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width:`${width}px`,
        height:`${height}px`,
      }}
    >
       <div className="flex items-center justify-center w-[340px] h-[320px] relative">
          {/* Diamond container */}
         <div className="relative w-full max-w-[400px] aspect-[9/12]">
        <div className="relative z-10 flex flex-col items-center pt-12 px-6">
          <h1 className="text-[40px] text-[#2a2a23] font-normal leading-tight">
            SAVE THE DATE
          </h1>
          <div className="text-center w-full flex justify-center flex-col items-center">
             <p className="text-[16px] text-[#2a2a23] font-normal mt-6 mb-2">TRÂN TRỌNG KÍNH MỜI</p>
           <div className="w-[80%]">
             <p className="text-[16px] text-[#2a2a23] font-normal h-[10px]">{withDefault(nameCutomer, "Em Mạnh +")}</p>
              <div
              style={{
                height: "5px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "left top",
                backgroundSize: "6px 2px",
                display: "inline-block",
                width: "100%",
                backgroundImage:
                  "radial-gradient(circle, rgba(31, 6, 6, 1) 1px, transparent 1px)",
              }}
            />
           </div>
          </div>
          <img
            src="/image/imageWedding1.png"
            alt="Illustration of bride in white wedding dress and groom in green jacket holding heart shaped glasses props"
            className="w-[420px] h-[420px] object-contain mt-8"
            width={380}
            height={380}
          />
        </div>
      </div>
        </div>
    </div>
  );
};
SaveTheDateCard4.displayName = "SaveTheDateCard4"
export default SaveTheDateCard4;
