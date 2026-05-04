import { tents } from "../data/tents.js";

export const getTents = (req, res) => res.json(tents);

export const getTentById = (req, res) => {
  const tent = tents.find((t) => String(t.id) === String(req.params.id));
  if (!tent) return res.status(404).json({ message: "Tent not found" });
  res.json(tent);
};
