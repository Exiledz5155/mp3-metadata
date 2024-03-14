import { memo, SVGProps } from 'react';

const Ellipse2Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 335 326' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <ellipse cx={167.5} cy={163} rx={167.5} ry={163} fill='url(#paint0_linear_49_157)' />
    <defs>
      <linearGradient id='paint0_linear_49_157' x1={167.5} y1={0} x2={167.5} y2={326} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#C651FD' />
        <stop offset={1} stopColor='#D9D9D9' />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(Ellipse2Icon);
export { Memo as Ellipse2Icon };
