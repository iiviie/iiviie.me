
import { useState } from 'react';

interface ContactSectionProps {
  onCommand?: (command: string) => void;
}

const ContactSection = ({ onCommand }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactMethod: 'email'
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

  if (submitted) {
    return (
      <div className="p-6 font-mono text-sm space-y-4">
        <div className="space-y-2">
          <div className="command-prompt">$ sendmail --status</div>
          <div className="ml-4 space-y-2">
            <div className="status-success crt-glow">
              ✓ Message sent successfully!
            </div>
            
            <div className="text-foreground space-y-1 text-xs">
              <div>Status: DELIVERED</div>
              <div>Timestamp: {new Date().toISOString()}</div>
              <div>Response time: ~24 hours</div>
            </div>
            
            <button 
              onClick={() => setSubmitted(false)}
              className="terminal-link text-xs mt-4"
            >
              → Send another message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 font-mono text-sm space-y-6">
      <div className="space-y-2">
        <div className="command-prompt">$ mail --compose --to="developer@portfolio.terminal"</div>
        <div className="ml-4 text-muted-foreground text-xs">
          Interactive mail composer initialized...
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="ml-4 space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="text-terminal-purple text-xs">From (name):</label>
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">{'>'}</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-transparent border-b border-border outline-none flex-1 text-foreground focus:border-terminal-purple transition-colors text-sm"
              placeholder="Your name"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-terminal-purple text-xs">From (email):</label>
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">{'>'}</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-transparent border-b border-border outline-none flex-1 text-foreground focus:border-terminal-purple transition-colors text-sm"
              placeholder="your.email@domain.com"
              required
            />
          </div>
        </div>

        {/* Contact Method */}
        <div className="space-y-1">
          <label className="text-terminal-purple text-xs">Preferred contact method:</label>
          <div className="ml-4 space-y-1">
            {['email', 'call', 'video'].map((method) => (
              <label key={method} className="flex items-center cursor-pointer text-sm">
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={formData.contactMethod === method}
                  onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                  className="mr-2 hidden"
                />
                <span className="text-foreground">
                  [{formData.contactMethod === method ? '●' : '○'}] {method}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-1">
          <label className="text-terminal-purple text-xs">Subject:</label>
          <div className="flex items-center">
            <span className="text-muted-foreground mr-2">{'>'}</span>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="bg-transparent border-b border-border outline-none flex-1 text-foreground focus:border-terminal-purple transition-colors text-sm"
              placeholder="Brief subject line"
              required
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-1">
          <label className="text-terminal-purple text-xs">Message:</label>
          <div className="ml-2">
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="w-full bg-background/50 border border-border rounded p-2 text-foreground outline-none focus:border-terminal-purple transition-colors resize-none text-sm"
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
            className="terminal-link disabled:opacity-50 text-sm"
          >
            {isSubmitting ? '[Sending...]' : '[Send Message]'}
          </button>
          
          <div className="text-muted-foreground text-xs">
            {isSubmitting ? (
              <span className="animate-pulse">Processing request...</span>
            ) : (
              <span>Press Enter or click Send</span>
            )}
          </div>
        </div>
      </form>
      
      <div className="mt-6 pt-4 border-t border-border space-y-2 text-xs">
        <div className="text-terminal-purple">Alternative contact methods:</div>
        <div className="ml-4 space-y-1 text-muted-foreground">
          <div>📧 developer@portfolio.terminal</div>
          <div>🐙 github.com/divyansh-verma</div>
          <div>💼 linkedin.com/in/divyansh-verma</div>
          <div>🐦 @divyansh_dev</div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
