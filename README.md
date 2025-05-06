# wiki-imager

Returns a given JSON containing names with its relative Wikipedia image url.

Execution: 
(install typescript globally) npm install -g typescript
(compile) tsc
(run) node src/server.js file.json

argsv[2]: Class[]

interface Class {
id: number;
name: string;
species: Speices[];
}

interface Speices {
id: number;
name: string; -- the name used in the header for the Wikipedia API
images: imageUrl[];
}

interface imageUrl {
url: string;
autor?: string;
title?: string;
description?: string;
}
