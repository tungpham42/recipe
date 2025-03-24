import { transliterate } from "transliteration";

export const romanizeString = (str) =>
  transliterate(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");