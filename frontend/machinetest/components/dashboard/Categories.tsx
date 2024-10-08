'use client';

import { useState } from 'react';
import Image from 'next/image';
// import useSearchModal, {SearchQuery} from '../hooks/useSearchModal';

const Categories = () => {
    // const searchModal = useSearchModal();
    const [category, setCategory] = useState('');

    const _setCategory = (_category: string) => {
        setCategory(_category);

        // const query: SearchQuery = {
        //     country: searchModal.query.country,
        //     checkIn: searchModal.query.checkIn,
        //     checkOut: searchModal.query.checkOut,
        //     guests: searchModal.query.guests,
        //     bedrooms: searchModal.query.bedrooms,
        //     bathrooms: searchModal.query.bathrooms,
        //     category: _category
        // }

        // searchModal.setQuery(query);
    }

    return (
        <div className="pt-1 cursor-pointer pb-2 flex items-center space-x-12">
            <div 
                onClick={() => _setCategory('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-white' : 'border-background'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                {/* <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Beach"
                    width={20}
                    height={20}
                /> */}

                <span className='text-xs'>All</span>
            </div>
            
            <div 
                onClick={() => _setCategory('beach')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'beach' ? 'border-white' : 'border-background'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                {/* <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Beach"
                    width={20}
                    height={20}
                /> */}

                <span className='text-xs'>Hosting</span>
            </div>

            <div 
                onClick={() => _setCategory('villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'villas' ? 'border-white' : 'border-background'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                {/* <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Beach"
                    width={20}
                    height={20}
                /> */}

                <span className='text-xs'>Pc</span>
            </div>

            <div 
                onClick={() => _setCategory('cabins')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${category == 'cabins' ? 'border-white' : 'border-background'} opacity-60 hover:border-gray-200 hover:opacity-100`}>
                {/* <Image
                    src="/icn_category_beach.jpeg"
                    alt="Category - Beach"
                    width={20}
                    height={20}
                /> */}

                <span className='text-xs'>Mobile</span>
            </div>

        
        </div>
    )
}

export default Categories;