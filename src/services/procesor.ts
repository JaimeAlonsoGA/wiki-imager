import { Class } from "../models/data";
import fetchImageFromAPI from "./fetcher";

async function poblateJSONWithImages(args: Class[]): Promise<Class[]> {
  for (const arg of args) {
    for (const specie of arg.species) {
      const { scientific_name, images } = specie;

      console.log(`Processing species: ${scientific_name}`);
      console.log(`Fetching images for: ${scientific_name}`);
      const imageUrls = await fetchImageFromAPI(scientific_name, images);
      console.log(`Fetched images: ${JSON.stringify(imageUrls)}`);
      specie.images = imageUrls;
    }
  }
  return args;
}

export default poblateJSONWithImages;
