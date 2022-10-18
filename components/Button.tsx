import cx from "classnames";
export default function Button(
  props: React.PropsWithChildren<{
    className?: string;
    href?: string;
    tabIndex?: number;
  }>
) {
  return (
    <a
      {...props}
      href={props.href}
      className={cx(
        props.className,
        "border border-transparent bg-button text-white h-10 rounded-full inline-flex items-center px-12 font-medium "
      )}
    >
      {props.children}

      <style jsx>
        {`
          .bg-button {
            background: linear-gradient(
                  to right bottom,
                  #0c3f8b 0%,
                  #3d259e 100%
                )
                padding-box,
              linear-gradient(to right bottom, #6f63b8, #3b279d 50%) border-box;
          }
        `}
      </style>
    </a>
  );
}
