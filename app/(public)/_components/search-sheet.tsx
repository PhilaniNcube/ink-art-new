'use client';

import { startTransition, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useQueryState } from 'nuqs';

const SearchSheet = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [search, setSearch] = useQueryState('search', {
        defaultValue: ''
    });

    const router = useRouter();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Search className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="top" >
                <div className='flex flex-col gap-4'>
                    <SheetTitle className='text-2xl font-bold'>Search</SheetTitle>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} name='search' type="search" placeholder='Search for products' className='input input-bordered w-full' />
                    <div className='flex gap-4'>
                        <Button variant='outline' onClick={() => {
                            setIsOpen(false)
                            setSearch('');
                        }}>Cancel</Button>
                        <Button onClick={() => {
                            router.push(`/search?query=${search}`);
                            setIsOpen(false);
                        }}>Search</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SearchSheet