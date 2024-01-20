export function getElement<T extends HTMLElement>(query: string): T {
    const element = document.querySelector<T>(query);
    if (element === null) {
        throw new Error(`Element with query ${query} not found`);
    }
    return element;
}

export const elements = {
    message: getElement<HTMLParagraphElement>("#message"),
    max: getElement<HTMLParagraphElement>("#max"),
    min: getElement<HTMLParagraphElement>("#min"),
};
