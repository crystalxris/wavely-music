import "./App.css";
import {
  FaHome,
  FaSearch,
  FaPlay,
  FaPause,
  FaHeart,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaRandom,
  FaRedo,
  FaMusic,
  FaSignOutAlt,
} from "react-icons/fa";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import Login from "./Login";

/* ─────────────────────────────────────────────────────────
   SongCard — outside App to prevent flicker
───────────────────────────────────────────────────────── */
const SongCard = memo(({ song, isPlaying, isActive, isLiked, onPlay, onLike }) => (
  <div className={`song-card ${isActive ? "playing" : ""}`}>
    <div className="card-artwork">
      <img
        src={song.image}
        alt={song.title}
        className={isPlaying ? "rotating" : ""}
      />
      <div className="card-play-overlay">
        <button
          className="card-play-btn"
          onClick={() => onPlay(song)}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <button
        className={`heart-btn ${isLiked ? "liked" : ""}`}
        onClick={(e) => { e.stopPropagation(); onLike(song); }}
        aria-label="Like"
      >
        <FaHeart />
      </button>
    </div>

    <div className="card-meta">
      <h3>{song.title}</h3>
      <p>{song.artist || "Unknown Artist"}</p>
    </div>

    <div className="card-footer">
      {isPlaying ? (
        <div className="card-wave">
          <span /><span /><span /><span />
        </div>
      ) : (
        <span className="card-duration">♪</span>
      )}
    </div>
  </div>
));

