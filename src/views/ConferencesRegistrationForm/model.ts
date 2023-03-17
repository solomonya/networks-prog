import { Report } from "@prisma/client";


export const mapToSelectOptions = (reports: Report[]) => {
  return reports.map(report => ({ title: report.title, value: report.id }))
};