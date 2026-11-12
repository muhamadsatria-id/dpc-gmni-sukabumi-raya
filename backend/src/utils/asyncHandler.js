// Membungkus handler async agar error otomatis diteruskan ke errorMiddleware.
function bungkus(fn) {
  return function handler(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { bungkus };
