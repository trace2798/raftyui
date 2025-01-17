import { PlusIcon } from "@heroicons/react/24/outline";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components / Tooltip",
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>
        <Button size="fab">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">Tooltip Content</TooltipContent>
    </Tooltip>
  ),
};
