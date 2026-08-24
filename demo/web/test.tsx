import { Canvas } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
  }
}
function Test() {
  return (
    <mesh>
      <meshLineGeometry />
      <meshLineMaterial
        color="white"
        depthTest={false}
        resolution={[1, 1]}
        useMap
        map={null}
        repeat={[-4, 1]}
        lineWidth={1}
      />
    </mesh>
  )
}
