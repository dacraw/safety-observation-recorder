import { useAuth0 } from "@auth0/auth0-react";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router";
import LoginButton from "~/components/authentication/loginButton";
import LogoutButton from "~/components/authentication/logoutButton";
import Modal from "~/components/modal/modal";

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user);
  console.log(isAuthenticated);

  return (
    <header className="grid justify-end m-4">
      <Modal
        basic={false}
        modalName="navigation"
        triggerElement={<FontAwesomeIcon icon={faGripLines} size="2xl" />}
      >
        <nav className="grid gap-2 text-center">
          <Link to="/" className="bg-blue-600/80 block rounded p-2">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <LogoutButton className="bg-blue-600/80 block rounded p-2" />
              <Link
                className="bg-blue-600/80 block rounded p-2"
                to="/observations"
              >
                View Observations
              </Link>
            </>
          ) : (
            <LoginButton className="bg-blue-600/80 block rounded p-2" />
          )}
        </nav>
      </Modal>
    </header>
  );
}