/* ─────────────────────────────────────────────────────────
   Main App
───────────────────────────────────────────────────────── */
function App() {
  const [user, setUser]               = useState(null);
  const [likedSongs, setLikedSongs]   = useState([]);
  const [songs, setSongs]             = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [volume, setVolume]           = useState(1);
  const [shuffle, setShuffle]         = useState(false);
  const [repeat, setRepeat]           = useState(false);
  const [page, setPage]               = useState("home");
  const [search, setSearch]           = useState("");

  const audioRef            = useRef();
  const progressBarRef      = useRef();
  const currentTimeLabelRef = useRef();
  const durationLabelRef    = useRef();

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    fetch("http://localhost:5000/songslist")
      .then((res) => res.json())
      .then((data) => setSongs(data));
  }, []);

  const toggleLike = useCallback((song) => {
    setLikedSongs((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  }, []);

  const playSong = useCallback((song) => {
    if (!song) return;
    setCurrentSong((prev) => {
      if (prev?.id === song.id) {
        if (audioRef.current.paused) {
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        return prev;
      }
      setIsPlaying(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
      return song;
    });
  }, []);

  const nextSong = useCallback(() => {
    setSongs((songs) => {
      setCurrentSong((cur) => {
        if (!cur) return cur;
        const idx  = songs.findIndex((s) => s.id === cur.id);
        const next = songs[(idx + 1) % songs.length];
        setTimeout(() => {
          if (audioRef.current) { audioRef.current.play(); setIsPlaying(true); }
        }, 100);
        return next;
      });
      return songs;
    });
  }, []);

  const prevSong = useCallback(() => {
    setSongs((songs) => {
      setCurrentSong((cur) => {
        if (!cur) return cur;
        const idx  = songs.findIndex((s) => s.id === cur.id);
        const prev = songs[(idx - 1 + songs.length) % songs.length];
        setTimeout(() => {
          if (audioRef.current) { audioRef.current.play(); setIsPlaying(true); }
        }, 100);
        return prev;
      });
      return songs;
    });
  }, []);

  const updateProgress = () => {
    const el = audioRef.current;
    if (!el) return;
    const pct = (el.currentTime / el.duration) * 100 || 0;
    if (progressBarRef.current)      progressBarRef.current.value            = pct;
    if (currentTimeLabelRef.current) currentTimeLabelRef.current.textContent = formatTime(el.currentTime);
    if (durationLabelRef.current)    durationLabelRef.current.textContent    = formatTime(el.duration);
  };

  const handleLogout = () => {
    setUser(null);
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(null);
  };

  const filteredSongs = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ── SHOW LOGIN IF NOT LOGGED IN ─────────────── */
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  /* ── MAIN APP ─────────────────────────────────── */
  return (
    <div className="app">
      <div className="ambient-bg">
        <div className="ambient-orb orb1" />
        <div className="ambient-orb orb2" />
        <div className="ambient-orb orb3" />
      </div>

      {/* ── SIDEBAR ───────────────────────────── */}
      <nav className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><FaMusic /></div>
          <h2>WAVELY</h2>
        </div>

        <p className="sidebar-section-label">Menu</p>
        <ul>
          <li className={page === "home"    ? "active" : ""} onClick={() => setPage("home")}>
            <FaHome /> Home
          </li>
          <li className={page === "search"  ? "active" : ""} onClick={() => setPage("search")}>
            <FaSearch /> Search
          </li>
          <li className={page === "library" ? "active" : ""} onClick={() => setPage("library")}>
            <FaHeart /> Library
          </li>
        </ul>

        {/* user profile at the bottom */}
        <div className="sidebar-profile">
          <img
            src={user.picture}
            alt={user.name}
            className="sidebar-avatar"
            referrerPolicy="no-referrer"
          />
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user.name}</p>
            <p className="sidebar-user-email">{user.email}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <FaSignOutAlt />
          </button>
        </div>
      </nav>

      {/* ── MAIN ──────────────────────────────── */}
      <main className="main">

        {page === "home" && (
          <>
            <div className="page-header">
              <h1>Trending Songs</h1>
              <p>{songs.length} tracks available</p>
            </div>
            <div className="songs-container">
              {songs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  isActive={currentSong?.id === song.id}
                  isLiked={likedSongs.some((s) => s.id === song.id)}
                  onPlay={playSong}
                  onLike={toggleLike}
                />
              ))}
            </div>
          </>
        )}

        {page === "search" && (
          <>
            <div className="page-header">
              <h1>Search</h1>
              <p>Find your favourite track</p>
            </div>
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Song name, artist…"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="songs-container">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={currentSong?.id === song.id && isPlaying}
                    isActive={currentSong?.id === song.id}
                    isLiked={likedSongs.some((s) => s.id === song.id)}
                    onPlay={playSong}
                    onLike={toggleLike}
                  />
                ))
              ) : (
                <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
                  <div className="empty-state-icon">🔍</div>
                  <p>No songs match "{search}"</p>
                </div>
              )}
            </div>
          </>
        )}

        {page === "library" && (
          <>
            <div className="page-header">
              <h1>Your Library</h1>
              <p>{likedSongs.length} liked songs</p>
            </div>
            {likedSongs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon"><FaHeart /></div>
                <p>Like songs to add them here</p>
              </div>
            ) : (
              <div className="songs-container">
                {likedSongs.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={currentSong?.id === song.id && isPlaying}
                    isActive={currentSong?.id === song.id}
                    isLiked={true}
                    onPlay={playSong}
                    onLike={toggleLike}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── PLAYER ────────────────────────────── */}
      <div className="player">
        {currentSong ? (
          <>
            <div className="player-info">
              <div className="player-artwork-wrap">
                <img
                  src={currentSong.image}
                  alt={currentSong.title}
                  className={isPlaying ? "rotating" : ""}
                />
                {isPlaying && <div className="player-now-ring" />}
              </div>
              <div className="player-text">
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist || "Unknown Artist"}</p>
                {isPlaying && (
                  <div className="player-wave">
                    <span /><span /><span />
                  </div>
                )}
              </div>
            </div>

            <div className="player-controls">
              <div className="controls-row">
                <button className={`ctrl-btn ${shuffle ? "active-btn" : ""}`} onClick={() => setShuffle(!shuffle)} title="Shuffle">
                  <FaRandom />
                </button>
                <button className="ctrl-btn" onClick={prevSong} title="Previous">
                  <FaStepBackward />
                </button>
                <button className="ctrl-btn-play" onClick={() => playSong(currentSong)} title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="ctrl-btn" onClick={nextSong} title="Next">
                  <FaStepForward />
                </button>
                <button className={`ctrl-btn ${repeat ? "active-btn" : ""}`} onClick={() => setRepeat(!repeat)} title="Repeat">
                  <FaRedo />
                </button>
              </div>

              <div className="progress-row">
                <span className="time-label" ref={currentTimeLabelRef}>0:00</span>
                <input
                  type="range"
                  className="progress-bar"
                  defaultValue={0}
                  ref={progressBarRef}
                  onChange={(e) => {
                    const newTime = (e.target.value / 100) * audioRef.current.duration;
                    audioRef.current.currentTime = newTime;
                  }}
                />
                <span className="time-label" ref={durationLabelRef}>0:00</span>
              </div>
            </div>

            <div className="player-volume">
              <FaVolumeUp />
              <input
                type="range"
                className="volume-bar"
                min="0" max="1" step="0.01"
                value={volume}
                onChange={(e) => {
                  audioRef.current.volume = e.target.value;
                  setVolume(e.target.value);
                }}
              />
            </div>

            <audio
              ref={audioRef}
              src={currentSong.audio}
              onTimeUpdate={updateProgress}
              onEnded={() => {
                if (repeat)  { audioRef.current.currentTime = 0; audioRef.current.play(); return; }
                if (shuffle) { playSong(songs[Math.floor(Math.random() * songs.length)]); return; }
                nextSong();
              }}
            />
          </>
        ) : (
          <div className="player-idle">
            <FaMusic />
            <span>Pick a song to start listening</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;