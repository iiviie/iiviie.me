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
            <div className="max-w-4xl w-full p-4 sm:p-6 space-y-12">
                {/* Header */}
                <div className="flex justify-center">
                    <div className="overflow-hidden">
                        <div style={{ transform: 'scale(0.5)', transformOrigin: 'center' }}>
                            <AsciiArtAnimator
                                art={contactAscii}
                                className="text-xs leading-none whitespace-pre crt-glow"
                                style={{ fontFamily: 'monospace', color: '#9068F7' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Icon Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactLinks.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={index}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                  group flex flex-col items-center justify-center p-8 
                  bg-zinc-900/30 border border-zinc-800 
                  rounded-xl transition-all duration-300 
                  hover:bg-zinc-900/80 hover:scale-105 hover:shadow-lg
                  ${item.color}
                `}
                            >
                                <Icon className="w-12 h-12 mb-4 text-zinc-400 transition-colors duration-300 group-hover:text-current" />
                                <span className="text-sm font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
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
