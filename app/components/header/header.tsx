// import { useAuth0 } from "@auth0/auth0-react";
import { faGripLines, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { User } from "@prisma/client";
import { useState } from "react";
import { Form, Link } from "react-router";
import LoginButton from "~/components/authentication/loginButton";
import LogoutButton from "~/components/authentication/logoutButton";
import LoadingSpinner from "~/components/loadingSpinner/loadingSpinner";
import Modal from "~/components/modal/modal";
import { useUser } from "~/sessionUtils";

export default function Header({ user }: { user: User }) {
  // const { user, isAuthenticated, isLoading } = useAuth0();

  const isAuthenticated = !!user;
  return (
    <header className="grid justify-end m-4">
      <Modal
        basic={false}
        modalName="navigation"
        triggerElement={<FontAwesomeIcon icon={faGripLines} size="2xl" />}
      >
        <nav className="grid gap-2 text-center">
          <Link to="/" className="blue-button block rounded p-2">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <div>
                <p>Logged in as:</p>
                <p>{user?.email}</p>
              </div>
              <Form
                className="rounded red-button font-bold py-2 px-4"
                action="/logout"
                method="post"
              >
                <button type="submit">Log Out</button>
              </Form>
              {/* <LogoutButton className="bg-blue-600/80 block rounded p-2" /> */}
              {/* <Link
                className="bg-blue-600/80 block rounded p-2"
                to="/observations"
              >
                View Observations
              </Link> */}
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              {/* <LoginButton className="bg-blue-600/80 block rounded p-2" /> */}
            </>
          )}
        </nav>
      </Modal>
    </header>
  );
}
