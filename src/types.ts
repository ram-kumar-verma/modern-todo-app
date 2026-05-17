export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  createdAt: any;
  userId: string;
}

export type Priority = 'High' | 'Medium' | 'Low';
