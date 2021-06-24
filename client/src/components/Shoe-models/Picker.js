import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"

export default function Picker(props) {
    const snap = useSnapshot(props.state)
    return (
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (props.state.items[snap.current] = color)} />
        <h1 className="name_shoe">{snap.current}</h1>
      </div>
    )
  }
  