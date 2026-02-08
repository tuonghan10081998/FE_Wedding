import React from "react";
import { MapPin, ExternalLink, Trash2 } from 'lucide-react';

interface WeddingInvitation1Props {
  width?: number;
  height?: number;
  partyDateTime?: string;
  partyTime?: string;
  partyDateTimeAm?: string;
  partyVenue?: string;
  partyRank?: string;
  partyAddress?: string;
  checkNhaHang?: boolean;
  type?: string;
  mapLink?: string;
  backgroundImage?: string;
}

const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const WeddingInvitation4: React.FC<WeddingInvitation1Props> = ({
  width = 550,
  height = 650,
  partyDateTime,
  partyTime,
  partyDateTimeAm,
  partyVenue,
  partyRank,
  partyAddress,
  checkNhaHang,
  mapLink,
  backgroundImage
}) => {
  const handleMapClick = () => {
    if (mapLink) {
      window.open(mapLink, '_blank', 'noopener,noreferrer');
    }
  };
   console.log(backgroundImage)
  return (
   
    <div className="flex items-center justify-center font-[Montserrat]">
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
          <div className="outer-border">
            <div className="inner-border">
              <div className="text-center text-gray-600">
                <p className="text-sm font-light tracking-wide font-[Roboto]">
                  TRÂN TRỌNG KÍNH MỜI
                </p>
                <p className="text-2xl font-light tracking-widest mt-1 mb-3 font-[Roboto]"></p>
                <p className="text-sm font-light max-w-xs mx-auto leading-relaxed font-[Roboto]">
                  Đến dự bữa tiệc thân mật chung vui cùng gia đình chúng tôi tại
                </p>
                {checkNhaHang && (
                  <p className="mt-6 text-base font-semibold tracking-wide font-[Roboto]">
                    NHÀ HÀNG TIỆC CƯỚI
                  </p>
                )}
                <p
                  className={`${
                    checkNhaHang
                      ? "font-['Great_Vibes'] text-4xl mt-2 mb-3"
                      : "font-[Roboto] text-[22px] font-bold uppercase mt-5 mb-3"
                  }`}
                  style={{ lineHeight: 1.1 }}
                >
                  {withDefault(
                    partyVenue,
                    checkNhaHang ? "Forever" : "TẠI GIA ĐÌNH NHÀ TRAI"
                  )}
                </p>
                
                {/* Địa chỉ với link */}
                {mapLink ? (
                  <p 
                    onClick={handleMapClick}
                    className="text-sm font-light mx-auto leading-relaxed font-[Roboto] cursor-pointer hover:text-blue-600 hover:underline transition-colors"
                  >
                    {withDefault(partyAddress, "Số 35 Đường 2 Tháng 9 - Hải Châu - TP Đà Nẵng")}
                  </p>
                ) : (
                  <p className="text-sm font-light mx-auto leading-relaxed font-[Roboto]">
                    {withDefault(partyAddress, "Số 35 Đường 2 Tháng 9 - Hải Châu - TP Đà Nẵng")}
                  </p>
                )}

               

                <p className="mt-8 text-lg font-[Roboto] font-light">Vào lúc</p>

                <p className="text-lg font-bold mt-2 font-[Roboto]">
                  {withDefault(partyTime, "5 giờ 30 phút Chiều")}{" "}
                  <span> </span>
                  {withDefault(partyDateTime, "Ngày 25 tháng 5 2025")}
                </p>
                <p className="text-lg mb-6 font-[Roboto]">
                  ({withDefault(partyDateTimeAm, "Nhằm ngày 21 tháng 8 năm mậu tuất")})
                </p>
                <p className="text-xs font-[Roboto]">
                  Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!
                </p>
                 {/* Icon bản đồ */}
               {mapLink && (
                  <div 
                    onClick={handleMapClick}
                    className="flex items-center mt-6 mb-4 mx-auto px-6  bg-pink-600 rounded-full w-fit hover:bg-pink-700 hover:scale-105 transition-all cursor-pointer shadow-md"
                  >
                    <div className="flex items-center justify-center w-7 h-10 bg-red bg-opacity-20 rounded-full">
                      <MapPin className="w-5 h-4 text-white" />
                    </div>

                    <p className="text-sm text-white font-light leading-relaxed font-[Roboto] whitespace-nowrap">
                      {/* {withDefault(mapLink,"")} */}
                      Địa điểm 
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeddingInvitation4