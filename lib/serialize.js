// lib/serialize.js
export function serialize(doc) {
  if (!doc) return null;
  const json = JSON.parse(JSON.stringify(doc));
  return json;
}
export function serializeMany(docs) {
  return docs.map(serialize);
}
