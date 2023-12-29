"use client";

import { Resizable } from 're-resizable';
import React, { useEffect, useState } from 'react'
import AceEditor from "react-ace"
import Image from 'next/image';

// theme
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";

//languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";

import { getExtension, initialCode } from '../utils/utilities';

interface CodeEditorProps {
    language: string;
    theme: string;
    icon: string;
    background?: string;
    currentPadding?: string;
}

const CodeEditor = ({ language, icon, theme, background, currentPadding }: CodeEditorProps) => {

    const [width, setWidth] = useState(1000);
    const [height, setHeight] = useState<number | null>(500);
    const [title, setTitle] = useState("main");
    const [extension, setExtension] = useState(".js");
    const [code, setCode] = useState(initialCode);

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value.split(".")[0];
        setTitle(newTitle);
    };

    // @ts-ignore
    const handleResize = (evt, direction, ref, pos) => {
        const newHeight = ref.style.height;
        setHeight(parseInt(newHeight, 10));
    }

    const updateSize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [])

    useEffect(() => {
        setExtension(getExtension(language));
    }, [language]);

    return (
        <Resizable
            minHeight={466}
            minWidth={510}
            maxWidth={1000}
            defaultSize={{
                width: width,
                height: height || 500,
            }}
            className="resize-container relative"
            onResize={handleResize}
            style={{
                background: background,
            }}>
            <div className='code-block' style={{ padding: currentPadding }}>
                <div className="handle handle-top absolute left-1/2 translate-x-[-50%] top-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
                <div className="handle handle-bottom absolute left-1/2 bottom-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
                <div className="handle handle-left absolute left-[-4px] top-1/2 w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
                <div className="handle handle-right absolute right-[-4px] top-1/2 w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>

                <div className='code-title h-[52px] px-4 flex items-center justify-between bg-black bg-opacity-80"'>
                    {/* Apple Style) */}
                    <div className='dots flex items-center gap-1'>
                        <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbc6a] "></div>
                        <div className="w-3 h-3 rounded-full bg-[#67f772] "></div>
                    </div>
                    <div className='w-full input-contol'>
                        <input value={`${title}${extension}`} onChange={(e) => handleTitleChange(e)} type="text" className="w-full text-[hsla(0,0%,100%,.6)] outline-none font-medium text-center bg-transparent" style={{ lineHeight: "1.8rem" }} />
                    </div>
                    <div className="icon flex justify-center items-center p-1 bg-black bg-opacity-30 rounded-sm">
                        <Image src={icon} alt={language} width={33} height={33} />
                    </div>
                </div>
                <AceEditor
                    value={code}
                    name="editor"
                    fontSize={16}
                    wrapEnabled={true}
                    showPrintMargin={false}
                    showGutter={false}
                    highlightActiveLine={false}
                    className='ace-editor-container'
                    editorProps={{ $blockScrolling: true }}
                    theme={theme}
                    mode={language.toLocaleLowerCase()}
                    height={`calc(${height}px - ${currentPadding} - ${currentPadding} - 52px)`}
                    onChange={handleCodeChange}
                />
            </div>
        </Resizable>
    )
}

export default CodeEditor