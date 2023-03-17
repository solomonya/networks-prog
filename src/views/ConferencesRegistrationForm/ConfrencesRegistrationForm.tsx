import { useForm } from "react-hook-form";
import styles from './confrencesRegistrationForm.module.css';
import { Input, Select } from "@/components/forms";
import { Report } from "@prisma/client";
import { mapToSelectOptions } from "./model";
import { api } from "@/api";

interface Props {
  reports: Report[]
}

const ConferencesRegistrationForm = ({ reports }: Props) => {
  const { control, handleSubmit, reset, setError } = useForm({
    defaultValues: {
      email: '',
      reportId: reports[0].id,
      fullName: ''
    }
  });

  const registerOnConference = async (data: any) => {
    try {
      const res = await api({
        method: 'POST',
        body: data,
        endpoint: '/reports/register'
      });

      console.log(res);
      reset();
    }
    catch(e) {
      if(e && typeof e === 'object' && 'message' in e) {
        setError('email', { type: 'custom', message: e.message as string })
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(registerOnConference)} className={styles.form}>
      <Input control={control} name="email" label="Почта" />
      <Input control={control} name="fullName" label="Имя" />
      <Select
        label="Доклад"
        control={control}
        name="reportId"
        options={mapToSelectOptions(reports)}
      />
      <button className={styles.btn} type="submit">Зарегистрироваться</button>
    </form>
  );
};

export {
  ConferencesRegistrationForm
};
