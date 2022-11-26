import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';
import { useCallback, useState } from 'react';

import AutoComplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import { Chip } from '@mui/material';
import Input from '@components/molecules/kit/Input';
import SearchServices from '@services/search';
import TagType from '@typings/Tag';
import useBusiness from '@hooks/api/useBusiness';
import useDeepEffect from '@hooks/useDeepEffect';
import useToggle from '@hooks/useToggle';

const SettingTagsOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: business, refetch } = useBusiness();
  const { id, slug, tags: initialTags = [] } = business || {};

  const [isLoading, toggleLoading] = useToggle(false);
  const [tags, setTags] = useState<TagType[]>([]);
  const [searchedTags, setSearchedTags] = useState<TagType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEdited, setEdited] = useState<boolean>(false);

  useDeepEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({ tags: tags.map(({ id }) => id), slug, id })
        .then(() => {
          refetch();
          onClose();
        })
        .finally(toggleLoading);
    }
  };

  const searchTags = useCallback(async (search: string) => {
    const tags = await SearchServices.tags(search);
    setSearchedTags(tags);
  }, []);

  return (
    <Overlay
      title="مدیریت کلید واژه ها"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited }
      ]}>
      <Box p={5}>
        <AutoComplete
          freeSolo
          inputValue={inputValue}
          renderInput={(props) => <Input {...props} fullWidth autoFocus label="افزودن کلیدواژه" />}
          onChange={(e, value) => {
            if (!isEdited) setEdited(true);

            setInputValue('');
            if (value && typeof value !== 'string') setTags([...tags, value]);
          }}
          onInputChange={(e, input, reason) => {
            if (reason !== 'reset') {
              setInputValue(input);
              if (input) searchTags(input);
            }
          }}
          options={searchedTags}
          getOptionLabel={(tag) => (typeof tag === 'string' ? tag : tag.title)}
        />
        <Box py={4} display="flex" gap={2} flexWrap="wrap">
          {tags?.map((tag) => (
            <Chip
              size="small"
              key={tag.id}
              label={tag.title}
              onDelete={() => setTags(tags.filter(({ id }) => id !== tag.id))}
            />
          ))}
        </Box>
      </Box>
    </Overlay>
  );
};
export default SettingTagsOverlay;
