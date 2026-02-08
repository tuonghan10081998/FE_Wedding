import React from "react";

interface WeddingInvitationCard1Props {
  width?: number;
  height?: number;
  groomName?: string;
  groomParents?: string;
  groomMother?: string;
  groomAddress?: string;
  brideName?: string;
  brideParents?: string;
  brideMother?: string;
  brideAddress?: string;
  weddingTime?: string;
  weddingDateTime?: string;
  weddingDateTimeAm?: string;
  tuGia?: string;
  weddingVenue?: string;
  weddingRank?:string;
  type?:string
  backgroundImage?: string;
}

// helper để gán default khi chuỗi rỗng
const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const WeddingInvitationCard3: React.FC<WeddingInvitationCard1Props> = ({
  width = 550,
  height = 650,
  groomName,
  groomParents,
  groomMother,
  groomAddress,
  brideName,
  brideParents,
  brideMother,
  brideAddress,
  weddingTime,
  weddingDateTime,
  weddingDateTimeAm,
  tuGia,
  weddingVenue,
  weddingRank,
  backgroundImage
}) => {
  return (
    <div
      className="rounded-lg shadow-lg flex justify-center items-center text-[#b38b2b]"
      style={{
         backgroundImage: backgroundImage 
          ? `url('${backgroundImage}')` 
          : "url('/image/imageBG4.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
     <div
          className="bg-opacity-90 max-w-md w-full py-10 px-8 text-center text-gray-600"
          style={{ fontWeight: 600 }}
        >
          {/* Nhà trai & Nhà gái */}
          <div className="flex justify-between text-xs mb-2 font-semibold text-gray-500">
            {/* Nhà trai */}
            <div className="text-left leading-tight">
              NHÀ TRAI
              <br />
              <span className="text-gray-700 font-normal block mt-1">
              Ông: <span className="font-semibold"> {withDefault(groomParents, "Hà Minh Cảnh")}</span>
                <br />
              Bà: <span className="font-semibold">{withDefault(groomMother, "Trần Thị Định")}</span>
              </span>
              <p className="text-[10px] mt-1 font-normal leading-tight">
                <span className="w-[75%]">{withDefault(groomAddress, "03/30 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}</span>
              </p>
            </div>

            {/* Nhà gái */}
            <div className="text-right leading-tight">
              NHÀ GÁI
              <br />
              <span className="text-gray-700 font-normal block mt-1">
                Ông: <span className="font-semibold">{withDefault(brideParents, "Nguyễn Văn Nở")}</span>
                <br />
                Bà: <span className="font-semibold">{withDefault(brideMother, "Trần Thị Thanh")}</span>
              </span>
              <p className="text-[10px] mt-1 font-normal leading-tight">
               <span className="w-[75%]">{withDefault(brideAddress, "03/103 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}</span>
              </p>
            </div>
          </div>

          {/* Nội dung thiệp */}
          <p className="text-sm font-semibold mb-1 mt-4">TRÂN TRỌNG BÁO TIN</p>
          <p className="text-sm font-semibold mb-8">
            LỄ BÁO HỶ CỦA CON CHÚNG TÔI
          </p>

          <p className="font-['Great_Vibes'] text-[40px] text-gray-700 font-normal leading-tight tracking-[3px] capitalize">
          {withDefault(groomName, "Hà Xuân Vinh")}
          </p>
          <p className="font-['Great_Vibes'] text-[28px] text-gray-700 font-normal leading-tight">
            &amp;
          </p>
          <p className="font-['Great_Vibes'] text-[40px] text-gray-700 mb-8 font-normal leading-tight tracking-[3px] capitalize">
           {withDefault(brideName, "Nguyễn Thị Kim Hiền")}
          </p>

          <p className="text-xs font-semibold mb-2">
            HÔN LỄ ĐƯỢC CỬ HÀNH VÀO LÚC
          </p>
          <p className="text-lg font-semibold mb-1">
                {withDefault(weddingTime, "09:00 Sáng")} 
          </p>
           <p className="text-[17px] font-semibold mb-1">
             <span className="font-bold capitalize">
              {withDefault(weddingRank, "Thứ Ba")}
            </span>
           
            {weddingRank !== ''  && ( <span className="font-bold">
             , </span>
            )} 
            <span> </span>
            <span className="font-bold">
              {withDefault(weddingDateTime," Ngày 15 tháng 5 2025")}
            </span>
          </p>
          <p className="text-xs mb-4"> ({withDefault(weddingDateTimeAm, "Tức ngày 10/12 âm lịch")})</p>

          <p className="text-xs font-semibold mb-1"> {withDefault(tuGia, "Tại tư gia nhà trai")}</p>
          <p className="text-xs font-normal">
             {withDefault(weddingVenue, "03/06 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}
          </p>
        </div>
    </div>
  );
};

export default WeddingInvitationCard3;
