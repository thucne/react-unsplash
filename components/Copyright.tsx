'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';


const CopyRight = () => {
    const theme = useTheme();

    return (
        <div className='pt-5 px-2 mb-4 flex justify-center'>
          <div className='w-[700px]'>

            <div className="relative mt-2 flex flex-row items-center justify-start gap-2">
                <Link href="https://thucde.dev/" className="h-[50px]">
                    <Image
                        src={theme.palette.mode === 'light' ? '/thucdedev-banner.png' : '/thucdedev-banner.dark.png'}
                        alt="Thucde.dev Logo"
                        width={200}
                        height={50}
                        draggable={false}
                        quality={100}
                        style={{
                            objectFit: 'contain'
                        }}
                        loading="lazy"
                    />
                </Link>
            </div>
            <div className="mt-3">
                <p className="mt-1 text-sm text-[#666666]">
                    An application to demonstrate the usage of Unsplash API with Next.js, TailwindCSS and Material-UI.
                </p>
            </div>
          </div>
        </div>
    );
};

export default CopyRight;
