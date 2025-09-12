// Minimal local JSZip typings (since bundled package currently lacks rich types under @types)
// Covers only the members we use in upload-extraction.service.

declare module "jszip" {
  interface JSZipLoadOptions {
    checkCRC32?: boolean;
  }

  interface JSZipObject {
    name: string;
    dir: boolean;
    async(type: "nodebuffer"): Promise<Buffer>;
  }

  class JSZipInstance {
    files: Record<string, JSZipObject>;
    constructor();
    file(name: string, data: string | ArrayBuffer | Uint8Array | Buffer): this;
    generateAsync(options: { type: "nodebuffer" }): Promise<Buffer>;
  }

  interface JSZipConstructor {
    new (): JSZipInstance;
    (): JSZipInstance; // allow calling without new if library permits
    loadAsync(
      data: ArrayBuffer | Uint8Array | Buffer,
      options?: JSZipLoadOptions,
    ): Promise<JSZipInstance>;
  }

  const JSZip: JSZipConstructor;
  export default JSZip;
  export { JSZipObject };
}
declare module "jszip";
