import React from 'react';

function Loading() {
    return (
        <div className='flex items-center justify-center'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#6abc69]'></div>
            <p className='ml-4 text-[#6abc69] text-lg font-semibold'>
                Carregando ...
            </p>
        </div>
    );
}

export default Loading;
