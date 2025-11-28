export interface ServiceNode {
  name: string;
  description?: string;
  category?: string;
  children?: ServiceNode[];
  icon?: string; // Optional icon name
  id?: string;   // Unique ID for D3
  url?: string;  // AWS Documentation URL
  useCases?: string[];
  color?: string;
}

export interface TreeData extends ServiceNode {}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}