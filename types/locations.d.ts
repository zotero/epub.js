import Spine from "./spine";
import Section from "./section";
import EpubCFI from "./epubcfi";

export default class Locations {
  total: number;
  
  constructor(spine: Spine, request?: Function, pause?: number);

  generate(chars: number): Promise<Array<string>>;

  process(section: Section): Promise<Array<string>>;

  locationFromCfi(cfi: string | EpubCFI): number;

  percentageFromCfi(cfi: string | EpubCFI): number;

  percentageFromLocation(loc: number): number;

  cfiFromLocation(loc: number): string | -1;

  cfiFromPercentage(percentage: number): string;

  load(locations: string): Array<string>;

  save(): string;

  get currentLocation(): number;
  
  set currentLocation(curr: string | number);

  length(): number;

  destroy(): void;

  private createRange(): {
    startContainer: Element,
    startOffset: number,
    endContainer: Element,
    endOffset: number
  };

  private parse(contents: Node, cfiBase: string, chars: number) : Array<string>;
}
