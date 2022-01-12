import {
  News,
  highlightResult,
} from '../../interface-dtos/create-news.interface';

export class CreateNewsCommand implements News {
  constructor(props: CreateNewsCommand) {
    this.title = props.title;
    this.url = props.url;
    this.author = props.author;
    this.points = props.points;
    this.storyText = props.storyText;
    this.commentText = props.commentText;
    this.numComments = props.numComments;
    this.storyId = props.storyId;
    this.storyTitle = props.storyTitle;
    this.storyUrl = props.storyUrl;
    this.parentId = props.parentId;
    this.createdAtI = props.createdAtI;
    this.tags = props.tags;
    this.objectID = props.objectID;
    this.highlightResult = props.highlightResult;
  }

  readonly title: string;
  readonly url: string;
  readonly author: string;
  readonly points: string;
  readonly storyText: string;
  readonly commentText: string;
  readonly numComments: number;
  readonly storyId: number;
  readonly storyTitle: string;
  readonly storyUrl: string;
  readonly parentId: number;
  readonly createdAtI: number;
  readonly tags: string[];
  readonly objectID: number;
  readonly highlightResult: highlightResult;
}
