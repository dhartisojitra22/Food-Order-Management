import React from 'react'
import '../Assets/css/success.css'

export default function Success() {
    return (
        <div className='success_cart text-center'>
            <div className='seccess_ico'>
                <i class="fa-solid fa-check"></i>
            </div>
            <h1 className='mt-3'>Payment Has Done!</h1>
        </div>
    )
}
