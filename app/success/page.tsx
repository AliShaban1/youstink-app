import { redirect } from "next/navigation";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  // Redirect to home with session_id param — the client component handles the UI
  redirect(`/?session_id=${searchParams.session_id || ""}`);
}
