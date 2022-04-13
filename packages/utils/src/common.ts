const callToString = (e: any): string => Object.prototype.toString.call(e);

export const isNull = (obj): boolean => callToString(obj) === '[object Null]';

export const isUndefined = (obj): boolean =>
  callToString(obj) === '[object Undefined]';

export const isString = (obj): boolean =>
  callToString(obj) === '[object String]';

export const isNumber = (obj): boolean =>
  callToString(obj) === '[object Number]';

export const isBoolean = (obj): boolean =>
  callToString(obj) === '[object Boolean]';

export const isObject = (obj): boolean =>
  callToString(obj) === '[object Object]';

export const isArray = (obj): boolean => callToString(obj) === '[object Array]';

export const isPromise = (obj): boolean =>
  callToString(obj) === '[object Promise]';

const proxyDisabledHandler = {
  set(target, key) {
    return Reflect.get(target, key);
  },
  get(target, key) {
    if (isObject(target[key])) {
      return new Proxy(target[key], proxyDisabledHandler);
    }
    if (isArray(target[key])) {
      return target[key].map(item => {
        if (isObject(item)) {
          return new Proxy(item, proxyDisabledHandler);
        }
        return Reflect.get(target, key);
      });
    }
    return Reflect.get(target, key);
  },
};

/** 创建禁止修改代理对象 */
export const createDisabledProxy = <T>(obj: T): T => {
  if (!isObject(obj)) {
    return obj;
  }
  const proxy = new Proxy(obj, proxyDisabledHandler);

  return proxy;
};

interface FetchAllWithoutRejectOptions {
  parse: 'json' | 'text';
}
/** 无 catch promise all, catch 返回值为 0 */
export function PromiseAllWithoutReject(
  promises: Promise<any>[]
): Promise<any[]> {
  const results: any = [];
  return new Promise(resolve => {
    if (promises.length === 0) {
      resolve([]);
    }
    const done = () => {
      if (
        results.filter(item => !isUndefined(item)).length === promises.length
      ) {
        resolve(results);
      }
    };
    promises.forEach((p, index) => {
      p.then(res => {
        results[index] = res;
        done();
      }).catch(() => {
        results[index] = null;
        done();
      });
    });
  });
}
/** 无 catch fetch all, catch 返回值为 0 */
export function FetchAllWithoutReject(
  promises: Promise<Response>[],
  option: FetchAllWithoutRejectOptions = { parse: 'json' }
): Promise<any[]> {
  const results: any = [];
  return new Promise(resolve => {
    if (promises.length === 0) {
      resolve([]);
    }
    const done = () => {
      if (
        results.filter(item => !isUndefined(item)).length === promises.length
      ) {
        resolve(results);
      }
    };
    promises.forEach((p, index) => {
      p.then(res => res[option.parse]())
        .then(res => {
          results[index] = res;
          done();
        })
        .catch(() => {
          results[index] = 0;
          done();
        });
    });
  });
}

/** 判断是否为 vis 客户端 */
export function isVisClient(): boolean {
  return navigator.appName === 'NJT-VIS';
}
