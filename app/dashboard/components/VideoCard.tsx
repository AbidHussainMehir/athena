import { useState, useEffect } from 'react';

export const VideoCard = ({ loading }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    // Open the modal automatically when the component mounts
    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 md:gap-4 hidden sm:block">
            {/* Modal */}
            {isOpen && !loading && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-75"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative bg-white rounded-lg overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-black hover:text-gray-900 z-10"
                            onClick={() => setIsOpen(false)}
                            style={{ cursor: 'pointer' }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {/* Video Player */}
                        <div
                            className="lg:max-w-[300px] h-[450px] mx-auto max-w-[290px]"
                            style={{ aspectRatio: '4 / 3' }}
                        >
                            <video
                                className="w-full h-full object-cover"
                                controls
                                controlsList="nodownload nopictureinpicture nofullscreen noremoteplayback noplaybackrate"
                                src="athena-video.mp4" // Replace with your video path
                                title="Video title"
                            // autoPlay
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
