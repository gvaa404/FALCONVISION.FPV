import { useEffect, useRef } from "react";
import { Play, X, ExternalLink, Maximize2 } from "lucide-react";
import { portfolio } from "../data";
import Reveal from "./Reveal";

function TheaterModal({ video, onClose }) {
  const closeRef = useRef(null);

  // Esc to close + focus the close button on open
  useEffect(() => {
    if (!video) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="theater-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <div className="theater-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="theater-modal-header">
          <div>
            <span className="theater-badge">{video.category}</span>
            <h3>{video.title}</h3>
            <small>{video.subtitle}</small>
          </div>
          <div className="theater-header-actions">
            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="open-youtube-link"
            >
              <ExternalLink size={14} /> YouTube
            </a>
            <button
              ref={closeRef}
              type="button"
              className="close-theater-btn"
              onClick={onClose}
              title="Close theater (Esc)"
              aria-label="Close video"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="theater-video-wrapper">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="theater-iframe"
          />
        </div>
      </div>
    </div>
  );
}

export default function Work({ inlinePlayingId, setInlinePlayingId, theaterVideo, setTheaterVideo }) {
  return (
    <section id="work" className="work">
      <div className="section-head">
        <Reveal>
          <span className="section-label">05 / Selected Work</span>
          <h2>FROM ABOVE.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p>
            Cinematic captures and embedded 4K footage from recent FPV
            expeditions and client shoots.
          </p>
        </Reveal>
      </div>

      <div className="gallery">
        {portfolio.map((item, idx) => {
          const isPlayingInline = inlinePlayingId === item.id;
          return (
            <Reveal
              key={item.id}
              className={item.wide ? "span-2" : ""}
              delay={Math.min(idx, 2) * 60}
            >
              <article className={"shot" + (item.wide ? " shot-wide" : "")}>
                <div className="visual">
                  {isPlayingInline ? (
                    <div className="video-embed-container">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="video-iframe"
                      />
                      <button
                        type="button"
                        className="close-inline-video-btn"
                        onClick={() => setInlinePlayingId(null)}
                      >
                        <X size={13} /> Close
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg`}
                        alt={`${item.title} — video thumbnail`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
                        }}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <span className="visual-category">{item.category}</span>
                      <span className="video-hd-tag">4K</span>

                      <div
                        className="video-play-overlay"
                        onClick={() => setInlinePlayingId(item.id)}
                      >
                        <button
                          type="button"
                          className="clean-play-circle"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInlinePlayingId(item.id);
                          }}
                          title="Play footage"
                          aria-label={`Play footage: ${item.title}`}
                        >
                          <Play size={22} fill="currentColor" />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="theater-expand-btn"
                        title="Open in theater view"
                        aria-label={`Open ${item.title} in theater view`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheaterVideo(item);
                        }}
                      >
                        <Maximize2 size={14} />
                      </button>
                    </>
                  )}
                </div>

                <div className="shot-info">
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </div>
                  <button
                    type="button"
                    className="shot-action-btn"
                    onClick={() =>
                      isPlayingInline
                        ? setInlinePlayingId(null)
                        : setInlinePlayingId(item.id)
                    }
                  >
                    {isPlayingInline ? "Close Player" : "Watch ↗"}
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <TheaterModal video={theaterVideo} onClose={() => setTheaterVideo(null)} />
    </section>
  );
}
