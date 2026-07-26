import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'

export default function Navbar() {


    return (

        <header className='flex justify-between items-center py-12'>

            <img
                src={logo}
                alt="Smart Places"
                className='h-8'
            />


            <nav className='flex gap-6'>
                <Link to='/'>Home</Link>
                <Link to='/create'>Añadir lugar</Link>

            </nav>

        </header>
    )
}