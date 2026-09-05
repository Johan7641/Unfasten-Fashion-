import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowRight,
  Loader2,
  Plus,
  Camera,
  Upload,
  X,
  Sparkles,
  RotateCw,
} from 'lucide-react';
import { SearchMode } from '../types';

interface HeroSearchProps {
  onSearch: (query: string, mode: SearchMode) => void;
  onImageSearch?: (file: File, note?: string) => void;
  isLoading: boolean;
  activeQuery?: string;
  onOpenAiChat: (initialQuery?: string) => void;
}

interface RecommendationItem {
  name: string;
  mode: SearchMode;
}

// Master pool of popular brands
const ALL_BRAND_POOL: RecommendationItem[] = [
  { name: 'Shein', mode: 'brand' },
  { name: 'Patagonia', mode: 'brand' },
  { name: 'Zara', mode: 'brand' },
  { name: "Levi's", mode: 'brand' },
  { name: 'Uniqlo', mode: 'brand' },
  { name: 'Temu', mode: 'brand' },
  { name: 'H&M', mode: 'brand' },
  { name: 'Lululemon', mode: 'brand' },
  { name: 'Nike', mode: 'brand' },
  { name: 'Adidas', mode: 'brand' },
  { name: 'Reformation', mode: 'brand' },
  { name: 'Ralph Lauren', mode: 'brand' },
  { name: "Arc'teryx", mode: 'brand' },
  { name: 'COS', mode: 'brand' },
  { name: 'Everlane', mode: 'brand' },
  { name: 'Arket', mode: 'brand' },
  { name: 'Mango', mode: 'brand' },
  { name: 'Primark', mode: 'brand' },
  { name: 'Boohoo', mode: 'brand' },
  { name: 'Veja', mode: 'brand' },
  { name: 'Aritzia', mode: 'brand' },
  { name: 'Ganni', mode: 'brand' },
  { name: 'Carhartt', mode: 'brand' },
  { name: 'Gymshark', mode: 'brand' },
  { name: 'Skims', mode: 'brand' },
];

// Master pool of specific clothing garments and products
const ALL_PRODUCT_POOL: RecommendationItem[] = [
  { name: 'Nike Air Jordan', mode: 'product' },
  { name: 'Adidas White T-Shirt', mode: 'product' },
  { name: 'Lacoste Polo', mode: 'product' },
  { name: 'Zara Faux Leather Jacket', mode: 'product' },
  { name: 'Patagonia Better Sweater', mode: 'product' },
  { name: 'Lululemon Align Leggings', mode: 'product' },
  { name: 'Uniqlo Heattech Crew', mode: 'product' },
  { name: "Levi's 501 Original Jeans", mode: 'product' },
  { name: 'Ralph Lauren Oxford Shirt', mode: 'product' },
  { name: 'Carhartt WIP Detroit Jacket', mode: 'product' },
  { name: "Arc'teryx Atom LT Hoody", mode: 'product' },
  { name: 'Birkenstock Boston Clog', mode: 'product' },
  { name: 'Skims Soft Lounge Dress', mode: 'product' },
  { name: 'North Face Nuptse Puffer', mode: 'product' },
  { name: 'Alo Yoga Airlift Leggings', mode: 'product' },
  { name: 'H&M Relaxed Linen Shirt', mode: 'product' },
  { name: 'Reformation Frankie Dress', mode: 'product' },
  { name: 'New Balance 550 Sneaker', mode: 'product' },
  { name: 'COS Cashmere Crewneck', mode: 'product' },
  { name: 'Champion Reverse Weave', mode: 'product' },
  { name: 'Ganni Seersucker Dress', mode: 'product' },
  { name: 'Salomon XT-6 Trail Shoe', mode: 'product' },
  { name: 'Stüssy Basic Logo Tee', mode: 'product' },
  { name: 'Barbour Waxed Jacket', mode: 'product' },
  { name: 'Veja Campo Leather Sneaker', mode: 'product' },
  { name: 'Aritzia Super Puff Jacket', mode: 'product' },
  { name: 'Everlane Way-High Jean', mode: 'product' },
  { name: 'Acne Studios Canada Scarf', mode: 'product' },
  { name: 'Gymshark Vital Seamless', mode: 'product' },
  { name: 'Stan Smith Classic Shoes', mode: 'product' },
];

