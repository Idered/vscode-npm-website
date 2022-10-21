import Button from "../components/Button";
import Logo from "../components/Logo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Editor from "./editor";
import { DEPENDENCIES, SUGGESTIONS } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [query, setQuery] = useState("");
  const [dependencies, setDependencies] = useState<Dependency[]>(DEPENDENCIES);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [packageJsonFiles, setPackageJsonFiles] = useState([
    {
      name: "package.json",
    },
  ]);
  const [packageJsonFile, setPackageJsonFile] = useState("");
  const tl = useRef<gsap.core.Timeline>(null);
  const q = "react-r";
  const installedPackage = "react-router-dom";

  useEffect(() => {
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
    const defaults = {
      start: "top 0",
      end: "+=100%",
      pinSpacing: false,
      scrub: true,
      pin: true,
    };

    register(
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
        pinSpacing: true,
        trigger: "[data-section='4']",
        animation: gsap.to('[data-section="4"]', titleAnimation),
        onUpdate: (self) => {
          setPackageJsonFile("package.json");
        },
        onLeaveBack: () => {
          setPackageJsonFile("");
        },
      })
    );

    return () => {
      instances.forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className=" group ">
      {/* <div className="[background-image:url(/noise.png)] fixed inset-0 noise-mask pointer-events-none" /> */}
      <div className="max-w-[1020px] mx-auto min-h-screen flex items-center">
        <div className="flex-shrink-0">
          <div className="relative z-50 inline-block">
            <Logo />
            {/* <div className="w-[200vw] h-[200vh] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 global-mask z-50"></div> */}
          </div>
          <h1 className=" font-semibold leading-[3.5rem] text-5xl headline mt-6 font-display">
            Node Dependencies UI <br /> for VS Code
          </h1>

          <div className="flex space-x-4 items-center mt-12 ">
            <div className="relative">
              <Button
                href="vscode:extension/idered.npm"
                className="peer relative z-10"
              >
                Install
              </Button>
              <Button
                aria-hidden="true"
                tabIndex={-1}
                href="vscode:extension/idered.npm"
                className="absolute left-0 blur-lg transition-transform peer-hover:scale-x-105 peer-hover:scale-y-125 peer-active:scale-75 duration-500"
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

        <div className="screenshot w-[360px] ml-auto grid justify-end">
          <Editor
            className="editor min-w-[368px]"
            query={query}
            dependencies={dependencies}
            suggestions={suggestions}
            suggestionIndex={suggestionIndex}
            packageJsonFile={packageJsonFile}
            packageJsonFiles={packageJsonFiles}
          />
        </div>
      </div>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="1"
      >
        <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
          Autocomplete
          <span className="text-white">
            <br /> powered by Algolia
          </span>
        </h2>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="2"
      >
        <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
          Supports
          <span className="text-white">
            <br /> npm, yarn and pnpm
          </span>
        </h2>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="3"
      >
        <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
          Security Audit
          <span className="text-white">
            <br /> running in background
          </span>
        </h2>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section="4"
      >
        <h2 className="text-[#33e6cb] font-bold text-4xl font-display">
          Monorepo
          <span className="text-white">
            <br /> easy to manage
          </span>
        </h2>
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
        .screenshot {
          /* clip-path: path(
            "M 0 0 L 360 0 L 360 300 C 360 510, 180 410, 0 510 z"
          ); */
          /* mask-image: linear-gradient(
            to right bottom,
            black 40%,
            white 0%,
            transparent 70%
          ); */
        }

        .global-mask {
          background: radial-gradient(transparent 0%, rgba(0, 0, 0, 0.9) 6%);
          transition: all 1s ease-in-out;
        }
        body:hover .global-mask {
          transform-origin: center;
          transform: scale(10.5) translateX(-4%) translateY(-4%);
        }
         {
          /* .screenshot-mask {
          mask-image: linear-gradient(to right top, black 84%, transparent 92%);
        }
        .separator-mask {
          mask-image: linear-gradient(to right top, black, transparent 100%);
        }
        .noise-mask {
          mask-image: linear-gradient(to right bottom, black, transparent 100%);
        } */
        }
      `}</style>
    </div>
  );
}
