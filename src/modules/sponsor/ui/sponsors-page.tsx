'use client';

import { useTranslations } from 'next-intl';
import { toSortedSponsorEntries } from '@/modules/sponsor/lib/sponsor-list';
import { useSponsors } from '@/modules/sponsor/model/use-sponsors';
import { SITE_TRANSLATION_VALUES } from '@/shared/config/site-config';
import { ContentBrowserHeader } from '@/shared/ui/page/content-browser-header';
import { SponsorsWall } from './sponsors-wall';

export function SponsorsPage() {
  const t = useTranslations('sponsor');
  const { data, isLoading, error, retry } = useSponsors(t('states.error'));
  const entries = data ? toSortedSponsorEntries(data) : [];
  return (
    <div className="sponsors-page page-shell page-shell-stable" data-print-title={t('title')}>
      <div className="sponsors-page__inner page-shell-content">
        <ContentBrowserHeader
          title={t('title')}
          search={
            <p className="sponsors-page__subtitle">{t('subtitle', SITE_TRANSLATION_VALUES)}</p>
          }
        />
        <SponsorsWall
          entries={entries}
          error={error}
          isLoading={isLoading}
          retry={() => void retry()}
        />
      </div>
    </div>
  );
}
