import React from "react";

type BadgeProps = {
  text?: string;
  width?: number;
  height?: number;
  rotate?:number
  centerX?: number;
  centerY?: number;
  viewbox?:string
};

const Badge: React.FC<BadgeProps> = ({ text,rotate,centerX,centerY,width = 50,height = 55,viewbox =`-10 -10 90 90` }) => {
  return (
   <div>
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${viewbox}`}
      width={width}
      height={height}
      role="img"
      aria-label="Badge with name"
      style={{
         overflow: 'visible', // Quan trọng!
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        imageRendering: 'crisp-edges',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
       <g transform={`rotate(${rotate}, ${centerX}, ${centerY})`}>
        <defs>
          <radialGradient
            id="made_of_honor__a"
            gradientUnits="userSpaceOnUse"
            cx="0"
            cy="0"
            r="19.65"
            fx="0"
            fy="0"
            gradientTransform="matrix(1 0 0 .54707 17.15 7.65)"
            spreadMethod="pad"
          >
            <stop offset="0%" stopColor="#333" />
            <stop offset="100%" stopColor="#666" />
          </radialGradient>

          <radialGradient
            id="made_of_honor__b"
            gradientUnits="userSpaceOnUse"
            cx="0"
            cy="0"
            r="7.95"
            fx="0"
            fy="0"
            gradientTransform="matrix(1 0 0 .3915 16.05 .55)"
            spreadMethod="pad"
          >
            <stop offset="0%" stopColor="#333" />
            <stop offset="100%" stopColor="#666" />
          </radialGradient>

          <path
            id="made_of_honor__c"
            fill="#666"
            d="M36.05 35q-2.05-2.05-5-2.05-3 0-5.1 2.05-2.05 2.1-2.05 5.1v1.35q0 3 2.05 5.05 2.1 2.1 5.1 2.1 2.95 0 5-2.1 2.15-2.05 2.15-5.05V40.1q0-3-2.15-5.1m-19.3 0q-2.05-2.05-5-2.05-3 0-5.1 2.05-2.05 2.1-2.05 5.1v1.35q0 3 2.05 5.05 2.1 2.1 5.1 2.1 2.95 0 5-2.1 2.15-2.05 2.15-5.05V40.1q0-3-2.15-5.1z"
          />

          <path
            id="made_of_honor__dffcccc"
            fill="#ffcccc"
            d="M42.2 37.05q2.05-3.368 2.05-7.6v-8-.1q-.036-6.136-4.4-10.5-4.4-4.4-10.6-4.4H15q-6.2 0-10.6 4.4-1.05 1.05-1.85 2.2Q0 16.73 0 21.45v8q0 4.72 2.55 8.4.8 1.15 1.85 2.2 4.4 4.4 10.6 4.4h14.25q6.2 0 10.6-4.4 1.397-1.397 2.35-3z"
          />

          <path
            id="made_of_honor__f"
            fill="#FFF"
            d="M24.8 39.35q0-.75-.55-1.3t-1.3-.55q-.75 0-1.3.55t-.55 1.3q0 .75.55 1.3t1.3.55q.75 0 1.3-.55t.55-1.3m2.85-2.2q-.55.55-.55 1.3t.55 1.3q.55.55 1.3.55t1.3-.55q.55-.55.55-1.3t-.55-1.3q-.55-.55-1.3-.55t-1.3.55m-8.7 2.6q.55-.55.55-1.3t-.55-1.3q-.55-.55-1.3-.55t-1.3.55q-.55.55-.55 1.3t.55 1.3q.55.55 1.3.55t1.3-.55z"
          />

          <g id="made_of_honor__gFFCD9A">
            <path
              fill="#FFCD9A"
              d="M5.05 29Q10 34 17.1 34q7.05 0 12-5 3.183-3.151 4.35-7.15-9.183-5.525-15.75-.25-6.514 5.313-12.7 7.35l.05.05z"
            />
            <path
              fill="url(#made_of_honor__a)"
              d="M32.4 9.55q-1.184-2.484-3.3-4.6Q24.15 0 17.1 0 10 0 5.05 4.95q-2.095 2.116-3.3 4.6Q.1 12.934.1 17q0 3.506.4 12.65 2.093.167 4.5-.7 6.186-2.037 12.7-7.35 6.567-5.275 15.75.25.65-2.288.65-4.85 0-4.066-1.7-7.45z"
            />
          </g>

          <path
            id="made_of_honor__j"
            fill="url(#made_of_honor__b)"
            d="M21-.2q-1.8-1.15-4.4-1.15-2.6 0-4.45 1.15-1.8 1.25-1.8 2.9t1.8 2.8q1 .65 2.15.95 1.05.3 2.3.3 1.25 0 2.35-.3 1.15-.3 2.05-.95 1.85-1.15 1.85-2.8T21-.2m-4.9-.45q1.3 0 2.2.35.95.35.95.9 0 .5-.95.9-.9.35-2.2.35-1.3 0-2.25-.35-.9-.4-.9-.9 0-.55.9-.9.95-.35 2.25-.35m2.2.35q-.9-.35-2.2-.35-1.3 0-2.25.35-.9.35-.9.9 0 .5.9.9.95.35 2.25.35t2.2-.35q.95-.4.95-.9 0-.55-.95-.9z"
          />

          <path
            id="made_of_honor__e"
            stroke="#999"
            strokeWidth="0.05"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M15 6.45h14.25q6.2 0 10.6 4.4 4.364 4.364 4.4 10.5v8.1q0 4.232-2.05 7.625-.953 1.578-2.35 2.975-4.4 4.4-10.6 4.4H15q-6.2 0-10.6-4.4-1.05-1.05-1.85-2.2Q0 34.17 0 29.45v-8q0-4.72 2.55-8.4.8-1.15 1.85-2.2 4.4-4.4 10.6-4.4z"
          />

          <path
            id="made_of_honor__h"
            stroke="#333"
            strokeWidth="0.05"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M5.025 28.975q-2.432.842-4.525.675Q.1 20.506.1 17q0-4.066 1.65-7.45 1.205-2.484 3.3-4.6Q10 0 17.1 0q7.05 0 12 4.95 2.116 2.116 3.325 4.6Q34.1 12.934 34.1 17q0 2.562-.65 4.85M5.05 29l-.025-.025q6.16-2.062 12.7-7.35 6.542-5.3 15.725.225"
          />

          <path
            id="made_of_honor__i"
            stroke="#666"
            strokeWidth="0.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M33.45 21.85Q32.283 25.849 29.1 29q-4.95 5-12 5-7.1 0-12.05-5"
          />

          <path
            id="made_of_honor__k"
            stroke="#333"
            strokeWidth="0.1"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M19.25.6q0 .5-.95.9-.9.35-2.2.35-1.3 0-2.25-.35-.9-.4-.9-.9 0-.55.9-.9.95-.35 2.25-.35t2.2.35q.95.35.95.9zm3.6 2.1q0 1.65-1.85 2.8-.9.65-2.05.95-1.1.3-2.35.3t-2.3-.3q-1.15-.3-2.15-.95-1.8-1.15-1.8-2.8t1.8-2.9Q14-1.35 16.6-1.35T21-.2q1.85 1.25 1.85 2.9z"
          />
        </defs>

        {/* phần đồ họa */}
        <use xlinkHref="#made_of_honor__c" transform="rotate(90 23.85 29.2)" />

        <g transform="rotate(90 23.85 29.2)">
          <use xlinkHref="#made_of_honor__dffcccc" />
          <use xlinkHref="#made_of_honor__e" />
        </g>

        <use xlinkHref="#made_of_honor__f" transform="rotate(90 23.85 29.2)" />

        <g transform="rotate(90 20.05 30.8)">
          <use xlinkHref="#made_of_honor__gFFCD9A" />
          <use xlinkHref="#made_of_honor__h" />
          <use xlinkHref="#made_of_honor__i" />
        </g>

        <g transform="rotate(90 20.05 30.8)">
          <use xlinkHref="#made_of_honor__j" />
          <use xlinkHref="#made_of_honor__k" />
        </g>

        {/* text block */}
        <g transform="translate(55,30)">
          <text
            x="0"
            y="-8"
            fill="#000"
            textAnchor="middle"
            alignmentBaseline="middle"
            dominantBaseline="inherit"
            transform="rotate(-270)"
            style={{
              letterSpacing: "1px",
              fontFamily: "serif",
              fontSize: "28px",
               // Các thuộc tính quan trọng cho text sắc nét
                textRendering: "geometricPrecision",
                WebkitFontSmoothing: "subpixel-antialiased",
                MozOsxFontSmoothing: "auto",
                fontSmooth: "auto",
                backfaceVisibility: "hidden",
                willChange: "transform",
            }}
          >
            {text}
          </text>
        </g>
      </g>
    </svg>
    
   </div>
    
  );
   
};

export default Badge;
