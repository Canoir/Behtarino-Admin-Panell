import { Typography, TypographyProps } from '@mui/material';

import { Link } from 'react-router-dom';
import { MAILS } from '@constants/test';

type Props = { children: string };
function WithLinkText(props: Props & TypographyProps) {
  const { children, ...typoProps } = props;
  //
  const separatedLink = (' ' + children + ' ').split(/(https:\/\/.*?)\s/g);

  return (
    <Typography {...typoProps} whiteSpace="pre-line" data-testId={MAILS.modal.details.text}>
      {separatedLink.map((textOrLink, mapIndex) =>
        mapIndex % 2 === 0 ? (
          <span key={mapIndex}>{textOrLink}</span>
        ) : (
          <Link data-testId={MAILS.link} to={textOrLink} key={mapIndex}>
            {textOrLink}
          </Link>
        )
      )}
    </Typography>
  );
}

export default WithLinkText;
