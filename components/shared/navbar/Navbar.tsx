import React from 'react'
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
import Theme from './Theme';
import MobileNav from './MobileNav';
import GlobalSearch from './GlobalSearch';

const Navbar = () => {
  return (
    <div>

        <nav className='flex-between z-50 background-light900_dark200
            fixed w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm-px-12'   >

              <Link href="/" className="items-center  flex gap-2">

                  <Image 
                    src="/assets/images/site-logo.svg"
                    width={23}
                    height={23}
                    alt='DevFlow'
                  />

                  <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
                    Dev <span className="text-primary-500">OverFlow</span>
                </p>
              </Link>

              <GlobalSearch />

              <div className="flex-between gap-5">
                
                <Theme />
              
                <SignedIn>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-10 w-10",
                      },
                      variables: {
                        colorPrimary: "#ff7000",
                      },
                    }}
                  />
                </SignedIn>

                <MobileNav />
              </div>

        </nav>


    </div>
  )
}

export default Navbar