import { Class } from "./models/data";
import * as fs from "fs";
import poblateJSONWithImages from "./services/procesor";
import { formater, reWritter } from "./services/formater";

async function main() {
  const todo = Number(process.argv[2]);
  const filePath = process.argv[3];

  if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    switch (todo) {
      case 1: // Formatear JSON
        const parsedData = JSON.parse(fileContent);
        console.log("Formatting JSON...");
        const formattedArgs = formater(parsedData);
        reWritter(formattedArgs);
        break;
      case 2: // Poblar JSON con imágenes de Wikipedia
        const args = JSON.parse(fileContent) as Class[];

        console.log("Processing JSON...");
        const updatedArgs = await poblateJSONWithImages(args);

        const outputFilePath = "output.json";
        fs.writeFileSync(
          outputFilePath,
          JSON.stringify(updatedArgs, null, 2),
          "utf-8"
        );
        console.log(
          `Process completed successfully. Updated JSON saved to ${outputFilePath}`
        );
        break;
      default:
        console.error(
          "Invalid argument. Use 1 to format JSON or 2 to process JSON."
        );
        process.exit(1);
    }
  } catch (error) {
    console.error("Error during process:", error);
    process.exit(1);
  }
}

main();
