import React from "react";

interface EventInvitationCardProps {
  width?: number;
  height?: number;
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  guestName?: string;
  organizerName?: string;
  type?: string;
  backgroundImage?: string;
}

const withDefault = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value : fallback;

const EventInvitationCard: React.FC<EventInvitationCardProps> = ({
  width = 550,
  height = 650,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  guestName,
  organizerName,
  backgroundImage
}) => {
  return (
    <div
      className="rounded-lg shadow-lg flex justify-center items-center text-white"
      style={{
        backgroundImage: backgroundImage 
          ? `url('${backgroundImage}')` 
          : "url('/image/bg_envent.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="text-center px-8" style={{ width: `${width}px` }}>
        {/* Tên người tổ chức - ĐÃ CHUYỂN LÊN TRÊN */}
       
        
        

        {/* INVITATION */}
        <div className="relative h-[130px] flex flex-col justify-center items-center">
          <p className="text-[32px] leading-none font-bold tracking-wider mb-2 text-white drop-shadow-lg">
            THIỆP MỜI
          </p>
          <div className="flex items-center w-full justify-center my-2">
            <hr className="border-b-2 border-white w-20 opacity-80" />
            <p className="font-[Great_Vibes] text-[36px] mx-3 leading-none text-white">
              Sự Kiện
            </p>
            <hr className="border-b-2 border-white w-20 opacity-80" />
          </div>
        </div>
       
        {/* Tên sự kiện */}
        <div className="mt-4 mb-8">
          <p className="script-font text-[46px] font-bold leading-tight tracking-wide capitalize text-white drop-shadow-xl">
            {withDefault(eventName, "Tiệc Tất Niên 2025")}
          </p>
        </div>
 <div className="mb-4 mt-2">
            <p className="text-[15px] font-medium italic text-white/90">
              Ban tổ chức: {organizerName}
            </p>
          </div>
        {/* Thông tin sự kiện */}
        <div className="mt-6 space-y-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <div className="flex items-center justify-center">
            <i className="fas fa-calendar-alt mr-3 text-[22px] text-white"></i>
            <p className="text-[19px] font-semibold text-white">
              {withDefault(eventDate, "Thứ Bảy, 15/02/2025")}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <i className="fas fa-clock mr-3 text-[22px] text-white"></i>
            <p className="text-[19px] font-semibold text-white">
              {withDefault(eventTime, "18:00 - 21:00")}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <i className="fas fa-map-marker-alt mr-3 text-[22px] text-white"></i>
            <p className="text-[19px] font-semibold text-white">
              {withDefault(eventLocation, "Nhà hàng Tiệc Cưới Hoa Sen")}
            </p>
          </div>
        </div>

        {/* Lời mời */}
        <div className="mt-3 text-center">
          <p className="text-[17px] font-medium mb-3 text-white/90">
            Rất hân hạnh được đón tiếp!
          </p>

          <div className="text-center w-full flex justify-center flex-col items-center bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/25">
            <p className="text-[17px] font-bold mb-3 text-white tracking-wide">
              TRÂN TRỌNG KÍNH MỜI
            </p>
            <div className="w-[60%]">
              <p className="text-[20px] font-bold h-[30px] text-white">
                {withDefault(guestName, "Anh/Chị ___________")}
              </p>
              <div
                style={{
                  height: "2px",
                  display: "inline-block",
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  marginTop: "5px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInvitationCard;