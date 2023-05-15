import { Meta, StoryObj } from "@storybook/react";
import { ComboBox, ComboboxItem } from "@rhino/combobox";

const meta: Meta<typeof ComboBox> = {
  title: "Form / ComboBox",

  args: {
    size: "md",
    variant: "outline",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["ghost", "solid", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ComboBox>;

export const Variants: Story = {
  render: ({ size, variant }) => {
    return (
      <div className="w-[500px]">
        <ComboBox
          size={size}
          variant={variant}
          label="Favorite Animal"
          onInputChange={(value) => console.log(value)}
        >
          <ComboboxItem key="red panda" textValue="red panda">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-5 h-5 bg-red-200">RP</div>Red Panda
            </div>
          </ComboboxItem>
          <ComboboxItem key="cat">Cat</ComboboxItem>
          <ComboboxItem key="dog">Dog</ComboboxItem>
          <ComboboxItem key="aardvark">Aardvark</ComboboxItem>
          <ComboboxItem key="kangaroo">Kangaroo</ComboboxItem>
          <ComboboxItem key="snake">Snake</ComboboxItem>
        </ComboBox>
      </div>
    );
  },
};
