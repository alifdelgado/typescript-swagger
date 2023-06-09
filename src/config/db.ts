import fs from "fs";

export type Task = {
  id: string;
  name: string;
  description: string;
};

const fileName = "db.json";

export const createConnection = async () => {
  if (!fs.existsSync(fileName)) {
    const data: Task[] = [];
    writeData(data);
  }
};

export const getData = () => JSON.parse(fs.readFileSync(fileName).toString());

export const writeData = (data: any) =>
  fs.writeFileSync(fileName, JSON.stringify(data), "utf-8");
