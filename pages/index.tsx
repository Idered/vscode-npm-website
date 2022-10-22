import Button from "../components/Button";
import Logo from "../components/Logo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Editor from "./editor";
import { DEPENDENCIES, SUGGESTIONS } from "../constants";
import Head from "next/head";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [query, setQuery] = useState("");
  const [dependencies, setDependencies] = useState<Dependency[]>(DEPENDENCIES);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [packageJsonFileIndex, setPackageJsonFileIndex] = useState(0);
  const [packageJsonFiles, setPackageJsonFiles] = useState<
    {
      name: string;
      type: "file" | "folder";
      level: number;
    }[]
  >([
    {
      name: "package.json",
      type: "file",
      level: 0,
    },
  ]);
  const [packageJsonFile, setPackageJsonFile] = useState("");
  const tl = useRef<gsap.core.Timeline>(null);
  const q = "react-r";
  const installedPackage = "react-router-dom";

  useEffect(() => {
    const innerSections = document.querySelectorAll("[data-section]>div");
    const spacing = "0";
    gsap.set(innerSections, { translateY: `-${spacing}vh` });

    const instances = [];
    const register = (...items) => instances.push(...items);
    const titleAnimation = {
      keyframes: {
        "0%": { opacity: 0, translateX: -32 },
        "25%": { opacity: 1, translateX: 0 },
        "75%": { opacity: 1, translateX: 0 },
        "100%": { opacity: 0, translateX: 32 },
      },
    };

    const defaults: ScrollTrigger.StaticVars = {
      start: `-${spacing}% 0`,
      end: "+=100%",
      pinSpacing: false,
      scrub: true,
      pin: true,
    };

    gsap.matchMedia().add("(min-width: 1020px)", () => {
      register(
        ScrollTrigger.create({
          trigger: "[data-title-section]",
          start: "50% 50%",
          end: "bottom top",
          scrub: true,
          pin: true,
          animation: gsap.to("[data-title-section]", {
            keyframes: {
              opacity: [1, 0],
              translateX: [0, -100],
              // scaleX: [1, 1.15],
              // scaleY: [1, 0.9],
            },
          }),
        }),
        ScrollTrigger.create({
          trigger: "[data-title-section]",
          start: "top 30%",
          scrub: true,
          animation: gsap.to(".screenshot", {
            scale: 1.25,
          }),
        }),
        ScrollTrigger.create({
          trigger: ".editor",
          start: "50% 50%",
          end: () => {
            const el = document.querySelector<HTMLDivElement>(
              "[data-section]:last-child"
            );
            return el?.offsetTop + el?.offsetHeight + 2000;
          },
          scrub: true,
          pin: document.querySelector(".screenshot"),
        }),
        ScrollTrigger.create({
          ...defaults,
          trigger: "[data-section='1']",
          animation: gsap.to('[data-section="1"]', titleAnimation),
          onUpdate: (self) => {
            const len = q.length * self.progress * 2;
            const nextQuery = q.split("").slice(0, len).join("");
            setQuery(nextQuery);
            setSuggestions(nextQuery === q ? SUGGESTIONS : []);
            setSuggestionIndex(self.progress >= 0.75 ? 1 : 0);
          },
        }),
        ScrollTrigger.create({
          ...defaults,
          trigger: "[data-section='2']",
          animation: gsap.to('[data-section="2"]', titleAnimation),
          onUpdate: (self) => {
            setQuery("");
            setSuggestions([]);
            const isLoading = self.progress < 0.5;
            setDependencies([
              ...DEPENDENCIES,
              { name: installedPackage, version: "6.4.2", isLoading },
            ]);
          },
          onLeaveBack: () => setDependencies(DEPENDENCIES),
        }),
        ScrollTrigger.create({
          ...defaults,
          trigger: "[data-section='3']",
          animation: gsap.to('[data-section="3"]', titleAnimation),
          onUpdate: (self) => {
            setDependencies([
              ...DEPENDENCIES,
              { name: installedPackage, version: "6.4.2", isVulnerable: true },
            ]);
          },
          onLeaveBack: () => {
            setDependencies([
              ...DEPENDENCIES,
              { name: installedPackage, version: "6.4.2", isVulnerable: false },
            ]);
          },
        }),
        ScrollTrigger.create({
          ...defaults,
          trigger: "[data-section='4']",
          animation: gsap.to('[data-section="4"]', titleAnimation),
          onUpdate: (self) => {
            const monorepoPackages = [
              { name: "package.json", type: "file" as const, level: 0 },
              { name: "components", type: "folder" as const, level: 0 },
              { name: "avatar", type: "file" as const, level: 1 },
              { name: "button", type: "file" as const, level: 1 },
              { name: "dialog", type: "file" as const, level: 1 },
            ];
            const openDropdown = self.progress >= 0.4 && self.progress < 0.8;
            const useDialogIndex = self.progress >= 0.55;
            const useDialogPackage = self.progress >= 0.8;
            const useDialogPackages = self.progress >= 0.8;
            setPackageJsonFile(useDialogPackage ? "dialog" : "package.json");
            setPackageJsonFileIndex(useDialogIndex ? 4 : 0);
            setDependencies(
              useDialogPackages
                ? [{ name: "@radix-ui/react-dialog", version: "1.0.2" }]
                : [
                    ...DEPENDENCIES,
                    {
                      name: installedPackage,
                      version: "6.4.2",
                      isVulnerable: false,
                    },
                  ]
            );
            setPackageJsonFiles(
              openDropdown
                ? monorepoPackages
                : [
                    {
                      name: "package.json",
                      type: "file" as const,
                      level: 0,
                    },
                  ]
            );
          },
          onLeaveBack: () => {
            setPackageJsonFile("");
          },
        }),
        ScrollTrigger.create({
          ...defaults,
          // pinSpacing: true,
          pin: false,
          trigger: "[data-section='5']",
          animation: gsap.to('[data-section="5"]', titleAnimation),
        }),
        ScrollTrigger.create({
          ...defaults,
          pinSpacing: false,
          trigger: "[data-section='5']",
          animation: gsap.to(".editor", {
            opacity: 0,
            filter: "blur(8px)",
            scale: 1.5,
          }),
        }),
        ScrollTrigger.create({
          ...defaults,
          pinSpacing: true,
          trigger: "[data-section='6']",
          animation: gsap.to('[data-section="6"]', {
            keyframes: {
              "0%": { opacity: 0, translateX: -32 },
              "50%": { opacity: 1, translateX: 0 },
            },
          }),
        })
      );
    });

    return () => {
      instances.forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className="px-8 subpixel-antialiased">
      <Head>
        <title>Node Dependencies UI for VS Code</title>
        <meta
          name="description"
          content="Manage npm dependencies from Visual Studio Code sidebar. Supports npm, yarn, pnpm."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Node Dependencies UI for VS Code" />
        <meta name="twitter:domain" content="https://npm.kasper.io" />
        <meta name="twitter:creator" content="@idered" />
        <meta name="twitter:url" content="https://npm.kasper.io/" />
        <meta
          name="twitter:image"
          content="https://npm.kasper.io/og-image.png"
        />
        <meta
          name="twitter:description"
          content="Manage npm dependencies from Visual Studio Code sidebar. Supports npm, yarn, pnpm."
        />

        <meta property="og:type" content="website" />
        {/* prettier-ignore */}
        <meta property="og:image" content="https://npm.kasper.io/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="Node Dependencies UI for VS Code" />
        {/* prettier-ignore */}
        <meta property="og:description" content="Manage npm dependencies from Visual Studio Code sidebar. Supports npm, yarn, pnpm." />
        <meta property="og:url" content="https://npm.kasper.io/" />
      </Head>
      <div className="[background-image:url(/noise.png)] fixed inset-0 noise-mask pointer-events-none" />
      <div className="max-w-[1020px] mx-auto min-h-screen grid justify-items-center content-center gap-y-12 xl:gap-0 xl:flex items-center">
        <div
          className="flex-shrink-0 grid justify-items-center"
          data-title-section
        >
          <div className="relative z-50 inline-block">
            <Logo />
          </div>

          <h1 className=" font-semibold text-center xl:text-left text-2xl xl:leading-[3.5rem] xl:text-5xl headline mt-6 font-display">
            Node Dependencies UI <br /> for VS Code
          </h1>

          <div className="grid justify-items-center gap-4 xl:gap-0 xl:flex xl:space-x-4 items-center mt-12">
            <div className="relative">
              <Button
                href="vscode:extension/idered.npm"
                className="h-10 px-12 peer relative z-10"
              >
                Install
              </Button>
              <Button
                aria-hidden="true"
                tabIndex={-1}
                href="vscode:extension/idered.npm"
                className="h-10 px-12 absolute left-0 blur-lg transition-transform peer-hover:scale-x-105 peer-hover:scale-y-125 peer-active:scale-75 duration-500"
              >
                Install
              </Button>
            </div>

            <div>
              <div className="text-indigo-200/50 text-sm">
                Using VS Code Insiders? Click{" "}
                <a
                  href="vscode-insiders:extension/idered.npm"
                  className="text-indigo-200/75 hover:text-indigo-200/100 transition-colors"
                >
                  here
                </a>{" "}
                to install.
              </div>
            </div>
          </div>
        </div>

        <div className="screenshot w-[360px] xl:ml-auto grid justify-end relative">
          <Editor
            className="editor min-w-[368px]"
            query={query}
            dependencies={dependencies}
            suggestions={suggestions}
            suggestionIndex={suggestionIndex}
            packageJsonFile={packageJsonFile}
            packageJsonFiles={packageJsonFiles}
            packageJsonFileIndex={packageJsonFileIndex}
          />
        </div>
      </div>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="1"
      >
        <div>
          <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
            Autocomplete
            <span className="text-white">
              <br /> powered by Algolia
            </span>
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="2"
      >
        <div>
          <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
            Supports
            <span className="text-white">
              <br /> npm, yarn and pnpm
            </span>
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="3"
      >
        <div>
          <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
            Security Audit
            <span className="text-white">
              <br /> running in background
            </span>
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="4"
      >
        <div>
          <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
            Monorepo
            <span className="text-white">
              <br /> easy to manage
            </span>
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="5"
      >
        <div>
          <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
            And more&hellip;
            <span className="text-white">
              <br /> for free
            </span>
          </h2>
        </div>
      </section>

      <section
        className="min-h-screen max-w-[1020px] w-full mx-auto grid justify-items-center content-center"
        data-section="6"
      >
        <div className="relative w-full max-w-[480px]">
          <Button
            href="vscode:extension/idered.npm"
            className="h-24 xl:h-32 w-full justify-center text-3xl peer relative z-10"
          >
            Install
          </Button>
          <Button
            aria-hidden="true"
            tabIndex={-1}
            href="vscode:extension/idered.npm"
            className="h-24 xl:h-32 w-full justify-center text-3xl absolute left-0 blur-lg transition-transform peer-hover:scale-x-105 peer-hover:scale-y-125 peer-active:scale-75 duration-500"
          >
            Install
          </Button>
        </div>

        <div className="text-indigo-200/50 text-sm mt-6">
          Using VS Code Insiders? Click{" "}
          <a
            href="vscode-insiders:extension/idered.npm"
            className="text-[#33e6cb]/75 hover:text-[#33e6cb]/100 transition-colors"
          >
            here
          </a>{" "}
          to install.
        </div>
        <div className="text-indigo-200/50 text mt-24 fixed bottom-0 inset-x-0 text-center py-8 text-sm">
          Made with{" "}
          <a
            href="https://www.buymeacoffee.com/idered"
            className="hover:scale-125 inline-block transition-transform hover:text-white"
          >
            ☕️
          </a>{" "}
          by{" "}
          <a
            href="https://twitter.com/Idered"
            className="text-[#33e6cb]/75 hover:text-[#33e6cb]/100 transition-colors"
          >
            @Idered
          </a>
          .
        </div>
      </section>

      <style jsx global>{`
        .headline {
          -webkit-box-decoration-break: clone;
          -webkit-text-fill-color: transparent;
          background: linear-gradient(
            to right bottom,
            rgb(255, 255, 255) 0%,
            rgba(255, 255, 255, 0.25)
          );
          background-clip: text;
        }
        .noise-mask {
          mask-image: linear-gradient(
            to right bottom,
            black 25%,
            transparent 100%
          );
        }
      `}</style>
    </div>
  );
}
