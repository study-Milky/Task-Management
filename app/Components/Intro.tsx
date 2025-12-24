"use client";
import { useEffect, useState } from "react";

export default function Intro() {
    const [videoEnded, setVideoEnded] = useState(false);

    useEffect(() => {
        const video = document.getElementById("intro-video") as HTMLVideoElement | null;

        // Fallback timer (in case video can't autoplay)
        const fallbackTimer = setTimeout(() => {
            const introContainer = document.getElementById("intro-container");
            if (introContainer && introContainer.style.display !== "none") {
                introContainer.style.display = "none";
            }
            setVideoEnded(true);
        }, 7700);

        // Video event listener
        if (video) {
            const handleEnd = () => {
                setVideoEnded(true);
            };

            video.addEventListener("ended", handleEnd);

            // Cleanup: remove listener, clear fallback timer
            return () => {
                video.removeEventListener("ended", handleEnd);
                clearTimeout(fallbackTimer);
            };
        }

        // Cleanup for fallback (if video not found)
        return () => clearTimeout(fallbackTimer);
    }, []);

    return (
        <>
            <div id="intro-container" className="intro-container">
                <video
                    id="intro-video"
                    src="/Img/Intro.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="intro-video"
                />

                {/* Content after video ends */}
              
            </div>

            <style jsx global>{`
        /* Base styles */
        .intro-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 20px;
          background: white;
        }

        .intro-video {
          max-width: 100%;
          max-height: 70%;
          object-fit: contain;
        }

        .post-video-content {
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .welcome-title {
          font-size: 2.5rem;
          color: #1a2a6c;
          margin-bottom: 15px;
          font-weight: 700;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
        </>
    );
}