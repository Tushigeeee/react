import * as React from "react"
const MeetingCalander = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={146}
    height={156}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <g filter="url(#b)">
        <rect
          width={55.021}
          height={55.021}
          x={45}
          y={20}
          fill="#FFB300"
          rx={4}
        />
      </g>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M83.218 59.729H62.781c-1.559 0-2.781-1.453-2.781-3.307V41.431c0-1.854.7-3.173 2.26-3.173h6.783v-1.131c0-.608.37-1.127.985-1.127.616 0 1.115.494 1.115 1.102l.161 1.156h3.392l.161-1.156c0-.608.499-1.102 1.114-1.102.616 0 1.114.494 1.114 1.102l-.128 1.156h6.782c1.56 0 2.261 1.319 2.261 3.173v14.991c0 1.854-1.222 3.307-2.782 3.307Zm0-19.4h-6.133v.447c0 .608-.644.873-1.259.873-.616 0-.969-.265-.969-.873v-.448h-3.714v.448c0 .608-.354.873-.97.873-.615 0-1.258-.265-1.258-.873v-.448l-6.654.19c-.195 0-.033.229-.033.913l.033 2.479h21.478l.033-2.48c0-.683-.358-1.102-.554-1.102Zm.554 16.093-.033-10.252H62.261l-.033 10.252c0 .684-.162 1.053.033 1.053h21.478c.195 0 .033-.369.033-1.053Zm-14.729-2.338h-3.39v-3.392c0-.406-.12-1.097.29-1.097h3.467c.41 0 .742.327.742.734v3.428c0 .406-.698.327-1.109.327Zm-3.39 0c-.411 0 0-.328 0 0Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={145.021}
        height={155.021}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={35} />
        <feGaussianBlur stdDeviation={22.5} />
        <feColorMatrix values="0 0 0 0 0.190902 0 0 0 0 0.257471 0 0 0 0 0.305677 0 0 0 0.15 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_404" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={15} />
        <feGaussianBlur stdDeviation={17.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="effect1_dropShadow_1_404"
          result="effect2_dropShadow_1_404"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_1_404"
          result="shape"
        />
      </filter>
      <filter
        id="b"
        width={89.021}
        height={89.021}
        x={29}
        y={5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={2} />
        <feGaussianBlur stdDeviation={8.5} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_404" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1_404"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export default MeetingCalander
