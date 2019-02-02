const cluster = require("cluster");
const http = require("http");
const numOfCPUs = require("os").cpus().length;

console.log(numOfCPUs);
