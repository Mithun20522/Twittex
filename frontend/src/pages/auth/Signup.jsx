import XSvg from '../../components/SVGs/X';
import {MdOutlineMail} from 'react-icons/md'
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <div className='max-w-screen-xl h-screen mx-auto flex px-10'>
      <div className='hidden lg:flex flex-1 items-center justify-center'>
        <XSvg className="fill-white lg:w-2/3"/>
      </div>
      <div className='flex justify-center items-center flex-col '>
        <form className='lg:w-2/3 mx-auto flex flex-col gap-4 md:mx-20'>
          <XSvg className="lg:hidden w-24 fill-white"/>
          <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
          <label className='input input-bordered rounded flex items-center gap-2'>
              <MdOutlineMail/>
              <input 
              type="email" 
              placeholder='Email'
              name='email'
              className='grow'
              />
          </label>
          <div className='flex gap-4 flex-wrap'>
          <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
              <FaUser/>
              <input 
              type="text" 
              placeholder='Username'
              name='username'
              className='grow'
              />
          </label>
          <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
              <MdDriveFileRenameOutline />
              <input 
              type="text" 
              placeholder='Full Name'
              name='fullName'
              className='grow'
              />
          </label>
          </div>
          <label className='input input-bordered rounded flex items-center gap-2'>
              <MdPassword />
              <input 
              type="password" 
              placeholder='Password'
              name='password'
              className='grow'
              />
          </label>
          <button className='btn rounded-full btn-primary text-white'>Sign up</button>
        </form>
        <div className='flex flex-col mt-4 gap-2 lg:w-2/3'>
          <p className='text-white text-lg'>Already have an account?</p>
          <Link to={'/login'}>
              <button className='btn rounded-full btn-primary btn-outline w-full text-white'>Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup