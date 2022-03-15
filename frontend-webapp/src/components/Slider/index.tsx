import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function EmotionCSS() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={30} />
      <Slider
        defaultValue={30}
        css={css`
          color: #20b2aa;

          :hover {
            color: #2e8b57;
          }
        `}
      />
    </Box>
  );
}