interface Task {
  title: string;
  link: string;
  solution: string;
}

interface Section {
  title: string;
  tasks: Task[]
}

export interface Structure {
  title: string;
  sections: Section[],
}
