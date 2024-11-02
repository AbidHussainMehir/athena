import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useRef, useEffect, useState } from 'react';

export const VideoCard = () => {
    const videoRef = useRef<any>(null);
    const [isPiPSupported, setIsPiPSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'pictureInPictureEnabled' in document) {
            setIsPiPSupported(true);
        }
    }, []);

    const handlePiP = async () => {
        if (!document.pictureInPictureEnabled) {
            alert('Picture-in-Picture is not supported by your browser.');
            return;
        }

        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await videoRef.current.requestPictureInPicture();
            }
        } catch (error) {
            console.error('Failed to toggle Picture-in-Picture:', error);
        }
    };

    return (<div className="grid grid-cols-1  gap-4 md:gap-4  my-3">

        <div className="col-span-12 ">
            <Card className="rounded-xl border bg-card text-card-foreground shadow py-6">

                <div> {/* Adjust the width here */}
                    <div className="lg:max-w-[600px] h-[450px] mx-auto w-full" style={{ aspectRatio: "4 / 3" }}>
                        <video
                            className="w-full h-full object-contain"
                            controls
                            src="athena-video.mp4"
                            title="Video title"
                            ref={videoRef}

                        >
                            Your browser does not support the video tag.
                        </video>
                        {/* {isPiPSupported && (
                            <button
                                onClick={handlePiP}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Toggle Picture-in-Picture
                            </button>
                        )} */}

                    </div>

                </div>


            </Card>
        </div>
    </div>)
}
