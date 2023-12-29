"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';
import { backgrounds } from '../utils/utilities';
import OutsideClickHandler from "react-outside-click-handler";

interface BackgroundSelectorProps {
  background: string;
  setBackground: (background: string) => void;
}

const BackgroundSelector = ({ background, setBackground }: BackgroundSelectorProps) => {

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
      <div className="bg-selector relative" onClick={toggleDropdown}>
        <p className="py-[5px] text-sm font-medium">Theme Selector</p>
        <div className="dropdown-title w-[62px]">
          <div
            className="rounded-full w-[20px] h-[20px]"
            style={{
              background: background,
            }}
          ></div>
          {!showDropdown ? <ChevronDown /> : <ChevronUp />}
        </div>

        {showDropdown && (
          <div className="dropdown-menu top-[74px] w-[62px] rounded-full flex flex-col gap-2">
            {backgrounds.map((background, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleBackgroundChange(background)}
                  className="w-[20px] h-[20px] rounded-full"
                  style={{ background: background }}
                ></div>
              );
            })}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  )
}

export default BackgroundSelector