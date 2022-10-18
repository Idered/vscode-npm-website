import { AnimatePresence, motion } from "framer-motion";
import cx from "classnames";

export function DependencyListItem(props: {
  item: Dependency;
  initialAnimation: boolean;
}) {
  return (
    <motion.div
      initial={props.initialAnimation}
      animate={{
        opacity: [0, 0, 1],
        translateX: [-5, -5, 0],
        height: [0, 28, 28],
      }}
      exit={{
        opacity: [1, 0, 0],
        translateX: [0, -5, -5],
        height: [28, 28, 0],
      }}
      transition={{ duration: 0.5 }}
      className={cx("flex items-center px-5 h-7 transition-colors", {
        "text-[#f48771] bg-[rgba(228,84,84,0.11)]": props.item.isVulnerable,
      })}
    >
      <AnimatePresence>
        {props.item.isVulnerable && (
          <motion.svg
            className="icon flex-shrink-0 mr-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            animate={{
              opacity: [0, 0, 1],
              scale: [0, 0, 1],
              width: [0, 16, 16],
            }}
            exit={{
              opacity: [1, 0],
              scale: [1, 0],
              width: [16, 0],
              marginRight: [8, 0],
            }}
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M10.877 4.5v-.582a2.918 2.918 0 1 0-5.836 0V4.5h-.833L2.545 2.829l-.593.59l1.611 1.619l-.019.049a8.03 8.03 0 0 0-.503 2.831c0 .196.007.39.02.58l.003.045H1v.836h2.169l.006.034c.172.941.504 1.802.954 2.531l.034.055L2.2 13.962l.592.592l1.871-1.872l.058.066c.868.992 2.002 1.589 3.238 1.589c1.218 0 2.336-.579 3.199-1.544l.057-.064l1.91 1.92l.593-.591l-1.996-2.006l.035-.056c.467-.74.81-1.619.986-2.583l.006-.034h2.171v-.836h-2.065l.003-.044a8.43 8.43 0 0 0 .02-.58a8.02 8.02 0 0 0-.517-2.866l-.019-.05l1.57-1.57l-.592-.59L11.662 4.5h-.785zm-5 0v-.582a2.082 2.082 0 1 1 4.164 0V4.5H5.878zm5.697.837l.02.053c.283.753.447 1.61.447 2.528c0 1.61-.503 3.034-1.274 4.037c-.77 1.001-1.771 1.545-2.808 1.545c-1.036 0-2.037-.544-2.807-1.545c-.772-1.003-1.275-2.427-1.275-4.037c0-.918.164-1.775.448-2.528l.02-.053h7.229z"
              clip-rule="evenodd"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {props.item.isLoading && (
          <motion.div
            animate={{
              opacity: [0, 0, 1],
              scale: [0, 0, 1],
              width: [0, 16, 16],
            }}
            exit={{
              opacity: [1, 0],
              scale: [1, 0],
              width: [16, 0],
              marginRight: [8, 0],
            }}
            className="w-4 h-4 flex items-center justify-center mr-2"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                  <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-auto">{props.item.name}</div>
      <div className="opacity-70 text-[#e5e5e5]">{props.item.version}</div>
    </motion.div>
  );
}
