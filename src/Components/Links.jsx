import React from 'react'
import { NavLink } from 'react-router-dom';

function Links({slider}) {
    return (
        <div><ul className={`${slider ? 'flex flex-col space-y-2' : 'flex'} gap-8 text-slate-50 text-lg`}>
            <li className='relative'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `relative inline-block pb-2 transition-all duration-300 ${isActive ? 'text-blue-500 after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500' : 'text-slate-50 after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-transparent'}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li className='relative'>
                <NavLink
                    to='/market'
                    className={({ isActive }) =>
                        `relative inline-block pb-2 transition-all duration-300 ${isActive ? 'text-blue-500 after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-blue-500' : 'text-slate-50 after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-transparent'}`
                    }
                >
                    Market
                </NavLink>
            </li>
        </ul></div>
    )
}

export default Links