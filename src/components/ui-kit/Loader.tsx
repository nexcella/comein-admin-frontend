import React, {useMemo} from "react";

type LoaderProps = {
  fill?: string,
  size?: 'small' | 'normal' | 'large'
}

export function Loader({fill = '#fff', size = 'normal'}: LoaderProps) {
  const {width, height} = useMemo(() => {
    switch (size) {
      case 'small':
        return {height: 40, width: 40}
      case 'normal':
      default:
        return {height: 70, width: 70}
    }
  }, [size])
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width * 2} ${height * 2}`} xmlns="http://www.w3.org/2000/svg">
      <circle fill={fill} stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"/>
      </circle>
      <circle fill={fill} stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"/>
      </circle>
      <circle fill={fill} stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"/>
      </circle>
    </svg>
  )
}
