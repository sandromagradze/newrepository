import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { fetchScripts } from "../api/scriptsApi";

async function executeScripts(
  html: string,
  target: HTMLElement | HTMLHeadElement
): Promise<void> {
  if (!html) {
    return;
  }

  const temp = document.createElement("div");
  temp.innerHTML = html;

  const nodes = Array.from(temp.childNodes);

  for (const node of nodes) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      continue;
    }

    const element = node as HTMLElement;

    /*
     * Normal HTML
     */
    if (element.tagName.toLowerCase() !== "script") {
      target.appendChild(
        element.cloneNode(true)
      );

      continue;
    }

    /*
     * Script
     */
    const oldScript =
      element as HTMLScriptElement;

    const script =
      document.createElement("script");

    /*
     * Copy attributes
     */
    Array.from(
      oldScript.attributes
    ).forEach((attribute) => {
      script.setAttribute(
        attribute.name,
        attribute.value
      );
    });

    /*
     * External script
     */
    if (oldScript.src) {
      await new Promise<void>(
        (resolve) => {
          script.onload = () => {
            console.log(
              "[GlobalScripts] loaded:",
              oldScript.src
            );

            resolve();
          };

          script.onerror = () => {
            console.error(
              "[GlobalScripts] failed:",
              oldScript.src
            );

            resolve();
          };

          script.src =
            oldScript.src.startsWith("//")
              ? `https:${oldScript.src}`
              : oldScript.src;

          target.appendChild(script);
        }
      );

      continue;
    }

    /*
     * Inline script
     */
    script.textContent =
      oldScript.textContent || "";

    target.appendChild(script);
  }
}

export default function GlobalScripts() {
  const { i18n } =
    useTranslation();

  const langCode =
    i18n.resolvedLanguage?.split("-")[0] ||
    "ka";

  useEffect(() => {
    let cancelled = false;

    async function initializeScripts() {
      try {
        console.log(
          "[GlobalScripts] Loading scripts for:",
          langCode
        );

        const data =
          await fetchScripts(langCode);

        if (cancelled) {
          return;
        }

        /*
         * HEAD
         */
        await executeScripts(
          data.head_scripts,
          document.head
        );

        if (cancelled) {
          return;
        }

        /*
         * BODY
         */
        await executeScripts(
          data.body_scripts,
          document.body
        );

        if (cancelled) {
          return;
        }

        /*
         * BOTTOM UP
         */
        await executeScripts(
          data.bottom_up_scripts,
          document.body
        );

        if (cancelled) {
          return;
        }

        /*
         * BOTTOM
         */
        await executeScripts(
          data.bottom_scripts,
          document.body
        );

        console.log(
          "[GlobalScripts] All scripts initialized"
        );
      } catch (error) {
        if (!cancelled) {
          console.error(
            "[GlobalScripts] Failed:",
            error
          );
        }
      }
    }

    initializeScripts();

    return () => {
      cancelled = true;
    };
  }, [langCode]);

  return null;
}