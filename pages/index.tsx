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
  const tl = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    const t1 = ScrollTrigger.create({
      trigger: ".editor",
      start: "50% 50%",
      end: "+=1000 top",
      id: "editor",
      scrub: true,
      markers: true,
      pin: document.querySelector(".screenshot"),
    });
    const t2 = ScrollTrigger.create({
      trigger: "[data-section]",
      start: "top 50%",
      id: "section-1",
      end: "bottom bottom",
      // end: "+=1000 top",
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        const q = "react-router";
        const nextQ = q
          .split("")
          .slice(0, q.length * self.progress * 1.5)
          .join("");
        setQuery(nextQ);
        setSuggestions(nextQ === q ? SUGGESTIONS : []);
        if (self.progress >= 0.9) {
          setQuery("");
          setSuggestions([]);
          setDependencies([
            ...DEPENDENCIES,
            {
              name: "react-router",
              version: "6.4.2",
              isLoading: true,
            },
          ]);
        }
        // if (self.progress >= 0.9) {
        //   setDependencies([
        //     ...DEPENDENCIES,
        //     {
        //       name: "react-router",
        //       version: "6.4.2",
        //       isLoading: false,
        //     },
        //   ]);
        // }
      },
      // onLeaveBack: () => {
      //   setQuery("react-router");
      //   setSuggestions(SUGGESTIONS);
      //   setDependencies(DEPENDENCIES);
      // },
    });

    return () => {
      t1.kill();
      t2.kill();
    };
    // tl.current
    //   .addLabel("start")
    //   // .from(screenshot.current, { scale: 0.3, rotation: 45 })
    //   // .addLabel("spin")
    //   .to(".editor", {
    //     width: "880",
    //   });
    // .to(document.querySelector(".screenshot"), {
    //   width: "880px",
    // });
    //   .addLabel("end")
    //   .to(screenshot.current.querySelector("*"), {
    //     // position: "fixed",
    //   });
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
          />
        </div>
      </div>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section
      >
        <h2 className="text-lime-400 font-bold text-4xl font-display">
          Autocomplete
          <span className="text-white">
            <br /> powered by Algolia
          </span>
        </h2>
      </section>

      <section
        className="min-h-screen max-w-[1020px] mx-auto flex items-center"
        data-section
      >
        <h2 className="text-lime-400 font-bold text-4xl font-display">
          Autocomplete
          <span className="text-white">
            <br /> powered by Algolia
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
