/**
 * title: 基本使用
 */

import React, { useState } from 'react';
import { Collapse, Button } from '@kun-ui/core';
import { useToggle } from '@kun-ui/hooks';
import { HuatuoLogo } from '@kun-ui/icons';

export default () => {
  const [open, toggle] = useToggle(true);

  return (
    <>
      <Button onClick={() => toggle()} style={{ marginBottom: 10 }}>
        toggle
      </Button>
      <div style={{ display: 'flex' }}>
        <Collapse
          in={open}
          timeout={{
            appear: 300,
            enter: 0,
            exit: 0,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(0,0,0,.1)',
              overflow: 'hidden',
            }}
          >
            <HuatuoLogo style={{ fontSize: 100 }} />
          </div>
        </Collapse>
        <span style={{ marginRight: 10 }}></span>
        <Collapse
          in={open}
          collapsedHeight={20}
          timeout={{
            appear: 300,
            enter: 0,
            exit: 0,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(0,0,0,.1)',
              overflow: 'hidden',
            }}
          >
            <HuatuoLogo style={{ fontSize: 100 }} />
          </div>
        </Collapse>
      </div>
    </>
  );
};
