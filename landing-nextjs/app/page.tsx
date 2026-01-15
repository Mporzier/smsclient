'use client';

import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import SMSGenerator from './components/SMSGenerator';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    // Dot pattern centering
    const centerDotPattern = () => {
      const dotPattern = document.getElementById('dotPattern');
      if (!dotPattern) return;
      
      const viewportWidth = document.documentElement.clientWidth;
      const patternSize = 24;
      const circleOffset = 12;
      const fullPatterns = Math.floor(viewportWidth / patternSize);
      const lastCircleX = fullPatterns * patternSize + circleOffset;
      const rightGap = viewportWidth - lastCircleX;
      const leftGap = circleOffset;
      const offset = (rightGap - leftGap) / 2;
      
      dotPattern.setAttribute('x', (-offset).toString());
      
      const dotBg = document.querySelector('.dot-bg');
      if (dotBg) {
        (dotBg as HTMLElement).style.opacity = '1';
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', centerDotPattern);
    } else {
      centerDotPattern();
    }
    
    window.addEventListener('resize', centerDotPattern);

    // Scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      progressBar.style.transform = `scaleX(${scrollPercentage})`;
    };

    // Scroll animations
    const observerOptions = {
      threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
      rootMargin: window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('revealed');
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );

    revealElements.forEach((el, index) => {
      setTimeout(() => {
        observer.observe(el);
      }, index * 10);
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top fixed bottom-[30px] right-[30px] w-[50px] h-[50px] bg-white/70 text-[var(--color-black)] border-none rounded-full cursor-pointer flex items-center justify-center text-2xl shadow-[0_4px_15px_rgba(102,126,234,0.4)] opacity-0 scale-80 translate-y-5 transition-all duration-300 pointer-events-none z-[9999] hover:scale-110 hover:-translate-y-1 hover:shadow-[0_6px_25px_rgba(102,126,234,0.5)] active:scale-95';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut');
    backToTopBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(backToTopBtn);

    const handleScroll = () => {
      updateScrollProgress();
      const scrollPos = window.pageYOffset;
      if (scrollPos > 500) {
        backToTopBtn.classList.add('visible');
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'scale(1) translateY(0)';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.transform = 'scale(0.8) translateY(20px)';
        backToTopBtn.style.pointerEvents = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    // Mouse gradient effect for feature cards
    const cards = document.querySelectorAll('.group');
    const featuresSection = document.getElementById('features');
    const proximityRadius = 250;

    let handleMouseMove: ((e: MouseEvent) => void) | null = null;

    if (featuresSection && cards.length > 0) {
      const getDistanceToRect = (x: number, y: number, rect: DOMRect) => {
        const dx = Math.max(rect.left - x, 0, x - rect.right);
        const dy = Math.max(rect.top - y, 0, y - rect.bottom);
        return Math.sqrt(dx * dx + dy * dy);
      };

      const getClosestPointOnRect = (x: number, y: number, rect: DOMRect) => {
        const closestX = Math.max(rect.left, Math.min(x, rect.right));
        const closestY = Math.max(rect.top, Math.min(y, rect.bottom));
        return { x: closestX, y: closestY };
      };

      const updateCardGradient = (card: Element, mouseX: number, mouseY: number) => {
        const gradientBorder = card.querySelector('.pointer-events-none.absolute.inset-0.rounded-\\[inherit\\]') as HTMLElement;
        const allInsetPx = card.querySelectorAll('.pointer-events-none.absolute.inset-px');
        const gradientShine = allInsetPx.length > 0 ? allInsetPx[allInsetPx.length - 1] as HTMLElement : null;

        if (!gradientBorder || !gradientShine) return;

        const rect = card.getBoundingClientRect();
        const distance = getDistanceToRect(mouseX, mouseY, rect);
        const normalizedDistance = distance / proximityRadius;

        let relativeX: number, relativeY: number;

        if (mouseX >= rect.left && mouseX <= rect.right &&
            mouseY >= rect.top && mouseY <= rect.bottom) {
          relativeX = mouseX - rect.left;
          relativeY = mouseY - rect.top;
        } else {
          const closestPoint = getClosestPointOnRect(mouseX, mouseY, rect);
          relativeX = closestPoint.x - rect.left;
          relativeY = closestPoint.y - rect.top;
        }

        const clampedDistance = Math.min(normalizedDistance, 1);
        const easedDistance = Math.pow(clampedDistance, 2);
        const minBorderOpacity = 0.6;
        const maxBorderOpacity = 1.0;
        const borderOpacity = minBorderOpacity + (1 - easedDistance) * (maxBorderOpacity - minBorderOpacity);
        const shineOpacity = (1 - easedDistance) * 0.8;

        gradientBorder.style.setProperty('opacity', borderOpacity.toString(), 'important');
        gradientBorder.style.background = `radial-gradient(200px circle at ${relativeX}px ${relativeY}px, #6B4DB8, #C85A8B, var(--border) 100%)`;

        gradientShine.style.setProperty('opacity', shineOpacity.toString(), 'important');
        gradientShine.style.background = `radial-gradient(200px at ${relativeX}px ${relativeY}px, rgba(217, 217, 217, 0.333), transparent 100%)`;
      };

      handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const sectionRect = featuresSection.getBoundingClientRect();
        const sectionPadding = proximityRadius;
        const isNearSection = mouseX >= sectionRect.left - sectionPadding &&
                             mouseX <= sectionRect.right + sectionPadding &&
                             mouseY >= sectionRect.top - sectionPadding &&
                             mouseY <= sectionRect.bottom + sectionPadding;

        if (isNearSection) {
          cards.forEach(card => {
            updateCardGradient(card, mouseX, mouseY);
          });
        } else {
          cards.forEach(card => {
            const gradientBorder = card.querySelector('.pointer-events-none.absolute.inset-0.rounded-\\[inherit\\]') as HTMLElement;
            const allInsetPx = card.querySelectorAll('.pointer-events-none.absolute.inset-px');
            const gradientShine = allInsetPx.length > 0 ? allInsetPx[allInsetPx.length - 1] as HTMLElement : null;

            if (gradientBorder && gradientShine) {
              gradientBorder.style.setProperty('opacity', '0', 'important');
              gradientBorder.style.background = 'radial-gradient(200px circle at -200px -200px, #6B4DB8, #C85A8B, var(--border) 100%)';
              gradientShine.style.setProperty('opacity', '0', 'important');
              gradientShine.style.background = 'radial-gradient(200px at -200px -200px, rgba(217, 217, 217, 0.333), transparent 100%)';
            }
          });
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', centerDotPattern);
      window.removeEventListener('scroll', handleScroll);
      if (handleMouseMove) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
      if (document.body.contains(backToTopBtn)) {
        document.body.removeChild(backToTopBtn);
      }
      if (document.body.contains(progressBar)) {
        document.body.removeChild(progressBar);
      }
    };
  }, []);

  return (
    <>
      <svg className="dot-bg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.2" fill="#9ca3af" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>

      <Header />
      <Hero />
      
      <div className="section-transition transition-hero-stats" />
      
      <Features />
      
      <div className="section-transition transition-usecases-pricing" />
      
      <Pricing />
      
      <div className="section-transition transition-pricing-generator" />
      
      <SMSGenerator />
      
      <div className="section-transition transition-generator-faq" />
      
      <FAQ />
      
      <Footer />
    </>
  );
}
