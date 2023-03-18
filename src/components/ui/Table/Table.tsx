import { ShowList } from "@/components";
import styles from './table.module.css';

const ColumnType = {
  STRING: 'STRING',
  DATETIME: 'DATETIME',
} as const;

type ColumnTypeKey = keyof typeof ColumnType;

interface TableTh {
  title: string;
  field: string;
  type: ColumnTypeKey;
  parserFn?: (value: any) => React.ReactElement;
}

interface Props {
  tableHead: TableTh[];
  data: any[];
}

const TableCellParserMap: Record<ColumnTypeKey, (value: any) => React.ReactElement> = {
  [ColumnType.STRING]: (value) => <span>{value}</span>,
  [ColumnType.DATETIME]: (value) => {
    const date = new Date(value).toLocaleString();
    return (
      <span>{date}</span>
    );
  },
} as const;

const Table = ({ tableHead, data }: Props): React.ReactElement => {
  return (
    <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <ShowList list={tableHead}>
              {(tableTh) => {
                return (
                  <th key={tableTh.title} className={styles.tableHeadColumn}>
                    {tableTh.title}
                  </th>
                );
              }}
            </ShowList>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <ShowList list={data}>
            {(record) => {
              return (
                <tr key={record.id} className={styles.tableRow}>
                  <ShowList list={tableHead}>
                    {(tableTh) => {
                      const cellData = record[tableTh.field];
                      const  parsedData = TableCellParserMap[tableTh.type](cellData);
                      return (
                        <td key={tableTh.title} className={styles.tableColumn}>
                          {
                            tableTh.parserFn ? tableTh.parserFn(record) : parsedData 
                          }
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
  );
};

export { Table, ColumnType };
export type { TableTh };
