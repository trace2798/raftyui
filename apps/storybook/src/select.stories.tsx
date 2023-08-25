import { Meta, StoryObj } from "@storybook/react";
import { Select, SelectItem, Label } from "@rafty/ui";

const meta: Meta<typeof Select> = {
  title: "Form / Select",
  args: {
    variant: "outline",
    size: "md",
    isDisabled: false,
    isRequired: false,
    isReadOnly: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: ({ variant, size, isDisabled, isRequired, isReadOnly }) => (
    <div className="w-[500px]">
      <Label isRequired={isRequired}>select</Label>
      <Select
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
      >
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </Select>
    </div>
  ),
};