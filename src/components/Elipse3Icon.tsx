import { memo, SVGProps } from 'react';

const Ellipse3Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 335 326' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    {/* old rx and ry: rx={167.5} ry={163} */}
    <ellipse cx={167.5} cy={163} rx={100} ry={100} fill='url(#paint0_linear_49_158)' />
    <defs>
      <linearGradient
        id='paint0_linear_49_158'
        x1={-0.00000193731}
        y1={67.5}
        x2={285.5}
        y2={273.5}
        gradientUnits='userSpaceOnUse'
      >
        {/* old color is #0498C7 */}
        <stop stopColor='#D9D9D9' />
        <stop offset={1} stopColor='#AD00FF' />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(Ellipse3Icon);
export { Memo as Ellipse3Icon };
