import React from 'react';
import { useNavigate } from 'react-router-dom';
import Links from './Links';
import './Slider.css';

function Slider({ closeSlider, slider }) {
    const navigate = useNavigate();
    const transitionClass = slider ? 'slider-enter-active' : 'slider-exit';

    return (
        <div
            className={`fixed top-0 left-0 w-full min-h-screen p-5 bg-slate-800 ${transitionClass}`}
            style={{ zIndex: 50 }}
        >
            <div className='flex justify-between items-center'>
                <h1
                    onClick={() => navigate('/')}
                    className='text-3xl font-semibold text-slate-50 cursor-pointer'>
                    Crypto<span className='text-orange-700'>X</span>
                </h1>
                <div>
                    <i 
                        onClick={closeSlider}
                        className="fa-solid fa-circle-xmark text-orange-600 font-semibold text-3xl hover:text-orange-700 cursor-pointer"></i>
                </div>
            </div>
            <div className='w-full mt-10'>
                <Links slider={slider} />
            </div>
        </div>
    );
}

export default Slider;
