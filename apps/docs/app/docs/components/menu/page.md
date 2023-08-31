---
title: Menu
pageTitle: Menu - Rafty UI
description: Menu
---

## Import

An accessible dropdown menu for the common dropdown menu button design pattern. Menu uses roving tabIndex for focus management.

```jsx
import { Menu, MenuTrigger, MenuContent, MenuContent, MenuSeparator, MenuRadioGroup, MenuLabel, MenuRadioItem } from "@rafty/ui";

() => (
  <Menu>
    <MenuTrigger />
    <MenuContent>
      <MenuItem />
      <MenuSeparator />
      <MenuCheckboxItem />
      <MenuSeparator />
      <MenuLabel />
      <MenuRadioGroup>
        <MenuRadioItem />
      </MenuRadioGroup>
    </MenuContent>
  </Menu>
);
```

## Usage

{% example name="menu:usage" /%}

## SubMenu

{% example name="menu:submenu" /%}

## MenuCheckboxItem

{% example name="menu:menu_checkbox_item" /%}

## MenuRadioGroup

{% example name="menu:radio_group" /%}

## Barebone

Pass `isBarebone` prop to remove all style in Menu.

## UnStyled

Pass ` isUnstyled` prop to remove style from a particulart sub component.

{% example name="menu:unstyled" /%}

### API

---

### Root

| Property      | Description                        | Type             | Default          |
| ------------- | ---------------------------------- | ---------------- | ---------------- |
| className     |                                    | `string`         |                  |
| isBarebone    | Removes style from whole component | `boolean`        | false            |
| asChild       |                                    | `boolean`        | false            |
| defaultValue  |                                    | `string`         | No default value |
| value         |                                    | `string`         | No default value |
| onValueChange |                                    | `function`       | No default value |
| dir           |                                    | `ltr`/ `rtl`     | No default value |
| loop          |                                    | `boolean`        | false            |
| size          |                                    | `sm`\ `md`\ `lg` | `md`             |

### Menu

| Property   | Description | Type      | Default |
| ---------- | ----------- | --------- | ------- |
| className  |             | `string`  |         |
| isBarebone |             | `boolean` | false   |
| asChild    |             | `boolean` | false   |
| value      |             | `string`  |         |

### Trigger

| Property           | Description                  | Type                                        | Default |
| ------------------ | ---------------------------- | ------------------------------------------- | ------- |
| className          |                              | `string`                                    |         |
| isActive           |                              | `bollean`                                   | false   |
| itemScope          |                              | `boolean`                                   | false   |
| isLoading          |                              | `boolean`                                   | false   |
| isUnstyled         | Removes style from component | `boolean`                                   | false   |
| isDisabled         |                              | `boolean`                                   | false   |
| asChild            |                              | `boolean`                                   | false   |
| [data-state]       |                              | `open` / `closed`                           |         |
| [data-highlighted] |                              | `Present when highlighted`                  |         |
| [data-disabled]    |                              | `Present when disabled`                     |         |
| size               |                              | `sm`/ `md`/ `lg` / `icon` / `fab`           | `md`    |
| variant            |                              | `solid` / `outline` / `ghost` / `undefined` |         |
| leftIcon           |                              | `JSX.Element` / `undefined `                |         |
| RightIcon          |                              | `JSX.Element` / `undefined `                |         |

### Content

| Property             | Description                  | Type                                | Default          |
| -------------------- | ---------------------------- | ----------------------------------- | ---------------- |
| className            |                              | `string`                            |                  |
| isUnstyled           | Removes style from component | `boolean`                           | false            |
| asChild              |                              | `boolean`                           | false            |
| loop                 |                              | `boolean`                           | false            |
| onCloseAutoFocus     |                              | `function`                          | No default value |
| onEscapeKeyDown      |                              | `function`                          | No default value |
| onPointerDownOutside |                              | `function`                          | No default value |
| onFocusOutside       |                              | `function`                          | No default value |
| onInteractOutside    |                              | `function`                          | No default value |
| forceMount           |                              | `boolean `                          | No default value |
| side                 |                              | `partial` / `always`                | "bottom"         |
| sideOffset           |                              | `number `                           | 0                |
| align                |                              | `partial` / `always`                | "center"         |
| alignOffset          |                              | `number `                           | 0                |
| avoidCollisions      |                              | `boolean`                           | true             |
| collisionBoundary    |                              | `Boundary`                          | []               |
| collisionPadding     |                              | `number` / `Padding`                | 0                |
| arrowPadding         |                              | `number `                           | 0                |
| sticky               |                              | `partial` / `always`                | "partial"        |
| hideWhenDetached     |                              | `boolean `                          | false            |
| [data-state]         |                              | `open` / `closed `                  |
| [data-side]          |                              | `left` / `right` / `bottom` / `top` |                  |
| [data-align]         |                              | `start` / `end` / `center`          |                  |

### Arrow

| Property  | Description | Type      | Default |
| --------- | ----------- | --------- | ------- |
| className |             | `string`  |         |
| asChild   |             | `boolean` | false   |
| width     |             | `number`  | 10      |
| height    |             | `number`  | 5       |

