"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ClassFilter() {
  const [selectedClass, setSelectedClass] = React.useState("All");

  const problemClasses = [
    "Lists, Tuples, Sets, Dictionaries",
    "Functions and Built-in functions",
    "Decorators",
    "Basic Syntax",
    "Geometry",
    "Variables and Datatypes",
    "Strings",
    "Typecasting",
    "Other",
    "Exceptions",
    "Heaps, Stacks and Queues",
    "Built-in functions",
    "RegEx",
    "Regular Expressions",
    "Typecasting, Exceptions",
    "Core CS",
    "Conditionals",
    "Arrays",
    "Arrays and Linked Lists",
    "Sorting Algorithms",
  ];

  React.useEffect(() => {
    const searchClass =
      new URLSearchParams(window.location.search).get("class") || "All";
    setSelectedClass(decodeURI(searchClass));
  }, []);

  const setFilter = (value: string) => {
    setSelectedClass(value);
    if (value === "All") {
      window.location.search = "";
    } else {
      window.location.search = `?class="${value}"`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-72 w-48 rounded-md border">
          <>
            <DropdownMenuLabel>Problem Class</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedClass}
              onValueChange={setFilter}
            >
              <DropdownMenuRadioItem key={"All"} value="All">
                All
              </DropdownMenuRadioItem>
              {problemClasses.map((c) => (
                <DropdownMenuRadioItem key={c} value={c}>
                  {c}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
