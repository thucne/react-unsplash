'use client';

import Image from 'next/image';
import Link from 'next/link';

const CopyRight = () => {
  return (
    <div className='pt-5 px-2 mb-4 flex justify-center w-full'>
      <div className='w-full max-w-[700px]'>
        <div className="relative mt-2 flex flex-row items-center justify-start gap-2">
          <Link href="https://thucde.dev/" className="h-[50px] block">
            {/* Light mode banner */}
            <Image
              src='/thucdedev-banner.png'
              alt="Thucde.dev Logo"
              width={200}
              height={50}
              draggable={false}
              quality={100}
              style={{ objectFit: 'contain' }}
              loading="lazy"
              className="dark:hidden"
            />
            {/* Dark mode banner */}
            <Image
              src='/thucdedev-banner.dark.png'
              alt="Thucde.dev Logo (Dark)"
              width={200}
              height={50}
              draggable={false}
              quality={100}
              style={{ objectFit: 'contain' }}
              loading="lazy"
              className="hidden dark:block"
            />
          </Link>
        </div>
        <div className="mt-3">
          <p className="mt-1 text-sm text-muted-foreground">
            An application to demonstrate the usage of Unsplash API with Next.js, TailwindCSS and Shadcn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CopyRight;
