// WeddingFormModalEvent.tsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import type { Project } from "~/layoutEven/layoutEven";
import type DatePicker from "react-datepicker";

interface OptionType {
  value: string;
  label: string;
}

interface EventFormModalProps {
  onClose: () => void;
  eventName: string;
  setEventName: (v: string) => void;
  eventDate: string;
  setEventDate: (v: string) => void;
  eventTime: string;
  setEventTime: (v: string) => void;
  eventLocation: string;
  setEventLocation: (v: string) => void;
  guestName: string;
  setGuestName: (v: string) => void;
  organizerName: string;
  setOrganizerName: (v: string) => void;
  data: Project[];
  setProjectID: (v: string) => void;
  projectID: string;
  mapLink: string;
  setMapLink: (v: string) => void;
  onSummit: (e: React.FormEvent) => void;
}

const WeddingFormModalEvent: React.FC<EventFormModalProps> = (props) => {
  const [DatePickerComponent, setDatePickerComponent] = useState<typeof DatePicker | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-datepicker').then((mod) => {
        setDatePickerComponent(() => mod.default);
      });
      import('react-datepicker/dist/react-datepicker.css');
    }
  }, []);

  // Format ngày giờ
  const formatVietnameseDate = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Thứ ${getDayOfWeekNumber(date)}, ${day}/${month}/${year}`;
  };

  const getDayOfWeekNumber = (date: Date | null): string => {
    if (!date) return "";
    const days = ["Chủ Nhật", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];
    return days[date.getDay()];
  };

  const [eventDate, setEventDate] = useState<Date | null>(null);

  const handleEventDateChange = (date: Date | null) => {
    setEventDate(date);
    if (date) {
      props.setEventDate(formatVietnameseDate(date));
    } else {
      props.setEventDate("");
    }
  };

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
          className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>();

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
    required: boolean = true
  ) => {
    const validationMessage = `Vui lòng nhập ${placeholder.toLowerCase()}`;

    return (
      <div className="mb-2">
        <div className="block text-gray-700 font-medium mb-1">
          {placeholder} {required && <span className="text-red-500">(*)</span>}
        </div>
        {type === "input" ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder=""
            rows={rows}
            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4 flex-shrink-0 mb-0">
          <h2 className="text-2xl font-semibold text-blue-700">
            Nhập Thông Tin Thiệp Mời Sự Kiện
          </h2>
          <button
            onClick={props.onClose}
            className="text-gray-500 hover:text-blue-600 transition text-2xl"
          >
            ✕
          </button>
        </div>

        <form
          id="event-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-4 flex-1 space-y-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
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

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">Thông Tin Sự Kiện</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                {renderInput(props.eventName, props.setEventName, "Tên sự kiện")}
              </div>
              <div>
                {renderInput(props.eventTime, props.setEventTime, "Giờ tổ chức (VD: 18:00 - 21:00)")}
              </div>
              <div>
                {renderDatePicker(eventDate, handleEventDateChange, "Ngày tổ chức", true)}
              </div>
              <div className="md:col-span-2">
                {renderInput(props.eventLocation, props.setEventLocation, "Địa điểm tổ chức", "textarea", 2)}
              </div>
              <div className="md:col-span-2">
                {renderInput(props.mapLink, props.setMapLink, "Link Google Maps", "input", 1, false)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">Thông Tin Khách Mời</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {renderInput(props.guestName, props.setGuestName, "Tên khách mời", "input", 1, false)}
              </div>
              <div>
                {renderInput(props.organizerName, props.setOrganizerName, "Tên người/ban tổ chức", "input", 1, false)}
              </div>
            </div>
          </div>
        </form>

        <div className="flex justify-end gap-4 border-t border-gray-300 px-6 py-4 flex-shrink-0">
          <button
            type="button"
            onClick={props.onClose}
            className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            form="event-form"
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Xác nhận thông tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingFormModalEvent;