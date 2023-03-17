import { Control, FieldValues, Path, useController } from "react-hook-form";
import styles from './input.module.css';
import { ShowIf } from "@/components/other/ShowIf/ShowIf";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  rules?: Record<string, number | string | boolean>;
  control: Control<T>;
}

const Input = <T extends FieldValues>(props: Props<T>): React.ReactElement => {
  const { field, fieldState } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
    shouldUnregister: false,
  });

  const { error } = fieldState;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{props.label}</label>
      <input {...field} className={styles.input} />
      <ShowIf condition={Boolean(error)}>
        <span className={styles.errorTitle}>{error?.message}</span>
      </ShowIf>
    </div>
  );
};

export { Input };
