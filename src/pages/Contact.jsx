import { useState } from 'react';
import { VscTerminal } from 'react-icons/vsc';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        // Formspree endpoint - Replace with your form ID from formspree.io
        // Get it by signing up at https://formspree.io and creating a form
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbledplr';

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: '✓ Message sent successfully! I\'ll get back to you soon.'
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Formspree Error:', error);
            setStatus({
                type: 'error',
                message: '✗ Failed to send message. Please try emailing me directly at acharyaprabin03@gmail.com'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="w-full max-w-3xl bg-vscode-bg border border-vscode-border rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">

                {/* Terminal Header */}
                <div className="bg-vscode-surface px-4 py-2 border-b border-vscode-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="ml-4 flex items-center gap-2 text-vscode-muted text-sm font-mono">
                            <VscTerminal />
                            <span>contact-form — -zsh — 80x24</span>
                        </div>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm sm:text-base bg-[#0d1117] text-[#c9d1d9]">
                    <div className="mb-6 text-vscode-muted">
                        <p>Last login: {new Date().toDateString()} on ttys000</p>
                        <p>Type your message below to execute send_mail.sh</p>
                    </div>

                    {/* Status Messages */}
                    {status.message && (
                        <div className={`mb-4 p-3 rounded border ${status.type === 'success'
                            ? 'bg-green-900/20 border-green-500/50 text-green-400'
                            : 'bg-red-900/20 border-red-500/50 text-red-400'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name Input */}
                        <div className="group">
                            <div className="flex items-center gap-2 text-[#27c93f]">
                                <span>➜</span>
                                <span className="text-[#a5d6ff]">~</span>
                                <span className="text-vscode-muted">enter_name:</span>
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-transparent border-none focus:ring-0 text-white p-0 pl-6 focus:outline-none caret-vscode-accent"
                                placeholder="John Doe"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <div className="flex items-center gap-2 text-[#27c93f]">
                                <span>➜</span>
                                <span className="text-[#a5d6ff]">~</span>
                                <span className="text-vscode-muted">enter_email:</span>
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-transparent border-none focus:ring-0 text-white p-0 pl-6 focus:outline-none caret-vscode-accent"
                                placeholder="john@example.com"
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Message Input */}
                        <div className="group">
                            <div className="flex items-center gap-2 text-[#27c93f]">
                                <span>➜</span>
                                <span className="text-[#a5d6ff]">~</span>
                                <span className="text-vscode-muted">enter_message:</span>
                            </div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-transparent border-none focus:ring-0 text-white p-0 pl-6 focus:outline-none caret-vscode-accent resize-none h-32"
                                placeholder="Type your message here..."
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-4 py-2 bg-vscode-surface border border-vscode-border hover:bg-vscode-border text-vscode-accent hover:text-white transition-colors rounded group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-[#27c93f]">$</span>
                                <span>{isSubmitting ? 'Sending...' : './send_message.sh'}</span>
                                {!isSubmitting && <span className="animate-pulse">_</span>}
                            </button>
                        </div>

                    </form>

                    {/* Alternative Contact */}
                    <div className="mt-6 pt-6 border-t border-vscode-border text-vscode-muted text-xs">
                        <p>Or email me directly at: <a href="mailto:acharyaprabin03@gmail.com" className="text-vscode-accent hover:underline">acharyaprabin03@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
}
