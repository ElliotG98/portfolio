import { visit } from 'unist-util-visit';

interface CodeNode extends Node {
    lang?: string;
}

export default function remarkCodeTitles() {
    return (tree: any) => {
        visit<any, 'code'>(
            tree,
            'code',
            (node: CodeNode, index?: number, parent?: any) => {
                const [language = '', title = ''] = (node.lang || '').split(
                    ':',
                );

                if (!title || index === undefined) {
                    return;
                }

                const titleNode = {
                    type: 'mdxJsxFlowElement',
                    name: 'div',
                    attributes: [
                        {
                            type: 'mdxJsxAttribute',
                            name: 'className',
                            value: 'remark-code-title',
                        },
                    ],
                    children: [{ type: 'text', value: title }],
                    data: { _xdmExplicitJsx: true },
                };

                if (parent && parent.children) {
                    parent.children.splice(index, 0, titleNode);
                    node.lang = language;
                }
            },
        );
    };
}
