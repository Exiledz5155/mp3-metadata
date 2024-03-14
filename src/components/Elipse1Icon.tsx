import { memo, SVGProps } from 'react';

const Ellipse1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 335 326' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <ellipse cx={167.5} cy={163} rx={167.5} ry={163} fill='url(#paint0_linear_49_156)' />
    <defs>
      <linearGradient id='paint0_linear_49_156' x1={50.5} y1={279} x2={313.5} y2={99.5} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#C76408' />
        <stop offset={1} stopColor='#D9D9D9' />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(Ellipse1Icon);
export { Memo as Ellipse1Icon };
