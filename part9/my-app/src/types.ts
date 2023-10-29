export type Props = { 
  parts: CoursePart[]
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackround extends CoursePartBaseWithDescription {
  backroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartSpecial;

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};