/// <reference types="vite/client" />
/// <reference types="@react-three/fiber" />

declare module '*.glb' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module 'meshline' {
  export const MeshLineGeometry: any
  export const MeshLineMaterial: any
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
