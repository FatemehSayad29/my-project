
import UserDetailsClient from "./UserDetailsPage";

interface Props {
  params: { id: string };
}

export default async function UserDetailsPage({ params }: Props) {
  return <UserDetailsClient id={params.id} />;
}
