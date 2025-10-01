import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

interface DateRangeWithPresetsProps {
onDateChange?: (range: "all" | { from: string; to: string }) => void;
  checkALLNgay?: boolean;
}

const DateRangeWithPresets: React.FC<DateRangeWithPresetsProps> = ({
  onDateChange,
  checkALLNgay = true,
}) => {
  const [isAll, setIsAll] = useState(!checkALLNgay); // nếu false thì mặc định là tất cả
  const [value, setValue] = useState<[Dayjs, Dayjs] | null>(
    checkALLNgay
      ? [dayjs().startOf("month"), dayjs().endOf("month")]
      : null
  );
  const presets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "Hôm nay", value: [dayjs(), dayjs()] as [Dayjs, Dayjs] },
  {
    label: "Hôm qua",
    value: [dayjs().subtract(1, "day"), dayjs().subtract(1, "day")] as [Dayjs, Dayjs],
  },
  { label: "7 ngày qua", value: [dayjs().subtract(7, "day"), dayjs()] as [Dayjs, Dayjs] },
  {
    label: "Tháng này",
    value: [dayjs().startOf("month"), dayjs().endOf("month")] as [Dayjs, Dayjs],
  },
  {
    label: "Tháng trước",
    value: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ] as [Dayjs, Dayjs],
  },
  { label: "Tất cả", value: [dayjs("2000-01-01"), dayjs("2100-12-31")] as [Dayjs, Dayjs] },
];

  const handleChange = (dates: null | (Dayjs | null)[]) => {
    if (dates && dates[0] && dates[1]) {
      // Nếu chọn "Tất cả"
      if (
        dates[0].isSame(dayjs("2000-01-01"), "day") &&
        dates[1].isSame(dayjs("2100-12-31"), "day")
      ) {
        setIsAll(true);
        setValue(null); // ẩn ngày
        onDateChange?.("all");
      } else {
        setIsAll(false);
        setValue([dates[0], dates[1]] as [Dayjs, Dayjs]);
        onDateChange?.({
          from: dates[0].format("DD/MM/YYYY"),
          to: dates[1].format("DD/MM/YYYY"),
        });
      }
    }
  };

  return (
    <RangePicker
      className="h-[38px] w-full"
      presets={presets}
      format="DD/MM/YYYY"
      value={value}
      placeholder={isAll ? ["Tất cả", ""] : ["Từ ngày", "Đến ngày"]}
      defaultValue={
        checkALLNgay
          ? [dayjs().startOf("month"), dayjs().endOf("month")]
          : undefined
      }
      style={{ width: "100%" }}
      allowClear={false}
      onChange={handleChange}
    />
  );
};

export default DateRangeWithPresets;
