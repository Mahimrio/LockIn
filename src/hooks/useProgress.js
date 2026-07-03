import { useState, useEffect } from "react";
import { TOTAL_DAYS, SCHEDULE_LEN, SEED_CHECKED } from "../data/constants";

const STORAGE_KEY = "lockin-v4";

export default function useProgress() {
  const [checked, setChecked] = useState(SEED_CHECKED);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const stored = JSON.parse(raw);
          setChecked({ ...stored, ...SEED_CHECKED });
        }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      setSaving(true);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
      } catch (e) {}
      setTimeout(() => setSaving(false), 800);
    })();
  }, [checked, loaded]);

  const dayKey = (day, idx) => `d${day}-i${idx}`;

  const toggle = (day, idx) => {
    setChecked(prev => ({
      ...prev,
      [dayKey(day, idx)]: !prev[dayKey(day, idx)],
    }));
  };

  const dayProgress = (day) => {
    if (day <= 14) return 100;
    const done = Array.from({ length: SCHEDULE_LEN }, (_, i) => checked[dayKey(day, i)]).filter(Boolean).length;
    return Math.round((done / SCHEDULE_LEN) * 100);
  };

  const totalProgress = () => {
    const done = Object.values(checked).filter(Boolean).length;
    return Math.round((done / (SCHEDULE_LEN * TOTAL_DAYS)) * 100);
  };

  return { checked, loaded, saving, toggle, dayProgress, totalProgress };
}
