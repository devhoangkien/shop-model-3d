const THREE = require('three')
const prettier = require('prettier')
const parserBabel = require('prettier/parser-babel')
const isVarName = require('./isVarName')

function parse(fileName, gltf, options = {}) {
  function sanitizeName(name) {
    return isVarName(name) ? `.${name}` : `['${name}']`
  }

  const rNbr = (number) => {
    return parseFloat(number.toFixed(Math.round(options.precision || 2)))
  }

  const rDeg = (number) => {
    const abs = Math.abs(Math.round(parseFloat(number) * 100000))
    for (let i = 1; i <= 10; i++) {
      if (abs === Math.round(parseFloat(Math.PI / i) * 100000))
        return `${number < 0 ? '-' : ''}Math.PI${i > 1 ? ' / ' + i : ''}`
    }
    for (let i = 1; i <= 10; i++) {
      if (abs === Math.round(parseFloat(Math.PI * i) * 100000))
        return `${number < 0 ? '-' : ''}Math.PI${i > 1 ? ' * ' + i : ''}`
    }
    return rNbr(number)
  }

  function printTypes(objects, animations) {
    let meshes = objects.filter((o) => o.isMesh && o.__removed === undefined)
    let bones = objects.filter((o) => o.isBone && !(o.parent && o.parent.isBone) && o.__removed === undefined)
    let materials = [...new Set(objects.filter((o) => o.material && o.material.name).map((o) => o.material))]

    let animationTypes = ''
    if (animations.length) {
      animationTypes = `\n
  type ActionName = ${animations.map((clip, i) => `"${clip.name}"`).join(' | ')};
  type GLTFActions = Record<ActionName, THREE.AnimationAction>;\n`
    }

    return `\ntype GLTFResult = GLTF & {
    nodes: {
      ${meshes.map(({ name, type }) => (isVarName(name) ? name : `['${name}']`) + ': THREE.' + type).join(',')}
      ${bones.map(({ name, type }) => (isVarName(name) ? name : `['${name}']`) + ': THREE.' + type).join(',')}
    }
    materials: {
      ${materials.map(({ name, type }) => (isVarName(name) ? name : `['${name}']`) + ': THREE.' + type).join(',')}
    }
  }\n${animationTypes}`
  }

  function print(objects, gltf, obj, parent) {
    let result = ''
    let children = ''
    let type = obj.type.charAt(0).toLowerCase() + obj.type.slice(1)
    let node = 'nodes' + sanitizeName(obj.name)
    let isCamera = type === 'perspectiveCamera' || type === 'orthographicCamera'
    let hasAnimations = gltf.animations && gltf.animations.length > 0

    if (options.setLog)
      setTimeout(
        () => options.setLog((state) => [...state, obj.name]),
        (options.timeout = options.timeout + options.delay)
      )

    // Turn object3d's into groups, it should be faster according to the threejs docs
    if (type === 'object3D') type = 'group'
    if (type === 'perspectiveCamera') type = 'PerspectiveCamera'
    if (type === 'orthographicCamera') type = 'OrthographicCamera'

    // Bail out on lights and bones
    if (type === 'bone') {
      return `<primitive object={${node}} />${!parent ? '' : '\n'}`
    }

    // Collect children
    if (obj.children) obj.children.forEach((child) => (children += print(objects, gltf, child, obj)))

    // Form the object in JSX syntax
    result = `<${type} `

    const oldResult = result

    // Include names when output is uncompressed or morphTargetDictionaries are present
    if (
      obj.name.length &&
      (options.verbose ||
        obj.morphTargetDictionary ||
        (hasAnimations &&
          gltf.animations.find(
            (clip) => clip.name.includes(obj.name) || (clip.targetNames && clip.targetNames.includes(obj.name))
          )))
    )
      result += `name="${obj.name}" `

    // Handle cameras
    if (isCamera) {
      result += `makeDefault={false} `
      if (obj.zoom !== 1) result += `zoom={${rNbr(obj.zoom)}} `
      if (obj.far !== 2000) result += `far={${rNbr(obj.far)}} `
      if (obj.near !== 0.1) result += `near={${rNbr(obj.near)}} `
    }
    if (type === 'PerspectiveCamera') {
      if (obj.fov !== 50) result += `fov={${rNbr(obj.fov)}} `
    }

    // Shadows
    if (type === 'mesh' && options.shadows) result += `castShadow receiveShadow `

    // Write out geometry first
    if (obj.geometry) result += `geometry={${node}.geometry} `

    // Write out materials
    if (obj.material) {
      if (obj.material.name && duplicates[obj.material.name] === 1)
        result += `material={materials${sanitizeName(obj.material.name)}} material-color={snap.items${sanitizeName(
          obj.material.name
        )}} `
      else result += `material={${node}.material} `
    }

    if (obj.skeleton) result += `skeleton={${node}.skeleton} `
    if (obj.visible === false) result += `visible={false} `
    if (obj.castShadow === true) result += `castShadow `
    if (obj.receiveShadow === true) result += `receiveShadow `
    if (obj.morphTargetDictionary) result += `morphTargetDictionary={${node}.morphTargetDictionary} `
    if (obj.morphTargetInfluences) result += `morphTargetInfluences={${node}.morphTargetInfluences} `
    if (obj.intensity) result += `intensity={${rNbr(obj.intensity)}} `
    //if (obj.power && obj.power !== 4 * Math.PI) result += `power={${rNbr(obj.power)}} `
    if (obj.angle && obj.angle !== Math.PI / 3) result += `angle={${rDeg(obj.angle)}} `
    if (obj.penumbra && obj.penumbra !== 0) result += `penumbra={${rNbr(obj.penumbra)}} `
    if (obj.decay && obj.decay !== 1) result += `decay={${rNbr(obj.decay)}} `
    if (obj.distance && obj.distance !== 0) result += `distance={${rNbr(obj.distance)}} `
    if (obj.color && obj.color.getHexString() !== 'ffffff') result += `color="#${obj.color.getHexString()}" `
    if (obj.up && obj.up.isVector3 && !obj.up.equals(new THREE.Vector3(0, 1, 0)))
      result += `up={[${rNbr(obj.up.x)}, ${rNbr(obj.up.y)}, ${rNbr(obj.up.z)},]} `
    if (obj.position && obj.position.isVector3 && obj.position.length())
      result += `position={[${rNbr(obj.position.x)}, ${rNbr(obj.position.y)}, ${rNbr(obj.position.z)},]} `
    if (obj.rotation && obj.rotation.isEuler && obj.rotation.toVector3().length())
      result += `rotation={[${rDeg(obj.rotation.x)}, ${rDeg(obj.rotation.y)}, ${rDeg(obj.rotation.z)},]} `
    if (obj.scale && obj.scale.isVector3 && obj.scale.x !== 1 && obj.scale.y !== 1 && obj.scale.z !== 1)
      result += `scale={[${rNbr(obj.scale.x)}, ${rNbr(obj.scale.y)}, ${rNbr(obj.scale.z)},]} `
    if (options.meta && obj.userData && Object.keys(obj.userData).length)
      result += `userData={${JSON.stringify(obj.userData)}} `

    // Remove empty groups
    if (
      !options.verbose &&
      (type === 'group' || type === 'scene') &&
      (result === oldResult || obj.children.length === 0)
    ) {
      obj.__removed = true
      return children
    }

    // Close tag
    result += `${children.length ? '>' : '/>'}\n`

    // Add children and return
    if (children.length) result += children + `</${type}>${!parent ? '' : '\n'}`
    return result
  }

  function printAnimations(animations) {
    return animations.length
      ? `\nconst { actions } = useAnimations${options.types ? '<GLTFActions>' : ''}(animations, group)`
      : ''
  }

  function parseExtras(extras) {
    if (extras) {
      return (
        Object.keys(extras)
          .map((key) => `${key}: ${extras[key]}`)
          .join('\n') + '\n'
      )
    } else return ''
  }

  function p(obj, line) {
    console.log(
      [...new Array(line * 2)].map(() => ' ').join(''),
      obj.type,
      obj.name,
      'pos:',
      obj.position.toArray().map(rNbr),
      'scale:',
      obj.scale.toArray().map(rNbr),
      'rot:',
      [obj.rotation.x, obj.rotation.y, obj.rotation.z].map(rNbr),
      'mat:',
      obj.material ? `${obj.material.name}-${obj.material.uuid.substring(0, 8)}` : ''
    )
    obj.children.forEach((o) => p(o, line + 1))
  }

  if (options.debug) p(gltf.scene, 0)

  const duplicates = {}
  const objects = []
  gltf.scene.traverse((child) => {
    objects.push(child)
    if (child.isMesh && child.material) {
      if (!duplicates[child.material.name]) {
        duplicates[child.material.name] = 1
      } else {
        duplicates[child.material.name]++
      }
    }
  })

  const animations = gltf.animations
  const hasAnimations = animations.length > 0
  const scene = print(objects, gltf, gltf.scene)
  const result = `/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
${parseExtras(gltf.parser.json.asset && gltf.parser.json.asset.extras)}*/
        ${options.types ? `\nimport * as THREE from 'three'` : ''}
        import React, { useRef, useState, useEffect  } from 'react'
        import { useFrame } from "@react-three/fiber"
        import { useSnapshot } from "valtio" 
        import { useGLTF, ${scene.includes('PerspectiveCamera') ? 'PerspectiveCamera,' : ''}
        ${scene.includes('OrthographicCamera') ? 'OrthographicCamera,' : ''}
        ${hasAnimations ? 'useAnimations' : ''} } from '@react-three/drei'
        ${options.types ? 'import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"' : ''}
        ${options.types ? printTypes(objects, animations) : ''}
        export default function Model(props${options.types ? ": JSX.IntrinsicElements['group']" : ''}) {
          const ref = ${options.types ? 'useRef<THREE.Group>()' : 'useRef()'}
          const snap = useSnapshot(props.state)
          const { nodes, materials${hasAnimations ? ', animations' : ''} } = useGLTF('/${fileName}'${
    options.draco ? `, ${JSON.stringify(options.draco)}` : ''
  })${options.types ? ' as GLTFResult' : ''}${printAnimations(animations)}

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })
  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = \`<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="\${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">\${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>\`
    const auto = \`<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>\`
    document.body.style.cursor = \`url('data:image/svg+xml;base64,\${btoa(hovered ? cursor : auto)}'), auto\`
  }, [hovered])
          return (
            <group ref={ref} {...props} dispose={null}
            onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (props.state.current = null)}
        onPointerDown={(e) => (e.stopPropagation(), (props.state.current = e.object.material.name))}>
        ${scene}
            </group>
          )
        }

useGLTF.preload('/${fileName}')`
  return prettier.format(result, {
    semi: false,
    printWidth: options.printwidth || 120,
    singleQuote: true,
    jsxBracketSameLine: true,
    parser: options.types ? 'babel-ts' : 'babel',
    plugins: [parserBabel],
  })
}

module.exports = parse
