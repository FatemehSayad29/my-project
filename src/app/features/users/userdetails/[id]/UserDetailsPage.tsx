"use client";

import { useGetUserByIdQuery } from "../../usersApi";
import Loader from "@/app/components/Loader";
import ToastMessage from "@/app/components/ToastMessage";
import ColumnWrapper from "@/app/components/ColumnWrapper";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function UserDetailsClient({ id }: { id: string }) {
  const { data: user, error, isLoading } = useGetUserByIdQuery(id);
  const router = useRouter();

  if (isLoading) return <Loader />;
  if (error) return <ToastMessage message="Error loading user details" />;
  if (!user) return <ToastMessage message="User not found" />;

  return (
    <ColumnWrapper
      header={
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <BiArrowBack /> <span>Users info</span>
        </div>
      }
    >
      <h1>
        {user.name.firstname} {user.name.lastname}
      </h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Phone: {user.phone}</p>
      <p>Address:</p>
      <ul>
        <li>City: {user.address.city}</li>
        <li>Street: {user.address.street}</li>
        <li>Number: {user.address.number}</li>
        <li>Zipcode: {user.address.zipcode}</li>
        <li>
          Geolocation: lat {user.address.geolocation.lat}, long{" "}
          {user.address.geolocation.long}
        </li>
      </ul>
    </ColumnWrapper>
  );
}
