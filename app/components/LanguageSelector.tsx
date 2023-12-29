"use client"

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'
import { languages } from '../utils/utilities';
import OutsideClickHandler from "react-outside-click-handler";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
  seActiveIcon: (icon: string) => void;
}

const LanguageSelector = ({ language, setLanguage, seActiveIcon }: LanguageSelectorProps) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageChange = (language: string) => {

    setLanguage(language);

    const newActiveIcon = languages.find(
      (lang) => lang.name === language
    )?.icon;

    if (newActiveIcon) {
      seActiveIcon(newActiveIcon);
    }
  };

  return (
    <OutsideClickHandler  onOutsideClick={() => setShowDropdown(false)}>
      <div onClick={toggleDropdown}>
        <p className='py-[5px] text-sm font-medium'>Language</p>
        <div className="dropdown-title capitalize w-[120px] hover:text-slate-50 transition-all duration-300 ease-in-out">
          {language}
          {!showDropdown ? <ChevronDown /> : <ChevronUp />}
        </div>

        {showDropdown && (
          <div className="dropdown-menu w-[120px] top-[94px]">
            {languages.map((language, index) => {
              return (
                <div key={index}>
                  <button
                    className="dropdown-item text-left hover:text-slate-50 transition-all duration-300 ease-in-out"
                    onClick={() => handleLanguageChange(language.name)}>
                    {language.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default LanguageSelector