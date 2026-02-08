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
  weddingRank?:string
  type?:string
  backgroundImage?: string;
}

// helper để gán default khi chuỗi rỗng
const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const WeddingInvitationCard4: React.FC<WeddingInvitationCard1Props> = ({
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
          : "url('/image/imageBG6.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="flex justify-center" style={{ width: `${width}px` }}>
        <div className="text-center w-[80%] text-gray-600">
          {/* Nhà trai - Nhà gái */}
          <div className="flex mb-6 px-1 text-[13px] font-semibold tracking-wide text-left">
            <div className="max-w-[50%] w-full me-1 centered">
              <p>Ông Bà</p>
              <p className="mt-1 whitespace-nowrap font-[Roboto]">
                <span className="whitespace-normal uppercase">
                  {withDefault(groomParents, "Hà Minh Cảnh")}
                </span>
                <br />
              
                <span className="whitespace-normal uppercase">
                  {withDefault(groomMother, "Trần Thị Định")}
                </span>
                <br />
               <p className="text-[11px] whitespace-normal flex justify-center font-medium mt-1">
                  <span className="w-[75%]">{withDefault(groomAddress, "03/30 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}</span>
                </p>
              </p>
            </div>
            <div className="max-w-[50%] w-full ms-1 centered">
              <p>Ông Bà</p>
              <p className="mt-1 whitespace-nowrap">
              
                <span className="whitespace-normal uppercase ">
                  {withDefault(brideParents, "Nguyễn Văn Nở")}
                </span>
                <br />
               
                <span className="whitespace-normal uppercase">
                  {withDefault(brideMother, "Trần Thị Thanh")}
                </span>
                <br />
                <p className="text-[11px] whitespace-normal flex justify-center font-medium mt-1">
                  <span className="w-[75%]">{withDefault(brideAddress, "03/103 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}</span>
                </p>
              </p>
            </div>
          </div>

          {/* Nội dung */}
          <p className="uppercase font-semibold text-[13px] mb-1">
            Trân trọng báo tin
          </p>
          <p className="uppercase font-bold text-[13px] mb-6">
            Lễ báo hỷ của con chúng tôi
          </p>

          <p className="script-font text-[40px] text-[#4a5a3a] font-semibold leading-[1.1] mb-2 tracking-[3px] capitalize">
             {withDefault(groomName, "Hà Xuân Vinh")}
          </p>
          <p className="uppercase font-[Roboto] font-semibold text-[14px] mb-2">and</p>
          <p className="script-font text-[40px] text-[#4a5a3a] font-semibold leading-[1.1] mb-6 tracking-[3px] capitalize">
              {withDefault(brideName, "Nguyễn Thị Kim Hiền")}
          </p>

          <p className="uppercase font-semibold text-[13px] mb-1">
            Hôn lễ được cử hành vào lúc
          </p>
          <p className="font-semibold text-[18px] mb-1">  {withDefault(weddingTime, "09:00 Sáng")}</p>
          <p className="font-semibold text-[18px] mb-1"> <span className="font-bold capitalize">
              {withDefault(weddingRank, "Thứ Ba")}
            </span> | <span className="font-bold">
              {withDefault(weddingDateTime," Ngày 15 tháng 5 2025")}
            </span></p>
          <p className="text-[11px] mb-6"> ({withDefault(weddingDateTimeAm, "Tức ngày 10/12 âm lịch")})</p>

          <p className="uppercase font-semibold text-[13px] mb-1">
                       {withDefault(tuGia, "Tại tư gia nhà trai")}
          </p>
          <p className="text-[11px]">
            {withDefault(weddingVenue, "03/06 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitationCard4;
