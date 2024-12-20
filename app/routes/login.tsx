import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const invitation = searchParams.get("invitation");
    const organization = searchParams.get("organization");
    if (!invitation || !organization) return;

    loginWithRedirect({
      authorizationParams: {
        invitation,
        organization,
      },
    });
  });
  return <div>Redirecting to the login page...</div>;
}
