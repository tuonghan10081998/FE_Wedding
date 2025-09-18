// WeddingCard.tsx
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LayoutModalDelete from "~/Invitationpage/ModalDelete";
interface WeddingCardCreateProps {
  title: string;
  images?: { src: string; alt: string }[];
  onCreateCard: () => void;
  onPreview:() => void;
  onDelete:() => void;
}

const WeddingCardCreate: React.FC<WeddingCardCreateProps> = ({ 
    images,
    title,
    onCreateCard,
    onPreview,
    onDelete

}) => {
  const [isOpenDelete,setOpenDelete] = useState<boolean>(false)
  return (
    <div className="w-full max-w-sm rounded-2xl shadow-lg bg-white p-4 relative">
      <div className="absolute right-2 top-1 text-red-500 ">
         <button 
               onClick={() => setOpenDelete(true)}
               className="hover:text-red-600 focus:outline-none transition-colors p-2 rounded cursor-pointer"
                title="Xóa thiệp" >
               <i className="fas fa-trash-alt"></i>
           </button>
      </div>
      <div className="flex justify-center mb-2">
        {images && (
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="w-full h-50 object-contain rounded-lg cursor-pointer"
          />
        )}
      </div>

      <h3 className="text-center font-semibold text-base text-gray-800 mb-4">{title}</h3>
    

      <div className="flex gap-3 justify-center">
        <button
          onClick={onPreview}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Xem lại
        </button>
        <button
          onClick={onCreateCard} // gọi callback lên cha
          className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
        >
          Cập nhật
        </button>
      </div>
      {isOpenDelete && (
        <LayoutModalDelete
          isOpen={isOpenDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => {
            onDelete();          // gọi hàm xoá thật sự
            setOpenDelete(false) // đóng modal sau khi xoá
          }}
          invitationname={title}
        />
      )}
    </div>
  );
};

export default WeddingCardCreate;
