import Link from "next/link";
import Wrapper from "../components/Wrapper";

function Footer() {
  return (
    <footer className="border-t-[1px] border-gray-300 pt-10">
      <Wrapper>
        <div className="flex flex-wrap gap-5 justify-between sm:justify-start xs:justify-start mb-6">
          <div className="flex flex-col sm:w-full xs:w-full">
            <h3 className="mb-10 font-bold text-2xl">
              Furniro
            </h3>
            <p className="opacity-50">
              400 University Drive Suite 200 Coral Gables,
              FL 33134 USA
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="mb-10 opacity-50">Links</h4>
            <Link className="font-medium" href={"/"}>
              Home
            </Link>
            <Link className="font-medium" href={"/shop"}>
              Shop
            </Link>
            <Link className="font-medium" href={"/about"}>
              About
            </Link>
            <Link className="font-medium" href={"/contact"}>
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-4 sm:ml-10 xs:ml-10">
            <h4 className="mb-10 opacity-50">Help</h4>
            <Link className="font-medium" href={"#"}>
              Payment Options
            </Link>
            <Link className="font-medium" href={"#"}>
              Retuns
            </Link>
            <Link className="font-medium" href={"#"}>
              Privacy Policies
            </Link>
          </div>
          <div className="flex flex-col sm:w-full xs:w-full">
            <h4 className="mb-10 opacity-50">Newsletter</h4>
            <form className="flex gap-3">
              <input
                type="text"
                placeholder="Enter Your Email Address"
                className="border-b-[1px] border-black outline-none placeholder:text-xs p-1"
              />
              <button className="border-b-[1px] border-black outline-none text-sm">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        <div className="border-t-[1px] border-gray-300 py-8">
          2023 furino. All rights reverved
        </div>
      </Wrapper>
    </footer>
  );
}

export default Footer;
