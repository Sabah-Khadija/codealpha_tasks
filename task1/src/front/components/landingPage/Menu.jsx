'use client';

import { allShoes } from '../../../../constants/index.js'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const Menu = () => {
 const [currentIndex, setCurrentIndex] = useState(0);
 
 useGSAP(() => {
	gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
	gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
	 xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
	})
	gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
	 yPercent: 0, opacity: 100, ease: 'power1.inOut'
	})
	gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
	 yPercent: 0, opacity: 100, ease: 'power1.inOut'
	})
 }, [currentIndex]);
 
 const totalShoes = allShoes.length;
 
 const goToSlide = (index) => {
	const newIndex = (index + totalShoes) % totalShoes;
	
	setCurrentIndex(newIndex);
 }
 
 const getCocktailAt = (indexOffset) => {
	return allShoes[(currentIndex + indexOffset + totalShoes) % totalShoes]
 }
 
 const currentCocktail = getCocktailAt(0);
 const prevCocktail = getCocktailAt(-1);
 const nextCocktail = getCocktailAt(1);
 
 return (
	<section id="menu" aria-labelledby="menu-heading">
	 <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
		{allShoes.map((cocktail, index) => {
		 const isActive = index === currentIndex;
		 
		 return (
			<button key={cocktail.id} className={`
				${isActive
				 ? 'text-white border-white'
				 : 'text-white/50 border-white/50'}
			 `}	onClick={() => goToSlide(index)}
			>
			 {cocktail.name}
			</button>
		 )
		})}
	 </nav>
	 
	 <div className="content">
		<div className="arrows">
		 <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
			<span className='text-violet'>{prevCocktail.name}</span>
			<img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
		 </button>
		 
		 <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
			<span>{nextCocktail.name}</span>
			<img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
		 </button>
		</div>
		
		<div className ="flex justify-center items-center">
		 <img src={currentCocktail.image} className="object-contain max-w-[250px] md:max-w-[350px] w-full h-auto mb-10"/>
		</div>
		
		<div className="recipe">

		 <div className="details">
			<h2>{currentCocktail.title}</h2>
		 </div>
		</div>
	 </div>
	</section>
 )
}
export default Menu
