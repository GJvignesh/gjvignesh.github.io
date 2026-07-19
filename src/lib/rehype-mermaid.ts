import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

export function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      // Find pre > code blocks
      if (node.tagName === 'pre' && node.children?.[0]?.type === 'element') {
        const codeNode = node.children[0] as Element;
        
        // Check if it's a mermaid code block by checking the class name
        const classes = (codeNode.properties?.className as string[]) || [];
        if (
          codeNode.tagName === 'code' &&
          classes.some((c) => c.includes('mermaid'))
        ) {
          // Extract the code content
          const textContent = extractText(codeNode);
          
          // Create a mermaid div instead
          const mermaidDiv: Element = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['mermaid'] },
            children: [{ type: 'text', value: textContent }],
          };
          
          // Replace the pre element with the mermaid div
          const parent = tree.children.indexOf(node as any);
          if (parent !== -1) {
            tree.children[parent] = mermaidDiv;
          }
        }
      }
    });
  };
}

function extractText(node: any): string {
  if (typeof node.value === 'string') {
    return node.value;
  }
  
  if (Array.isArray(node.children)) {
    return node.children.map((child: any) => extractText(child)).join('');
  }
  
  return '';
}
