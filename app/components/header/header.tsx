import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router";
import LoginButton from "~/components/authentication/loginButton";
import LogoutButton from "~/components/authentication/logoutButton";
import Modal from "~/components/modal/modal";

export default function Header() {
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
          <LoginButton className="bg-blue-600/80 block rounded p-2" />
          <LogoutButton className="bg-blue-600/80 block rounded p-2" />
          <Link className="bg-blue-600/80 block rounded p-2" to="/observations">
            View Observations
          </Link>
        </nav>
      </Modal>
    </header>
  );
}
