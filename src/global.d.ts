declare module '*module.css' {
    const moduleCss: Record<string, string>
    export default moduleCss
}

declare module '.css' {
    const css: string
    export default css
}

declare module '*.png' {
    const png: string
    export default png
}
