import React from 'react';
interface ItemProps {
  itemName: string;
  onDelete:(e:React.MouseEvent) => void;
}
const ItemForm: React.FC<ItemProps> = ({
    itemName,
    onDelete
}) => {
    return (
        <div className="space-y-4">
              <div className="bg-white shadow-md rounded-lg max-w-xs w-full p-6 space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Thông tin</h2>
                <div className="flex justify-between text-gray-700 text-lg font-medium">
                <span>Loại:</span>
                <span id="tableShape" className="text-gray-900">{itemName}</span>
                </div>
                  <button onClick={(e) => { onDelete(e); }}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
                    aria-label="Xóa thông tin"
                    >
                    <i className="fas fa-trash-alt"></i>
                    Xóa
                </button>
                </div>
               
        </div>
    )
        
}
export default ItemForm;