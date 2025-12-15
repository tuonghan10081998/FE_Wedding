import React, { useEffect, useState } from "react";
import DateRangeWithPresets from "~/Invitationpage/DateRangeWithPresets";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { Project } from "~/layoutEven/layoutEven";
import { ToastContainer, toast } from "react-toastify";
import type DatePicker from "react-datepicker";

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
  checkNhaHang: boolean;
  setCheckNhaHang: (v: boolean) => void;
  partyAddress: string;
  setpartyAddress: (v: string) => void;
  data: Project[];
  setProjectID: (v: string) => void;
  projectID: string;
  mapLink: string;
  setMapLink: (v: string) => void;
  onSummit: (e: React.FormEvent) => void;
}

const WeddingFormModal: React.FC<WeddingFormModalProps> = (props) => {
  const [DatePickerComponent, setDatePickerComponent] = useState<typeof DatePicker | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-datepicker').then((mod) => {
        setDatePickerComponent(() => mod.default);
      });
      import('react-datepicker/dist/react-datepicker.css');
    }
  }, []);

  // Hàm chuyển đổi dương lịch sang âm lịch
  const convertSolarToLunar = (day: number, month: number, year: number): string => {
    // Hàm tính Julian Day Number
    const jdFromDate = (dd: number, mm: number, yy: number): number => {
      const a = Math.floor((14 - mm) / 12);
      const y = yy + 4800 - a;
      const m = mm + 12 * a - 3;
      let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
      if (jd < 2299161) {
        jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
      }
      return jd;
    };

    // Hàm tính New Moon
    const getNewMoonDay = (k: number, timeZone: number): number => {
      const T = k / 1236.85;
      const T2 = T * T;
      const T3 = T2 * T;
      const dr = Math.PI / 180;
      let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
      Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
      const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
      const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
      const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
      let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
      C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
      C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
      C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
      C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
      C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
      C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
      let deltat;
      if (T < -11) {
        deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
      } else {
        deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
      }
      const JdNew = Jd1 + C1 - deltat;
      return Math.floor(JdNew + 0.5 + timeZone / 24);
    };

    // Hàm tính tháng 11 âm lịch
    const getLunarMonth11 = (yy: number, timeZone: number): number => {
      const off = jdFromDate(31, 12, yy) - 2415021;
      const k = Math.floor(off / 29.530588853);
      let nm = getNewMoonDay(k, timeZone);
      const sunLong = getSunLongitude(nm, timeZone);
      if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
      }
      return nm;
    };

    // Hàm tính vị trí mặt trời
    const getSunLongitude = (jdn: number, timeZone: number): number => {
      const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
      const T2 = T * T;
      const dr = Math.PI / 180;
      const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
      const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
      let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
      DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
      let L = L0 + DL;
      L = L * dr;
      L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
      return Math.floor((L / Math.PI) * 6);
    };

    // Hàm kiểm tra năm nhuận âm lịch
    const getLeapMonthOffset = (a11: number, timeZone: number): number => {
      const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
      let last = 0;
      let i = 1;
      let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
      do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
      } while (arc !== last && i < 14);
      return i - 1;
    };

    // Hàm chính chuyển đổi
    const timeZone = 7; // GMT+7 cho Việt Nam
    const dayNumber = jdFromDate(day, month, year);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1, timeZone);
    
    if (monthStart > dayNumber) {
      monthStart = getNewMoonDay(k, timeZone);
    }
    
    let a11 = getLunarMonth11(year, timeZone);
    let b11 = a11;
    let lunarYear;
    
    if (a11 >= monthStart) {
      lunarYear = year;
      a11 = getLunarMonth11(year - 1, timeZone);
    } else {
      lunarYear = year + 1;
      b11 = getLunarMonth11(year + 1, timeZone);
    }
    
    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    
    if (b11 - a11 > 365) {
      const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }

    // Mảng Can và Chi
    const CAN = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
    const CHI = ["Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"];
    
    const lunarYearCan = CAN[lunarYear % 10];
    const lunarYearChi = CHI[lunarYear % 12];

    return `Nhằm ngày ${lunarDay} tháng ${lunarMonth} năm ${lunarYearCan} ${lunarYearChi}`;
  };

  // Hàm helper format ngày và lấy thứ
  const formatVietnameseDate = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Ngày ${day} Tháng ${month} Năm ${year}`;
  };

  const getDayOfWeek = (date: Date | null): string => {
    if (!date) return "";
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    return days[date.getDay()];
  };

  // State cho dates
  const [weddingDate, setWeddingDate] = useState<Date | null>(null);
  const [partyDate, setPartyDate] = useState<Date | null>(null);

  // Handlers với chuyển đổi âm lịch
  const handleWeddingDateChange = (date: Date | null) => {
    setWeddingDate(date);
    if (date) {
      props.setWeddingDateTime(formatVietnameseDate(date));
      props.setWeddingRank(getDayOfWeek(date));
      
      // Chuyển đổi sang âm lịch
      const lunarDate = convertSolarToLunar(
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
      );
      props.setWeddingDateTimeAm(lunarDate);
    } else {
      props.setWeddingDateTime("");
      props.setWeddingRank("");
      props.setWeddingDateTimeAm("");
    }
  };

  const handlePartyDateChange = (date: Date | null) => {
    setPartyDate(date);
    if (date) {
      props.setPartyDateTime(formatVietnameseDate(date));
      props.setPartyRank(getDayOfWeek(date));
      
      // Chuyển đổi sang âm lịch
      const lunarDate = convertSolarToLunar(
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
      );
      props.setPartyDateTimeAm(lunarDate);
    } else {
      props.setPartyDateTime("");
      props.setPartyRank("");
      props.setPartyDateTimeAm("");
    }
  };

  // Component DatePicker với kiểm tra client-side
  const renderDatePicker = (
    selectedDate: Date | null,
    onChange: (date: Date | null) => void,
    placeholder: string,
    required: boolean = true
  ) => {
    if (!DatePickerComponent || typeof window === 'undefined') {
      return (
        <div className="mb-2">
          <div className="block text-gray-700 font-medium mb-1">
            {placeholder} {required && <span className="text-red-500">(*)</span>}
          </div>
          <input
            type="text"
            value={selectedDate ? formatVietnameseDate(selectedDate) : ""}
            placeholder="Đang tải..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none bg-gray-100"
            disabled
          />
        </div>
      );
    }

    return (
      <div className="mb-2">
        <div className="block text-gray-700 font-medium mb-1">
          {placeholder} {required && <span className="text-red-500">(*)</span>}
        </div>
        <DatePickerComponent
          selected={selectedDate}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Chọn ngày"
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          wrapperClassName="w-full"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          required={required}
        />
      </div>
    );
  };

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

  const renderInput = (
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    type: "input" | "textarea" = "input",
    rows: number = 1,
    required: boolean = true,
    nhahang: boolean = false,
    checkReadonly = false,
  ) => {
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
            readOnly={checkReadonly}
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

        <form
          id="wedding-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-4 flex-1 space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-6 ">
            <div className="md:w-1/2 hidden">
              <div className="mb-1">Chọn ngày</div>
              <DateRangeWithPresets
                onDateChange={(range) => {
                  if (range === "all") {
                    console.log("Chọn tất cả ngày");
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
                onChange={(option: SingleValue<OptionType>) => {
                  setSelectedOption(option);
                  props.setProjectID(option?.value ?? "");
                }}
                className="mb-0"
                classNamePrefix="react-select"
                isSearchable={true}
                placeholder=""
              />
            </div>
          </div>

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

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black-600 ">Thông Tin Tổ Chức Hôn Lễ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="md:pe-3">
                {renderInput(props.weddingTime, props.setWeddingTime, "Giờ tổ chức hôn lễ")}
              </div>
              <div className="md:ps-3">
                {renderDatePicker(weddingDate, handleWeddingDateChange, "Ngày tổ chức hôn lễ", true)}
              </div>
              <div className="md:pe-3">
                {renderInput(props.weddingRank, props.setWeddingRank, "Thứ", "input", 1, false, false, true)}
              </div>
              <div className="md:ps-3">
                {renderInput(props.weddingDateTime, props.setWeddingDateTime, "Ngày (định dạng)", "input", 1, false, false, true)}
              </div>
              <div className="md:pe-3">
                {renderInput(props.weddingDateTimeAm, props.setWeddingDateTimeAm, "Nhằm ngày (Âm lịch)", "input", 1, false, false, false)}
              </div>
              <div className="md:ps-3">
                {renderInput(props.tuGia, props.setTuGia, "Tư gia", "input", 1)}
              </div>
              <div className="md:pe-3">
                {renderInput(props.weddingVenue, props.setWeddingVenue, "Địa điểm hôn lễ", "textarea", 1)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-black-600">Thông Tin Dự Tiệc</h3>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="md:pe-3">
                {renderInput(props.partyTime, props.setPartyTime, "Giờ dự tiệc", "input", 1)}
              </div>
              <div className="md:ps-3">
                {renderDatePicker(partyDate, handlePartyDateChange, "Ngày tổ chức dự tiệc", true)}
              </div>
              <div className="md:pe-3">
                {renderInput(props.partyRank, props.setPartyRank, "Thứ", "input", 1, false, false, true)}
              </div>
              <div className="md:ps-3">
                {renderInput(props.partyDateTime, props.setPartyDateTime, "Ngày (định dạng)", "input", 1, false, false, true)}
              </div>
              <div className="md:pe-3">
                {renderInput(props.partyDateTimeAm, props.setPartyDateTimeAm, "Nhằm ngày (Âm lịch)", "input", 1, false, false, false)}
              </div>
              <div className="md:ps-3">
                {renderInput(props.partyVenue, props.setPartyVenue, props.checkNhaHang ? "Tên nhà hàng" : "Tại tư gia", "input", 1, true, true)}
              </div>
              <div className="md:pe-3">
                {renderInput(props.partyAddress, props.setpartyAddress, "Địa điểm dự tiệc", "textarea", 1)}
              </div>
              <div className="md:ps-3">
                {renderInput(props.mapLink, props.setMapLink, "Link gg map", "textarea", 1, false)}
              </div>
            </div>
          </div>
        </form>

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