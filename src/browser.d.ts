declare function marked(content: string): string;
declare namespace marked {
    function parse(content: string): string;
}

declare namespace Prism {
    function highlightAll(): void;
    function highlightElement(el: any): void;
}

declare function createFuse(list: any[], options?: any): any;
declare function objectEntries(obj: any): any[];

declare namespace emailjs {
    function init(publicKey: string): void;
    function send(serviceId: string, templateId: string, templateParams: any, publicKey?: string): Promise<any>;
}

declare function sleep(ms: number): Promise<void>;
