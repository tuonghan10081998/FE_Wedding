import React, { useEffect,useState } from 'react';
import type { Guest,GroupGuest,ImportResult } from './layoutEven';
import Select from "react-select";
import type { SingleValue } from "react-select";
interface ModalEllement {
  onClose: () => void;
  onAddItem: (type: string, width: number, height: number,color:string,nameItem:string) => void;
  onAddTable: (index:number,groupParentID:number,type:string) => void;
  selectedValue: string;
  onSelectedChange: (v: string) => void;
  data?:GroupGuest[],
  isSide:string,
  setSide:(v:string) => void
  numberDay:number
  setNumberDay:(v:number) => void
}
interface OptionType {
  value: string;
  label: string;
}
const ModalElement: React.FC<ModalEllement> = ({ onClose, 
  onAddItem,onAddTable,data,selectedValue,onSelectedChange,isSide,setSide,numberDay,setNumberDay}) => {
  const filterOptions: OptionType[] = [
        ...(data?.map((card) => ({
          value: card.parentID.toString() ?? "",
          label: card.parentName,
        })) ?? []),
      ];
  const [side, setSideMD] = useState(isSide);
  return (
   <div
      className="fixed top-27 right-0 z-20 w-[570px] h-full"
      onClick={onClose}
    >
      <div
        className="bg-white  max-h-screen overflow-hidden shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header cố định */}
        <div className="sticky top-0 z-10 bg-white border-b p-4 ">
          <div className='flex justify-between items-center'>
            <h2 className="text-xl font-bold">📌 Chọn Element </h2>
           <div className="flex gap-4">
             <div className="flex  gap-4 items-center">
            <div className="">Chọn bên <span className="text-red-500">(*)</span></div>
             <Select
              options={filterOptions}
              value={filterOptions.find(opt => opt.value === selectedValue)}
              onChange={(option: SingleValue<OptionType>) =>
                onSelectedChange(option?.value ?? "")
              }
              className="mb-0 w-[200px]"
              classNamePrefix="react-select"
              isSearchable={true}
              placeholder=""
            />
          </div>
            <button
            className="text-gray-500 hover:text-black text-2xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
          </div>
          <div>
           
          </div>
         
        </div>
   <div className="flex flex-wrap items-center justify-between gap-2 mt-4 bg-gray-50 px-5 py-3 rounded-xl shadow-sm border border-gray-200">
  {/* Chọn bên trái */}
      <div className='flex flex-col gap-2 flex-wrap'>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="side"
            value="left"
            checked={side === "left"}
            onChange={(e) => {
              setSide(e.target.value);
              setSideMD(e.target.value);
            }}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-gray-700 font-medium">Bên trái sân khấu</span>
        </label>

        {/* Chọn bên phải */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="side"
            value="right"
            checked={side === "right"}
            onChange={(e) => {
              setSide(e.target.value);
              setSideMD(e.target.value);
            }}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-gray-700 font-medium">Bên phải sân khấu</span>
        </label>
      </div>

      <div className='gap-4'>
         {/* Nhập số bàn */}
          <label className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
            <span className="text-gray-800 font-medium">Số bàn / dãy:</span>
            <input
              type="number"
              value={numberDay}
              onChange={(e) => setNumberDay(parseFloat(e.target.value))}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              min="0"
            />
          </label>
      </div>
</div>
    </div>
         
        {/* Body có thể cuộn */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] p-4"
        onWheel={(e) => e.stopPropagation()} onMouseDown ={(e) => e.stopPropagation()}>
         <div className="">
          <div className="icon-container">
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div onClick={() => onAddTable(2,parseInt(selectedValue),side)} className="icon-item">
                  <svg style={{ height: '70px' }} className="icon-svg w-20" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9B9B9B" strokeWidth="1.5">
                    <rect x="20" y="15" width="40" height="20" fill="#EDE9F1" rx="2"></rect>
                    <circle cx="12" cy="20" r="4"></circle>
                    <circle cx="12" cy="32" r="4"></circle>
                    <circle cx="67" cy="20" r="4"></circle>
                    <circle cx="67" cy="32" r="4"></circle>
                    <circle cx="25" cy="8" r="4"></circle>
                    <circle cx="40" cy="8" r="4"></circle>
                    <circle cx="55" cy="8" r="4"></circle>
                    <circle cx="25" cy="42" r="4"></circle>
                    <circle cx="40" cy="42" r="4"></circle>
                    <circle cx="55" cy="42" r="4"></circle>
                  </svg>
                  <span className="label-text">Bàn dài</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div onClick={() => onAddTable(1,parseInt(selectedValue),side)} className="icon-item">
                  <svg className="icon-svg w-20 h-auto" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9B9B9B" strokeWidth="1.5">
                    <circle cx="40" cy="27" r="17" fill="#EDE9F1"></circle>
                    <circle cx="26" cy="9" r="4"></circle>
                    <circle cx="43" cy="5" r="4"></circle>
                    <circle cx="58" cy="13" r="4"></circle>
                    <circle cx="62" cy="29" r="4"></circle>
                    <circle cx="21" cy="40" r="4"></circle>
                    <circle cx="18" cy="22" r="4"></circle>
                    <circle cx="36" cy="48" r="4"></circle>
                    <circle cx="55" cy="44" r="4"></circle>
                  </svg>
                  <span className="label-text">Bàn tròn</span>
                </div>
              </div>

              <div onClick={() => onAddTable(3,parseInt(selectedValue),side)} className="flex flex-col items-center">
                <div className="icon-item">
                  <svg className="icon-svg w-20 h-auto" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#9B9B9B" strokeWidth="1.5">
                    <circle cx="11" cy="27" r="4"></circle>
                    <circle cx="27" cy="27" r="4"></circle>
                    <circle cx="42" cy="27" r="4"></circle>
                    <circle cx="57" cy="27" r="4"></circle>
                    <circle cx="72" cy="27" r="4"></circle>
                    <line x1="10" y1="35" x2="75" y2="35" stroke="#9B9B9B" strokeWidth="1.5" strokeLinecap="round"></line>
                  </svg>
                  <span className="label-text">Dãy ghế</span>
                </div>
              </div>

              <div  className="flex flex-col items-center">
                <div onClick={() => onAddItem("sankhau",200,200,"#155DFC","Sân khấu")} className="icon-item">
                 <svg height="70px"
                        viewBox="0 0 320 160"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                  <defs>
                    <radialGradient id="stageGradient" cx="50%" cy="30%" r="80%">
                      <stop offset="0%" style={{ stopColor: "#FEF3C7", stopOpacity: 1 }} />
                      <stop offset="70%" style={{ stopColor: "#FBBF24", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#D97706", stopOpacity: 1 }} />
                    </radialGradient>

                    <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: "#9CA3AF", stopOpacity: 0.3 }} />
                      <stop offset="50%" style={{ stopColor: "#6B7280", stopOpacity: 0.5 }} />
                      <stop offset="100%" style={{ stopColor: "#9CA3AF", stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>

                  <ellipse cx="160" cy="145" rx="140" ry="8" fill="url(#shadowGradient)" />

                  <path
                    d="M 40 130 A 120 120 0 0 1 280 130 L 280 140 A 130 130 0 0 0 40 140 Z"
                    fill="url(#stageGradient)"
                    stroke="#B45309"
                    strokeWidth="2"
                    strokeDasharray="12,4"
                  />

                  <path
                    d="M 45 133 A 115 115 0 0 1 275 133"
                    fill="none"
                    stroke="#FEF3C7"
                    strokeWidth="1.5"
                    opacity="0.8"
                  />

                  <text
                    x="160"
                    y="138"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fontSize="16"
                    fontWeight="700"
                    textAnchor="middle"
                    fill="#92400E"
                    letterSpacing="1px"
                  >
                  </text>

                  <path
                    d="M 30 120 Q 35 130 40 140 L 40 120"
                    fill="#DC2626"
                    opacity="0.8"
                  />
                  <path
                    d="M 290 120 Q 285 130 280 140 L 280 120"
                    fill="#DC2626"
                    opacity="0.8"
                  />

                  <g transform="translate(80,20)">
                    <rect x="-3" y="0" width="6" height="12" fill="#374151" rx="1" />
                    <circle cx="0" cy="18" r="5" fill="#abbb28" opacity="0.6" />
                    <path
                      d="M -10 25 L 10 25 L 5 110 L -5 110 Z"
                      fill="#FEF3C7"
                      opacity="0.2"
                    />
                  </g>

                  <g transform="translate(160,15)">
                    <rect x="-4" y="0" width="8" height="15" fill="#374151" rx="1" />
                    <circle cx="0" cy="22" r="6" fill="#abbb28" opacity="0.7" />
                    <path
                      d="M -12 30 L 12 30 L 8 115 L -8 115 Z"
                      fill="#FEF3C7"
                      opacity="0.25"
                    />
                  </g>

                  <g transform="translate(240,20)">
                    <rect x="-3" y="0" width="6" height="12" fill="#374151" rx="1" />
                    <circle cx="0" cy="18" r="5" fill="#abbb28" opacity="0.6" />
                    <path
                      d="M -10 25 L 10 25 L 5 110 L -5 110 Z"
                      fill="#FEF3C7"
                      opacity="0.2"
                    />
                  </g>
                      
                </svg>
                  <span className="label-text">Sân khấu</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("quat",70,70,"transparent","Quạt")} className="icon-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                    <defs>
                      <path id="fan-stroke" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M64.5 35q0 4.75-1.3 9-.8 2.6-2.15 5.05-2.05 3.65-5.2 6.8-7.2 7.2-16.85 8.4-1.95.25-4 .25-4.2 0-8-1-.35-.1-.65-.2-6.8-2.05-12.2-7.45Q11 52.7 9 49.05q-.4-.7-.75-1.45Q5.5 41.85 5.5 35q0-12.2 8.65-20.85 3.95-3.95 8.65-6.1Q28.4 5.5 35 5.5t12.2 2.55q4.7 2.15 8.65 6.1 5.3 5.3 7.35 11.95 1.3 4.15 1.3 8.9zm-24 0q0 1.9-1.15 3.35-.2.25-.45.5-1.6 1.65-3.9 1.65-2.25 0-3.85-1.65-.25-.25-.45-.5-1.2-1.45-1.2-3.35 0-2.3 1.65-3.9.9-.95 2.1-1.35.25-.05.55-.1.6-.15 1.2-.15 1 0 1.9.3.85.3 1.55.85.25.2.45.45 1.6 1.6 1.6 3.9z"></path>
                      <path id="fan-blade" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.15 21.85q3.239-5.943 5-10.1 1.757-4.157-.05-8.025Q10.297-.154 5 .325q-5.287.49-2.975 6.75Q4.332 13.328 1.8 18.75M-11.05 6.7q3.86-2.903 7.55-3.5M-6 9.55q1.329-1.14 3.2-1.6"></path>
                    </defs>
                    <use xlinkHref="#fan-stroke"></use>
                    <use transform="translate(33.45 10.15)" xlinkHref="#fan-blade"></use>
                    <use transform="scale(-1) rotate(-54.97 -74.49 30.858)" xlinkHref="#fan-blade"></use>
                    <use transform="rotate(-114.971 21.523 19.645) scale(.99997)" xlinkHref="#fan-blade"></use>
                  </svg>
                  <span className="label-text">Quạt</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("phaohoa",70,70,"transparent","Pháo hoa")} className="icon-item">
                   <svg width="100" height="70" viewBox="40 42 70 70" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(40 40)">
                      <path
                        d="M47.1 8.05q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9 8.65 8.65 8.65 20.85 0 12.2-8.65 20.85-3.5 3.5-7.6 5.6-1.45.75-3 1.3-1.25.45-2.5.8-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-1.65-.6-3.25-1.4-2.6-1.35-4.95-3.25-1.5-1.2-2.65-2.35-3.8-3.8-5.9-8.25Q5.5 41.9 5.5 35.05q0-12.2 8.65-20.85 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55M44.35 24L43 22.7h10.9l-.85 9.85-1.3-1.55-7.3 7.85-5.05 5.35-5.1-5.15L24 49.25l-2.4-2.5 10.2-10.2 7.6-7.6L44.35 24l7.4 7m-7.4-7l.1 14.85m-5-26.05l-.1-.3-3.6-2.45-3.95 2.75 1.35-4.45-3.7-2.85 4.6-.1L35.6 1l1.65 4.4 4.6.1-3.7 2.85 1.2 4.15"
                        fill="none" stroke="#7f5959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <span className="label-text">Pháo hoa</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("cong",150,200,"transparent","Cổng")} className="icon-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 341 322" width="100" height="70">
                      <path
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                        d="M14.5 308.95V270.4V208.4V146.35Q17.6 95.45 54.5 58.55 87.75 25.3 132.3 19.5 135.55 17.95 139 16.6
                        162.65 7.15 190.25 7.15 199.25 7.15 207.9 8.2
                        225.6 10.25 241.5 16.6 266.75 26.65 287.5 47.45
                        310.5 70.4 320.35 98.8 320.9 100.35 321.4 101.95
                        326.45 117.8 327.5 135.3V146.35V213.7V281.05V308.95
                        M207.9 8.2L175.2 20.05Q199.8 24 220.85 36.45 235.9 45.35 249.1 58.55
                        252.5 61.95 255.6 65.45 268.1 79.6 276 95.65
                        283.95 111.9 287.2 130.1 288.6 138.05 289.1 146.35H327.5
                        M132.3 19.5Q141.75 18.25 151.8 18.25 163.85 18.25 175.2 20.05
                        M14.5 146.35H52.95V135.3Q56 84.35 92.95 47.45 110.95 29.45 132.3 19.5
                        M14.5 270.4H52.95V208.4H14.5
                        M52.95 308.95V270.4
                        M289.1 308.95V281.05V213.7V146.35
                        M52.95 208.4V146.35
                        M289.1 281.05H327.5
                        M289.1 213.7H327.5"
                      />
                    </svg>
                  <span className="label-text">Cổng</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("loa",70,70,"transparent","Loa")} className="icon-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" preserveAspectRatio="none">
                    <circle r="35" cx="0" cy="0" stroke="rgba(160, 83, 178, 0)" strokeWidth="2" strokeDasharray="5,5" fill="transparent" strokeLinecap="round" />
                    <defs>
                      <path id="soundPath" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M28.3 3.15q.85-.45 1.8-.8.75-.25 1.5-.45.55-.15 1.1-.25 1.7-.35 3.55-.35 1.75 0 3.45.3.1 0 .15.05.8.15 1.6.4.4.1.8.25 1 .35 1.95.85m3.4 4.6q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q65 22.55 65 34.75q0 12.2-8.65 20.85-3.5 3.5-7.6 5.6-1.15.6-2.3 1.05-.35.15-.7.25-1.25.45-2.5.8-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-.45-.15-.9-.35-1.2-.45-2.35-1.05-2.6-1.35-4.95-3.25-1.5-1.2-2.65-2.35-3.8-3.8-5.9-8.25l-.7-1.6q-.3-.7-.55-1.45Q6 39.8 6 34.75q0-5.1 1.5-9.55.25-.75.55-1.5 2.15-5.35 6.6-9.8Q17.6 10.95 21 9q.6-.35 1.25-.7.55-.3 1.15-.55m5.3 20.1L40.9 15.6v13.65q1.4.35 2.5 1.45 1.7 1.8 1.7 4.25 0 2.5-1.7 4.2-1.1 1.1-2.5 1.5V53.6l-4.45-3.8-8-8v.45h-5.3V27.4h5.3v14.4m12.45-1.15v-11.4m-9.15-22.3q.5-.25 1.05-.45.4-.15.85-.25.3-.05.6-.15.95-.2 2-.2 1 0 1.95.2h.1q.45.1.9.25.2.05.45.15.55.2 1.1.45m-6.65 3.9q.2-.1.5-.2.2-.1.4-.15.15-.05.3-.05.45-.1.95-.1.5 0 .95.1h.05q.25.05.45.1.1.05.2.05.3.1.55.25M21.85 34.9H17.2" />
                    </defs>
                    <use href="#soundPath" />
                  </svg>
                  <span className="label-text">Loa</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("den",70,70,"transparent","Đèn")} className="icon-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 120 50">
                      <circle r="35" stroke="rgba(160, 83, 178, 0)" strokeWidth="2" strokeDasharray="5,5" fill="transparent" />
                      <g transform="translate(25 0)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70" height="70">
                          <defs>
                            <path id="icon-door" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M47.1 8.5q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q64.5 23.3 64.5 35.5q0 12.2-8.65 20.85-3.45 3.45-7.4 5.5Q42.35 65 35 65q-4.55 0-8.65-1.2-2.5-.75-4.8-1.95-3.5-1.8-6.55-4.65l-.85-.85q-3.8-3.8-5.9-8.25Q5.5 42.35 5.5 35.5q0-12.2 8.65-20.85.4-.4.85-.8 2.6-2.45 5.5-4.1.6-.35 1.25-.7.55-.3 1.15-.55m22 14.7l4-3.9m-3.5 14.05v.2q-.05 4.2-3.1 7.2-.3.3-.5.6-2.4 1.7-2.85 5.55-.35 1.15-1.55 1.15h-5.25q-1.35.15-1.8-1.25-.1-3.4-2.25-5.3-.45-.35-.75-.75-3.05-3-3.1-7.2v-.2q0-4.4 3.1-7.55 3.1-3.05 7.45-3.05 4.4 0 7.5 3.05 3.1 3.15 3.1 7.55zm9.6.2h-5.4M35.1 8.25V1.5M40 8.25V4.3m-9.75 3.95V4.3M24.5 23.15l-3.4-3.4M35 18.9v-5.15m-14.4 19.8h-5.25m15.55 17.9h7.6m.05 3H31m1.7 2.95h3.9" />
                          </defs>
                          <use href="#icon-door" />
                        </svg>
                      </g>
                    </svg>
                    <span className="label-text">Đèn</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("wc",70,70,"transparent","WC")} className="icon-item">
                   
                   <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                    {/* Viền chấm hình chữ nhật */}
                    <rect x="0" y="0" rx="1" ry="1" width="70" height="100" fill="transparent" stroke="rgba(160, 83, 178, 0)" strokeWidth="2" strokeDasharray="5,5"></rect>

                    {/* Biểu tượng toilet */}
                    <defs>
                      <path id="toilet_icon" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M58.7 14.8q0 1.45-1 2.4-1.05 1.05-2.45 1.05-1.45 0-2.45-1.05-1-.95-1-2.4 0-1.4 1-2.45 1-1 2.45-1 1.4 0 2.45 1 1 1.05 1 2.45zM46.35 37.85V27.4l.1-.9q.75-5.55 5.45-5.4h6.5q3.3-.1 4.65 2.6.6 1.15.8 2.8l.1.9v10.65m-44-23.4q0 1.45-1 2.45-1 1-2.4 1-1.45 0-2.5-1-1-1-1-2.45 0-1.4 1-2.45 1.05-.95 2.5-.95 1.4 0 2.4.95 1 1.05 1 2.45zM26.9 36.2l-2.85-10q-1.6-5.05-4.5-4.95h-6.1q-2.9-.1-4.5 4.95l-2.85 10m7.15-9.7L8.2 45h16.85L19.6 26.5m39.75.4v31.4M51 26.9v31.4M36.7 10.95v47.8m-23.75.2V45m7.45.35V59.1"></path>
                    </defs>
                    <use href="#toilet_icon"></use>
                  </svg>
                  <span className="label-text">WC</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("canhbao",70,70,"transparent","Cảnh báo")} className="icon-item">
                     <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                      <path fill="none"  stroke="#333" strokeLinecap="round"strokeLinejoin="round"  strokeWidth="1.5"
                        d="M7.35 62h54.9q2.55-.35 3.35-1.7.75-1.4-.1-3.2L38.35 10.5Q36.8 7.85 34.85 8q-1.45-.1-3.25 2.5l-27 46.1q-.9 2.1-.15 3.6.6 1.2 2.9 1.8zM35 22.5h.05q.85 0 1.45.6.65.65.65 1.5v21.3q0 .85-.65 1.45-.6.65-1.45.65H35q-.85 0-1.5-.65-.6-.6-.6-1.45V24.6q0-.85.6-1.5.65-.6 1.5-.6zm2.3 30.85q0 .95-.7 1.6-.65.7-1.6.7-.95 0-1.65-.7-.65-.65-.65-1.6 0-.95.65-1.65.7-.65 1.65-.65t1.6.65q.7.7.7 1.65z"
                      ></path>
                    </svg>
                  <span className="label-text">Cảnh báo</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("nguoikt",70,70,"transparent","Người khuyết tật")} className="icon-item">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                <path fill="none"  stroke="#333" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="1.5"
                  d="M30.05 47.85q-2.5-1.35-3.35-3.65V27.15q1.05-5.6 4.65-5.2h7.55q2.15.45 2.85 3.25l2.15 11.95h4.95q2.65.85 3.55 4.6l4 11.75q1.2 3.75-2.2 5.35-3.55 1.5-5.6-1.8l-3.3-9.2H30.05zM41.4 11.5q0 2.9-2.1 4.9-2 2.1-4.85 2.1-2.95 0-4.95-2.1-2.05-2-2.05-4.9 0-2.85 2.05-4.95 2-2 4.95-2 2.85 0 4.85 2 2.1 2.1 2.1 4.95zm-4.45 39.7q-.15 3.55-2.65 6.05-2.65 2.65-6.4 2.65-3.8 0-6.45-2.65-2.6-2.65-2.6-6.4 0-3.8 2.6-6.45 1.45-1.45 3.15-2.05M14.95 24.6h8v13.1q-2.75.95-5 3.2Q13.9 45.05 13.9 51q0 5.9 4.05 10Q22.1 65.05 28 65.05T37.95 61q4-3.9 4.2-9.45"
                  />
                </svg>
              <span className="label-text">Người khuyết tật</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("maydieuhoa",70,70,"transparent","Máy điều hòa")} className="icon-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                  <path fill="none"  stroke="#333"   strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M47.1 8.2q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q64.5 23 64.5 35.2q0 12.2-8.65 20.85-.8.8-1.6 1.5Q46.1 64.7 35 64.7q-4.55 0-8.65-1.2-5.8-1.75-10.6-5.95-.8-.7-1.6-1.5-3.8-3.8-5.9-8.25Q5.5 42.05 5.5 35.2q0-12.2 8.65-20.85 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55m22.35 21.55l.1-.4-.45.25.35.15 6.65 2.8m.25 12.75l-6.7-3.95h-.05l.6 7.85m5.65-23.65l-6.3 3.8.7-7.55m-.6 19.55l6.35-3M29.75 6.95L35.4 1.3l5.5 5.5m-5.75 17.5l.25-.2-5.6-4.15m5.6-4.15v8.3l5.5-4.35M28.8 51.9l6.6-5.1V35.45l-.2-.1-9.75 5.85-2.1 8.4m1.05-27.5l.75 7.35 10.05 5.9.2-.1V24.1m9.5 5.5l-9.5 5.65v.2l10 5.9m-20.25-11.9l-6.5 3.2m-.75 13l7.55-4.45-7.4-2.55m.25-13.25l6.85 4.05M41.8 51.7l-6.4-4.9v7.85"
                            />
                  </svg>
                  <span className="label-text">Máy điều hòa</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("nuoc",70,70,"transparent","Nước")} className="icon-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70">
                  <path  fill="none" stroke="#333"  strokeLinecap="round"  strokeLinejoin="round" strokeWidth="1.5"
                    d="M40.7 1.15q2 3.8 0 5.25-1.2 1-1.35 2.25-.1 1.1.65 2.4.15.3.35.65m6.75-3.55q1.25.55 2.45 1.25 1.5.9 3 2 .75.55 1.45 1.2.95.8 1.85 1.7 3.8 3.8 5.95 8.25 2.7 5.75 2.7 12.6 0 12.2-8.65 20.85Q47.2 64.65 35 64.65q-4.55 0-8.65-1.2-6.25-1.9-11.35-6.6l-.85-.85q-3.8-3.8-5.9-8.25Q5.5 42 5.5 35.15q0-12.2 8.65-20.85.4-.4.85-.8 2.6-2.45 5.5-4.1.6-.35 1.25-.7.55-.3 1.15-.55m26.05 30.9q0 5.6-3.95 9.55-4 4-9.6 4t-9.6-4q-3.95-3.95-3.95-9.55 0-5.65 3.95-9.6.6-.6 1.25-1.1 6-5.15 4.4-11.1 5.3 2.75 7.65 8.7.2.6.6 2.1.35 1.55.55 3.25.15 1.7.85 1.6.7-.15 1.55-1.65.8-1.55 1.35-2.7.5.4 1 .9 3.95 3.95 3.95 9.6zM36 1.65q2 3.8 0 5.25-.95.8-1.25 1.75-.4 1.3.55 2.9.15.3.35.65M31.3 1.4q2 3.8 0 5.25-1.1.9-1.3 2-.25 1.2.6 2.65.15.3.35.65"
                  />
                </svg>
                <span className="label-text">Nước</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("losuoi",70,70,"transparent","Lò sưởi")} className="icon-item">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70" height="70">
                  <defs>
                    <path id="Layer0_0_1_STROKES_water"  fill="none"  stroke="#333"strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M28.3 7.05q.95-.15 1.75 1.05.35.55.8 1.05.5.55 1.15.6.6.1 1.6-.9l.95-1.35q.3-.3.55-.4.25-.1.4-.1.2 0 .45.1t.55.4l.95 1.35q1 1 1.6.9.65-.05 1.1-.6.5-.5.85-1.05.8-1.2 1.75-1.05m4.35.9q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q57 15.25 58 16.5q6.5 7.85 6.5 18.45T58 53.45q-1 1.2-2.15 2.35-3.5 3.5-7.6 5.6-1.45.75-3 1.3-1.25.45-2.5.8-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-1.65-.6-3.25-1.4-2.6-1.35-4.95-3.25-1.5-1.2-2.65-2.35-1.75-1.75-3.15-3.65-1.6-2.2-2.75-4.6Q5.5 41.8 5.5 34.95q0-9.75 5.5-17.2 1.4-1.9 3.15-3.65 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55M48.15 46.5q-1.25 1.2-4 1.5-2.75.3-4.95-1.55-2.25-1.85-2.6-4-.3-2.2 0-3.35.25-1.2.8-2.05 1.65-2.7 4-5.65-1.9-1.4-4.35-5.25-2.45-3.85-3.55-7.85-1.25 6.25-8.05 13.7-1.45 1.85-2.4 3.7-1 1.8-1.15 4.15-.2 2.3.25 4.4.45 2.05 2.2 4.35.3.3.55.6l.85.85q.7.55 1.5 1.1.7.4 1.5.8.8.25 1.6.55l.7.2q.3.05.55.1 2.2.4 4.95-.25 2.7-.7 4.2-2.3m.65-18.85l2.3-2.85q1.75 2.9 4.2 5.7 2.85 3.6 3.1 6.35.1 1.6-.8 3.4M29.85 1.6q.75-.1 1.35.85.3.4.65.8.4.45.9.5.5.05 1.25-.75l.75-1.05q.25-.25.45-.3.2-.1.3-.1.15 0 .35.1.2.05.45.3L37.05 3q.8.8 1.25.75.55-.05.9-.5.35-.4.65-.8.65-.95 1.4-.85M28.2 35q-2.45 2.4-2.7 6.5m15.55-3.7q-1.35 2.3-.65 4.55"
                    />
                  </defs>
                  <use xlinkHref="#Layer0_0_1_STROKES_water" />
                </svg>
                <span className="label-text">Lò sưởi</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("mic",70,70,"transparent","Mic")} className="icon-item">
                   
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70" height="70">
                  <defs>
                    <path id="mic-path" fill="none"stroke="#333"strokeLinecap="round"strokeLinejoin="round"strokeWidth="1.5"
                      d="M29.7 24.9v-4.15q0-1.8 1.25-3.1 1.2-1.15 2.85-1.25h3.4q1.75.05 2.95 1.25 1.3 1.3 1.3 3.1v10.3q0 1.8-1.3 3.05-1.15 1.2-2.85 1.3h-3.35q-1.75-.05-3-1.3t-1.25-3.05V24.9h5.15M47.1 7.4q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q64.5 22.2 64.5 34.4q0 12.2-8.65 20.85-3.5 3.5-7.6 5.6-1.45.75-3 1.3-.8.3-1.65.55-.4.15-.85.25-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-1.65-.6-3.25-1.4-2.6-1.35-4.95-3.25-1.5-1.2-2.65-2.35-3.8-3.8-5.9-8.25Q5.5 41.25 5.5 34.4q0-12.2 8.65-20.85 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55M38.25 1L33.4 5.85H38l-5.05 5.05M29.7 30.05h5.4m.55 5.6V48.4l7.5 5m-10 3.75l2.5-8.75-8.9 4"
                    />
                  </defs>
                  <use xlinkHref="#mic-path" />
                </svg>
                <span className="label-text">Mic</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("maytaokhoi",70,70,"transparent","Máy tạo khói")} className="icon-item">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70"
                      height="70" fill="none" stroke="#333"strokeWidth="1.5"strokeLinecap="round" strokeLinejoin="round">
                      <path d="M47.1 8.1q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q64.5 22.9 64.5 35.1q0 12.2-8.65 20.85-3.5 3.5-7.6 5.6-1.45.75-3 1.3-1.25.45-2.5.8-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-1.65-.6-3.25-1.4-2.6-1.35-5.25-3.45-1.2-1-2.35-2.15-3.8-3.8-5.9-8.25Q5.5 41.95 5.5 35.1q0-12.2 8.65-20.85 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55M27.55 31q-1 .35-2.15.35-2.25 0-3.9-1.65t-1.65-3.95q0-2.25 1.65-3.9t3.9-1.65q1.45 0 2.65.6.45-.8 1.15-1.55l.15-.15.1-.1q1-1 2.25-1.55 1.55-.7 3.35-.7t3.35.7q1.3.6 2.35 1.65l.15.15q.6.65 1.05 1.4.15.15.25.4.4-.25.85-.35.05-.05.1-.05.7-.2 1.5-.2t1.6.2q1.25.4 2.3 1.45l.1.05q.25.25.45.6 1.1 1.4 1.1 3.3 0 1.85-1.1 3.35-.2.25-.45.5l-.1.05q-1.55 1.6-3.7 1.65h-.2q-1.05 0-1.95-.3M34 11.35q7-.05 8-4.2 1-4.2-3.8-5.35-4.85-1.15-8.4 1.15-2.65 2.4.65 4 3.25 1.55 6.7-1.15m-2 21.85V47.2M28.9 27.1q3.85 3.85 3.05 19.35m9.2-19.6q-.8.55-1.3 2.4-1.5 4.6-1.3 17.5m-7.4 3.7h8v5.35h-8v-5.35z" />
                    </svg>
                    <span className="label-text">Máy tạo khói</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("banhkem",70,70,"transparent","Bánh kem")} className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70"height="70"
                   fill="none"  stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" >
                    <path d="M28.85 19.7l.15 5.1v.1q-.15.2-.15.35 0 .4.6.75.45.2 1.25.4 1.9.5 4.6.5 2.7 0 4.6-.5 1.95-.45 1.95-1.15 0-.2-.2-.35V20q-.45.45-1.75.75-1.9.5-4.6.5-2.7 0-4.6-.5-.8-.2-1.25-.4-.6-.35-.6-.65v-.05q0-.45.6-.75.45-.25 1.25-.45 1.9-.5 4.6-.5 2.7 0 4.6.5 1.95.45 1.95 1.15 0 .2-.2.4M47.1 7.85q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9 8.65 8.65 8.65 20.85 0 12.2-8.65 20.85-3.5 3.5-7.6 5.6-1.45.75-3 1.3-1.25.45-2.5.8-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-1.65-.6-3.25-1.4-2.6-1.35-5.25-3.45-1.2-1-2.35-2.15-3.8-3.8-5.9-8.25Q5.5 41.7 5.5 34.85q0-12.2 8.65-20.85 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55M41.65 24.9q.6.1 1.2.25 2.6.65 3.1 1.55.15.2.15.4 0 .25-.15.5V35H46q3.55.85 4.25 2.1m-4.3-10.4v.9q-.5.85-3.1 1.5-3.25.8-7.85.8t-7.85-.8q-1.35-.35-2.15-.75-.75-.4-1-.85v8.7q.25.45 1 .85.8.35 2.15.7 3.25.85 7.85.85t7.85-.85q3.25-.8 3.25-1.95 0-.25-.15-.45V35m-25.5 15q.25.65 1.35 1.15 1 .55 2.9 1 4.45 1.1 10.7 1.1 6.25 0 10.6-1.1 4.45-1.05 4.45-2.65 0-.3-.2-.6V38.3q-.7 1.2-4.25 2.1-4.35 1.1-10.6 1.1t-10.7-1.1q-1.9-.5-2.9-1-1.1-.5-1.35-1.15V49M24 27.5q-.05-.15-.05-.4 0-.15.05-.35.25-.45 1-.85.8-.4 2.15-.75.8-.25 1.85-.35m-5 1.95v.75m-3.55 9.7q.25-.6 1.35-1.15.8-.5 2.2-.8m0 .95q-.05-.2-.05-.4 0-.25.05-.35m4.65-25l15.1-9.05q-.7 7.4-7.45 7.3" />
                  </svg>
                  <span className="label-text">Bánh kem</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("hopqua",70,70,"transparent","Hộp quà")} className="icon-item">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="70" height="70">
                  <defs>
                    <path id="gift_icon" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M30.9 8.15q-.3-.7-.3-1.55 0-2.1 1.55-3.6 1.5-1.5 3.65-1.5 2.1 0 3.6 1.5t1.5 3.6q0 .85-.2 1.55m6.4.15q1.25.55 2.45 1.25 1.5.9 3 2 1.7 1.3 3.3 2.9Q64.5 23.1 64.5 35.3q0 12.2-8.65 20.85-3.5 3.5-7.6 5.6-1.45.75-3 1.3-1.25.45-2.5.8-.9.2-1.85.4-2.85.55-5.9.55-2.95 0-5.75-.5-.15 0-.25-.05-1.35-.25-2.65-.65-.7-.2-1.35-.45-1.65-.6-3.25-1.4-2.6-1.35-4.95-3.25-1.5-1.2-2.65-2.35-3.8-3.8-5.9-8.25Q5.5 42.15 5.5 35.3q0-12.2 8.65-20.85 2.95-2.95 6.35-4.9.6-.35 1.25-.7.55-.3 1.15-.55m16.25 17.2q1.3 0 2.3-1 .95-.95.95-2.3 0-1.35-.95-2.35-1-.95-2.35-.95t-2.3.95q-.75.75-.95 1.75v4.45h12.6q1.7-.15 1.5 1v6.4h-1.6v15.6q.35 1.75-2.15 2.65H25.6q-2-.1-2.15-2V33.45H21.6V27.2q.55-1.35 1.5-1.15h12.75v7.4h12.5m-15.8-7.95q-1.3 0-2.3-1-.95-.95-.95-2.3 0-1.35.95-2.35 1-.95 2.35-.95t2.3.95q.75.75.95 1.75m0 30.1V33.45h-12.4"
                    />
                  </defs>
                  <use xlinkHref="#gift_icon" />
                </svg>
                <span className="label-text">Hộp quà</span>
                </div>
              </div>
             <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("camdien",70,70,"transparent","Cắm điện")} className="icon-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -10 50 70" width="70" height="70">
                    <defs>
                      <path id="outlet_icon" fill="none"stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                        d="M19.75 11.95v6.8h5.85v-6.8m0 6.8h3.9V22q0 2.9-2.05 4.95Q25.5 28.9 22.8 29v13.25q8.1-.1 13.85-5.85.55-.55 1.05-1.1 4.8-5.5 4.8-13.05 0-8.25-5.85-14.1T22.5 2.3q-8.25 0-14.1 5.85t-5.85 14.1q0 6.85 3.95 12M22.8 29h-.3q-2.9 0-4.95-2.05Q15.5 24.9 15.5 22v-3.25h4.25m-4.9 14.05l-3.35 3.65h4.65l-4 3.85"
                      />
                    </defs>
                    <use xlinkHref="#outlet_icon" />
                  </svg>
                  <span className="label-text">Cắm điện</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("dj",118,65,"transparent","DJ")} className="icon-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="118" height="65" viewBox="0 0 118 65">
                    <defs>
                      <path id="dj"  fill="none"stroke="#333"  strokeLinecap="round" strokeLinejoin="round"  strokeWidth="1.5"
                        d="M12.5 6.5h94q.7 0 1.3.1.35.05.7.15.75.2 1.3.65 1.7 1.2 1.7 4.1v43q0 2.9-1.7 4.15-.55.4-1.3.6-.35.1-.7.15-.6.1-1.3.1h-94q-5 0-5-5v-43q0-5 5-5zm89.4 7.25q0 .5-.35.8-.3.35-.8.35t-.85-.35q-.3-.3-.3-.8t.3-.85q.35-.3.85-.3t.8.3q.35.35.35.85zM100 33.5q0 6-4.25 10.25-1.75 1.75-3.85 2.8Q89 48 85.5 48q-3.5 0-6.4-1.45-2.1-1.05-3.85-2.8Q71 39.5 71 33.5q0-2.1.5-3.95.95-3.5 3.75-6.3Q79.5 19 85.5 19t10.25 4.25q2.8 2.8 3.75 6.3.5 1.85.5 3.95zm-9.7 0q0 1.8-1.25 3-1.25 1.3-3 1.3-1.8 0-3.05-1.3-1.25-1.2-1.25-3 0-1.75 1.25-3.05.65-.6 1.4-.9.75-.3 1.65-.3.9 0 1.65.3.75.3 1.35.9 1.25 1.3 1.25 3.05zm16.1-4.85v3h1.5m-1.5 7.75v-7.75h-1.75m-37.4-13.9q0 1.05-.75 1.75-.7.75-1.75.75t-1.8-.75q-.7-.7-.7-1.75t.7-1.8q.75-.7 1.8-.7t1.75.7q.75.75.75 1.8zm-9.5 0q0 1.05-.75 1.75-.7.75-1.75.75t-1.8-.75q-.7-.7-.7-1.75t.7-1.8q.75-.7 1.8-.7t1.75.7q.75.75.75 1.8zm-.7 11.05q0 .45-.3.75 0 .05-.05.05-.3.35-.8.35t-.85-.35l-.05-.05q-.25-.3-.25-.75 0-.5.3-.85.35-.3.85-.3t.8.3q.35.35.35.85zm.1 6.7q0 .5-.35.8-.3.35-.8.35t-.85-.35q-.3-.3-.3-.8t.3-.85q.35-.3.85-.3t.8.3q.35.35.35.85zm-8.65-2q0 6-4.25 10.25-1.75 1.75-3.85 2.8Q37.5 48 34 48q-3.5 0-6.4-1.45-2.1-1.05-3.85-2.8Q19.5 39.5 19.5 33.5q0-2.1.5-3.95.95-3.5 3.75-6.3Q28 19 34 19t10.25 4.25q2.8 2.8 3.75 6.3.5 1.85.5 3.95zm16.15-4.7q0 .45-.3.75 0 .05-.05.05-.3.35-.8.35t-.85-.35l-.05-.05q-.25-.3-.25-.75 0-.5.3-.85.35-.3.85-.3t.8.3q.35.35.35.85zm.25 6.7q0 .5-.35.8-.3.35-.8.35t-.85-.35q-.3-.3-.3-.8t.3-.85q.35-.3.85-.3t.8.3q.35.35.35.85zm-11.65 9.75H67V52H53.25v-6.75zm-32.6-29.5q0 .5-.35.8-.3.35-.8.35t-.85-.35q-.3-.3-.3-.8t.3-.85q.35-.3.85-.3t.8.3q.35.35.35.85zm-6.9 13v3h1.5m-3.25 0h1.75v7.75m25.05-6q0 1.8-1.25 3-1.25 1.3-3 1.3-1.8 0-3.05-1.3-1.25-1.2-1.25-3 0-1.75 1.25-3.05.65-.6 1.4-.9.75-.3 1.65-.3.9 0 1.65.3.75.3 1.35.9 1.25 1.3 1.25 3.05z"
                      />
                    </defs>
                    <use xlinkHref="#dj" />
                  </svg>
                  <span className="label-text">DJ</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("pianol",150,100,"transparent","Đàn piano lớn")} className="icon-item">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 194 240">
                  <defs>
                    <path  id="pianol" fill="none" stroke="#333" strokeLinecap="round"strokeLinejoin="round"strokeWidth="1.5"
                      d="M6.1 163.65V43.9q.346-9.348 5.775-17.35 5.534-8.177 16.375-14.95.25-.2.55-.35Q50 1.5 72.85 7q1.95.4 3.95.85 11.85 3.6 25.85 13.2 2.625 2.597 5.025 5.5 10.57 12.801 16.725 31.55 10.95 32.3 29.4 44.2 25.15 14.15 31 24.65 2.2 3.85 3.15 11.3v76.6h-1.85v19.2H10.1v-19.2h-4v-51.2h181.85M14.8 234.05v-19.2h-4.7m170.55 19.2v-19.2h-8.35v14.85H24.6v-14.85h-9.8m171.3 0h-5.45m-8.35 0H24.6"
                    />
                    <path
                      id="pianodl" fill="none" stroke="#333" strokeLinecap="round"strokeLinejoin="round" strokeWidth="1.5"
                      d="M0 0h13.5M0 20.1h13.5M0 16h13.5M0 11.5h13.5M0 4.5h13.5"
                    />
                  </defs>

                  <use xlinkHref="#pianol" />

                  {/* Repeated vertical lines */}
                  <use transform="matrix(0 -.72588 .72588 0 30.9 224.65)" xlinkHref="#pianodl" />
                  <use transform="matrix(0 -.72588 .72588 0 50.9 224.65)" xlinkHref="#pianodl" />
                  <use transform="matrix(0 -.72588 .72588 0 70.45 224.65)" xlinkHref="#pianodl" />
                  <use transform="matrix(0 -.72588 .72588 0 90.5 224.65)" xlinkHref="#pianodl" />
                  <use transform="matrix(0 -.72588 .72588 0 110.25 224.65)" xlinkHref="#pianodl" />
                  <use transform="matrix(0 -.72588 .72588 0 130.4 224.65)" xlinkHref="#pianodl" />
                  <use transform="matrix(0 -.72588 .72588 0 150.3 224.65)" xlinkHref="#pianodl" />
                </svg>
                <span className="label-text">Đàn piano lớn</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("piano",100,70,"transparent","Đàn piano")} className="icon-item">
                   
                   <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100" height="70" viewBox="0 0 194 84" preserveAspectRatio="none">
                      <defs>
                        <path id="piano" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M187.95 35.8v-22q.25-6.35-7.2-6.95H12.5q-5.65-.55-6.4 6.7V35.8h181.85v22.25h-1.85v19.2H10.1v-19.2h-4V35.8m174.55 41.45v-19.2h-8.35V72.9H24.6V58.05h-9.8v19.2m171.3-19.2h-5.45m-165.85 0h-4.7m162.2 0H24.6" />
                        <path id="pianod" fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M0 0h13.5M0 20.1h13.5M0 16h13.5M0 11.5h13.5M0 4.5h13.5" />
                      </defs>
                      <use xlinkHref="#piano" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 30.9 67.85)" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 50.9 67.85)" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 70.45 67.85)" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 90.5 67.85)" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 110.25 67.85)" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 130.4 67.85)" />
                      <use xlinkHref="#pianod" transform="matrix(0 -.72588 .72588 0 150.3 67.85)" />
                    </svg>
                    <span className="label-text">Đàn piano</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("tree1",70,70,"transparent","Cây")} className="icon-item">
                 <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 79 119">
                    <defs>
                      <path id="tree1" fill="none" stroke="#333"strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                        d="M14.25 111.9H40V82.65q-.15-.1-.25-.2-5.2 4.05-12 4.05-8.2 0-14-5.8Q8 74.95 8 66.8q0-8.2 5.75-14 2.1-2.05 4.5-3.35-1.75-2.9-1.75-6.5 0-5.3 3.7-9.05 2.7-2.7 6.25-3.4-1.85-3.3-1.85-7.35 0-6.25 4.45-10.75Q33.5 8 39.75 8q6.3 0 10.7 4.4 4.5 4.5 4.5 10.75 0 3.2-1.15 5.9-.25.6-.6 1.25 3.25.75 5.8 3.3 3.8 3.75 3.8 9.05 0 2.7-1 4.95-.35.85-.85 1.7 2.65 1.35 4.95 3.65 5.85 5.8 5.85 14 0 4.15-1.5 7.65-1.45 3.4-4.35 6.25-.8.8-1.65 1.5Q59 86.65 52 86.65q-6.85 0-12-4v-.45q-.15.1-.25.25M25 50.65l15 19.5V37.4m0 44.8V70.15m0 7.25l10.25-13M40 111.9h25.75"
                      />
                    </defs>
                    <use xlinkHref="#tree1" />
                  </svg>
                  <span className="label-text">Cây</span>
                </div>
              </div>
             <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("tree2",70,70,"transparent","Cây")} className="icon-item">
                 <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 115 134">
                    <defs>
                      <path id="tree2" fill="none"stroke="#333" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"
                        d="M38.5 125.2h21.6V96.45l-11.65-11.6q-.95.75-2.1 1.4-3.3 1.8-5.75-.05-2.5 4.2-7.1 2.25-2.7 2.35-6.85 1.55-4.2-.8-5.4-4.8-2.95 2.2-6.75 0-4.85-3.05-4.7-7 .1-3.25 1.8-5.35-3.2-.8-3.6-5.25 0-3.55 1.6-6.65 2.1-2.75 5.15-2.1-1.7-2.2 0-4.9 1.55-3.05 5.3-3.4 2.25-.3 4.2 1.05 2.45-3.35 5.25-3.1.55-.65 1.35-1.15-4.7-2.95-5.2-8.6-.5-6.25 1.9-9.35 2.3-3.2 6.55-3.8-.9-5.7 1.75-8.4t5.4-4.05q2.75-1.4 8.5.7 2-3.8 5.9-5.2 3.9-1.45 8.7.3 3.35 1.4 5 4.75 5.35-1 8.95.2 3.55 1.15 5.65 4.2 2.05 3.05 1.9 6.75 3.55.75 6.35 5.3 2.1 3.45 1.55 9.55-1.35 5.25-5.2 8.15 1.8 1.45 2.95 3.75 3-2.25 6-1 1.35.5 2.4 1.55 1.1 1.1 1.95 2.8.65 1.9 0 4.15 3.2-.4 5.15 2.85 1.7 3.2.55 7.45-.95 3.35-3.3 3.55.8.65 1.35 1.5 2.95 4.6-.6 8.95-1.2 1.6-2.75 2.3-1.2.55-2.35.75-2.6.4-4.9-.9-1.35 2.75-5.15 4-4.4.8-8.4.2-3.95-.6-6.3-3.95-2.4.8-4.6.2L60.1 96.45l-.05-25.25q-.75.15-1.55.15-4.5.3-8.5-1.15 3.65 2 1.6 6.15 1.4 2.25-.25 5.2-1.1 1.9-2.9 3.3m11.6-13.65q1.7-.4 3.3-1.6-2.45-4-.7-6.95Q65 58.85 68 60.1q-1.1-4.3 1.75-7.25 2.45-2.5 4.85-2.4 2.35.05 3.9 1.75.6-3.9 3.75-4.85 4.2-1.1 6.3.5m-59.05.65q-2.35 2.5-1.65 7.7 1.3 6 7 9.65 4.65 2.65 10.25 0 .45 2.2 4.9 4.35M70.55 86q-1.4-.35-2.7-1.2-3.25-3.2-3.55-7.35-.35-4.2 2.3-4.85l-3.25-3m18.4 55.6H60.1"
                      />
                    </defs>
                    <use href="#tree2" />
                  </svg>
                  <span className="label-text">Cây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("tree3",70,70,"transparent","Cây")} className="icon-item">
                   
                   <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 78 120">
                    <defs>
                      <path id="tree3" fill="none"stroke="#333"strokeLinecap="round" strokeLinejoin="round"strokeWidth="1.21875"
                        d="M13.95 112.55h18V82.4q-2 .4-4.2.4-1.702 0-3.3-.25-6.104-.954-10.7-5.55Q8 71.25 8 63.1q0-8.2 5.75-14 1.6-1.6 3.4-2.7-.75-2.15-.75-4.55 0-5.75 4.05-9.8 1.838-1.804 4-2.8 1.014-.463 2.1-.75-1.65-3-1.65-6.65 0-5.75 4.05-9.8Q33.05 8 38.75 8q5.7 0 9.75 4.05t4.05 9.8q0 3.65-1.65 6.65 3.35.9 6 3.55 4.05 4.05 4.05 9.8 0 2.35-.7 4.45 2.05 1.25 3.85 3.05 5.85 5.8 5.85 14 0 8.15-5.85 13.9-5.75 5.8-13.9 5.8-6.45 0-11.45-3.6-3.1 2.15-6.8 2.95m-1.5-8q-1.5.4-3.2.4-1.468 0-2.8-.325-3.024-.715-5.35-3.075-3.35-3.35-3.35-8.15 0-3 1.35-5.45m27.85 24.9v29.85H62.7m-30.75 0h13"
                      />
                    </defs>
                    <use xlinkHref="#tree3"></use>
                  </svg>
                  <span className="label-text">Cây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("tree4",70,70,"transparent","Cây")} className="icon-item">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 86 117">
                    <defs>
                      <path id="tree4"  fill="none" stroke="#333" strokeLinecap="round" strokeLinejoin="round"strokeWidth="1.5"
                        d="M21.45 109.05h22.5v-27.5q-.7-.2-1.4-.45-3.7 1.1-7.85 1.1-11.1 0-18.9-7.8Q8 66.6 8 55.6q0-11.1 7.8-19 1.05-1.05 2.2-1.95.3-10.9 8-18.7Q34.05 8 45.45 8 56.8 8 64.8 15.95q8.15 8.1 8.15 19.5 0 2.25-.3 4.35 5.3 6.95 5.3 16.05 0 5.6-2 10.3-1.95 4.65-5.9 8.5-1.1 1.05-2.25 2.05-7.1 5.75-16.6 5.75-3.8 0-7.25-.9v-10L30.7 55.05m-2.1-28.5q1.3-2.8 3.65-5.15 5.35-5.3 12.95-5.3.65 0 1.25.05m-2.5 60.9l8.25-9.5m-8.25-24.5v28.5m0 37.5h22.5"
                      />
                    </defs>
                    <use xlinkHref="#tree4" />
                  </svg>
                  <span className="label-text">Cây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("tree5",70,70,"transparent","Cây")} className="icon-item">
                   
                   <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 111 126">
                    <path fill="none" stroke="#333"strokeLinecap="round"strokeLinejoin="round" strokeWidth="1.5"
                      d="M35.15 118.9H50.9V94.65q-8.1-.9-14.2-5.05-1.8-1.2-3.15-2.5-2.2.55-4.6.55-7.15 0-12.25-5.1-3.35-3.3-4.5-7.6-.55-2.15-.55-4.55 0-2.45.55-4.65.9-3.3 3.1-6.05-1.45-.95-2.75-2.25-3-3.05-4-6.9Q8 48.6 8 46.4t.55-4.15q1-3.9 4-6.95 2.8-2.8 6.3-3.85.6-.2 1.2-.3-.05-.6-.05-1.2 0-2.2.55-4.15 1-3.9 4-6.95 2.8-2.8 6.3-3.85 2.25-.7 4.85-.7 3.25 0 6.05 1.2.95-1.6 2.3-2.95 2.8-2.8 6.3-3.85Q52.6 8 55.2 8q4 0 7.3 1.75 2 1.1 3.7 2.8 1.45 1.45 2.45 3.05.8-.4 1.7-.65 2.25-.7 4.85-.7 4 0 7.3 1.75 2 1.1 3.7 2.8 4.65 4.6 4.65 11.1 0 .7-.05 1.4 2.2.4 4.2 1.45 2 1.1 3.7 2.8 4.65 4.6 4.65 11.1 0 3.3-1.2 6.05-1.15 2.7-3.45 5-.65.6-1.3 1.15-.55.45-1.1.85 3.95 4.7 3.95 11 0 3.6-1.3 6.7-1.3 2.95-3.85 5.45-.7.7-1.45 1.35-4.6 3.75-10.75 3.75-2.95 0-5.55-.85-1.4 1.3-3.2 2.5-1.1.75-2.25 1.4-5 2.8-11.25 3.6v24.3h14.5m-51.4-68.75q-.2-.95-.2-2 0-1.45.35-2.8.7-2.65 2.75-4.7 1.85-1.9 4.2-2.6 1.55-.5 3.3-.5 2.75 0 4.95 1.2.6.35 1.2.75-.05-.1-.1-.25-.35-1.3-.35-2.8 0-1.45.35-2.8.7-2.65 2.75-4.7 1.85-1.9 4.2-2.6 1.55-.5 3.3-.5 2.75 0 4.95 1.2.4.2.75.45m4.5 67.1q-2.5.3-5.15.3-2.35 0-4.6-.25m0 24.25h9.75"
                    />
                  </svg>
                  <span className="label-text">Cây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("tree6",70,70,"transparent","Cây")} className="icon-item">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 73 135">
                    <path fill="none"stroke="#333"  strokeLinecap="round" strokeLinejoin="round"strokeWidth="1.5"
                      d="M13.75 125.65h17v-31q-2.35-.05-4.65-.15-6.1.1-12.4-4.5-6.35-4.6-5.6-22.65.9-23 10.5-42.6 3.4-8 8.15-12.6 3.7-3.6 8.6-4.15 5.85-.25 11.3 5.35 5.4 5.6 11.2 20.05 5.8 14.4 7.25 35.85.15 17.75-8.25 22.25-4.1 2.4-8.25 3-3.45.15-6.85.2v30.95h16.9M30.6 83.75h-.7q-5.1 0-8.7-3.6-2.35-2.4-3.15-5.4-.45-1.55-.45-3.25t-.05-3.5m24.2 26.7q-5.55.1-11-.05m0 31h11"
                    />
                  </svg>
                  <span className="label-text">Cây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("may1",70,70,"transparent","Mây")} className="icon-item">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 105 91">
                    <path fill="none" stroke="#333"strokeLinecap="round"strokeLinejoin="round" strokeWidth="1.5"
                      d="M97.15 53.95q0 6.25-4.4 10.65-4.4 4.35-10.6 4.35H81.45q-.65 3.4-3.25 6-3.4 3.45-8.25 3.45-3.35 0-6.05-1.65-.65.9-1.45 1.7-2.055 2.055-4.5 3.15-2.796 1.25-6.1 1.25-3.331 0-6.125-1.25-2.47-1.095-4.525-3.15-1.9-1.9-2.95-4.15-.2-.4-.35-.8-1.45.35-3 .35-4.9 0-8.3-3.4-1.25-1.25-2.05-2.65-.1-.2-.2-.35-.85-1.8-1.1-3.85H23q-6.2 0-10.55-4.25l-.1-.1q-3.25-3.3-4.1-7.6Q8 50.2 8 48.6q0-1.6.25-3.05.6-3.1 2.5-5.65-.6-1.75-.6-3.75 0-4.85 3.4-8.3 3.45-3.4 8.3-3.4 2.35 0 4.35.8.6-5.05 4.3-8.75 4.4-4.4 10.6-4.4 4.05 0 7.3 1.85.75-1.35 1.95-2.5Q53.75 8 58.65 8q4.8 0 8.25 3.45 1.15 1.1 1.9 2.4.85-.05 1.7-.05 3.75 0 6.8 1.6 2.1 1.05 3.85 2.8.231.231.45.475 2.857 3.078 3.6 7.025 3.8.5 6.6 3.3 3.45 3.4 3.45 8.25 0 .55-.05 1.1-.25 3.05-2 5.5 3.95 4.25 3.95 10.1zm-15.6-15q-.2.25-.4.45-3.25 3.25-7.55 4.1-1.2.25-2.5.25-.1.15-.2.2-3.8 4.2-3.8 10 0 .7.1 1.35-2.5.55-4.5 2.15 2.8 2.55 3.35 5.45m-27.2-29.8q.8 2.95 3.1 5.25.95.95 2 1.7 1.2.7 2.45 1.15 1.75.6 3.8.6 4.85 0 8.3-3.45l.25-.25q-2.55-3.1-3.1-7.05v-.15q-.15-1-.15-2.1 0-2 .45-3.85M46.4 41.2q-2.45.9-5.3.9-2.65 0-4.95-.8Q38 44.55 38 48.6q0 1.15-.15 2.2 2.95.75 5.3 3.1.5.5.95 1 3.45-2.05 7.75-2.05 2.55 0 4.8.7 3.2 1.1 5.8 3.65.1.15.25.25m8.2-13.5q-.5-.1-1.05-.2-.6 0-1.25-.05-5-.6-8.7-4.3-.6-.6-1.15-1.3m12.35 5.65q-.3.05-.6.05t-.65-.05m-33.7-2.45q-1.65-.55-3.15-1.55-1.3-.85-2.5-2.05-1.55-1.55-2.55-3.3M43.7 54.9q2.2 3.1 1.9 6.3"
                    />
                  </svg>
                  <span className="label-text">Mây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("may2",70,70,"transparent","Mây")} className="icon-item">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 132 107">
                    <path fill="none" stroke="#333"strokeLinecap="round"strokeLinejoin="round" strokeWidth="1.5"
                      d="M19.45 70.45q-4.45-.4-7.75-3.7Q8 63 8 57.75q0-5.3 3.7-9.05 1.15-1.1 2.4-1.9-.1-.95-.1-2 0-2.65.6-5.1.05-.05.05-.15.7-2.55 2.05-4.85 1.25-2.05 3.05-3.9 3.5-3.5 7.9-4.85 1.95-.6 4.1-.8.9-1.2 2-2.35 3.5-3.5 7.9-4.85 2.85-.9 6.1-.9 4.55 0 8.4 1.8.55-4.1 3.55-7.15Q63.45 8 68.75 8q4.7 0 8.15 2.95.45.35.85.75 2.85 2.8 3.55 6.5 1.2-.15 2.45-.15 5.1 0 9.25 2.25 2.5 1.35 4.65 3.5l.5.5q.25-.3.55-.6 3.75-3.7 9.05-3.7.688 0 1.35.075 3.855.357 6.8 2.875.45.35.85.75 3.8 3.75 3.8 9.05 0 2.7-1 4.95-.9 2.2-2.8 4.05l-.2.2q1.1.85 2.1 1.85 5.85 5.8 5.85 14 0 4.15-1.5 7.65-1.45 3.4-4.35 6.25-.8.8-1.65 1.5-3.55 2.907-7.9 3.85-2.083.45-4.35.45-2.35 0-4.5-.45-.35 2.3-1.25 4.4-1.45 3.4-4.35 6.25-.8.8-1.65 1.5-5.25 4.3-12.25 4.3-5.5 0-9.85-2.6-.2.4-.35.8-.9 2.2-2.8 4.05-.4.4-.85.8-.1.05-.2.15-3.4 2.8-7.95 2.8-5.3 0-9.05-3.75-1.45-1.5-2.35-3.15-3.9 1.9-8.6 1.9-8.2 0-14-5.8-1.8-1.8-3.05-3.85-.3-.5-.55-1Q20.2 82 19.65 80 19 77.55 19 74.8q0-2.25.45-4.35 2.15-4.8 5.3-7.8M81.3 18.2q.25 1.2.25 2.55 0 1.6-.35 3.05m-2.3 19.45q1.6-.85 3.35-.85.4-.05.8-.05 2.9.25 4.8 2.55.2.25.35.5m9.95-21.1q3.95 4.15 5 9.5.35 1.9.35 4v.3m10.9 18.25q.55 4.85-2.1 7.3-1.58 1.517-3.2 2.425-.943.544-1.9.875m-6.95 10.1q-5.35-1.2-9.5-5.35-1.4-1.4-2.4-2.9-.35-.45-.65-.95m-31.55-49q.4.2.85.45 2.5 1.35 4.65 3.5 1.45 1.45 2.55 3 .3.5.65 1m-33.1-1.65q1-.1 2-.1 5.1 0 9.25 2.25 1.9 1 3.6 2.5m12.5 8.45q1.35-1.8 3.45-2.5 2.7-1 5.35.3.3.15.55.35M30.1 47.25q1.35-1.8 3.45-2.5 2.7-1 5.35.3.3.15.55.35M36.2 87.05q-4.85-.4-6.75-3.45-1.9-2.9-2.3-5.6m36.8-10.55q1.65-1.5 3.8-1.85 2.85-.5 5.2 1.25.3.2.5.45m-28.3-8.15q1.9-1.25 4.1-1.15 2.9 0 4.9 2.2.25.2.35.5m16.4 30.2q-2.2-1.25-4.15-3.2-1.8-1.8-3.05-3.85-.3-.5-.55-1"
                    />
                  </svg>
                  <span className="label-text">Mây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("may3",70,70,"transparent","Mây")} className="icon-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 105 90">
                    <path fill="none"stroke="#333" strokeLinecap="round" strokeLinejoin="round"strokeWidth="1.5"
                      d="M8 36.9q0-5.05 2.9-8.9.65-.9 1.5-1.75Q16.8 21.9 23 21.9h.7q.65-3.4 3.25-6 3.4-3.45 8.25-3.45 3.35 0 6.05 1.65.65-.9 1.45-1.7Q47.1 8 53.3 8q6.25 0 10.65 4.4 1.9 1.9 2.95 4.15.2.4.35.8 1.45-.35 3-.35 4.9 0 8.3 3.4 1.25 1.25 2.05 2.65 1.05 1.9 1.3 4.2h.25q6.25 0 10.65 4.35 3.25 3.3 4.1 7.6.25 1.45.25 3.05 0 1.6-.25 3.05-.6 3.1-2.5 5.65.6 1.75.6 3.75 0 4.85-3.4 8.3-3.45 3.4-8.3 3.4-2.35 0-4.35-.8-.6 5.05-4.3 8.75-4.4 4.4-10.6 4.4-4.05 0-7.3-1.85-.75 1.35-1.95 2.5-3.4 3.45-8.3 3.45-4.8 0-8.25-3.45-1.15-1.1-1.9-2.4-.85.05-1.7.05-6.25 0-10.65-4.4-3.25-3.25-4.05-7.5-3.8-.5-6.6-3.3-3.45-3.4-3.45-8.25 0-3.7 2.05-6.6Q8 42.75 8 36.9zm70.45 2.75q-.5-.65-1.1-1.25-3.15-3.1-7.55-3.1h-.5q-.45-2.45-2.35-4.3-2.4-2.45-5.85-2.45-2.4 0-4.35 1.15-.45-.65-1-1.2-3.15-3.15-7.6-3.15-4.45 0-7.6 3.15-1.35 1.35-2.1 2.95-.15.3-.25.6-1-.25-2.15-.25-3.45 0-5.9 2.4-.9.9-1.45 1.9-.75 1.35-.95 3m19.2 7.95q4.25-2.4 7.5-1 3.25 1.35 5.05 3.4.1-.05.2-.05 2.1-.8 4.25-.2 2.8.65 4.3 3.2.15.25.25.6m-38.8.7q1.35-1.8 3.45-2.5 2.7-1 5.35.3.3.15.55.35"
                    />
                  </svg>
                  <span className="label-text">Mây</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("hd1",300,70,"transparent","Hướng đi")} className="icon-item">
                   <svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="5 -20 250 80">
                      {/* Gradient definition for red arrow */}
                      <defs>
                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                          <stop offset="100%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                        </linearGradient>
                        
                        {/* Shadow filter */}
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      
                      {/* Dashed line path leading to arrow */}
                      <path d="M 10 40 L 200 40" 
                            stroke="#DC2626" 
                            strokeWidth="3" 
                            strokeDasharray="8,5" 
                            fill="none"/>
                      
                      {/* Arrow head */}
                      <path d="M 200 40 
                              L 220 40 
                              L 220 25 
                              L 250 40 
                              L 220 55 
                              L 220 40" 
                            fill="url(#redGradient)" 
                            stroke="#B91C1C" 
                            strokeWidth="2" 
                            filter="url(#shadow)"/>
                      
                      {/* Arrow highlight */}
                      <path d="M 202 38 
                              L 218 38 
                              L 218 30 
                              L 242 40 
                              L 218 50 
                              L 218 42" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.5)" 
                            strokeWidth="1"/>
                      
                      {/* Small dot at the start */}
                      <circle cx="10" cy="40" r="4" fill="#DC2626" filter="url(#shadow)"/>
                      <circle cx="10" cy="40" r="2" fill="rgba(255,255,255,0.8)"/>
                      
                      {/* Direction indicator text */}
                      <text x="130" y="25" fontFamily="Arial, sans-serif" fontSize="12" fill="#DC2626" textAnchor="middle" fontWeight="bold">
                        Hướng đi
                      </text>

                    
                    </svg>
                  <span className="label-text">Hướng đi</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("hd2",300,70,"transparent","Hướng đi")} className="icon-item">
                     <svg height="70px" xmlns="http://www.w3.org/2000/svg" viewBox="10 -80 300 180">
                      {/* Gradient definition for red arrow */}
                      <defs>
                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{ stopColor: "#DC2626", stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
                        </linearGradient>

                        {/* Shadow filter */}
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3" />
                        </filter>
                      </defs>

                      {/* Dashed line path leading to arrow - REVERSED */}
                      <path
                        d="M 290 40 L 80 40"
                        stroke="#DC2626"
                        strokeWidth="3"
                        strokeDasharray="8,5"
                        fill="none"
                      />

                      {/* Arrow head - REVERSED */}
                      <path
                        d="M 80 40
                          L 60 40
                          L 60 25
                          L 30 40
                          L 60 55
                          L 60 40"
                        fill="url(#redGradient)"
                        stroke="#B91C1C"
                        strokeWidth="2"
                        filter="url(#shadow)"
                      />

                      {/* Arrow highlight - REVERSED */}
                      <path
                        d="M 78 38
                          L 62 38
                          L 62 30
                          L 38 40
                          L 62 50
                          L 62 42"
                        fill="none"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="1"
                      />

                      {/* Small dot at the start - MOVED TO RIGHT */}
                      <circle cx="290" cy="40" r="4" fill="#DC2626" filter="url(#shadow)" />
                      <circle cx="290" cy="40" r="2" fill="rgba(255,255,255,0.8)" />

                      {/* Direction indicator text */}
                      <text
                        x="170"
                        y="25"
                        fontFamily="Arial, sans-serif"
                        fontSize="12"
                        fill="#DC2626"
                        textAnchor="middle"
                        fontWeight="bold"
                      >
                        Hướng đi
                      </text>

                     
                    </svg>
                  <span className="label-text">Hướng đi</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("hd3",300,70,"transparent","Hướng đi")} className="icon-item">
                   <svg style={{transform: "rotate(4.7124rad)"}} xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="-15 20 290 50">
                      {/* Gradient definition for red arrow */}
                      <defs>
                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                          <stop offset="100%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                        </linearGradient>
                        
                        {/* Shadow filter */}
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      
                      {/* Dashed line path leading to arrow */}
                      <path d="M 10 40 L 200 40" 
                            stroke="#DC2626" 
                            strokeWidth="3" 
                            strokeDasharray="8,5" 
                            fill="none"/>
                      
                      {/* Arrow head */}
                      <path d="M 200 40 
                              L 220 40 
                              L 220 25 
                              L 250 40 
                              L 220 55 
                              L 220 40" 
                            fill="url(#redGradient)" 
                            stroke="#B91C1C" 
                            strokeWidth="2" 
                            filter="url(#shadow)"/>
                      
                      {/* Arrow highlight */}
                      <path d="M 202 38 
                              L 218 38 
                              L 218 30 
                              L 242 40 
                              L 218 50 
                              L 218 42" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.5)" 
                            strokeWidth="1"/>
                      
                      {/* Small dot at the start */}
                      <circle cx="10" cy="40" r="4" fill="#DC2626" filter="url(#shadow)"/>
                      <circle cx="10" cy="40" r="2" fill="rgba(255,255,255,0.8)"/>
                      
                      {/* Direction indicator text */}
                      <text x="130" y="25" fontFamily="Arial, sans-serif" fontSize="19" fill="#DC2626" textAnchor="middle" fontWeight="bold">
                        Hướng đi
                      </text>

                    
                    </svg>
                  <span className="label-text">Hướng đi</span>
                </div>
              </div>
                <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("hd4",300,70,"transparent","Hướng đi")} className="icon-item">
                      <svg style={{transform: "rotate(1.5708rad)"}} xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="-15 20 290 50">
                      {/* Gradient definition for red arrow */}
                      <defs>
                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                          <stop offset="100%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                        </linearGradient>
                        
                        {/* Shadow filter */}
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.3"/>
                        </filter>
                      </defs>
                      
                      {/* Dashed line path leading to arrow */}
                      <path d="M 10 40 L 200 40" 
                            stroke="#DC2626" 
                            strokeWidth="3" 
                            strokeDasharray="8,5" 
                            fill="none"/>
                      
                      {/* Arrow head */}
                      <path d="M 200 40 
                              L 220 40 
                              L 220 25 
                              L 250 40 
                              L 220 55 
                              L 220 40" 
                            fill="url(#redGradient)" 
                            stroke="#B91C1C" 
                            strokeWidth="2" 
                            filter="url(#shadow)"/>
                      
                      {/* Arrow highlight */}
                      <path d="M 202 38 
                              L 218 38 
                              L 218 30 
                              L 242 40 
                              L 218 50 
                              L 218 42" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.5)" 
                            strokeWidth="1"/>
                      
                      {/* Small dot at the start */}
                      <circle cx="10" cy="40" r="4" fill="#DC2626" filter="url(#shadow)"/>
                      <circle cx="10" cy="40" r="2" fill="rgba(255,255,255,0.8)"/>
                      
                      {/* Direction indicator text */}
                      <text x="130" y="25" fontFamily="Arial, sans-serif" fontSize="19" fill="#DC2626" textAnchor="middle" fontWeight="bold">
                        Hướng đi
                      </text>

                    
                    </svg>
                 <span className="label-text">Hướng đi</span>
                </div>
              </div>
               <div className="flex flex-col items-center">
                <div onClick={() => onAddItem("sanh1",300,800,"transparent","Lối đi")} className="icon-item">
                   <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <rect x="300" y="100" width="200" height="500" fill="#d0d0d0" stroke="#999" stroke-width="2"/>
                    
                  </svg>
                  <span className="label-text">Lối đi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ModalElement;