### Item

| Property           | Description                  | Type                     | Default          |
| ------------------ | ---------------------------- | ------------------------ | ---------------- |
| className          |                              | `string`                 |                  |
| isUnstyled         | Removes style from component | `boolean`                | false            |
| asChild            |                              | `boolean`                | false            |
| disabled           |                              | `boolean`                | No default value |
| onSelect           |                              | `function`               | No default value |
| textValue          |                              | `string`                 | No default value |
| [data-highlighted] |                              | Present when highlighted |                  |
| [data-disabled]    |                              | Present when disabled    |                  |

### Group

| Property  | Description | Type      | Default |
| --------- | ----------- | --------- | ------- |
| className |             | `string`  |         |
| asChild   |             | `boolean` | false   |

### Label

| Property   | Description                  | Type      | Default |
| ---------- | ---------------------------- | --------- | ------- |
| isUnstyled | Removes style from component | `boolean` | false   |
| className  |                              | `string`  |         |
| asChild    |                              | `boolean` | false   |

### CheckboxItem

| Property           | Description                  | Type                        | Default          |
| ------------------ | ---------------------------- | --------------------------- | ---------------- |
| className          |                              | `string`                    |                  |
| isUnstyled         | Removes style from component | `boolean`                   | false            |
| asChild            |                              | `boolean`                   | false            |
| checked            |                              | `boolean` / `indeterminate` | No default value |
| onCheckedChange    |                              | `function`                  | No default value |
| disabled           |                              | `boolean`                   | No default value |
| onSelect           |                              | `function`                  | No default value |
| textValue          |                              | `string`                    | No default value |
| [data-state]       |                              | `checked` / `unchecked `    |                  |
| [data-highlighted] |                              | Present when highlighted    |                  |
| [data-disabled]    |                              | Present when disabled       |                  |

### RadioGroup

| Property      | Description | Type       | Default          |
| ------------- | ----------- | ---------- | ---------------- |
| className     |             | `string`   |                  |
| asChild       |             | `boolean`  | false            |
| value         |             | `string`   | No default value |
| onValueChange |             | `function` |                  |

### RadioItem

| Property   | Description                  | Type       | Default          |
| ---------- | ---------------------------- | ---------- | ---------------- |
| className  |                              | `string`   |                  |
| isUnstyled | Removes style from component | `boolean`  | false            |
| asChild    |                              | `boolean`  | false            |
| value      |                              | `string`   | No default value |
| disabled   |                              | `boolean`  | No default value |
| onSelect   |                              | `function` | No default value |
| textValue  |                              | `string`   |                  |

### Separator

| Property  | Description | Type      | Default |
| --------- | ----------- | --------- | ------- |
| className |             | `string`  |         |
| asChild   |             | `boolean` | false   |

### Sub

| Property     | Description | Type       | Default          |
| ------------ | ----------- | ---------- | ---------------- |
| className    |             | `string`   |                  |
| defaultOpen  |             | `boolean`  | No default value |
| open         |             | `boolean`  | No default value |
| onOpenChange |             | `function` |                  |

### SubTrigger

| Property           | Description                  | Type                     | Default          |
| ------------------ | ---------------------------- | ------------------------ | ---------------- |
| className          |                              | `string`                 |                  |
| isUnstyled         | Removes style from component | `boolean`                | false            |
| asChild            |                              | `boolean`                | false            |
| disabled           |                              | `boolean`                | No default value |
| textValue          |                              | `string`                 | No default value |
| [data-state]       |                              | `open` / `closed`        |                  |
| [data-highlighted] |                              | Present when highlighted |                  |
| [data-disabled]    |                              | Present when disabled    |                  |

### SubContent

| Property             | Description                  | Type                                | Default          |
| -------------------- | ---------------------------- | ----------------------------------- | ---------------- |
| className            |                              | `string`                            |                  |
| isUnstyled           | Removes style from component | `boolean`                           | false            |
| asChild              |                              | `boolean`                           | false            |
| loop                 |                              | `boolean`                           | false            |
| onEscapeKeyDown      |                              | `function`                          | No default value |
| onPointerDownOutside |                              | `function`                          | No default value |
| onFocusOutside       |                              | `function`                          | No default value |
| onInteractOutside    |                              | `function`                          | No default value |
| forceMount           |                              | `boolean`                           | No default value |
| sideOffset           |                              | `number`                            | 0                |
| alignOffset          |                              | `number`                            | 0                |
| avoidCollisions      |                              | `boolean`                           | true             |
| collisionBoundary    |                              | `Boundary`                          | []               |
| collisionPadding     |                              | `number` / `Padding`                | 0                |
| arrowPadding         |                              | `number`                            | 0                |
| sticky               |                              | `partial` / `always`                | partial          |
| hideWhenDetached     |                              | `boolean`                           | false            |
| [data-state]         |                              | `open` / `closed`                   |
| [data-side]          |                              | `left` / `right` / `bottom` / `top` |
| [data-align]         |                              | `start` / `end` / `center`          |
| [data-orientation]   |                              | `vertical` / `horizontal`           |