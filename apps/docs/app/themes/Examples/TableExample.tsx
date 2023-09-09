import { Dispatch, useReducer, useState } from "react";
import {
  Checkbox,
  InputField,
  InputGroup,
  Prefix,
  Text,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Td,
  Th,
  Tr,
  Button,
  Menu,
  MenuTrigger,
  MenuContent,
  MenuCheckboxItem,
  MenuLabel,
  MenuItem,
  MenuSeparator,
  classNames,
} from "@rafty/ui";
import { HiChevronDown, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";

type HeadersType = {
  status: string;
  email: string;
  amount: string;
};

const COLUMNS: (keyof HeadersType)[] = ["status", "email", "amount"];

const TABLE_DATA: ({ id: string } & HeadersType)[] = [
  {
    id: "0",
    status: "Success",
    email: "xyz@yahoo.com",
    amount: "3000",
  },
  {
    id: "1",
    status: "Success",
    email: "pqr@yahoo.com",
    amount: "3200",
  },
  {
    id: "2",
    status: "Success",
    email: "monserrat44@gmail.com",
    amount: "5000",
  },
  {
    id: "3",
    status: "Processing",
    email: "ken99@yahoo.com",
    amount: "3000",
  },
  {
    id: "4",
    status: "Success",
    email: "xyz786@gmail.com",
    amount: "3500",
  },
  {
    id: "5",
    status: "Failed",
    email: "abc44@gmail.com",
    amount: "4000",
  },
];

export function TableExample() {
  const [show, dispatch] = useReducer(
    (prev: (keyof HeadersType)[], cur: keyof HeadersType) => {
      const index = prev.findIndex((val) => val == cur);

      if (index == -1) prev.push(cur);
      else prev.splice(index, 1);

      return [...prev].sort().reverse();
    },
    [...COLUMNS],
  );

  const [search, setSearch] = useState("");
  const results = TABLE_DATA.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Payments</h2>
        <h5 className="text-sm text-secondary-400 dark:text-secondary-500">
          Manage your payments.
        </h5>
      </div>
      <div className="flex justify-between">
        <InputGroup>
          <Prefix>
            <HiOutlineMagnifyingGlass className="stroke-2 text-secondary-400" />
          </Prefix>
          <InputField
            type="search"
            placeholder="Filter emails..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </InputGroup>
        <ColumnsSelectMenu show={show} toggle={dispatch} />
      </div>
      <TableComponent show={show} data={results} />
    </div>
  );
}

const ColumnsSelectMenu = ({
  show,
  toggle,
}: {
  show: (keyof HeadersType)[];
  toggle: Dispatch<keyof HeadersType>;
}) => (
  <Menu>
    <MenuTrigger variant="outline" rightIcon={<HiChevronDown />}>
      Columns
    </MenuTrigger>
    <MenuContent className="!min-w-[10rem]" align="end">
      {COLUMNS.map((value) => (
        <MenuCheckboxItem
          key={value}
          checked={show.includes(value)}
          onCheckedChange={() => toggle(value)}
          className="capitalize"
        >
          {value}
        </MenuCheckboxItem>
      ))}
    </MenuContent>
  </Menu>
);

function TableComponent({
  data,
  show,
}: {
  show: string[];
  data: {
    id: string;
    status: string;
    email: string;
    amount: string;
  }[];
}) {
  const [checked, setChecked] = useState([true, true, true, true, true, true]);
  const checkLength = checked.filter((item) => item).length;

  return (
    <>
      <TableContainer>
        <Table className="table-fixed" size="sm">
          <TableHead>
            <Tr>
              <Th style={{ width: 30 }}>
                <Checkbox
                  size="sm"
                  checked={checkLength === 6}
                  onCheckedChange={(check: boolean) =>
                    setChecked([check, check, check, check, check, check])
                  }
                />
              </Th>
              {show.map((value, index) => (
                <Th
                  key={value}
                  className={classNames(
                    index == 2 && "text-center",
                    "capitalize w-max",
                  )}
                >
                  {value}
                </Th>
              ))}
              <Th style={{ width: 45 }}>
                <span className="sr-only">action</span>
              </Th>
            </Tr>
          </TableHead>
          <TableBody className="dark:!bg-secondary-950">
            {data.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox
                    size="sm"
                    checked={checked[index]}
                    onCheckedChange={(check: boolean) =>
                      setChecked((prev) => {
                        const updatedChecked = [...prev];
                        updatedChecked[index] = check;
                        return updatedChecked;
                      })
                    }
                  />
                </Td>
                {show.map((value, index) => (
                  <Td
                    key={index + value}
                    className={classNames(
                      index == 2 && "text-center",
                      "truncate",
                    )}
                  >
                    {item[value as keyof HeadersType]}
                  </Td>
                ))}
                <Td>
                  <Menu size="sm">
                    <MenuTrigger variant="ghost" size="icon">
                      <HiDotsHorizontal />
                    </MenuTrigger>
                    <MenuContent className="!min-w-[9rem] !z-50">
                      <MenuLabel className="leading-4">Actions</MenuLabel>
                      <MenuItem>Copy payment ID</MenuItem>
                      <MenuSeparator />
                      <MenuItem>View customer</MenuItem>
                      <MenuItem>View payment details</MenuItem>
                    </MenuContent>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between items-center">
        <Text className="text-sm dark:text-secondary-500 text-secondary-400">
          {checkLength} of {data.length} row(s) selected.
        </Text>
        <div className="flex gap-3">
          <Button variant="outline" isDisabled>
            Previous
          </Button>
          <Button variant="outline" isDisabled>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}