export abstract class FetcherInterface {
  abstract fetch(url: string): Promise<NodeJS.ReadableStream>;

  public async downloadBytes(url: string, maxLength: number): Promise<Buffer> {
    const reader = await this.fetch(url);

    let numberOfBytesReceived = 0;
    const chunks: Buffer[] = [];

    for await (const chunk of reader) {
      const bufferChunk = Buffer.from(chunk);
      numberOfBytesReceived += bufferChunk.length;

      if (numberOfBytesReceived > maxLength) {
        throw new Error('Max length reached');
      }

      chunks.push(bufferChunk);
    }

    // concatenate chunks into a single buffer
    return Buffer.concat(chunks);
  }
}