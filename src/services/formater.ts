import { Class } from "../models/data";
import * as fs from "fs";

function formater(data: any): Class[] {
  return data.map((item: any) => {
    return {
      ...item,
      species: item.species.map((specie: any, i: number) => ({
        ...specie,
        id: `${item.id}-${i + 1}`,
        images: [{ url: "", title: "", autor: "", width: 0, height: 0 }],
      })),
    };
  });
}

function reWritter(data: Class[]) {
  fs.writeFileSync("input.json", JSON.stringify(data, null, 2), "utf-8");
}

export { formater, reWritter };
