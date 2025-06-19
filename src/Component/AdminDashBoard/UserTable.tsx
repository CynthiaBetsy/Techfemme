// // components/AdminDashboard/UserTable.tsx
// import { useEffect, useState } from "react";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase";
// import Modal from "../Modal";
// import EditUserModal from "./EditUserModal";  

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role?: string;
// }

// export default function UserTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<string | null>(null);
//   const [userToEdit, setUserToEdit] = useState<User | null>(null);

//   const fetchUsers = async () => {
//     const usersRef = collection(db, "users");
//     const snapshot = await getDocs(usersRef);
//     const usersList = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as User[];
//     setUsers(usersList);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleDelete = async () => {
//     if (userToDelete) {
//       try {
//         await deleteDoc(doc(db, "users", userToDelete));
//         setUsers((prev) => prev.filter((user) => user.id !== userToDelete));
//         setIsDeleteModalOpen(false);  // Close the modal after deletion
//       } catch (err) {
//         console.error("Failed to delete user:", err);
//         alert("Error deleting user. Check console for details.");
//       }
//     }
//   };

//   const openDeleteModal = (id: string) => {
//     setUserToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   const openEditModal = (user: User) => {
//     setUserToEdit(user);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setUserToEdit(null);
//   };

//   const handleSaveEdit = () => {
//     fetchUsers(); // Refresh the user list after saving the edit
//   };

//   if (loading) return <div>Loading users...</div>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-left border-collapse">
//         <thead className="bg-gray-100 dark:bg-gray-800">
//           <tr>
//             <th className="p-3 border">Name</th>
//             <th className="p-3 border">Email</th>
//             <th className="p-3 border">Role</th>
//             <th className="p-3 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//               <td className="p-3 border">{user.name || "N/A"}</td>
//               <td className="p-3 border">{user.email}</td>
//               <td className="p-3 border">{user.role || "user"}</td>
//               <td className="p-3 border">
//                 <button
//                   className="text-blue-600 hover:underline mr-3"
//                   onClick={() => openEditModal(user)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600 hover:underline"
//                   onClick={() => openDeleteModal(user.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for delete confirmation */}
//       <Modal
//         isOpen={isDeleteModalOpen}
//         onClose={closeDeleteModal}
//         onConfirm={handleDelete}
//         message="Are you sure you want to delete this user?"
//       />

//       {/* Edit User Modal */}
//       {userToEdit && (
//         <EditUserModal
//           isOpen={isEditModalOpen}
//           onClose={closeEditModal}
//           userId={userToEdit.id}
//           userName={userToEdit.name}
//           userRole={userToEdit.role}
//           onSave={handleSaveEdit}
//         />
//       )}
//     </div>
//   );
// }
