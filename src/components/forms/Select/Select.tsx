import { ShowList } from "@/components/other/ShowList/ShowList";
import { title } from "process";
import React from "react";
import { FieldValues, Path, Control, useController } from "react-hook-form";
import styles from './select.module.css';

interface Props<T extends FieldValues, OptionType> {
  label: string;
  name: Path<T>;
  rules?: Record<string, number | string | boolean>;
  control: Control<T>;
  options: { title: string; value: OptionType }[];
}

const Select = <T extends FieldValues, OptionType>(props: Props<T, OptionType>) => {
  const { field } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    shouldUnregister: false,
  });


  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <select {...field} className={styles.select}>
        <ShowList list={props.options}>
          {(option) => {
            return (
              <option
                key={option.title}
                value={option.value as string}
                className={styles.option}
              >
                {option.title}
              </option>
            );
          }}
        </ShowList>
      </select>
    </div>
  );
};

export { Select };
