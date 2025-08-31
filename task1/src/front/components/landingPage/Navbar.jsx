import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

import { navLinks } from '../../../../constants/index.js';

const Navbar = () => {
 useGSAP(() => {
	const navTween = gsap.timeline({
	 scrollTrigger: {
		trigger: 'nav',
		start: 'bottom top'
	 }
	});
	
	navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
	 backgroundColor: '#00000050',
	 backgroundFilter: 'blur(10px)',
	 duration: 1,
	 ease: 'power1.inOut'
	});
 })
 
 return (
	<nav>
	 <div>
		<a href="#home" className="flex items-center gap-2">
		 <img className ="w-17"src="/images/nike-tran.png" alt="logo" />
		 <p>Nike</p>
		</a>
		
		<ul>
		 {navLinks.map((link) => (
			<li key={link.id}>
			 <a   className=" relative group text-white transition-colors duration-300 hover:text-violet-400"
 href={`#${link.id}`}>{link.title}</a>
			</li>
		 ))}
		</ul>
	 </div>
	</nav>
 )
}
export default Navbar
