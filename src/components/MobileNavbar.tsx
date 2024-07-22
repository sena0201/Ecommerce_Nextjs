import { UserStore } from "@/store/user";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

interface IProps {
  handleOpenNavbar: () => void;
}

function MobileNavbar(props: IProps) {
  const { handleOpenNavbar } = props;
  const User = UserStore((state) => state.user);
  const Logout = UserStore((state) => state.Logout);
  const handleLogout = () => {
    Logout();
    handleOpenNavbar();
  };
  return (
    <nav className="absolute top-[100px] left-0 w-full bottom-0 bg-opacity-50 bg-black z-50">
      <ul className="w-full h-fit bg-primary py-4">
        <li className="px-5">
          <form className="flex items-center justify-between bg-white ">
            <input
              type="text"
              name=""
              id=""
              className="border-none outline-none p-2 w-full"
            />
            <button className="text-2xl font-semibold mr-5">
              <CiSearch />
            </button>
          </form>
        </li>
        <li>
          <Link
            href={"/"}
            className="block py-2 text-white ps-5 hover:bg-white hover:text-primary mt-2"
            onClick={handleOpenNavbar}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/shop"}
            className="block py-2 text-white ps-5 hover:bg-white hover:text-primary"
            onClick={handleOpenNavbar}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className="block py-2 text-white ps-5 hover:bg-white hover:text-primary"
            onClick={handleOpenNavbar}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href={"/contact"}
            className="block py-2 text-white ps-5 hover:bg-white hover:text-primary"
            onClick={handleOpenNavbar}
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href={"/wishlist"}
            className="block py-2 text-white ps-5 hover:bg-white hover:text-primary"
            onClick={handleOpenNavbar}
          >
            Wishlist
          </Link>
        </li>
        {!User && (
          <li>
            <Link
              href={"/account"}
              className="block py-2 text-white ps-5 hover:bg-white hover:text-primary"
              onClick={handleOpenNavbar}
            >
              Login
            </Link>
          </li>
        )}
        {User && (
          <li>
            <button
              className="block py-2 text-white ps-5 hover:bg-white hover:text-primary"
              onClick={handleLogout}
            >
              Log out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MobileNavbar;
