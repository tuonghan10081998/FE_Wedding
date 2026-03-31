// components/QRCodeModal.tsx
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrValue: string;
  title?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  qrValue,
  title = "QR Code CheckIn",
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode-checkin.png";
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4 min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
            <i className="fas fa-qrcode"></i>
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Đóng"
          >
            <i className="fas fa-times fa-lg"></i>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100" />

        {/* QR Code */}
        <div className="p-8 border-2 border-blue-100 rounded-xl bg-white">
          <QRCodeCanvas
            id="qr-canvas"
            value={qrValue}
            size={295}
            bgColor="#ffffff"
            fgColor="#1e3a5f"
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Value label */}
        <p className="text-xs text-gray-400 font-mono break-all text-center max-w-[240px]">
          {qrValue}
        </p>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
          >
            <i className="fas fa-download"></i>
            Tải xuống
          </button>
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
          >
            <i className="fas fa-times"></i>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;