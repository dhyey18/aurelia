"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Song, RepeatMode } from "@/types/music";

const CLAMP = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export function useAudioPlayer(songs: Song[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [queueOrder, setQueueOrder] = useState<string[]>(() =>
    songs.map((s) => s.id)
  );
  const [currentId, setCurrentId] = useState<string>(songs[0]?.id ?? "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [previousVolume, setPreviousVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const songMap = useMemo(() => {
    const map = new Map<string, Song>();
    songs.forEach((s) => map.set(s.id, s));
    return map;
  }, [songs]);

  const queue = useMemo(
    () => queueOrder.map((id) => songMap.get(id)).filter(Boolean) as Song[],
    [queueOrder, songMap]
  );

  const currentSong = songMap.get(currentId) ?? songs[0];
  const currentIndex = queueOrder.indexOf(currentId);

  const pushRecentlyPlayed = useCallback((id: string) => {
    setRecentlyPlayed((prev) => [id, ...prev.filter((p) => p !== id)].slice(0, 12));
  }, []);

  const playSong = useCallback(
    (id: string, queueIds?: string[]) => {
      if (queueIds) setQueueOrder(queueIds);
      setCurrentId(id);
      setIsPlaying(true);
      pushRecentlyPlayed(id);
    },
    [pushRecentlyPlayed]
  );

  const shuffleAll = useCallback(() => {
    if (songs.length === 0) return;
    const ids = songs.map((s) => s.id);
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    setShuffle(true);
    playSong(randomId, ids);
  }, [songs, playSong]);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const goToOffset = useCallback(
    (offset: 1 | -1) => {
      if (queueOrder.length === 0) return;
      if (shuffle) {
        if (queueOrder.length === 1) {
          setIsPlaying(true);
          return;
        }
        let nextId = currentId;
        while (nextId === currentId) {
          nextId = queueOrder[Math.floor(Math.random() * queueOrder.length)];
        }
        playSong(nextId);
        return;
      }
      const idx = currentIndex === -1 ? 0 : currentIndex;
      let nextIdx = idx + offset;
      if (nextIdx >= queueOrder.length) nextIdx = 0;
      if (nextIdx < 0) nextIdx = queueOrder.length - 1;
      playSong(queueOrder[nextIdx]);
    },
    [queueOrder, shuffle, currentIndex, currentId, playSong]
  );

  const next = useCallback(() => goToOffset(1), [goToOffset]);
  const prev = useCallback(() => {
    if (currentTime > 3) {
      const el = audioRef.current;
      if (el) el.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    goToOffset(-1);
  }, [currentTime, goToOffset]);

  const seek = useCallback((time: number) => {
    const el = audioRef.current;
    if (!el) return;
    const clamped = CLAMP(time, 0, el.duration || 0);
    el.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const seekBy = useCallback(
    (delta: number) => {
      seek((audioRef.current?.currentTime ?? 0) + delta);
    },
    [seek]
  );

  const changeVolume = useCallback((v: number) => {
    const clamped = CLAMP(v, 0, 1);
    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (clamped > 0) setPreviousVolume(clamped);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => {
      if (m) {
        setVolume(previousVolume || 0.5);
        return false;
      }
      setPreviousVolume(volume || 0.5);
      setVolume(0);
      return true;
    });
  }, [previousVolume, volume]);

  const toggleShuffle = useCallback(() => setShuffle((s) => !s), []);
  const cycleRepeat = useCallback(() => {
    setRepeat((r) => (r === "off" ? "all" : r === "all" ? "one" : "off"));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const removeFromQueue = useCallback(
    (id: string) => {
      setQueueOrder((prev) => {
        const next = prev.filter((q) => q !== id);
        return next;
      });
      if (id === currentId) {
        setIsPlaying(false);
      }
    },
    [currentId]
  );

  const reorderQueue = useCallback((newOrder: string[]) => {
    setQueueOrder(newOrder);
  }, []);

  // Sync <audio> element with current song
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !currentSong) return;
    if (el.src !== currentSong.audioUrl) {
      el.src = currentSong.audioUrl;
      setCurrentTime(0);
      setIsLoading(true);
    }
    if (isPlaying) {
      el.play().catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong?.id]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.play().catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  // Audio element event wiring
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTimeUpdate = () => setCurrentTime(el.currentTime);
    const onLoadedMetadata = () => {
      setDuration(el.duration || 0);
      setIsLoading(false);
    };
    const onEnded = () => {
      if (repeat === "one") {
        el.currentTime = 0;
        el.play().catch(() => {});
        return;
      }
      if (!shuffle && repeat === "off" && currentIndex === queueOrder.length - 1) {
        setIsPlaying(false);
        return;
      }
      goToOffset(1);
    };
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onCanPlay = () => setIsLoading(false);

    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("ended", onEnded);
    el.addEventListener("waiting", onWaiting);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("canplay", onCanPlay);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("waiting", onWaiting);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("canplay", onCanPlay);
    };
  }, [repeat, shuffle, currentIndex, queueOrder.length, goToOffset]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTyping) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (e.shiftKey) prev();
          else seekBy(-5);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (e.shiftKey) next();
          else seekBy(5);
          break;
        case "m":
        case "M":
          e.preventDefault();
          toggleMute();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay, prev, next, seekBy, toggleMute]);

  return {
    audioRef,
    songs,
    queue,
    queueOrder,
    currentSong,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    favorites,
    recentlyPlayed: recentlyPlayed
      .map((id) => songMap.get(id))
      .filter(Boolean) as Song[],
    isLoading,
    playSong,
    shuffleAll,
    togglePlay,
    next,
    prev,
    seek,
    seekBy,
    changeVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
    removeFromQueue,
    reorderQueue,
  };
}

export type UseAudioPlayerReturn = ReturnType<typeof useAudioPlayer>;
