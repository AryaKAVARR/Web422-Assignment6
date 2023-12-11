import Link from "next/link";
import { isAuthenticated, removeToken,readToken } from "@/lib/authenticate";

function Navbar() {
  const handleLogout = () => {
    removeToken();
    // You might want to redirect the user to the login page or perform additional cleanup.
  };

  return (
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <span className="mr-4 hover:text-gray-400 cursor-pointer text-lg font-semibold">
              Home
            </span>
          </Link>

          {isAuthenticated() ? (
            <>
              <div>
                <Link href="/product">
                  <span className="cursor-pointer text-2xl font-bold">
                    Product Details
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/shoppingCart">
                  <span className="hover:text-gray-400 cursor-pointer text-lg font-semibold">
                    Shopping Cart
                  </span>
                </Link>
              </div>
              <div>
                <button
                  className="hover:text-gray-400 cursor-pointer text-lg font-semibold bg-transparent border-none"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/about">
                  <span className="hover:text-gray-400 cursor-pointer text-lg font-semibold">
                    About
                  </span>
                </Link>
              </div>
              <div>
                <Link href="/login">
                  <span className="hover:text-gray-400 cursor-pointer text-lg font-semibold">
                    Login
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
