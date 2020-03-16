import React, {useMemo} from "react";

type LoaderProps = {
  fill?: string,
  size?: 'small' | 'normal' | 'large'
}

export function Loader({fill = '#fff', size = 'normal'}: LoaderProps) {
  const {width, height} = useMemo(() => {
    switch (size) {
      case 'small':
        return {height: 30, width: 30}
      case 'normal':
      default:
        return {height: 70, width: 70}
    }
  }, [size])
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width * 2} ${height * 2}`} xmlns="http://www.w3.org/2000/svg"
         fill={fill}>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2 1)" stroke="#FFF" strokeWidth="1.5">
          <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="1;0;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;1;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;1;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;1;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;1;0;0;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;1;0;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;1;0" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
          <circle cx="27" cy="5" r="5" fillOpacity="0" fill="#fff">
            <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;0;1" calcMode="linear"
                     repeatCount="indefinite"/>
          </circle>
        </g>
      </g>
    </svg>
  )
}
