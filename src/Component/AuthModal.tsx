import React from "react";
import { X } from "lucide-react";
import SignInForm from "./Signin";
// import { useNavigate } from "react-router-dom";

export interface AuthModalProps {
  type: "signin" | null;
  onClose: () => void;
  setModalType: React.Dispatch<React.SetStateAction<"signin" | null>>;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 cursor-pointer"
        >
          <X />
        </button>

        <SignInForm closeModal={onClose} />
      </div>
    </div>
  );
};

export default AuthModal;
