import axios from "axios";
import { imageUrl } from "../models/data";
import { config } from "..";

async function fetchImageFromAPI(
  latin_name: string,
  images: imageUrl[]
): Promise<imageUrl[]> {
  try {
    const params = {
      action: "query",
      list: "search",
      srsearch: latin_name,
      format: "json",
      origin: "*",
    };

    // Buscar en Wikipedia en español
    let response = await axios.get(config.wikipedia.es!, { params });
    let searchResults = response.data.query.search;

    // Si no hay resultados, intentar en inglés
    if (!searchResults || searchResults.length === 0) {
      response = await axios.get(config.wikipedia.en!, { params });
      searchResults = response.data.query.search;
    }

    // Si no hay resultados en ninguno de los idiomas, lanzar un error
    if (!searchResults || searchResults.length === 0) {
      throw new Error(
        `No se encontró la página de Wikipedia para ${latin_name}`
      );
    }

    const pageTitle = searchResults[0].title;

    // Intentar obtener imágenes primero en español, luego en inglés si no hay resultados
    const imageUrls = await fetchImagesFromPage(
      pageTitle,
      config.wikipedia.es!
    );
    if (imageUrls.length === 0) {
      return await fetchImagesFromPage(pageTitle, config.wikipedia.en!);
    }

    return [imageUrls[0]];
  } catch (error) {
    console.error(`Error fetching images for ${latin_name}:`, error);
    return images; // Retornar las imágenes existentes en caso de error
  }
}

async function fetchImagesFromPage(
  pageTitle: string,
  apiUrl: string
): Promise<imageUrl[]> {
  const pageParams = {
    action: "query",
    titles: pageTitle,
    prop: "pageimages",
    format: "json",
    pithumbsize: 1000,
    origin: "*",
  };

  const response = await axios.get(apiUrl, { params: pageParams });
  const pages = response.data.query?.pages;
  const page = pages[Object.keys(pages)[0]];
  const imageUrl = page?.thumbnail?.source || null;

  return [
    {
      url: imageUrl || "",
      autor: page?.imageinfo?.[0]?.user || "",
      title: pageTitle,
      width: page?.thumbnail?.width || 0,
      height: page?.thumbnail?.height || 0,
    },
  ];
}

export default fetchImageFromAPI;
