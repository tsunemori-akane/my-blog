const responsiveMap = {
  xs: "(max-width: 575px)",
  sm: "(min-width: 576px) and (max-width: 767px)",
  md: "(min-width: 768px) and (max-width: 991px)",
  lg: "(min-width: 992px)",
} as const;

export type Breakpoint = keyof typeof responsiveMap;
export type ScreenMap = Partial<Record<Breakpoint, boolean>>;
export type SubscribeFunc = (
  screens: ScreenMap,
  breakpointChecked: Breakpoint
) => void;
export type MediaQueryResult = { matches: boolean };
export type MediaQueryListener = ({ matches }: MediaQueryResult) => void;
export type responsiveMapValue<T extends Object> = {
  [key in keyof T]: T[key];
}[keyof T];

class ResponsiveObserver {
  #uid: number;
  #subscribers: Array<{
    token: string;
    func: SubscribeFunc;
  }>;

  #screens: ScreenMap = {};

  #matchHandlers: Partial<
    Record<
      responsiveMapValue<typeof responsiveMap>,
      {
        mql: MediaQueryList;
        listener: MediaQueryListener;
      }
    >
  >;

  constructor() {
    this.#subscribers = [];
    this.#matchHandlers = {};
    this.#screens = {};
    this.#uid = 0;
  }

  #dispath(matches: boolean, screen: Breakpoint) {
    this.#screens = { ...this.#screens, [screen]: matches };
    this.#subscribers.forEach((item) => {
      item.func(this.#screens, screen);
    });
    return true;
  }

  #registerLisener() {
    (Object.keys(responsiveMap) as Breakpoint[]).forEach((e) => {
      const matchMediaQuery = responsiveMap[e];
      if (!matchMediaQuery) return;
      const listener = ({ matches }: MediaQueryResult) => {
        this.#dispath(matches, e);
      };
      const mql = window.matchMedia(matchMediaQuery);
      if (mql.addEventListener) {
        mql.addEventListener("change", listener);
      }
      this.#matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      };
      listener(mql);
    });
  }

  #unRegisterListener() {
    (Object.keys(responsiveMap) as Breakpoint[]).forEach((screen) => {
      const matchMediaQuery = responsiveMap[screen];
      if (!matchMediaQuery) return;
      const handler = this.#matchHandlers[matchMediaQuery];
      if (handler && handler.mql && handler.listener) {
        if (handler.mql.removeEventListener) {
          handler.mql.removeEventListener("change", handler.listener);
        }
      }
    });
  }

  subscribe(func: SubscribeFunc) {
    if (this.#subscribers.length === 0) {
      this.#registerLisener()
    }
    const token = "uid" + ++this.#uid
    this.#subscribers.push({
      token, func
    })
    func(this.#screens, null as unknown as Breakpoint);
    return token
  }

  unSubscribe(token: string) {
    const _subscriber = this.#subscribers.filter(item => {item.token !== token})
    if(_subscriber.length === 0) {
      this.#unRegisterListener()
    }
  }
}
const responsiveObserverInstance = new ResponsiveObserver()
export default responsiveObserverInstance
