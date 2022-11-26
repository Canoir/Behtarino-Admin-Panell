import { stepsInfo } from '@constants/business';
import useBusiness from './api/useBusiness';
import useBusinessImages from './api/useBusinessImages';
import useDeepEffect from './useDeepEffect';
import { useState } from 'react';

export function useCheckStep() {
  const { data: businessImages } = useBusinessImages();
  const { data: selectedBusiness } = useBusiness();

  const [step, setStep] = useState<string[]>([]);

  useDeepEffect(() => {
    if (selectedBusiness) setStep(checkStep());
  }, [businessImages, selectedBusiness]);

  function checkStep(): string[] {
    const step: string[] = [];

    if (selectedBusiness?.title) step.push('title');

    if (selectedBusiness?.description) step.push('description');

    if (selectedBusiness?.website) step.push('website');

    if (selectedBusiness?.phone_zero_starts) step.push('phone');

    if (selectedBusiness?.address) step.push('address');

    if (selectedBusiness?.cover_image_url) step.push('cover_image');

    if (businessImages?.length) step.push('images');

    if (selectedBusiness?.tags?.length) step.push('tags');

    const result = Object.values(selectedBusiness?.working_hours || {}).every(
      (item) => item === null || item.length > 0
    );

    if (result) step.push('working_hours');

    if (
      selectedBusiness?.whatsapp_url &&
      selectedBusiness?.telegram_url &&
      selectedBusiness?.instagram_url
    )
      step.push('social_links');

    return step;
  }

  return { step, stepsInfo: stepsInfo };
}
