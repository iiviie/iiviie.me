import React, { useState } from 'react';

interface ContactSectionProps {
  onClose: (section?: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'divyansh.verma@example.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/iiviie' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/divyansh-verma' },
    { icon: '🐦', label: 'Twitter', value: '@divyansh_dev' },
    { icon: '📱', label: 'Location', value: 'India' }
  ];

  return (
    <div className="fixed inset-4 sm:inset-8 md:inset-12 z-50 bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Window Header */}
      <div className="bg-zinc-900/50 px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-1.5 flex-shrink-0 border-b border-zinc-800 rounded-t-lg backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 cursor-pointer" onClick={() => onClose('home')}></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
          <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-zinc-500 truncate">~/contact</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6 font-mono text-[10px] sm:text-xs bg-zinc-900/95 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600">
        {submitted ? (
          // Success Message
          <div className="space-y-4">
            <div className="text-purple-600">$ sendmail --status</div>
            <div className="ml-4 space-y-2">
              <div className="text-green-400">
                ✓ Message sent successfully!
              </div>
              
              <div className="text-zinc-300 space-y-1 text-[9px] sm:text-[10px]">
                <div>Status: DELIVERED</div>
                <div>Timestamp: {new Date().toLocaleString()}</div>
                <div>Response time: ~24 hours</div>
              </div>
              
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="text-purple-400 hover:text-purple-300 transition-colors text-[9px] sm:text-[10px] mt-4"
              >
                → Send another message
              </button>
            </div>
          </div>
        ) : (
          // Contact Form and Info
          <>
            <div className="space-y-6">
              {/* Terminal Command */}
              <div className="space-y-2">
                <div className="text-purple-600">$ cat ~/contact/info.txt</div>
                <div className="ml-4">
                  <div className="text-zinc-300 space-y-2">
                    <div className="text-purple-400 text-xs sm:text-sm mb-3">Contact Information</div>
                    <div className="grid grid-cols-1 gap-2 text-[9px] sm:text-[10px]">
                      {contactInfo.map((info, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-yellow-400">{info.icon}</span>
                          <span className="text-zinc-500 min-w-[60px]">{info.label}:</span>
                          <span className="text-zinc-300">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <div className="text-purple-600">$ mail --compose --interactive</div>
                <div className="ml-4 text-zinc-500 text-[9px] sm:text-[10px]">
                  Interactive mail composer initialized...
                </div>
                
                <form onSubmit={handleSubmit} className="ml-4 space-y-3">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label className="text-purple-400 text-[9px] sm:text-[10px]">Name:</label>
                    <div className="flex items-center">
                      <span className="text-zinc-500 mr-2">{'>'}</span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-transparent border-b border-zinc-600 outline-none flex-1 text-zinc-300 focus:border-purple-400 transition-colors text-[9px] sm:text-[10px] py-1"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="text-purple-400 text-[9px] sm:text-[10px]">Email:</label>
                    <div className="flex items-center">
                      <span className="text-zinc-500 mr-2">{'>'}</span>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-transparent border-b border-zinc-600 outline-none flex-1 text-zinc-300 focus:border-purple-400 transition-colors text-[9px] sm:text-[10px] py-1"
                        placeholder="your.email@domain.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1">
                    <label className="text-purple-400 text-[9px] sm:text-[10px]">Subject:</label>
                    <div className="flex items-center">
                      <span className="text-zinc-500 mr-2">{'>'}</span>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="bg-transparent border-b border-zinc-600 outline-none flex-1 text-zinc-300 focus:border-purple-400 transition-colors text-[9px] sm:text-[10px] py-1"
                        placeholder="Brief subject line"
                        required
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label className="text-purple-400 text-[9px] sm:text-[10px]">Message:</label>
                    <div className="ml-2">
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                        className="w-full bg-zinc-800/30 border border-zinc-600 rounded p-2 text-zinc-300 outline-none focus:border-purple-400 transition-colors resize-none text-[9px] sm:text-[10px] leading-relaxed"
                        placeholder="Your message here..."
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-purple-400 hover:text-purple-300 disabled:opacity-50 transition-colors text-[9px] sm:text-[10px]"
                    >
                      {isSubmitting ? '[Sending...]' : '[Send Message]'}
                    </button>
                    
                    <div className="text-zinc-500 text-[8px] sm:text-[9px]">
                      {isSubmitting ? (
                        <span className="animate-pulse">Processing request...</span>
                      ) : (
                        <span>Press Enter or click Send</span>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Quick Links */}
              <div className="border-t border-zinc-800 pt-4 space-y-2">
                <div className="text-purple-600">$ ls ~/social/</div>
                <div className="ml-4 space-y-1 text-[9px] sm:text-[10px]">
                  <div className="text-zinc-300">Quick connect links:</div>
                  <div className="ml-2 space-y-1 text-zinc-400">
                    <div>📧 <span className="text-purple-400 hover:text-purple-300 cursor-pointer">divyansh.verma@example.com</span></div>
                    <div>💼 <span className="text-purple-400 hover:text-purple-300 cursor-pointer">linkedin.com/in/divyansh-verma</span></div>
                    <div>🐙 <span className="text-purple-400 hover:text-purple-300 cursor-pointer">github.com/iiviie</span></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSection;