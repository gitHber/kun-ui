---
group:
  title: Utils 工具包
title: Transitions 动画
---

# Transitions 动画

## Collapse 折叠

<code src="./transitions/CollapseDemo.tsx" />

## CollapseSlide 折叠移入移出

<code src="./transitions/CollapseSlideDemo.tsx" />

## Fade 淡入淡出

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { Fade, Button } from '@kun-ui/core';
import { useToggle } from '@kun-ui/hooks';

export default () => {
  const [open, toggle] = useToggle(true);
  return (
    <>
      <Button onClick={() => toggle()} style={{ marginBottom: 10 }}>
        toggle
      </Button>
      <Fade in={open}>
        <div style={{ height: 100, width: 100, background: 'red' }} />
      </Fade>
    </>
  );
};
```

## Zoom 放大

<code src="./transitions/ZoomDemo.tsx" />

## Slide 移入移出

<code src="./transitions/SlideDemo.tsx" />

## [BaseProps](https://reactcommunity.org/react-transition-group/transition)

## Collapse Props

| 参数            | 说明       | 类型             | 默认值 |
| :-------------- | :--------- | :--------------- | :----- |
| collapsedHeight | 保留的高度 | string \| number | 0      |

## Zoom Props

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
| direction | 方向 | 'center' \| 'left' \| 'right' \|'top' \|'bottom' \|'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | center |
| attr | 属性 | 'width' \| 'height' \| 'both' | both |

## Slide Props

| 参数      | 说明     | 类型                                 | 默认值 |
| :-------- | :------- | :----------------------------------- | :----- |
| direction | 方向     | 'left' \| 'right' \|'top' \|'bottom' | center |
| movement  | 移动距离 | string                               | '10px' |
