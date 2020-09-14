import React from 'react';
import * as Icons from '@kun-ui/icons';
import styled from '@kun-ui/styled';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const IconWrap = styled.div`
  padding: 10px;
  svg {
    font-size: 40px;
  }
`;

function IconList() {
  return (
    <Wrap>
      {Object.entries(Icons).map(([key, Icon]) => (
        <IconWrap key={key}>
          <Icon />
        </IconWrap>
      ))}
    </Wrap>
  );
}

export default IconList;
