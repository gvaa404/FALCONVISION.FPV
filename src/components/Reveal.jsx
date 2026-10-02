import { useReveal } from "../hooks";

/**
 * Wraps content and fades/slides it in when scrolled into view.
 * className is applied to the outer wrapper so it can participate
 * in grid/flex layouts.
 */
export default function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`${className} reveal${visible ? " is-visible" : ""}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
