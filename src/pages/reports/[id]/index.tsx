import { ShowList } from "@/components";
import { ColumnType, Table, TableTh } from "@/components/ui/Table/Table";
import { prisma } from "@/prisma";
import { Area, Listener, Report, Speaker } from "@prisma/client";
import { GetServerSideProps } from "next";

import styles from './report.module.css';

interface FullReport extends Report {
  listeners: Listener[];
  speakers: Speaker[];
  areas: Area[];
}

interface Props {
  report: FullReport; 
}

const listenersTableHeader: TableTh[] = [
  {
    title: "№",
    field: "id",
    type: ColumnType.STRING
  }, 
  {
    title: "Слушатель",
    field: "fullName",
    type: ColumnType.STRING
  },
  {
    title: "Почта слушателя",
    field: "email",
    type: ColumnType.STRING
  }
];

export default function ReportPage({ report }: Props) {
  console.log(report);
  return (
    <main className={styles.layout}> 
      <h1>{`Доклад: ${report.title}`}</h1>
      <p className={styles.reportDescription}>{`Описание: ${report.description}`}</p>
      <ShowList list={report.speakers}>
        {
          (speaker) => {
            return (
             <h2 key={speaker.id}>{`Докладчик: ${speaker.fullName}`}</h2>
            );
          }
        }
      </ShowList>
      <h2>Слушатели</h2>
      <Table tableHead={listenersTableHeader} data={report.listeners} /> 
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const report = await prisma.report.findFirst({
    where: {
      id: parseFloat(context.query.id) 
    },
    include: {
      listeners: true,
      speakers: true,
      areas: true
    }
  });

  return {
    props: {
     report 
    }
  };
};
