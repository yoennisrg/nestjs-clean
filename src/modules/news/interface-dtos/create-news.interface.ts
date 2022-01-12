export interface Result {
  value?: string;
  matchLevel?: string;
  fullyHighlighted?: boolean;
  matchedWords?: string[];
}

export interface highlightResult {
  author: Result;
  commentText: Result;
  storyUitle: Result;
  storyUrl: Result;
}

export interface News {
  title: string;
  url: string;
  author: string;
  points: string;
  storyText: string;
  commentText: string;
  numComments: number;
  storyId: number;
  storyTitle: string;
  storyUrl: string;
  parentId: number;
  createdAtI: number;
  tags: string[];
  objectID: number;
  highlightResult: highlightResult;
}
