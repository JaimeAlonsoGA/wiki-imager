import { Class } from "./models/data";

class ServerInitializer {
  private args: Class[];

  constructor(args: Class[]) {
    this.args = args;
  }

  public async start(): Promise<void> {
    console.log("Starting server with args:", this.args);
  }
}

const args = JSON.parse(process.argv[2]) as Class[];
const server = new ServerInitializer(args);
server.start();
