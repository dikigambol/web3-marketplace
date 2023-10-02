export type Item = {
  _id?;
  unit;
  metadata: { image; name; description };
  listing?: { price; seller };
  owner;
};

export type Detail = {
  _id?;
  unit;
  metadata: { image; name; description };
  listing?: { price; seller };
  owner?;
};
