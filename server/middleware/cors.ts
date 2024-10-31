import { defineEventHandler, setResponseHeaders } from "h3";

// This middleware sets the CORS headers for the response
// This allows the client to make requests to the server from a different origin
// Like a frontend application hosted on a different domain (i.e. the public view)
export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });
});
