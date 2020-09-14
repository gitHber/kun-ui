---
group:
  title: Feedback 用户反馈
title: Spin 加载中
---

# Spin 加载中

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Spin, Button } from '@kun-ui/core';
import { useToggle } from '@kun-ui/hooks';
import styled from '@kun-ui/styled';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => {
  const [spinning, toggle] = useToggle(false);

  return (
    <>
      <Button color="question" onClick={toggle}>
        toggle
      </Button>
      <div style={{ padding: 20 }}>
        <Spin spinning={spinning}>
          <div>Hello world</div>
        </Spin>
      </div>
    </>
  );
};
```

## Props

| 参数      | 说明         | 类型            | 默认值 |
| :-------- | :----------- | :-------------- | :----- |
| spinning  | 加载中       | boolean         |        |
| indicator | loading 组件 | React.ReactNode |        |
