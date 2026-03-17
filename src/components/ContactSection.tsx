import { Mail, Phone, ArrowUp, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycby8DOgFwRAa65kLZaBohncDPmIrzPvOP2mf3-Row9835UrUl6QknU_NoOANwivOpps9/exec";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const data = new FormData();
      data.append('Name', formData.name);
      data.append('Email', formData.email);
      data.append('Phone', formData.phone);
      data.append('Service', formData.service);
      data.append('Message', formData.message);
      data.append('Date', new Date().toLocaleString());

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        body: data,
        mode: 'no-cors' // Use no-cors for Google Sheets web app
      });

      // Since we use no-cors, we can't read the response, but if it doesn't throw, we assume success
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative w-full bg-black py-24 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] mb-16"
          >
            Let's create <br />
            the <br />
            <span className="font-serif italic text-white/90">Next Wave.</span>
          </motion.h2>

          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/30 text-white transition-colors group-hover:border-gold-500/50 group-hover:text-gold-500">
                <Mail size={24} />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Email Studio</span>
                <a href="mailto:info@ritzmediaworld.com" className="text-xl md:text-2xl font-medium hover:text-gold-500 transition-colors">info@ritzmediaworld.com</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/30 text-white transition-colors group-hover:border-gold-500/50 group-hover:text-gold-500">
                <Phone size={24} />
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">Phone / Whatsapp</span>
                <a href="tel:+919220516777" className="text-xl md:text-2xl font-medium hover:text-gold-500 transition-colors">+91-9220516777</a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 w-full max-w-2xl bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden backdrop-blur-sm"
        >
          {/* Form Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Name" 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-zinc-900/80 transition-all placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Email" 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-zinc-900/80 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Contact Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Number" 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-zinc-900/80 transition-all placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Service Interest</label>
                <input 
                  type="text" 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="e.g. AI Brand Film..." 
                  className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-zinc-900/80 transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Enquiry Message</label>
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your brand vision..." 
                className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-zinc-900/80 transition-all placeholder:text-zinc-600 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
               <div className="text-sm">
                {status === 'success' && (
                  <span className="flex items-center gap-2 text-green-500 font-medium animate-pulse">
                    <CheckCircle size={18} /> Message Sent Successfully!
                  </span>
                )}
                {status === 'error' && (
                  <span className="flex items-center gap-2 text-red-500 font-medium">
                    <XCircle size={18} /> Failed to send. Please try again.
                  </span>
                )}
              </div>

              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className={`group flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-white transition-all hover:bg-gold-500 hover:text-black hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'loading' ? (
                  <Loader2 size={24} className="animate-spin text-gold-500" />
                ) : (
                  <ArrowUp size={24} className="transition-transform duration-300 group-hover:rotate-45" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
