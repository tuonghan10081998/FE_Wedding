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
}

// helper để gán default khi chuỗi rỗng
const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const WeddingInvitationCard1: React.FC<WeddingInvitationCard1Props> = ({
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
  weddingRank
}) => {
  return (
    <div
      className="rounded-lg shadow-lg flex justify-center items-center text-[#b38b2b]"
      style={{
        backgroundImage: "url('/image/imageBG7.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="flex justify-center" style={{ width: `${width}px` }}>
        <div className="text-center w-[80%]">
          {/* Nhà trai - nhà gái */}
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

          {/* Tiêu đề */}
          <p className="text-[13px] font-semibold tracking-wide mb-1">
            TRÂN TRỌNG BÁO TIN
          </p>
          <p className="text-[13px] font-semibold tracking-wide mb-6">
            LỄ BÁO HỶ CỦA CON <span className="font-bold">CHÚNG TÔI</span>
          </p>

          {/* Tên cô dâu chú rể */}
          <p className="font-[Great_Vibes] text-[40px] tracking-wide font-normal mb-1 capitalize">
            {withDefault(groomName, "Hà Xuân Vinh")}
          </p>
          <p className="font-[Great_Vibes] text-[28px] tracking-wide font-normal mb-1 capitalize">
            &amp;
          </p>
          <p className="font-[Great_Vibes] text-[40px] tracking-wide font-normal mb-8 capitalize">
            {withDefault(brideName, "Nguyễn Thị Kim Hiền")}
          </p>

          {/* Thông tin thời gian */}
          <p className="text-[13px] font-normal mb-1">
            HÔN LỄ ĐƯỢC CỬ HÀNH VÀO LÚC
          </p>
          <p className="text-[15px] font-normal mb-1">
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
          <p className="text-[12px] font-normal mb-6">
            ({withDefault(weddingDateTimeAm, "Tức ngày 10/12 âm lịch")})
          </p>

          {/* Địa điểm */}
          <p className="text-[15px] font-semibold mb-1">
            {withDefault(tuGia, "Tại tư gia nhà trai")}
          </p>
          <p className="text-[12px] font-normal leading-4">
            {withDefault(weddingVenue, "03/06 Trần Đại Nghĩa - Cam Đức - Cam Lâm - Khánh Hòa")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitationCard1;
