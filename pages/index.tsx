import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import Logo from "../components/Logo";

export default function Home() {
  return (
    <div className="bg-black min-h-screen antialiased font-sans py-24 group">
      <Head>
        <link rel="stylesheet" href="/fonts/inter.css" type="text/css" />
      </Head>
      <div className="[background-image:url(/noise.png)] fixed inset-0 noise-mask pointer-events-none" />
      <div className="max-w-[1020px] mx-auto flex  items-center">
        <div className="flex-shrink-0 ">
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
                tabindex="-1"
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

        <div className="screenshot w-[380px] ml-auto overflow-hidden">
          <div className="screenshot-mask">
            <div className="mr-[-440px] mb-[-100px]">
              <Image src="/app.png" width={1842} height={1364} alt="" />
            </div>
          </div>
        </div>
      </div>

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
          clip-path: path(
            "M 0 0 L 360 0 L 360 300 C 360 510, 180 410, 0 510 z"
          );
          mask-image: linear-gradient(
            to right bottom,
            black 40%,
            white 0%,
            transparent 70%
          );
        }

        .global-mask {
          background: radial-gradient(transparent 0%, rgba(0, 0, 0, 0.9) 6%);
          transition: all 1s ease-in-out;
        }
        body:hover .global-mask {
          transform-origin: center;
          transform: scale(10.5) translateX(-4%) translateY(-4%);
        }
        .screenshot-mask {
          mask-image: linear-gradient(to right top, black 84%, transparent 92%);
        }
        .separator-mask {
          mask-image: linear-gradient(to right top, black, transparent 100%);
        }
        .noise-mask {
          mask-image: linear-gradient(to right bottom, black, transparent 100%);
        }
      `}</style>
    </div>
  );
}
