import { parseDocument } from "htmlparser2";
import { isText } from "domutils";
import render from "dom-serializer";
import { translateText } from "@/lib/translate";

import { DataNode, Node } from "domhandler";

function getAllTextNodes(node: Node): DataNode[] {
    const result: DataNode[] = [];

    const traverse = (n: Node) => {
        if (isText(n)) {
            result.push(n);
        } else if ('children' in n) {
            for (const child of (n as { children: Node[] }).children) {
                traverse(child);
            }
        }
    };

    traverse(node);
    return result;
}

export const translateHTMLContent = async (
    htmlContent: string,
    fromLang: string,
    toLang: string
): Promise<string> => {
    const dom = parseDocument(htmlContent);

    const textNodes = getAllTextNodes(dom as unknown as Node);

    await Promise.all(
        textNodes.map(async (node) => {
            if (node.data.trim()) {
                try {
                    const translated = await translateText(node.data, fromLang, toLang);
                    node.data = translated;
                } catch (err) {
                    console.error("Lỗi dịch:", err);
                }
            }
        })
    );

    return render(dom);
};
