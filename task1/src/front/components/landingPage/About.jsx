import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const [count, setCount] = useState(0);

  // === Fonction pour lancer l'animation de count ===
  const startCounting = () => {
    let start = 0;
    const end = 95;
    const duration = 2000;
    const incrementTime = 10;
    const totalIncrements = duration / incrementTime;
    const increment = end / totalIncrements;

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, incrementTime);
  };

  // === Animation ScrollTrigger pour déclencher count ===
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top center',
      once: true,
      onEnter: () => {
        startCounting();
      },
    });
  }, []);

  // === Animation SplitText & contenu ===
  useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', {
      type: 'words',
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#about',
        start: 'top center',
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.02,
      })
      .from(
        '.top-grid div, .bottom-grid div',
        {
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          stagger: 0.04,
        },
        '-=0.5'
      );
  }, []);

  return (
    <div id="about" >
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          
          <div className="md:col-span-8">
            <p className="badge">into the power</p>
            <h2>
              Crafted for greatness <span className="text-white">–</span> from design to victory
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every step you take in Nike is powered by purpose — from the texture you feel to the
              performance you live. It’s that detail that transforms motion into emotion.
            </p>

            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>{count}%</span>
              </p>
              <p className="text-sm text-white-100">
                Satisfaction rate on delivery experience
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/img/N3.jpg" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/img/N3.jpg" alt="grid-img-4" />
        </div>
		<div className="md:col-span-3">
          <div className="noisy" />
          <img src="/img/N3.jpg" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/img/N3.jpg" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/img/N3.jpg" alt="grid-img-5" />
        </div>
      </div>
<div className="relative mt-10 overflow-hidden h-[200px]">
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


  );
};

export default About;
