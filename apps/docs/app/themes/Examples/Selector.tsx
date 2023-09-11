import {
  Command,
  CommandGroup,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  classNames,
} from "@rafty/ui";
import { useState, ReactNode } from "react";
import { HiChevronUpDown } from "react-icons/hi2";

export function Selector({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setOpen} modal>
      <div className="relative flex items-center w-[100px]">
        <PopoverTrigger
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between capitalize"
          rightIcon={
            <HiChevronUpDown
              className={classNames(
                isOpen
                  ? "text-primary-500"
                  : "text-secondary-500 dark:text-secondary-400",
                "h-4 w-4 shrink-0 stroke-1",
              )}
            />
          }
        >
          {value}
        </PopoverTrigger>
      </div>
      <PopoverContent className="!p-0 !w-[120px]">
        <Command shouldFilter={false}>
          <CommandList className="!max-h-full">
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}