// Master pool of realistic e-commerce product links
const ALL_LINK_POOL: RecommendationItem[] = [
  { name: 'zara.com/linen-blend-overshirt', mode: 'link' },
  { name: 'nike.com/air-jordan-1-retro', mode: 'link' },
  { name: 'patagonia.com/better-sweater', mode: 'link' },
  { name: 'shein.com/floral-cami-dress', mode: 'link' },
  { name: 'uniqlo.com/heattech-crewneck', mode: 'link' },
  { name: 'hm.com/relaxed-cotton-hoodie', mode: 'link' },
  { name: 'lululemon.com/align-high-rise', mode: 'link' },
  { name: 'levis.com/501-original-jeans', mode: 'link' },
  { name: 'arcteryx.com/atom-lt-hoody', mode: 'link' },
  { name: 'reformation.com/frankie-silk', mode: 'link' },
  { name: 'asos.com/design-trench-coat', mode: 'link' },
  { name: 'cos.com/relaxed-cashmere-knit', mode: 'link' },
  { name: 'adidas.com/samba-og-classic', mode: 'link' },
  { name: 'mango.com/tailored-suit-blazer', mode: 'link' },
  { name: 'arket.com/heavyweight-tshirt', mode: 'link' },
  { name: 'everlane.com/the-cashmere-crew', mode: 'link' },
  { name: 'ralphlauren.com/classic-oxford', mode: 'link' },
  { name: 'skims.com/soft-lounge-slip', mode: 'link' },
];

// Master pool for screenshot prompts
const ALL_SCREENSHOT_POOL: RecommendationItem[] = [
  { name: 'Nike Air Jordan High', mode: 'product' },
  { name: 'Adidas White Trefoil Tee', mode: 'product' },
  { name: 'Lacoste Piqué Polo', mode: 'product' },
  { name: 'Zara Cropped Trench', mode: 'product' },
  { name: 'Patagonia Retro-X Fleece', mode: 'product' },
  { name: 'Lululemon Groove Flare', mode: 'product' },
  { name: 'Carhartt Canvas Jacket', mode: 'product' },
  { name: 'Uniqlo Ultra Light Down', mode: 'product' },
];

