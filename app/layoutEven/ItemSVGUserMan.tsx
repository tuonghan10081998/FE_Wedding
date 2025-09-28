import React,{useEffect,useState} from "react";

type BadgeManProps = {
  text?: string;
  width?: number;
  height?: number;
  rotate?:number
  centerX?: number;
  centerY?: number;
  viewbox?:string;
  customer?:number
};

const BadgeMan: React.FC<BadgeManProps> = ({
  text,rotate,centerX,centerY,width = 50,height = 55,viewbox =`-10 -10 90 90`,customer
}) => {
  const [active, setActive] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActive(false);
        setTimeout(() => setActive(true), 50); // restart animation
      }, 3000);
  
      return () => clearInterval(interval);
    }, []);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`${viewbox}`}
      width={width}
      height={height}
      role="img"
      aria-label="Badge with man"
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
            id="man__a"
            gradientUnits="userSpaceOnUse"
            cx="0"
            cy="0"
            r="13.107"
            fx="0"
            fy="0"
            gradientTransform="matrix(.99663 -.08202 .1526 1.84257 16.15 9.55)"
            spreadMethod="pad"
          >
            <stop offset="0%" stopColor="#333" />
            <stop offset="100%" stopColor="#666" />
          </radialGradient>

          <path
            id="man__b"
            fill="#666"
            d="M31.35 34.2q-3 0-5.1 2.05-2.05 2.1-2.05 5.1v1.35q0 3 2.05 5.05 2.1 2.1 5.1 2.1 2.95 0 5-2.1 2.15-2.05 2.15-5.05v-1.35q0-3-2.15-5.1-2.05-2.05-5-2.05m-14.3 2.05q-2.05-2.05-5-2.05-3 0-5.1 2.05-2.05 2.1-2.05 5.1v1.35q0 3 2.05 5.05 2.1 2.1 5.1 2.1 2.95 0 5-2.1 2.15-2.05 2.15-5.05v-1.35q0-3-2.15-5.1z"
          />

          <path
            id="man__c"
            fill="#f6e0c1"
            d="M43.25 28.25v-8q0-6.2-4.4-10.6-4.4-4.4-10.6-4.4H14q-6.2 0-10.6 4.4-1.05 1.05-1.85 2.2Q-1 15.55-1 20.25v8q0 4.7 2.55 8.4.8 1.15 1.85 2.2 4.4 4.4 10.6 4.4h14.25q6.2 0 10.6-4.4 4.4-4.4 4.4-10.6z"
          />

          <path
            id="man__eb59e9e"
            fill="#b59e9e"
            d="M40.5 36.95q2.75-3.789 2.75-8.7v-8q0-6.2-4.4-10.6-4.4-4.4-10.6-4.4H14q-6.2 0-10.6 4.4-1.05 1.05-1.85 2.2Q-1 15.55-1 20.25v8q0 4.7 2.55 8.4.8 1.15 1.85 2.2 4.4 4.4 10.6 4.4h14.25q6.2 0 10.6-4.4.914-.914 1.65-1.9z"
          />

          <path id="man__g" fill="#eae1e1" d="M27.25 32.6H17.1l4.35 6.2 5.8-6.2z" />

          <g id="man__hf6e0c1">
            <path
              fill="#f6e0c1"
              d="M2.35 25.6q1.076 1.735 2.6 3.3.65.65 1.35 1.2 4.5 3.75 10.6 3.75 6 0 10.5-3.6.8-.65 1.5-1.35.59-.59 1.1-1.2-.274-11.123-13.7-4.8-11.435-6.388-13.95 2.7z"
            />
            <path
              fill="url(#man__a)"
              d="M33.05 22.2q.41-1.235.6-2.6.025-.215.05-.45.15-1.05.15-2.25 0-2.016-.4-3.8-.336-1.53-.95-2.9-.547-1.185-1.3-2.25-.904-1.287-2.15-2.4Q24.308 1.205 17.4.5 10.542-.205 5.25 4.85q-1.507 1.468-2.6 3.1-.723 1.089-1.25 2.25Q0 13.292 0 16.9q0 .801.05 1.55.162 1.636.6 3.15.221.835.55 1.6.318.862.75 1.65l.4.75q2.515-9.088 13.95-2.7 13.426-6.323 13.7 4.8 1.004-1.206 1.7-2.5.851-1.419 1.35-3z"
            />
          </g>

          <path
            id="man__d"
            stroke="#999"
            strokeWidth="0.05"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M14 5.25h14.25q6.2 0 10.6 4.4 4.4 4.4 4.4 10.6v8q0 6.2-4.4 10.6-4.4 4.4-10.6 4.4H14q-6.2 0-10.6-4.4-1.05-1.05-1.85-2.2Q-1 32.95-1 28.25v-8q0-4.7 2.55-8.4.8-1.15 1.85-2.2 4.4-4.4 10.6-4.4z"
          />

          <path
            id="man__f"
            stroke="#999"
            strokeWidth="0.05"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M1.55 36.65Q-1 32.95-1 28.25v-8q0-4.7 2.55-8.4.8-1.15 1.85-2.2 4.4-4.4 10.6-4.4h14.25q6.2 0 10.6 4.4 4.4 4.4 4.4 10.6v8q0 4.911-2.75 8.7-.736.986-1.65 1.9-4.4 4.4-10.6 4.4H14q-6.2 0-10.6-4.4-1.05-1.05-1.85-2.2z"
          />
        </defs>

        <use xlinkHref="#man__b" transform="rotate(90 22.85 29.55)" />
        <g transform="rotate(90 22.85 29.55)">
          <use xlinkHref="#man__c" />
          <use xlinkHref="#man__d" />
        </g>
        <g transform="rotate(90 22.85 29.55)">
          <use xlinkHref="#man__eb59e9e" />
          <use xlinkHref="#man__f" />
        </g>
        <use xlinkHref="#man__g" transform="rotate(90 22.85 29.55)" />
        <g transform="rotate(90 20.95 32.55)">
          <use xlinkHref="#man__hf6e0c1" />
        </g>

        {/* Text block */}
        <g transform="translate(0,0)">
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
                  lineHeight: "1.2", // hoặc "40px" - tăng khoảng cách giữa các dòng
                 wordSpacing: "2px", // Khoảng cách giữa các từ
            }}
            >
                {text}
                  {customer !== 0 && (
                    <tspan
                      className={active ? "bling-dot" : ""}
                      fill="red"
                    >
                      ({customer})
                    </tspan>
               )}
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default BadgeMan;
