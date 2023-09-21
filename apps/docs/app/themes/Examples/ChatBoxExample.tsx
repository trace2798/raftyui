import { useRef, useReducer, ReactNode } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  InputField,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  classNames,
} from "@rafty/ui";
import { BiSend } from "react-icons/bi";
import { HiCheck, HiOutlinePlus } from "react-icons/hi";

const USERS_DATA = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "m@example.com",
  },
  {
    id: 2,
    name: "Issabella Nguyen",
    email: "isabella.nguyen@example.com",
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma@example.com",
  },
  {
    id: 4,
    name: "Jackson Lee",
    email: "p@example.com",
  },
  {
    id: 5,
    name: "William Kim",
    email: "will@email.com",
  },
];

export function ChatBoxExample() {
  const ref = useRef<HTMLInputElement | null>(null);

  const [messages, dispatch] = useReducer((prev: string[]) => {
    // Checking for reference
    if (!ref.current) return prev;

    // Checking if there is a message
    const value = ref.current.value;
    if (value == "") return prev;

    const tmp = [...prev, value];
    ref.current.value = "";

    return tmp;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Avatar
          name={USERS_DATA[3].name}
          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${USERS_DATA[3].name}&backgroundColor=ffdfbf,ffd5dc,c0aede,d1d4f9,b6e3f4`}
        />
        <div>
          <Text className="text-sm font-semibold leading-tight">
            Jackson Lee
          </Text>
          <Text className="text-secondary-500 text-sm leading-tight">
            p@example.com
          </Text>
        </div>
        <div className="flex-1" />
        <NewMessageDialog />
      </div>
      <div className="space-y-3">
        <Message className="bg-secondary-100 dark:bg-secondary-800">
          Hi, how can I help you today?
        </Message>
        <div className="flex flex-row-reverse">
          <Message className="bg-primary-500 dark:bg-primary-300/90 dark:!text-secondary-900 !text-white dark:!font-semibold">
            Hey, I&apos;m having trouble with my account.
          </Message>
        </div>
        <Message className="bg-secondary-100 dark:bg-secondary-800">
          What seems to be the problem?
        </Message>
        <div className="flex flex-row-reverse">
          <Message className="bg-primary-500 dark:bg-primary-300/90 dark:!text-secondary-900 !text-white dark:!font-semibold">
            I can&apos;t log in.
          </Message>
        </div>
        {messages &&
          messages.map((message, index) => (
            <div key={index} className="flex flex-row-reverse">
              <Message className="bg-primary-500 dark:bg-primary-300/90 dark:!text-secondary-900 !text-white dark:!font-semibold">
                {message}
              </Message>
            </div>
          ))}
      </div>
      <div className="flex items-center gap-2">
        <InputField
          ref={ref}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && dispatch()}
          className="placeholder:text-sm"
        />
        <Button
          size="icon"
          colorScheme="primary"
          className="!p-2"
          onClick={dispatch}
        >
          <BiSend size={20} />
        </Button>
      </div>
    </div>
  );
}

function NewMessageDialog() {
  const [selected, dispatch] = useReducer((prev: number[], cur: number) => {
    const index = prev.findIndex((num) => num === cur);

    if (index === -1) prev.push(cur);
    else prev.splice(index, 1);

    return [...prev].sort();
  }, []);

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger size="fab" variant="outline" className="!p-2">
            <HiOutlinePlus size={16} />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>New message</TooltipContent>
      </Tooltip>
      <DialogOverlay />
      <DialogContent className="dark:!bg-secondary-900 !p-0">
        <DialogHeader className="!p-4">
          <DialogTitle>New message</DialogTitle>
          <Text className="text-sm leading-tight opacity-60">
            Invite a user to this thread. This will create a new group message.
          </Text>
        </DialogHeader>
        <Command className="dark:border-secondary-700 dark:!bg-secondary-900 !rounded-none border-y">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {USERS_DATA.map((user, index) => (
                <CommandItem
                  key={index}
                  className="!rounded-lg"
                  onSelect={() => dispatch(user.id)}
                >
                  <div className="flex w-full items-center gap-3">
                    <Avatar
                      name={user.name}
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name}&backgroundColor=ffdfbf,ffd5dc,c0aede,d1d4f9,b6e3f4`}
                    />
                    <div>
                      <Text className="text-sm font-semibold leading-tight">
                        {user.name}
                      </Text>
                      <Text className="text-secondary-500 text-sm leading-tight">
                        {user.email}
                      </Text>
                    </div>
                    <div className="flex-1" />
                    {selected.includes(user.id) && (
                      <HiCheck className="opacity-60" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter className="items-center !justify-between !p-4">
          {selected.length > 0 ? (
            <AvatarGroup>
              {selected.map((user_index) => {
                const name = USERS_DATA[user_index - 1]?.name;
                return (
                  <Avatar
                    key={user_index}
                    name={name}
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=ffdfbf,ffd5dc,c0aede,d1d4f9,b6e3f4`}
                  />
                );
              })}
            </AvatarGroup>
          ) : (
            <Text className="dark:text-secondary-500 text-secondary-400 text-sm">
              Select users to add to this thread.
            </Text>
          )}
          <DialogClose asChild>
            <Button colorScheme="primary" disabled={!selected.length}>
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Message({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Text
      className={classNames(
        "text-secondary-800 dark:text-secondary-100 max-w-[75%] rounded-md px-3 py-1.5 text-sm font-medium leading-snug",
        className,
      )}
    >
      {children}
    </Text>
  );
}
