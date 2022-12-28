import { Buffer } from "buffer";

const encodeB64 = ({stringToEncode}: {stringToEncode:string}):string => {
  return Buffer.from(stringToEncode, "utf-8").toString("base64");
}

const decodeB64 = ({stringToDecode}: {stringToDecode:string}):string => {
  return Buffer.from(stringToDecode, "base64").toString("utf-8");
}

export {
  encodeB64,
  decodeB64,
}