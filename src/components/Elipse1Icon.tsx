import { memo, SVGProps } from 'react';

const Ellipse1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 335 326' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    {/* old rx and ry: rx={167.5} ry={163} */}
    <ellipse cx={167.5} cy={163} rx={100} ry={100} fill='url(#paint0_linear_49_156)' />
    <defs>
      <linearGradient id='paint0_linear_49_156' x1={50.5} y1={279} x2={313.5} y2={99.5} gradientUnits='userSpaceOnUse'>
        {/* old color is #C76408 */}
        <stop stopColor='#FF00F5' />
        <stop offset={1} stopColor='#B9B7BA' />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(Ellipse1Icon);
export { Memo as Ellipse1Icon };
