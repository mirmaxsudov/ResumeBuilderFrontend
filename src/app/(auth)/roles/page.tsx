"use client";
import React from "react";

const roles = [
  { title: "ADMIN", buttonLabel: "As Admin" },
  { title: "User", buttonLabel: "As User" },
  { title: "HR", buttonLabel: "As Hr" },
];

export default function RoleSelection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-8">
      <div className="w-full max-w-4xl mb-12 text-left">
        <h1 className="text-4xl font-extrabold text-gray-800">Mr Abdurahmon</h1>
        <p className="text-gray-600 mt-2 text-lg">You have {roles.length} roles.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {roles.map((role) => (
          <div
            key={role.title}
            className="w-64 h-64 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl p-6"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{role.title}</h2>
            <button className="px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow hover:from-indigo-500 hover:to-blue-500 transition">
              {role.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// type Role = {
//   title: string;
//   buttonLabel: string;
// };

// export default function RoleSelection() {
//   const [roles, setRoles] = useState<Role[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRoles = async () => {
//       try {
//         // Agar sizda Spring Boot backend bo‘lsa, shu URL-ni foydalaning:
//         // const res = await fetch("http://localhost:8080/api/user/roles");

//         // Hozircha mock data ishlatyapmiz
//         const mockRoles = ["ADMIN", "USER", "HR"];

//         const formatted = mockRoles.map((role: string) => ({
//           title: role.toUpperCase(),
//           buttonLabel: `As ${role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}`,
//         }));

//         setRoles(formatted);
//       } catch (error) {
//         console.error("Failed to fetch roles:", error);
//       }
//     };

//     fetchRoles();
//   }, []);

//   const handleSelectRole = (role: string) => {
//     router.push(`/auth/login?role=${role.toLowerCase()}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-8">
//       <div className="w-full max-w-4xl mb-12 text-left">
//         <h1 className="text-4xl font-extrabold text-gray-800">Mr Abdurahmon</h1>
//         <p className="text-gray-600 mt-2 text-lg">
//           You have {roles.length} role{roles.length !== 1 ? "s" : ""}.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//         {roles.map((role) => (
//           <div
//             key={role.title}
//             className="w-64 h-64 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-2xl p-6"
//           >
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">{role.title}</h2>
//             <button
//               onClick={() => handleSelectRole(role.title)}
//               className="px-5 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow hover:from-indigo-500 hover:to-blue-500 transition"
//             >
//               {role.buttonLabel}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


