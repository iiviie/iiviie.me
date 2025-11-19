'use client';

import React from 'react';
import AsciiArtAnimator from './AsciiArtAnimator';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const contactAscii = `
 ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝
██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   
`;

const ContactView = () => {
    const contactLinks = [
        {
            icon: Mail,
            label: 'Email',
            value: 'divyanshverma158@gmail.com',
            link: 'mailto:divyanshverma158@gmail.com',
            color: 'hover:text-red-400 hover:border-red-400'
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'github.com/iiviie',
            link: 'https://github.com/iiviie',
            color: 'hover:text-white hover:border-white'
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'linkedin.com/in/divyansh-verma',
            link: 'https://www.linkedin.com/in/divyansh-verma-aa001b308/',
            color: 'hover:text-blue-400 hover:border-blue-400'
        },
        {
            icon: Twitter,
            label: 'X / Twitter',
            value: '@iiviieee',
            link: 'https://x.com/iiviieee',
            color: 'hover:text-sky-400 hover:border-sky-400'
        },
    ];

    return (
        <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full p-3 sm:p-4 md:p-5 lg:p-6 space-y-12">
                {/* Header */}
                <div className="flex justify-center">
                    <div className="overflow-hidden">
                        <div className="scale-50 sm:scale-60 md:scale-75 lg:scale-90 origin-center">
                            <AsciiArtAnimator
                                art={contactAscii}
                                className="text-xs leading-none whitespace-pre crt-glow"
                                style={{ fontFamily: 'monospace', color: '#9068F7' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Icon Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {contactLinks.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                  group flex flex-col items-center justify-center
                  p-6 sm:p-7 md:p-8
                  bg-zinc-900/30 border border-zinc-800
                  rounded-xl transition-all duration-300
                  hover:bg-zinc-900/80 hover:scale-105 hover:shadow-lg
                  min-h-[120px] sm:min-h-[140px]
                  ${item.color}
                `}
                            >
                                <Icon className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 mb-3 sm:mb-4 text-zinc-400 transition-colors duration-300 group-hover:text-current" />
                                <span className="text-xs sm:text-sm font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                    {item.label}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContactView;
