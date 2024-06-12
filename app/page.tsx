import Link from "next/link";
import data from "../public/questions_list.json";
import Badge from "./custom_ui/badge";
import { ClassFilter } from "./custom_ui/filter";

interface Question {
  id: number;
  name: string;
  preview: string;
  difficulty_name: string;
  tag_names: string[];
  class: string;
  link: string;
}

export async function getData() {
  return data;
}

export default async function Home({
  // params,
  searchParams,
}: {
  // params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const problemClass = searchParams["class"];
  const questions_data = await getData();

  const questions_list =
    problemClass == undefined || problemClass == ""
      ? questions_data
      : questions_data.filter(
          (question: Question) =>
            question.class === (problemClass as string).replaceAll('"', "")
        );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="container mx-auto py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Python Roadmap Practice
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg lg:text-xl">
            Explore practice problems from different topics.
          </p>
        </div>
        <div className="my-4">
          <ClassFilter />
        </div>
        <div className="grid gap-6">
          {questions_list.map((question: Question) => {
            return (
              <div
                key={question.id}
                className="grid gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="flex items-start justify-between">
                  <div className="grid gap-2">
                    <h3 className="text-xl font-bold">{question.name}</h3>
                    <p className="text-gray-500 line-clamp-2 dark:text-gray-400">
                      {question.preview}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      /* variant="secondary" */ className={`${
                        question.difficulty_name == "Easy"
                          ? "bg-green-100 text-green-800"
                          : question.difficulty_name == "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {question.difficulty_name}
                    </Badge>
                    {/* <Badge className="bg-gray-100 px-2 py-1 text-xs font-medium dark:bg-gray-800"
                    >
                      Linked List
                    </Badge> */}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Badge /* variant="secondary" */ className="bg-gray-100">
                    {question.class}
                  </Badge>
                  <Link
                    href={question.link}
                    className="inline-flex self-right h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    View Problem
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
