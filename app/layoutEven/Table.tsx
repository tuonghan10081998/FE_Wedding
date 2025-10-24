import React from 'react';

interface TableFormProps {
  tableName: string;
  tableShape: string;
  seatInputMaxSize: number;
  seatInput: string | number;
  fontSizeTable: number;
  fontSizeSeat: number;
  onChangeInput?: (val: any) => void;
  onDelete: (e: React.MouseEvent) => void;
  onChangeName: (val: string) => void;
  onChangeFontSizeTable: (val: number) => void;
  onChangeFontSizeSeat: (val: number) => void;
}

const TableForm: React.FC<TableFormProps> = ({
  tableName,
  tableShape,
  seatInputMaxSize,
  seatInput,
  fontSizeTable,
  fontSizeSeat,
  onChangeInput,
  onDelete,
  onChangeName,
  onChangeFontSizeTable,
  onChangeFontSizeSeat
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChangeInput?.("");
      return;
    }
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed <= seatInputMaxSize) {
      onChangeInput?.(parsed);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeName(e.target.value);
  };

  const handleFontSizeTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") return;
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed >= 8 && parsed <= 72) {
      onChangeFontSizeTable(parsed);
    }
  };

  const handleFontSizeSeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") return;
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed >= 8 && parsed <= 72) {
      onChangeFontSizeSeat(parsed);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white shadow-md rounded-lg max-w-sm w-full p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Thông tin bàn</h2>
        
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between items-center">
            <label className="font-medium">Tên bàn:</label>
            <input
              id="nameTableInput"
              type="text"
              value={tableName}
              onChange={handleNameChange}
              className="border border-gray-300 rounded-md w-40 text-center py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              aria-label="Tên"
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Loại bàn:</span>
            <span id="tableShape" className="text-gray-900">{tableShape}</span>
          </div>

          <div className="flex justify-between items-center">
            <label className="font-medium">Số ghế:</label>
            <input
              id="seatInput"
              type="number"
              min="0"
              value={seatInput}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-20 text-center py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              aria-label="Số ghế"
            />
          </div>

          <div className="border-t pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Cỡ chữ</h3>
            
            <div className="flex justify-between items-center">
              <label className="font-medium text-sm">Tên bàn:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="8"
                  max="72"
                  value={fontSizeTable}
                  onChange={handleFontSizeTableChange}
                  className="border border-gray-300 rounded-md w-16 text-center py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  aria-label="Cỡ chữ tên bàn"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="font-medium text-sm">Số ghế:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="8"
                  max="72"
                  value={fontSizeSeat}
                  onChange={handleFontSizeSeatChange}
                  className="border border-gray-300 rounded-md w-16 text-center py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  aria-label="Cỡ chữ số ghế"
                />
                <span className="text-xs text-gray-500">px</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => { onDelete(e); }}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
          aria-label="Xóa thông tin"
        >
          <i className="fas fa-trash-alt"></i>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default TableForm;