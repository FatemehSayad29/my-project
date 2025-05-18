"use client";
import { FaUser } from "react-icons/fa";
import ColumnsCard from "../../components/ColumnsCard";
import SearchInput from "../../components/SearchInput";
import { useGetUsersQuery } from "./usersApi";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import ToastMessage from "@/app/components/ToastMessage";
import useSearchFilter from "@/app/hooks/useSearchFilter";

export default function UsersColumns() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  const {
    searchTerm,
    setSearchTerm,
    filteredItems: filteredUsers,
  } = useSearchFilter(
    users,
    (user) => `${user.name.firstname} ${user.name.lastname}`
  );

  if (isLoading) return <Loader />;
  if (error) return <ToastMessage message="Error in user fetching" />;

  return (
    <ColumnsCard header="Users">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers?.map((user) => (
          <li key={user.id} className="cursor-pointer py-4 rounded w-full">
            <Link href={`/features/users/userdetails/${user.id}`}>
              <span className="bg-slate-100 flex items-center p-2 rounded hover:bg-gray-200">
                <FaUser color="gray" className="me-2" />
                {user.name.firstname} {user.name.lastname}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ColumnsCard>
  );
}
