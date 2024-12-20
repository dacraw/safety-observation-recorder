import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton({ className }: { className?: string }) {
  const { logout } = useAuth0();

  return (
    <button
      className={className}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
}
