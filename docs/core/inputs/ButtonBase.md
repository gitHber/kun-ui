---
group:
  title: Inputs 输入框
title: ButtonBase 按钮
---

# ButtonBase 按钮

```tsx
/**
 * title: 基本使用
 */

import React from 'react';
import { ButtonBase, IconButton } from '@kun-ui/core';
import { Delete } from '@kun-ui/icons';
const Space = () => <span style={{ marginLeft: 10 }}></span>;

export default () => (
  <>
    <ButtonBase variant="contained">Contained</ButtonBase>
  </>
);
```

## Props

| 参数             | 说明                   | 类型                                | 默认值    |
| :--------------- | :--------------------- | :---------------------------------- | :-------- |
| variant          | 按钮类型               | 'contained' \| 'outlined' \| 'text' | contained |
| size             | 按钮尺寸               | 'small' \| 'medium' \| 'large'      | medium    |
| sizeOpt          | 按钮尺寸配置           | SizeOpt                             |
| disabled         | 禁用                   | boolean                             | false     |
| disableElevation | 禁用阴影，按钮变得扁平 | boolean                             | false     |
| href             | 变成 a 标签，添加 href | string                              |           |
| startIcon        | 前置 icon              | ReactNode                           |           |
| endIcon          | 后置 icon              | ReactNode                           |           |
