import React, { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';

// Định nghĩa types
interface RangeInfo {
  startColumn: string;
  endColumn: string;
  startRow: number;
  endRow: string | number;
  totalRows: number;
  totalColumns: number;
}

interface ImportResult {
  data: (string | number)[][]; // Mảng 2 chiều thuần
  range: RangeInfo;
}

interface ExcelImporterProps {
  onDataImported: (result: ImportResult) => void;
  startColumn?: string;     // Cột bắt đầu (A, B, C...)
  endColumn?: string | null; // Cột kết thúc (nếu null thì lấy hết)
  startRow?: number;        // Hàng bắt đầu (1, 2, 3...)
  endRow?: number | null;   // Hàng kết thúc (nếu null thì lấy hết)
  className?: string;       // Optional CSS class
}

const ExcelImporter = React.forwardRef<HTMLInputElement, ExcelImporterProps>(({ 
  onDataImported,
  startColumn = 'A',
  endColumn = null,
  startRow = 1,
  endRow = null,
  className
}, ref) => {
  // Chuyển đổi column letter thành số (A=1, B=2, ...)
  const columnToNumber = (column: string): number => {
    let result = 0;
    for (let i = 0; i < column.length; i++) {
      result = result * 26 + (column.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
    }
    return result;
  };

  const extractDataFromRange = (
    worksheet: XLSX.WorkSheet, 
    startCol: string, 
    endCol: string | null, 
    startR: number, 
    endR: number | null
  ): (string | number)[][] => {
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    
    // Xác định phạm vi thực tế
    const actualStartCol = Math.max(columnToNumber(startCol) - 1, range.s.c);
    const actualEndCol = endCol ? 
      Math.min(columnToNumber(endCol) - 1, range.e.c) : 
      range.e.c;
    const actualStartRow = Math.max(startR - 1, range.s.r);
    const actualEndRow = endR ? 
      Math.min(endR - 1, range.e.r) : 
      range.e.r;

    const result: (string | number)[][] = [];
    
    for (let row = actualStartRow; row <= actualEndRow; row++) {
      const rowData: (string | number)[] = [];
      for (let col = actualStartCol; col <= actualEndCol; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress];
        rowData.push(cell ? (cell.v as string | number) : '');
      }
      result.push(rowData);
    }

    return result;
  };

  const handleFileUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const workbook = XLSX.read(e.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Lấy dữ liệu theo range đã chỉ định
        const bodyData = extractDataFromRange(
          worksheet, 
          startColumn, 
          endColumn, 
          startRow, 
          endRow
        );

        // Trả về data ngay lập tức
        onDataImported({
          data: bodyData,
          range: {
            startColumn,
            endColumn: endColumn || 'AUTO',
            startRow,
            endRow: endRow || 'AUTO',
            totalRows: bodyData.length,
            totalColumns: bodyData[0]?.length || 0
          }
        });

        // Reset input để có thể import lại file cùng tên
        event.target.value = '';

      } catch (error) {
        console.error('Lỗi đọc file:', error);
        // Có thể thêm onError callback nếu cần
      }
    };

    reader.readAsBinaryString(file);
  }, [startColumn, endColumn, startRow, endRow, onDataImported]);

  return (
    <input
      ref={ref}
      type="file"
      accept=".xlsx,.xls,.csv"
      onChange={handleFileUpload}
      className={className}
    />
  );
});

export default ExcelImporter;