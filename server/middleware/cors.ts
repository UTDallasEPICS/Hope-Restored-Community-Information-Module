import { defineEventHandler, setResponseHeaders } from "h3";

// This middleware sets the CORS headers for the response
// This allows the client to make requests to the server from a different origin
// Like a frontend application hosted on a different domain (i.e. the public view)
export default defineEventHandler((event) => {
  const allowedOrigins = [`${import.meta.env.VITE_EXTERNAL_VIEWER_URL}`];
  const origin = event.node.req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    setResponseHeaders(event, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Expose-Headers": "Content-Length, X-Kuma-Revision",
    });
  } else {
    // Optionally handle disallowed origins
    event.node.req.statusCode = 403;
    event.node.req.statusMessage = "Forbidden";
  }
});
