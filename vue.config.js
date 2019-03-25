module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    hot: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    headers: {
      // "Access-Control-Allow-Origin": "http://0.0.0.0:8080/",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "3600",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  }
};
