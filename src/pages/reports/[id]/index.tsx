import { ShowList } from "@/components";
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
      <table className={styles.table}>
        <thead>
          <tr>
            <ShowList list={Object.keys(report.listeners[0])}>
              {
                (title) => {
                  return (
                    <th className={styles.tableHeadColumn} key={title}>{title}</th>
                  );
                }
              }
            </ShowList>
          </tr>
        </thead>
        <tbody>
          {
            <ShowList list={report.listeners}>
              {
                (listener) => {
                  return (
                    <tr key={report.id}>
                      <ShowList list={Object.keys(report.listeners[0])}>
                        {
                          (title) => {
                            return (
                              <td className={styles.tableColumn} key={title}>{listener[title]}</td>
                            );
                          }
                        }
                      </ShowList>
                    </tr>
                  );
                }
              }
            </ShowList>
          }
        </tbody>
      </table> 
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
