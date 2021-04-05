import { useCallback, useState } from 'react';

import { useCommunities } from '../providers/CommunitiesProvider';

import useSetting from './useSetting';

export type SongsDownloadPreference = 'yes' | 'no' | 'never';

export interface SongsDownloadPreferencesPromptValue {
  open: boolean;
  preference?: SongsDownloadPreference;
  updatePreference(preference: SongsDownloadPreference): Promise<void>;
}

const getPreference = (storedValue?: boolean): SongsDownloadPreference => {
  if (typeof storedValue === 'undefined') {
    return 'no';
  }

  return storedValue ? 'yes' : 'never';
};

const useSongsDownloadPreferencesPrompt = (): SongsDownloadPreferencesPromptValue => {
  const [
    communitiesSongsDownloadPreferences,
    setCommunitiesSongsDownloadPreferences,
  ] = useSetting<Record<string, boolean | undefined>>(
    'communitiesSongsDownloadPreferences',
  );

  const { selectedCommunity } = useCommunities();

  const sessionStorageId = `songs-download-preference-${selectedCommunity?.id}-dismissed`;

  const [shouldBeOpen, setShouldBeOpen] = useState(
    !sessionStorage.getItem(sessionStorageId),
  );

  const updatePreference = useCallback<
    SongsDownloadPreferencesPromptValue['updatePreference']
  >(
    async (preference) => {
      if (!selectedCommunity) {
        return;
      }

      setShouldBeOpen(false);

      if (preference === 'no') {
        sessionStorage.setItem(sessionStorageId, 'true');
        return;
      }

      sessionStorage.removeItem(sessionStorageId);

      setCommunitiesSongsDownloadPreferences(
        (previousCommunitiesSongsDownloadPreferences) => ({
          ...previousCommunitiesSongsDownloadPreferences,
          [selectedCommunity.id]: preference === 'yes',
        }),
      );
    },
    [
      selectedCommunity,
      sessionStorageId,
      setCommunitiesSongsDownloadPreferences,
    ],
  );

  return {
    open:
      !!selectedCommunity &&
      shouldBeOpen &&
      typeof communitiesSongsDownloadPreferences?.[selectedCommunity.id] ===
        'undefined',
    preference:
      selectedCommunity &&
      typeof communitiesSongsDownloadPreferences !== 'undefined'
        ? getPreference(
            communitiesSongsDownloadPreferences?.[selectedCommunity.id],
          )
        : undefined,
    updatePreference,
  };
};

export default useSongsDownloadPreferencesPrompt;
