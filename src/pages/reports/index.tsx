import { NavLink, ShowList } from "@/components";
import { prisma } from "@/prisma";
import { Report } from "@prisma/client";

import styles from "./reports.module.css";
import Link from "next/link";
import { ColumnType, Table, TableTh } from "@/components/ui/Table/Table";

interface Props {
  reports: Report[];
}

const reportsTableHeader: TableTh[] = [
  {
    title: "№",
    field: 'id',
    type: ColumnType.STRING
  },
  {
    title: "Доклад",
    field: 'title',
    type: ColumnType.STRING,
    parserFn: (record) => <NavLink path={`/reports/${record.id}`} title={record.title} />
  },
  {
    title: "Время начала",
    field: 'startedTime',
    type: ColumnType.DATETIME
  },
  {
    title: "Время завершения",
    field: 'finishTime',
    type: ColumnType.DATETIME
  },
  {
    title: "Описание",
    field: 'description',
    type: ColumnType.STRING
  }
];

export default function Conferences({ reports }: Props) {
  return (
    <main className={styles.layout}>
      <Table tableHead={reportsTableHeader} data={reports ?? []} />
    </main>
  );
}

export async function getStaticProps() {
  const reports = await prisma.report.findMany();

  return {
    props: {
      reports,
    },
  };
}
