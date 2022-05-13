import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../core/hooks/useAuth";
import { PathRoutes } from "../../core/lib/Menu";

export function Header() {
  const { logout, loading, user, login, error: loginError } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    useEffect(() => {
      if (!loading && loginError) {
        setShowLoginModal(!!loginError);
      } else {
        setShowLoginModal(false);
      }
    }, [loginError, loading]);

  const Buttons = useMemo(() => {
    return !!user ? (
      <div className="flex gap-2 items-center">
        <Link
          to={{
            pathname: PathRoutes.PROFILE,
          }}
        >
          <Button label="See archived" className="p-button-text p-button-sm" />
        </Link>

        <Button label="Logout" className="p-button-sm" onClick={logout} />
      </div>
    ) : (
      <Button
        label="Login"
        className="p-button-sm"
        onClick={() => {
          setShowLoginModal(true);
        }}
      />
    );
  }, [user, logout]);
  return (
    <>
      <Menubar
        className="bg-transparent"
        start={
          <Link
            to={{
              pathname: PathRoutes.HOME,
            }}
          >
            <h1 className="text-2xl font-bold pl-4 ">
              allNews{" "}
              {user && (
                <span className="text-sm mt-2 italic">
                  Hello {user.username}!
                </span>
              )}
            </h1>
          </Link>
        }
        end={<div className="pr-2">{Buttons}</div>}
      />
      <Dialog
        className="w-96"
        header="Login"
        visible={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      >
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();
            await login({ username, password }).then(() => {
                setShowLoginModal(false);
            });
          }}
          className="grid gap-4"
        >
          <div>
            <label htmlFor="username" className="block mb-2">
              Username
            </label>
            <InputText
              required
              onInput={(e: any) => setUsername(e.target.value)}
              id="username"
              aria-describedby="username"
              className="block w-full"
            />
          </div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <InputText
            type="password"
            onInput={(e: any) => setPassword(e.target.value)}
            id="password"
            aria-describedby="password"
            className="block w-full"
          />

          {loginError && <p className="text-red-700 pl-2">{loginError}</p>}

          <div className="flex justify-end">
            <Button label="Login" type="submit" />
          </div>
        </form>
      </Dialog>
    </>
  );
}