import fs from "fs";
import os from "os";
import path from "path";

import { I18nService } from "../i18n.service";

describe("I18nService", () => {
  it("returns key when directory missing", () => {
    const svc = new I18nService(path.join(os.tmpdir(), "does-not-exist-xyz"));
    expect(svc.t("missing.key")).toBe("missing.key");
  });

  it("loads locale files, deep merges and formats params", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "i18n-test-"));
    const enDir = path.join(dir, "en");
    fs.mkdirSync(enDir);
    // quote numbers so YAML parser keeps them as strings for translation output
    fs.writeFileSync(
      path.join(enDir, "a.yml"),
      'a:\n  b: "1"\n  greet: "Hello {name}"',
    );
    fs.writeFileSync(path.join(enDir, "b.yml"), 'a:\n  c: "2"');
    const svc = new I18nService(dir);
    expect(svc.t("a.b")).toBe("1");
    expect(svc.t("a.c")).toBe("2");
    expect(svc.t("a.greet", { name: "Alice" })).toBe("Hello Alice");
    // missing value inside loaded locale
    expect(svc.t("a.unknown_key_xyz")).toBe("a.unknown_key_xyz");
  });
});
