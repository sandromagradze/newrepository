import { useEffect, useRef } from "react";

import useAds from "../hooks/useAds";

interface SideBarAdProps {
  position: string;
  className?: string;
}

declare global {
  interface Window {
    ado?: unknown;
  }
}


function waitForAdo(
  timeout = 15000
): Promise<void> {
  return new Promise((resolve) => {
    if (window.ado) {
      resolve();
      return;
    }

    const startTime = Date.now();

    const check = () => {
      if (window.ado) {
        resolve();
        return;
      }

      if (Date.now() - startTime >= timeout) {
        console.warn(
          "[SideBarAd] AdOcean was not initialized within timeout"
        );

        resolve();
        return;
      }

      window.setTimeout(check, 100);
    };

    check();
  });
}


function scriptUsesAdo(
  script: HTMLScriptElement
): boolean {
  const text = script.textContent || "";

  const src = script.getAttribute("src") || "";

  return (
    text.includes("ado.") ||
    text.includes("ado(") ||
    text.includes("ado_") ||
    src.includes("adocean")
  );
}


async function loadHtmlWithScripts(
  html: string,
  container: HTMLElement
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

  
    if (
      element.tagName.toLowerCase() !== "script"
    ) {
      const clonedElement =
        element.cloneNode(true) as HTMLElement;

    
      const nestedScripts =
        Array.from(
          clonedElement.querySelectorAll("script")
        );

      if (nestedScripts.length === 0) {
        container.appendChild(clonedElement);
        continue;
      }

    
      const scriptData = nestedScripts.map(
        (oldScript) => {
          const parent = oldScript.parentNode;

          if (parent) {
            parent.removeChild(oldScript);
          }

          return {
            oldScript,
            parent,
          };
        }
      );

      container.appendChild(clonedElement);

     
      for (const { oldScript, parent } of scriptData) {
        if (!parent) {
          continue;
        }

        await executeScript(
          oldScript,
          parent as HTMLElement
        );
      }

      continue;
    }

    await executeScript(
      element as HTMLScriptElement,
      container
    );
  }
}


async function executeScript(
  oldScript: HTMLScriptElement,
  container: HTMLElement
): Promise<void> {
  
  if (scriptUsesAdo(oldScript)) {
    await waitForAdo();
  }

  const script =
    document.createElement("script");

  
  Array.from(oldScript.attributes).forEach(
    (attribute) => {
      script.setAttribute(
        attribute.name,
        attribute.value
      );
    }
  );

 
  if (oldScript.src) {
    await new Promise<void>((resolve) => {
      let resolved = false;

      const finish = () => {
        if (resolved) {
          return;
        }

        resolved = true;
        resolve();
      };

      script.onload = () => {
        finish();
      };

      script.onerror = () => {
        console.error(
          "[SideBarAd] Failed to load script:",
          script.src
        );

        finish();
      };

      const src = oldScript.src;

      script.src = src.startsWith("//")
        ? `https:${src}`
        : src;

      container.appendChild(script);
    });

    return;
  }

 
  script.textContent =
    oldScript.textContent || "";

  container.appendChild(script);
}

export default function SideBarAd({
  position,
  className = "",
}: SideBarAdProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const {
    data: ads = [],
    isLoading,
    isError,
  } = useAds();

  useEffect(() => {
    let cancelled = false;

    async function renderAd() {
      const container =
        containerRef.current;

      if (!container) {
        return;
      }

    
      container.innerHTML = "";

      if (isLoading) {
        return;
      }

      if (isError) {
        console.error(
          `[SideBarAd] Failed to load ads for position "${position}"`
        );

        return;
      }

    
      const ad = ads.find(
        (item) =>
          item.position === position
      );

      if (!ad?.html) {
        console.warn(
          `[SideBarAd] No ad found for position "${position}"`
        );

        return;
      }

      if (cancelled) {
        return;
      }

      try {
        await loadHtmlWithScripts(
          ad.html,
          container
        );

        if (cancelled) {
          return;
        }

       
      } catch (error) {
        if (!cancelled) {
          console.error(
            `[SideBarAd] Failed to render position "${position}":`,
            error
          );
        }
      }
    }

    renderAd();

    return () => {
      cancelled = true;

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [
    ads,
    isLoading,
    isError,
    position,
  ]);

  return (
    <div className={className}>
      <div ref={containerRef} />
    </div>
  );
}