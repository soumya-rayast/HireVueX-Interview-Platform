"use client"
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Code2Icon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


function Navbar() {
  const router = useRouter();

  const handleRoleChange = () => {
    // Redirecting to select-role page to change role
    router.push("/select-role");
  };
  return (
    <nav className='border-b bg-white dark:bg-gray-900 shadow-sm'>
      <div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 container mx-auto'>
        <Link
          href={'/'}
          className='flex items-center gap-2 font-semibold text-2xl font-mono hover:opacity-80 transition-all'
        >
          <Code2Icon className='size-8 text-blue-500' />
          <span className='bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent'>
            HireVueX
          </span>
        </Link>
        <SignedIn>
          <div className='flex items-center gap-3 dark:text-white '>
            <DasboardBtn />
            <Button
              onClick={handleRoleChange}
              className="btn btn-primary ml-2"
            >
              Change Role
            </Button>
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}
export default Navbar