import { Dispatch, useCallback } from 'react';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '../helpers/db';

export type SetSettingFunction<T> = (prevState?: T) => T;

export type SetSettingAction<T> = T | SetSettingFunction<T>;

const useSetting = <T = unknown>(
  key: string,
): [T | null | undefined, Dispatch<SetSettingAction<T | null>>] => {
  // Note: Dexie returns undefined if an element doesn't exist.
  // However, we want to return undefined while the element is loading
  // and null if the element doesn't exist. For this reason, we set the default
  // value to null while loading and then we basically invert the value.
  const dbSetting = useLiveQuery(() => db.settings.get(key), [], null);

  const setting =
    dbSetting === null ? undefined : (dbSetting?.value as T) || null;

  const setSetting = useCallback<Dispatch<SetSettingAction<T | null>>>(
    (newValue) => {
      db.settings.put({
        key,
        value:
          typeof newValue === 'function'
            ? (newValue as SetSettingFunction<T | null>)(setting)
            : newValue,
      });
    },
    [key, setting],
  );

  return [setting, setSetting];
};

export default useSetting;
