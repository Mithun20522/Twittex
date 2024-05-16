import {Link} from 'react-router-dom'

const PageNotFound = () => {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
		Page Not Found
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
      <Link className='btn btn-primary btn-outline text-white rounded-lg w-full' to="/">Go Home</Link>
      </a>
    </button>
</main>
  )
}

export default PageNotFound