import React from "react";

interface Props<ObjectType> {
  list: ObjectType[];
  children: (obj: ObjectType) => JSX.Element;
}

export const ShowList = <ObjectType,>(props: Props<ObjectType>) => {
  return <React.Fragment>{props.list.map(props.children)}</React.Fragment>;
};
