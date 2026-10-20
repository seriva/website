declare function marked(content: string): string;
declare namespace marked {
    function parse(content: string): string;
}

declare namespace Prism {
    function highlightAll(): void;
    function highlightElement(el: any): void;
    const languages: any;
}

declare namespace Reflect {
    function construct(target: any, args: any[]): any;
}

declare namespace mermaid {
    function initialize(config: any): void;
    function run(options?: any): Promise<void>;
}

declare namespace emailjs {
    function init(publicKey: string): void;
    function send(serviceId: string, templateId: string, templateParams: any, publicKey?: string): Promise<any>;
}
