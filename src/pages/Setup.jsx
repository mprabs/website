import { setupDetails } from "../data/data";
import { VscDesktopDownload, VscCode, VscTools, VscExtensions } from 'react-icons/vsc';

export default function Setup() {
    const sections = [
        {
            title: "Hardware",
            data: setupDetails.hardware,
            icon: VscDesktopDownload,
            color: "text-vscode-function"
        },
        {
            title: "Software",
            data: setupDetails.software,
            icon: VscCode,
            color: "text-vscode-variable"
        },
        {
            title: "Development",
            data: setupDetails.development,
            icon: VscTools,
            color: "text-vscode-string"
        },
        {
            title: "Tools",
            data: setupDetails.tools,
            icon: VscExtensions,
            color: "text-vscode-accent"
        }
    ];

    return (
        <section className="min-h-[calc(100vh-64px)] pt-2 pb-8 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="animate-fade-in-up">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        <span className="text-vscode-accent">04.</span> My Setup
                    </h1>
                    <p className="text-vscode-muted">Tools and hardware I use for development</p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-6">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={index}
                                className="bg-vscode-surface border border-vscode-border hover:border-vscode-accent/50 transition-all duration-300 group"
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 p-4 border-b border-vscode-border">
                                    <Icon className={`text-xl ${section.color}`} />
                                    <h2 className="text-lg font-bold text-white">
                                        {section.title}
                                    </h2>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(section.data).map(([key, value], idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col gap-1 p-3 bg-vscode-bg border border-vscode-border hover:border-vscode-accent/30 transition-colors"
                                            >
                                                <span className="text-xs text-vscode-muted uppercase tracking-wide">
                                                    {key}
                                                </span>
                                                <span className="text-sm text-white font-medium">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}