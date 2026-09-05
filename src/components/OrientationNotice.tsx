import React, { useState, useEffect } from 'react';
import { RotateCw, X, Smartphone } from 'lucide-react';

export const OrientationNotice: React.FC = () => {
  const [isPortraitMobile, setIsPortraitMobile] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return sessionStorage.getItem('unfasten_orientation_dismissed') === 'true';
  });

  useEffect(() => {
    const evaluateOrientation = () => {
      // Check if width is mobile/tablet size (e.g. < 1024px) AND in portrait orientation
      const isNarrowDevice = window.innerWidth < 1024;
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsPortraitMobile(isNarrowDevice && isPortrait);
    };

    evaluateOrientation();

    window.addEventListener('resize', evaluateOrientation);
    window.addEventListener('orientationchange', evaluateOrientation);

    return () => {
      window.removeEventListener('resize', evaluateOrientation);
      window.removeEventListener('orientationchange', evaluateOrientation);
    };
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('unfasten_orientation_dismissed', 'true');
  };

  if (!isPortraitMobile || isDismissed) {
    return null;
  }

  return (
    <div
      id="orientation-notice-banner"
      className="fixed top-3 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in fade-in slide-in-from-top-4 duration-500"
      role="alert"
    >
      <div className="bg-[#FAF8F5] border border-[#D5CEC2] shadow-[0_8px_30px_rgba(24,54,38,0.12)] p-3.5 sm:p-4 relative">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FDF2EC] border border-[#F4DDD2] flex items-center justify-center shrink-0 mt-0.5">
            <RotateCw className="w-4 h-4 text-[#BE562C] animate-[spin_6s_linear_infinite]" />
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-1.5 mb-1">
              <Smartphone className="w-3.5 h-3.5 text-[#183626]" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#BE562C] font-semibold">
                RECOMMENDED VIEW
              </span>
            </div>
            <p className="text-xs font-normal text-[#183626] leading-snug">
              For the best experience, rotate your screen horizontally.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-[#76877D] hover:text-[#183626] p-1 transition-colors duration-250 ease-out cursor-pointer"
            aria-label="Dismiss orientation notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
