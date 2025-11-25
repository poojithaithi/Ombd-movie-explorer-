const cache = {};
const TTL = 10 * 60 * 1000; // 10 minutes

module.exports = {
  get(key) {
    const item = cache[key];
    if (!item) return null;

    if (Date.now() > item.expiry) {
      delete cache[key];
      return null;
    }

    return item.value;
  },

  set(key, value) {
    cache[key] = {
      value,
      expiry: Date.now() + TTL
    };
  }
};
