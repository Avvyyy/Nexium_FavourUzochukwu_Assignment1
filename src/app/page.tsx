"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters",
    })
    .max(50, {
      message: "Username is greater than 50 characters",
    }),
  topic: z.string(),
});

interface QuotesData {
  [topic: string]: string[];
}

export default function Home() {
  const [data, setData] = useState<QuotesData>({});
  const [topics, setTopics] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      topic: "",
    },
  });

  function fetchQuotes() {
    fetch("/data/quotes.json")
      .then((response) => response.json())
      .then((data: QuotesData) => {
        const topicList = Object.keys(data);
        setTopics(topicList);
        setData(data);
      })
      .catch((err) => console.error(err));
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
    const { username, topic } = values;

    if (!topic) {
      toast("Please select a topic!");
      return;
    }

    const selectedQuotes = data[topic] || [];

    toast(`${username}'s Quotes`, {
      description: selectedQuotes.length
        ? selectedQuotes.map((quote, index) => (
          <p key={index} className="mb-2">
            {quote}
          </p>
        ))
        : "No quotes found for this topic.",
      // duration: 8000,
    });
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="flex justify-center items-center transform h-11/12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Generate Quote</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Topic</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value || "Select a topic"}
                            <span className="ml-2">▾</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search topic..." />
                          <CommandEmpty>No topics found.</CommandEmpty>
                          <CommandGroup>
                            {topics.map((topic) => (
                              <CommandItem
                                key={topic}
                                value={topic}
                                onSelect={() => {
                                  field.onChange(topic);
                                  setOpen(false);
                                }}
                              >
                                {topic}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Choose a topic to generate your quotes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Generate Quote
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
