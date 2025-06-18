// // components/AdminDashboard/EditUserModal.tsx
// import { useState, useEffect } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";

// interface EditUserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   userId: string | null;
//   userName: string | null;
//   userRole: string | null;
//   onSave: () => void;
// }

// export default function EditUserModal({
//   isOpen,
//   onClose,
//   userId,
//   userName,
//   userRole,
//   onSave,
// }: EditUserModalProps) {
//   const [name, setName] = useState(userName || "");
//   const [role, setRole] = useState(userRole || "");

//   useEffect(() => {
//     if (userName) setName(userName);
//     if (userRole) setRole(userRole);
//   }, [userName, userRole]);

//   const handleSave = async () => {
//     if (!userId) return;

//     try {
//       const userRef = doc(db, "users", userId);
//       await updateDoc(userRef, { name, role });
//       onSave(); // Notify parent to refresh the list
//       onClose(); // Close modal after saving
//     } catch (err) {
//       console.error("Failed to update user:", err);
//       alert("Error updating user. Check console for details.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80">
//         <h3 className="text-xl mb-4">Edit User</h3>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm mb-2">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-sm mb-2">
//               Role
//             </label>
//             <input
//               id="role"
//               type="text"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded mr-2"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSave}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
