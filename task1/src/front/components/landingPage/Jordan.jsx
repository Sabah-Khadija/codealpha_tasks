import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import { featureLists, goodLists } from '../../../../constants/index.js';

const Jordan = () => {
 const isMobile = useMediaQuery({ maxWidth: 767 });
 
 useGSAP(() => {
	const start = isMobile ? 'top 20%' : 'top top';
	
	const maskTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#art',
		start,
		end: 'bottom center',
		scrub: 1.5,
		pin: true
	 }
	})
	
	maskTimeline
	 .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', })
	 .to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut '})
	 .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut'})
 })
 
 return (
	<div id="art">
	 <div className="container x-auto h-full pt-20">
		<h2 className="will-fade">JORDAN</h2>
		
		<div className="content">
		 <ul className="space-y-5 md:w-[-50%] will-fade">
			{goodLists.map((feature, index) => (
			 <li key={index} className="flex items-center gap-2">
				<img src="/images/check.png" alt="check" />
				
				<p>{feature}</p>
			 </li>
			))}
		 </ul>
		 
		 <div className="cocktail-img">
			<video
				src="/videos/jord.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="abs-center masked-img size-full object-contain"
			/>
		 </div>
		 
		 <ul className="space-y-5  will-fade">
			{featureLists.map((feature, index) => (
			 <li key={index} className="flex items-center justify-start gap-2">
				<img src="/images/check.png" alt="check" />
				<p className="md:w-fit w-60">{feature}</p>
			 </li>
			))}
		 </ul>
		</div>
		
		<div className="masked-container">
  <h2 className="will-fade">Step Into Power</h2>
  <div id="masked-content">
    <h3 className="text-violet ">Designed for Impact, Built to Dominate</h3>
    <p>More than a sneaker — it’s innovation in motion. Each pair fuels your hustle with precision, energy, and unmatched style.</p>
  </div>
</div>
<div className="relative mt-10 overflow-hidden h-[200px] mt-45">
  <div className="absolute w-full  -translate-y-1/2 top-1/2">
    <div className="whitespace-nowrap animate-marquee bg-violet text-black py-2 font-bold text-xl uppercase">
      {Array(20).fill(' ✦ JUST DO IT').join(' ')}
    </div>
  </div>
  <div className="absolute w-full  -translate-y-1/2 top-1/2">
    <div className="whitespace-nowrap rotate-[-8deg] animate-marque text-violet bg-black py-2 font-bold text-xl uppercase">
      {Array(22).fill(' ✦ JUST DO IT').join(' ')}
    </div>
  </div>
  <div className="absolute w-full  -translate-y-1/2 top-1/2">
    <div className="whitespace-nowrap rotate-[8deg] animate-marque text-violet bg-black py-2 font-bold text-xl uppercase">
      {Array(22).fill(' ✦ JUST DO IT').join(' ')}
    </div>
  </div>
</div>
	 </div>
	</div>
 )
}
export default Jordan
