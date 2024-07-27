import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from './Slider';
import Links from './Links';

function Header() {
    const [width, setWidth] = useState(window.innerWidth);
    const [slider, setSlider] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        function changeWidth() {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth);
        return () => window.removeEventListener('resize', changeWidth);
    }, []);

    function closeSlide() {
        setSlider(false);
    }

    useEffect(()=>{
        setSlider(false)
        window.scrollTo(0,0)
    },[navigate])

    return (
        <div className={`w-full bg-slate-900 p-4 ${slider ? 'p-0' : ''} flex justify-between items-center shadow-md`}>
            {slider ? (
                <Slider closeSlider={closeSlide} slider={slider} />
            ) : (
                <>
                    <div>
                        <h1
                            onClick={() => navigate('/')}
                            className='text-3xl font-semibold text-slate-50 cursor-pointer'>
                            Crypto<span className='text-orange-700'>X</span>
                        </h1>
                    </div>
                    <div>
                        {width > 560 ? (
                            <Links slider={slider} />
                        ) : (
                            <i 
                                onClick={() => setSlider(true)}
                                className="fa-solid fa-bars text-2xl text-teal-50 font-semibold cursor-pointer"></i>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Header;