// Fisher-Yates shuffle helper to sample N non-repeating items randomly
function getRandomSample<T>(pool: T[], count: number): T[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  onImageSearch,
  isLoading,
  activeQuery = '',
}) => {
  const [mode, setMode] = useState<SearchMode>('brand');
  const [inputValue, setInputValue] = useState(activeQuery);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageNote, setImageNote] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Randomized recommendation state - refreshed on load and can be manually reshuffled
  const [randomizedRecommendations, setRandomizedRecommendations] = useState<{
    brand: RecommendationItem[];
    product: RecommendationItem[];
    link: RecommendationItem[];
    screenshot: RecommendationItem[];
  }>(() => ({
    brand: getRandomSample(ALL_BRAND_POOL, 8),
    product: getRandomSample(ALL_PRODUCT_POOL, 8),
    link: getRandomSample(ALL_LINK_POOL, 8),
    screenshot: getRandomSample(ALL_SCREENSHOT_POOL, 8),
  }));

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to reshuffle recommendations on demand
  const handleShuffle = useCallback(() => {
    setRandomizedRecommendations({
      brand: getRandomSample(ALL_BRAND_POOL, 8),
      product: getRandomSample(ALL_PRODUCT_POOL, 8),
      link: getRandomSample(ALL_LINK_POOL, 8),
      screenshot: getRandomSample(ALL_SCREENSHOT_POOL, 8),
    });
  }, []);

  const handleModeChange = (newMode: SearchMode) => {
    setMode(newMode);
    if (newMode === 'screenshot' && !selectedFile) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    setSelectedFile(file);
    setMode('screenshot');
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processSelectedFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processSelectedFile(file);
            break;
          }
        }
      }
    }
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setImageNote('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'screenshot' && selectedFile && onImageSearch) {
      onImageSearch(selectedFile, imageNote);
    } else if (inputValue.trim()) {
      onSearch(inputValue.trim(), mode);
    }
  };

  const handleQuickRecommendationClick = (item: { name: string; mode: SearchMode }) => {
    if (item.mode === 'screenshot') {
      setMode('screenshot');
      fileInputRef.current?.click();
      return;
    }
    setMode(item.mode);
    setInputValue(item.name);
    onSearch(item.name, item.mode);
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'brand':
        return 'Search any brand (e.g. Shein, Patagonia, Reformation)...';
      case 'product':
        return 'Enter product & garment name (e.g. Nike Air Jordan, adidas white tshirt, Lacoste polo)...';
      case 'link':
        return 'Paste any online clothing product URL...';
      case 'screenshot':
        return 'Enter optional product clues or brand name...';
    }
  };

  // Get current active randomized recommendation list based on mode
  const currentRecommendations = randomizedRecommendations[mode] || randomizedRecommendations.brand;
  const row1Items = currentRecommendations.slice(0, 4);
  const row2Items = currentRecommendations.slice(4, 8);
  const isRow1Hovered = row1Items.some((item) => item.name === hoveredItem);
  const isRow2Hovered = row2Items.some((item) => item.name === hoveredItem);

  const renderRecommendationButton = (
    item: RecommendationItem,
    isRowHovered: boolean,
  ) => {
    const isHovered = hoveredItem === item.name;
    return (
      <button
        key={item.name}
        type="button"
        id={`try-btn-${item.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
        onClick={() => handleQuickRecommendationClick(item)}
        onMouseEnter={() => setHoveredItem(item.name)}
        onMouseLeave={() => setHoveredItem(null)}
        onFocus={() => setHoveredItem(item.name)}
        onBlur={() => setHoveredItem(null)}
        title={item.name}
        style={{
          flexGrow: isHovered ? 1.95 : isRowHovered ? 0.78 : 1,
          flexShrink: isHovered ? 0 : 1,
          flexBasis: '0px',
          transition:
            'flex-grow 800ms cubic-bezier(0.16, 1, 0.3, 1), flex-shrink 800ms cubic-bezier(0.16, 1, 0.3, 1), background-color 350ms ease, border-color 350ms ease, transform 350ms ease, box-shadow 350ms ease',
        }}
        className={`relative min-w-0 min-h-[40px] px-3 sm:px-4 py-2 border bg-[#FAF8F5] text-xs sm:text-sm text-[#183626] font-normal cursor-pointer flex items-center justify-center text-center shadow-2xs overflow-hidden ${
          isHovered
            ? 'border-[#183626] bg-[#F2ECE1] -translate-y-0.5 shadow-xs z-10'
            : 'border-[#D5CEC2] hover:border-[#183626] hover:bg-[#F2ECE1]'
        } active:translate-y-0 active:bg-[#EAE2D5]`}
      >
        <span className="w-full truncate text-center select-none">
          {item.name}
        </span>
      </button>
    );
  };

  return (
    <section
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-6"
      onPaste={handlePaste}
    >
      {/* Hidden File Input for Product Screenshot Uploads */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/webp,image/jpg,image/gif"
        onChange={handleFileChange}
        className="hidden"
        id="product-screenshot-upload-input"
      />

      {/* Eyebrow */}
      <div className="mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#183626] font-semibold">
          TAKING THE &apos;FAST&apos; OUT OF FASHION
        </span>
      </div>

      {/* Main Headline */}
      <div className="mb-3 sm:mb-4">
        <h1 className="font-editorial-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#183626] leading-[1.1] sm:leading-[1.05]">
          Before you buy it, <br />
          <span className="italic text-[#BE562C] font-editorial-serif">
            know what it&apos;s made of.
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <div className="max-w-3xl mb-6 sm:mb-8">
        <p className="text-sm sm:text-base md:text-lg text-[#4E5E55] leading-relaxed font-normal">
          Unfasten reveals the true human, chemical, and environmental cost of clothing brands and products, powered by AI textile auditing.
        </p>
      </div>

      {/* Search Filter Mode Tabs with distinct spacing below - Full-width distribution on mobile */}
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
        <div className="w-full sm:w-auto inline-flex border border-[#D5CEC2] bg-[#FAF8F5] p-0 divide-x divide-[#D5CEC2] shadow-xs">
          <button
            type="button"
            id="tab-mode-brand"
            onClick={() => handleModeChange('brand')}
            className={`flex-1 sm:flex-initial text-center py-3 sm:py-2.5 px-3 sm:px-5 text-[11px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase transition-all duration-300 ease-out cursor-pointer min-h-[44px] flex items-center justify-center ${
              mode === 'brand'
                ? 'bg-[#183626] text-white shadow-xs'
                : 'text-[#5C6E64] hover:text-[#183626] hover:bg-[#F2ECE1]'
            }`}
          >
            BY BRAND
          </button>

          <button
            type="button"
            id="tab-mode-product"
            onClick={() => handleModeChange('product')}
            className={`flex-1 sm:flex-initial text-center py-3 sm:py-2.5 px-3 sm:px-5 text-[11px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase transition-all duration-300 ease-out cursor-pointer min-h-[44px] flex items-center justify-center ${
              mode === 'product'
                ? 'bg-[#183626] text-white shadow-xs'
                : 'text-[#5C6E64] hover:text-[#183626] hover:bg-[#F2ECE1]'
            }`}
          >
            BY PRODUCT
          </button>

          <button
            type="button"
            id="tab-mode-link"
            onClick={() => handleModeChange('link')}
            className={`flex-1 sm:flex-initial text-center py-3 sm:py-2.5 px-3 sm:px-5 text-[11px] sm:text-xs font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase transition-all duration-300 ease-out cursor-pointer min-h-[44px] flex items-center justify-center ${
              mode === 'link'
                ? 'bg-[#183626] text-white shadow-xs'
                : 'text-[#5C6E64] hover:text-[#183626] hover:bg-[#F2ECE1]'
            }`}
          >
            BY LINK
          </button>

          {/* Plus icon to the right of BY LINK for screenshot uploads */}
          <button
            type="button"
            id="tab-mode-screenshot"
            onClick={() => {
              if (selectedFile) {
                setMode('screenshot');
              } else {
                fileInputRef.current?.click();
              }
            }}
            title="Upload product screenshot or clothing tag photo for AI audit"
            className={`flex-none py-3 sm:py-2.5 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 ease-out cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 ${
              mode === 'screenshot'
                ? 'bg-[#183626] text-white shadow-xs'
                : 'text-[#5C6E64] hover:text-[#183626] hover:bg-[#F2ECE1]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#BE562C] font-bold shrink-0" />
            <span className="hidden xs:inline">SCREENSHOT</span>
          </button>
        </div>

        {/* Quick direct upload button on desktop for convenience */}
        <button
          type="button"
          id="quick-upload-screenshot-btn"
          onClick={() => fileInputRef.current?.click()}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 border border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] text-xs font-mono text-[#5C6E64] hover:text-[#183626] hover:bg-[#F2ECE1] transition-all duration-300 ease-out cursor-pointer min-h-[44px] hover:-translate-y-0.5 active:translate-y-0"
        >
          <Camera className="w-3.5 h-3.5 text-[#BE562C]" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Main Search Area: Text Input Bar OR Multimodal Screenshot Dropzone */}
      {mode === 'screenshot' && selectedFile ? (
        /* Active Screenshot Inspection Card */
        <div
          id="screenshot-preview-card"
          className="w-full max-w-4xl border border-[#183626] bg-[#FAF8F5] p-4 sm:p-6 shadow-sm transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {filePreview && (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white border border-[#D5CEC2] shrink-0 overflow-hidden shadow-2xs">
                  <img
                    src={filePreview}
                    alt="Product screenshot preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#BE562C] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> SCREENSHOT READY FOR AI AUDIT
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#183626] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-[11px] font-mono text-[#76877D]">
                  {(selectedFile.size / 1024).toFixed(0)} KB • Click below to audit brand, fabrics & supply chain
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                id="btn-remove-screenshot"
                onClick={handleClearImage}
                disabled={isLoading}
                className="px-3 py-2 border border-[#D5CEC2] hover:border-[#BE562C] bg-white text-xs font-mono text-[#76877D] hover:text-[#BE562C] transition-colors cursor-pointer min-h-[44px] flex items-center justify-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>

              <button
                type="button"
                id="btn-change-screenshot"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="px-3 py-2 border border-[#D5CEC2] hover:border-[#183626] bg-white text-xs font-mono text-[#183626] transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                Change Image
              </button>
            </div>
          </div>

          {/* Optional Note / Garment Clue Input */}
          <div className="mt-4 pt-4 border-t border-[#E5DFD4] flex flex-col sm:flex-row items-stretch gap-3">
            <input
              type="text"
              value={imageNote}
              onChange={(e) => setImageNote(e.target.value)}
              placeholder="Optional: Add garment or brand name (e.g. Nike Air Jordan, Lacoste polo)..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-white border border-[#D5CEC2] text-xs sm:text-sm font-editorial-serif italic text-[#183626] placeholder:text-[#9A9184] focus:outline-hidden focus:border-[#183626]"
            />

            <button
              type="button"
              id="btn-analyze-screenshot"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-[#183626] text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#204732] active:bg-[#12281c] disabled:opacity-50 transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E8A585]" />
                  <span>ANALYZING SCREENSHOT...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#E8A585]" />
                  <span>AUDIT PRODUCT WITH AI</span>
                  <ArrowRight className="w-4 h-4 text-[#D88A68]" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : mode === 'screenshot' && !selectedFile ? (
        /* Empty Screenshot Dropzone */
        <div
          id="screenshot-dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full max-w-4xl border-2 border-dashed p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 ease-out ${
            isDragging
              ? 'border-[#BE562C] bg-[#FDF7F4]'
              : 'border-[#D5CEC2] hover:border-[#183626] bg-[#FAF8F5] hover:bg-[#F4EFE6]'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2.5 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#E5DFD4]/50 flex items-center justify-center text-[#183626] mb-1">
              <Upload className="w-6 h-6 text-[#BE562C]" />
            </div>
            <p className="font-editorial-serif text-lg sm:text-xl text-[#183626] font-normal">
              Drop any clothing screenshot or photo here
            </p>
            <p className="text-xs sm:text-sm text-[#76877D] leading-relaxed">
              Upload screenshots from Instagram, Zara, Nike, ASOS, or photos of garment tags. Our AI vision will identify the product and audit its textile ethics.
            </p>
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 border border-[#183626] bg-[#183626] text-white text-xs font-mono uppercase tracking-wider font-semibold">
              <Camera className="w-3.5 h-3.5" />
              <span>Select Screenshot or Photo</span>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Search Input Bar (with Drag & Drop support) */
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl mt-0"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`flex flex-col sm:flex-row items-stretch border bg-[#FAF8F5] shadow-[0_2px_12px_rgba(24,54,38,0.03)] focus-within:border-[#183626] focus-within:ring-1 focus-within:ring-[#183626] transition-all ${
              isDragging ? 'border-[#BE562C] bg-[#FDF7F4]' : 'border-[#D5CEC2]'
            }`}
          >
            <div className="relative flex-1 flex items-center">
              <input
                id="unfasten-search-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                disabled={isLoading}
                className="w-full px-4 sm:px-5 py-4 sm:py-5 bg-transparent font-editorial-serif italic text-base sm:text-xl text-[#183626] placeholder:text-[#9A9184] placeholder:font-editorial-serif placeholder:italic focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              id="unfasten-investigate-btn"
              disabled={isLoading || !inputValue.trim()}
              className="w-full sm:w-auto min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-5 bg-[#183626] text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-[#204732] active:bg-[#12281c] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#E8A585]" />
                  <span>INVESTIGATING...</span>
                </>
              ) : (
                <>
                  <span>INVESTIGATE</span>
                  <ArrowRight className="w-4 h-4 text-[#D88A68]" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Dynamic TRY Prompts Boxed Buttons - STRICTLY MAX 2 ROWS, with complete balanced width filling and spacing */}
      <div className="mt-4 flex flex-col gap-2 w-full max-w-4xl">
        {/* Row 1: TRY Badge + 4 evenly distributed buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full overflow-x-auto no-scrollbar sm:overflow-visible py-0.5">
          {/* TRY Label and Shuffle Action */}
          <div className="flex items-center gap-1.5 mr-1 select-none py-1 shrink-0">
            <span className="text-xs font-mono tracking-[0.28em] text-[#76877D] font-normal">
              T R Y
            </span>
            <button
              type="button"
              onClick={handleShuffle}
              title="Shuffle recommendations"
              aria-label="Shuffle recommendations"
              className="p-1 text-[#76877D] hover:text-[#183626] hover:bg-[#F2ECE1] border border-transparent hover:border-[#D5CEC2] transition-all duration-300 ease-out cursor-pointer rounded-xs"
            >
              <RotateCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          {/* Row 1 items stretching to fill row width with smooth hover expansion */}
          {row1Items.map((item) => renderRecommendationButton(item, isRow1Hovered))}
        </div>

        {/* Row 2: 4 evenly distributed buttons completing the second row edge-to-edge with smooth hover expansion */}
        {row2Items.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-2.5 w-full overflow-x-auto no-scrollbar sm:overflow-visible py-0.5">
            {row2Items.map((item) => renderRecommendationButton(item, isRow2Hovered))}
          </div>
        )}
      </div>

      {/* Subtle dashed line separator */}
      <div className="w-full mt-8 sm:mt-10 border-dashed-fine"></div>
    </section>
  );
};
