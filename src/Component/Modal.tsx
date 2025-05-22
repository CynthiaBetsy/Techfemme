interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
  }
  
  export default function Modal({ isOpen, onClose, onConfirm, message }: ModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80">
          <h3 className="text-xl mb-4">{message}</h3>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  