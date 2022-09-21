import { Categories } from "../note/types/categories";

export const db = {
  activeTask: [
    {
      id: 1,
      name: "Play associations",
      creation_time: "September 14, 2022",
      category: Categories.Idea,
      content: "Play the association game",
      dates: "06.13.24, 06.12.24",
    },
    {
      id: 2,
      name: "Walk the dog",
      creation_time: "September 14, 2022",
      category: Categories.Task,
      content: "walk the dog",
      dates: "07.04.23, 08.05.23",
    },
    {
      id: 3,
      name: "Try to nail to the sky",
      creation_time: "September 14, 2022",
      category: Categories.RandomThought,
      content: "Try to nail to the sky, interesting ...",
      dates: "01.10.22",
    },
    {
      id: 4,
      name: "The action is performed by the beneficiary",
      creation_time: "September 14, 2022",
      category: Categories.RandomThought,
      content: "Truely-true",
      dates: "02.11.22",
    },
    {
      id: 5,
      name: "Take out the trash",
      creation_time: "September 14, 2022",
      category: Categories.Task,
      content: "Very important!",
      dates: "01.11.22",
    },
    {
      id: 6,
      name: "Punish an imaginary friend",
      creation_time: "September 14, 2022",
      category: Categories.RandomThought,
      content: "He tired",
      dates: "05.12.22",
    },
    {
      id: 7,
      name: "Drill some pear",
      creation_time: "September 14, 2022",
      category: Categories.Task,
      content: "Some drill",
      dates: "12.12.22",
    },
  ],
  archivedTask: [],
};
