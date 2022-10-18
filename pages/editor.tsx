import { useEffect, useRef } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { DependencyListItem } from "../components/DependencyListItem";

type PropTypes = {
  query: string;
  className?: string;
  dependencies: Dependency[];
  suggestions: Suggestion[];
};

export default function Editor(props: PropTypes) {
  const { suggestions = [], query, dependencies = [] } = props;
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  for (const item of suggestions) {
    item["highlight"] = item.name.replace(query, `<em>${query}</em>`);
  }

  return (
    <div className={cx("text-[13px]", props.className)}>
      <div className="rounded-lg bg-black border-t border-t-white/40 flex flex-wrap h-[400px]">
        <div className="p-2 flex space-x-2 basis-full">
          <div className="w-3 h-3 bg-[#EC6A5E] rounded-full"></div>
          <div className="w-3 h-3 bg-[#F6BF4F] rounded-full"></div>
          <div className="w-3 h-3 bg-[#61C654] rounded-full"></div>
        </div>
        <div className="text-[#999999] flex flex-col  basis-12">
          <div className="w-12 h-12 p-[3px] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17.5 0h-9L7 1.5V6H2.5L1 7.5v15.07L2.5 24h12.07L16 22.57V18h4.7l1.3-1.43V4.5L17.5 0zm0 2.12l2.38 2.38H17.5V2.12zm-3 20.38h-12v-15H7v9.07L8.5 18h6v4.5zm6-6h-12v-15H16V6h4.5v10.5z"
              />
            </svg>
          </div>
          <div className="w-12 h-12 p-[3px] flex items-center justify-center border-x-2 border-r-transparent text-white">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.876.64a1.75 1.75 0 0 0-1.75 0l-8.25 4.762a1.75 1.75 0 0 0-.875 1.515v9.525c0 .625.334 1.203.875 1.515l8.25 4.763a1.75 1.75 0 0 0 1.75 0l8.25-4.762a1.75 1.75 0 0 0 .875-1.516V6.917a1.75 1.75 0 0 0-.875-1.515L12.876.639zm-1 1.298a.25.25 0 0 1 .25 0l7.625 4.402l-7.75 4.474l-7.75-4.474l7.625-4.402zM3.501 7.64v8.803c0 .09.048.172.125.216l7.625 4.402v-8.947L3.501 7.64zm9.25 13.421l7.625-4.402a.25.25 0 0 0 .125-.216V7.639l-7.75 4.474v8.947z"
              />
            </svg>
          </div>
          <div className="w-12 h-12 p-[3px] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M15.25 0a8.25 8.25 0 0 0-6.18 13.72L1 22.88l1.12 1l8.05-9.12A8.251 8.251 0 1 0 15.25.01V0zm0 15a6.75 6.75 0 1 1 0-13.5a6.75 6.75 0 0 1 0 13.5z"
              />
            </svg>
          </div>
        </div>
        <div className="basis-80 text-[#e5e5e5] h-full">
          <div className="uppercase text-[11px] pl-5 leading-9">
            Node Dependencies
          </div>
          <div className="mx-5 relative">
            <div
              className={cx(
                "flex items-center bg-[rgb(15,14,14)] border border-[rgb(15,14,14)] px-2",
                {
                  "border-[#ad9cff] z-20 relative": query,
                }
              )}
            >
              <div
                className={cx(
                  "bg-transparent text-[13px] h-6 basis-full outline-none flex items-center",
                  {
                    "text-[rgba(229,229,229,0.5)]": !query,
                  }
                )}
              >
                {query || "Add dependency"}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"
                />
              </svg>
            </div>
            {!!suggestions.length && (
              <div className="absolute z-10 -mt-px inset-x-0 border border-[#444] p-px bg-black text-[rgba(229,229,229,0.7)]">
                {suggestions.map((item) => (
                  <div
                    key={item.name}
                    className={cx("px-3 py-2 flex flex-wrap items-center", {
                      "bg-[#444] selected": item.name === query,
                    })}
                  >
                    <div
                      className="[&_em]:text-[#d7ba7d] [&_em]:font-bold [&_em]:not-italic basis-full text-white"
                      dangerouslySetInnerHTML={{
                        __html: `${item.highlight}@${item.version}`,
                      }}
                    />
                    <div className="my-1 basis-full [.selected_&]:text-white">
                      {item.description}
                    </div>
                    <svg viewBox="0 0 16 16" width="16" height="16">
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M11.957 6h.05a2.99 2.99 0 0 1 2.116.879a3.003 3.003 0 0 1 0 4.242a2.99 2.99 0 0 1-2.117.879v-1a2.002 2.002 0 0 0 0-4h-.914l-.123-.857a2.49 2.49 0 0 0-2.126-2.122A2.478 2.478 0 0 0 6.231 5.5l-.333.762l-.809-.189A2.49 2.49 0 0 0 4.523 6c-.662 0-1.297.263-1.764.732A2.503 2.503 0 0 0 4.523 11h.498v1h-.498a3.486 3.486 0 0 1-2.628-1.16a3.502 3.502 0 0 1 1.958-5.78a3.462 3.462 0 0 1 1.468.04a3.486 3.486 0 0 1 3.657-2.06A3.479 3.479 0 0 1 11.957 6zm-5.25 5.121l1.314 1.314V7h.994v5.4l1.278-1.279l.707.707l-2.146 2.147h-.708L6 11.829l.707-.708z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="ml-1 text-xs">{item.downloads}</span>
                    {item.gzip && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        className="ml-4 relative -top-px "
                      >
                        <path
                          d="M15.9471 13.9331L13.6649 4.80406C13.5461 4.32937 13.1511 4.00031 12.7002 4.00031H9.98958C10.3061 3.58125 10.5008 3.06531 10.5008 2.5C10.5008 1.11937 9.38145 0 8.00083 0C6.6202 0 5.50083 1.11937 5.50083 2.5C5.50083 3.06531 5.69552 3.58125 6.01208 4H3.30145C2.85052 4 2.4552 4.32938 2.33677 4.80375L0.0545784 13.9331C-0.205734 14.9741 0.512703 16 1.50177 16H14.5002C15.489 16 16.2074 14.9741 15.9471 13.9331V13.9331ZM6.50083 2.5C6.50083 1.67281 7.17364 1 8.00083 1C8.82802 1 9.50083 1.67281 9.50083 2.5C9.50083 3.32719 8.82802 4 8.00083 4C7.17364 4 6.50083 3.32719 6.50083 2.5ZM14.853 14.81C14.7852 14.8966 14.6693 15 14.4999 15H1.50177C1.33239 15 1.21645 14.8969 1.14864 14.81C1.01458 14.6384 0.968328 14.4012 1.02489 14.1756L3.30708 5.04656C3.31364 5.02063 3.32333 5.00531 3.32052 5.00031H12.674C12.6802 5.00844 12.6886 5.02281 12.6946 5.04656L14.9768 14.1756C15.0333 14.4012 14.9871 14.6384 14.853 14.81V14.81Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                    <span className="ml-1 text-xs">{item.gzip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="uppercase text-[11px] pl-5 leading-4 font-medium mb-1 pt-4">
            Dependencies
          </div>
          <AnimatePresence>
            {dependencies
              .filter((item) => !item.isDev)
              .map((item) => (
                <DependencyListItem
                  item={item}
                  key={item.name}
                  initialAnimation={mounted.current}
                />
              ))}
          </AnimatePresence>
          <div className="uppercase text-[11px] pl-5 leading-4 mt-4 font-medium mb-1">
            Dev Dependencies
          </div>
          <AnimatePresence>
            {dependencies
              .filter((item) => item.isDev)
              .map((item) => (
                <DependencyListItem
                  item={item}
                  key={item.name}
                  initialAnimation={mounted.current}
                />
              ))}
          </AnimatePresence>
        </div>
        <div className="basis-auto flex-grow bg-[#151515]"></div>
      </div>
      {/* <img src="/app.png" width={1842} height={1364} alt="" /> */}
    </div>
  );
}
