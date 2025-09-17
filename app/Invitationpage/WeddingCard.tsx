// WeddingCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface WeddingCardProps {
  title: string;
  subtitle: string;
  images?: { src: string; alt: string }[];
  views?: React.ReactNode[];
  checkForm?: number;
  onCreateCard: () => void; // callback lên cha
}

const WeddingCard: React.FC<WeddingCardProps> = ({ views, images, title, subtitle, checkForm, onCreateCard }) => {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate(`/layout/InvitationCard?thiep=${checkForm}&user=admin&xt=0&customer=`);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-4">
      <div className="flex justify-center mb-4">
        {images && (
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-50 object-contain rounded-lg cursor-pointer"
          />
        )}
      </div>

      <h3 className="text-center font-semibold text-base text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 text-center">{subtitle}</p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={handlePreview}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Xem trước
        </button>
        <button
          onClick={onCreateCard} // gọi callback lên cha
          className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
        >
          Tạo thiệp
        </button>
      </div>
    </div>
  );
};

export default WeddingCard;
