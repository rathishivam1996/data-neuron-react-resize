import { RefObject } from "react";
import {
  ResizeObserver as Pollyfill,
  ResizeObserverEntry,
} from "@juggle/resize-observer";
import useLatest from "../useLatest";
import usePassiveLayoutEffect from "../usePassiveLayoutEffect";

const ResizeObserver =
  typeof window !== "undefined" && "ResizeObserver" in window
    ? window.ResizeObserver
    : Pollyfill;

function useResizeObserver<T extends HTMLElement>(
  target: RefObject<T>,
  callback: UseResizeObserverCallback,
): Pollyfill {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);

  usePassiveLayoutEffect(() => {
    let didUnsubscribe = false;

    const element = target && "current" in target ? target.current : target;
    if (!target) return;

    function cb(entry: ResizeObserverEntry, observer: Pollyfill) {
      if (didUnsubscribe) return;
      storedCallback.current(entry, observer);
    }

    (     )
  });

  return resizeObserver.observer;
}

function createResizeObserver() {
  let isTicking = false;
  let allEntries: Array<ResizeObserverEntry> = [];

  const callbackMap = new Map<any, Array<UseResizeObserverCallback>>();

  const observer = new ResizeObserver(
    (entries: ResizeObserverEntry[], observer: Pollyfill) => {
      allEntries = allEntries.concat(entries);

      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const triggered = new Set<Element>();
          for (let i = 0; i < allEntries.length; i++) {
            if (triggered.has(allEntries[i].target)) continue;
            triggered.add(allEntries[i].target);
            const cbs = callbackMap.get(allEntries[i].target);

            cbs?.forEach((cb) => cb(allEntries[i], observer));
          }
          allEntries = [];
          isTicking = false;
        });
      }
      isTicking = true;
    },
  );
  return {
    observer,
    subscribe: (
      target: HTMLElement,
      currCallback: UseResizeObserverCallback,
    ) => {
      observer.observe(target);
      const prevCbs = callbackMap.get(target) ?? [];
      prevCbs.push(currCallback);
      callbackMap.set(target, prevCbs);
    },
    unsubscribe: (
      target: HTMLElement,
      callback: UseResizeObserverCallback,
    ) => {},
  };
}

let _resizeObserver: ReturnType<typeof createResizeObserver>;

const getResizeObserver = () =>
  !_resizeObserver
    ? (_resizeObserver = createResizeObserver())
    : _resizeObserver;

type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: Pollyfill,
) => any;
