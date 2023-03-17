import { ShowList } from "@/components";
import { prisma } from "@/prisma";
import { Report } from "@prisma/client";

import styles from "./reports.module.css";
import Link from "next/link";

interface Props {
  reports: Report[];
}

const ReportKeys = {
  id: "id",
  title: "title",
  description: "description",
  startedTime: "startedTime",
  finishTime: "finishTime",
} as const;

const reportProperties = Object.keys(ReportKeys);

export default function Conferences({ reports }: Props) {
  return (
    <main className={styles.layout}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <ShowList list={reportProperties}>
              {(title) => {
                return (
                  <th key={title} className={styles.tableHeadColumn}>
                    {title}
                  </th>
                );
              }}
            </ShowList>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <ShowList list={reports}>
            {(report) => {
              return (
                <tr key={report.id} className={styles.tableRow}>
                  <ShowList list={reportProperties}>
                    {(title) => {
                      return (
                        <td key={title} className={styles.tableColumn}>
                          {title === ReportKeys.title ? (
                            <Link href={`/reports/${report.id}`}>{report[title]}</Link>
                          ) : (
                            report[title].toString()
                          )}
                        </td>
                      );
                    }}
                  </ShowList>
                </tr>
              );
            }}
          </ShowList>
        </tbody>
      </table>
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
