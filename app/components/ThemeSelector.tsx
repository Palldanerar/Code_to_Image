"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { themes } from '../utils/utilities';
import OutsideClickHandler from "react-outside-click-handler";

interface ThemeSelectorProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
      <div onClick={toggleDropdown}>
        <p className='py-[5px] text-sm font-medium'>Code Color</p>
        <div className="dropdown-title capitalize w-[120px] hover:text-slate-50 transition-all duration-300 ease-in-out">
          {theme}
          {!showDropdown ? <ChevronDown /> : <ChevronUp />}
        </div>
        {showDropdown && (
          <div className="dropdown-menu relative top-[94px] w-[130px]">
            {themes.map((theme, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleThemeChange(theme)}
                  className=" capitalize text-left hover:text-slate-50 transition-all duration-300 ease-in-out"
                >
                  {theme}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default ThemeSelector