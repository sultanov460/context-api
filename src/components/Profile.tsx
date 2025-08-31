import { useUser } from "../context/userContext";

export default function Profile() {
  const { user } = useUser();
  return (
    <div className="!mt-40 font-bold text-3xl">
      <h1>Name: {user?.name}</h1>
      <h1>Email: {user?.email}</h1>
    </div>
  );
}
