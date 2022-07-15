const path = require("path");
const programDir = path.join(__dirname, "..", "programs", "canvas");
console.log(programDir);
const idlDir = path.join(__dirname, "idl");
const sdkDir = path.join(__dirname, "src", "generated");
const binaryInstallDir = path.join(__dirname, ".crates");

module.exports = {
  idlGenerator: "anchor",
  programName: "nft_canvas",
  programId: "BJCgYB56gxD9WsVaQanFoNByarTQm7qhsVLVKT6We8jn",
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
