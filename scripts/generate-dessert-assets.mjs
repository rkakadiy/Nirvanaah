import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "assets");

await fs.mkdir(outDir, { recursive: true });

const W = 1600;
const H = 1200;

function svgWrap(inner) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFF8F0"/>
        <stop offset="45%" stop-color="#FFF2E1"/>
        <stop offset="100%" stop-color="#F6E4D1"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
        <stop offset="55%" stop-color="#F6B73C" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#F6B73C" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="chocolate" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7A4A2C"/>
        <stop offset="100%" stop-color="#3A2418"/>
      </linearGradient>
      <linearGradient id="saffron" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F8D36C"/>
        <stop offset="100%" stop-color="#F6B73C"/>
      </linearGradient>
      <linearGradient id="rose" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F9E3E3"/>
        <stop offset="100%" stop-color="#F4D1D1"/>
      </linearGradient>
      <linearGradient id="pistachio" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#DCEBCF"/>
        <stop offset="100%" stop-color="#B8D8A8"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#3A2418" flood-opacity="0.16"/>
      </filter>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.05"/>
        </feComponentTransfer>
      </filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <circle cx="800" cy="420" r="420" fill="url(#glow)"/>
    <circle cx="260" cy="220" r="180" fill="#F4D1D1" fill-opacity="0.22"/>
    <circle cx="1360" cy="220" r="180" fill="#B8D8A8" fill-opacity="0.18"/>
    <circle cx="1420" cy="980" r="260" fill="#F6B73C" fill-opacity="0.10"/>
    <circle cx="150" cy="980" r="240" fill="#F4D1D1" fill-opacity="0.10"/>
    ${inner}
    <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.22"/>
  </svg>`;
}

function petals() {
  return `
    <g opacity="0.85">
      <ellipse cx="290" cy="250" rx="34" ry="18" fill="url(#rose)" transform="rotate(-22 290 250)"/>
      <ellipse cx="1170" cy="220" rx="28" ry="15" fill="url(#rose)" transform="rotate(18 1170 220)"/>
      <ellipse cx="1260" cy="860" rx="42" ry="18" fill="url(#rose)" transform="rotate(-20 1260 860)"/>
      <ellipse cx="340" cy="880" rx="32" ry="16" fill="url(#rose)" transform="rotate(14 340 880)"/>
      <ellipse cx="1030" cy="180" rx="24" ry="12" fill="url(#pistachio)" transform="rotate(26 1030 180)"/>
      <ellipse cx="500" cy="170" rx="22" ry="10" fill="url(#pistachio)" transform="rotate(-18 500 170)"/>
    </g>`;
}

function plateBase() {
  return `
    <ellipse cx="800" cy="915" rx="390" ry="90" fill="#3A2418" opacity="0.12" filter="url(#soft)"/>
    <ellipse cx="800" cy="860" rx="340" ry="68" fill="#FFFDF9" stroke="#E8D8C6" stroke-width="8" filter="url(#shadow)"/>
  `;
}

function heroKulfi() {
  return svgWrap(`
    ${petals()}
    ${plateBase()}
    <g filter="url(#shadow)">
      <rect x="660" y="360" width="280" height="360" rx="96" fill="url(#saffron)"/>
      <rect x="700" y="320" width="200" height="92" rx="46" fill="url(#rose)"/>
      <path d="M720 410C760 390 840 390 880 410L910 470C860 500 740 500 690 470L720 410Z" fill="#FFF3E6"/>
      <path d="M688 500C752 470 848 470 912 500C904 580 904 660 910 700C850 732 746 736 690 700C696 650 694 580 688 500Z" fill="#F7C65A"/>
      <path d="M705 540C745 524 858 526 895 540" stroke="#FFF7EA" stroke-width="16" stroke-linecap="round"/>
      <path d="M716 610C758 592 836 594 874 610" stroke="#FFF7EA" stroke-width="14" stroke-linecap="round"/>
      <path d="M730 680C770 664 824 664 862 680" stroke="#FFF7EA" stroke-width="12" stroke-linecap="round"/>
      <path d="M690 702C747 736 853 736 910 702L892 786C850 820 750 820 708 786L690 702Z" fill="url(#rose)"/>
      <ellipse cx="800" cy="302" rx="180" ry="52" fill="#FFFDF9" opacity="0.75"/>
      <ellipse cx="800" cy="330" rx="144" ry="36" fill="#FFFDF9" opacity="0.35"/>
    </g>
    <g>
      <circle cx="590" cy="470" r="22" fill="url(#pistachio)"/>
      <circle cx="610" cy="606" r="14" fill="#F4D1D1"/>
      <circle cx="1002" cy="470" r="22" fill="#F4D1D1"/>
      <circle cx="980" cy="632" r="14" fill="url(#pistachio)"/>
      <path d="M535 310C595 284 654 280 710 296" stroke="#F8D36C" stroke-width="10" stroke-linecap="round"/>
      <path d="M1008 320C1066 284 1124 278 1184 292" stroke="#B8D8A8" stroke-width="10" stroke-linecap="round"/>
      <path d="M480 620C520 638 548 652 570 682" stroke="#F4D1D1" stroke-width="8" stroke-linecap="round"/>
    </g>
  `);
}

function faloodaKulfi() {
  return svgWrap(`
    ${petals()}
    <g filter="url(#shadow)">
      <ellipse cx="800" cy="980" rx="390" ry="96" fill="#3A2418" opacity="0.11" filter="url(#soft)"/>
      <path d="M610 280H990L930 948C928 982 902 1010 870 1010H730C698 1010 672 982 670 948L610 280Z" fill="#FFFDF9" stroke="#E8D8C6" stroke-width="10"/>
      <path d="M650 330H950L900 900C898 932 874 956 844 956H756C726 956 702 932 700 900L650 330Z" fill="url(#rose)"/>
      <path d="M680 420H920L882 800C880 828 858 850 830 850H770C742 850 720 828 718 800L680 420Z" fill="#8F4D38" opacity="0.88"/>
      <path d="M692 455C722 444 856 442 886 455" stroke="#FDEFD7" stroke-width="14" stroke-linecap="round"/>
      <path d="M700 520C732 510 844 510 876 520" stroke="#FFF4EA" stroke-width="12" stroke-linecap="round"/>
      <path d="M708 586C736 580 840 580 868 586" stroke="#FDEFD7" stroke-width="12" stroke-linecap="round"/>
      <rect x="640" y="230" width="320" height="102" rx="48" fill="#FFF7ED"/>
      <ellipse cx="800" cy="246" rx="156" ry="36" fill="#F4D1D1"/>
    </g>
    <g>
      <path d="M666 620C726 670 874 670 934 620" stroke="#B8D8A8" stroke-width="14" stroke-linecap="round"/>
      <path d="M700 700C752 732 848 734 900 700" stroke="#F6B73C" stroke-width="12" stroke-linecap="round"/>
      <circle cx="714" cy="388" r="18" fill="#F6B73C"/>
      <circle cx="895" cy="404" r="18" fill="url(#pistachio)"/>
      <circle cx="650" cy="802" r="18" fill="url(#rose)"/>
      <circle cx="944" cy="810" r="18" fill="#F6B73C"/>
      <path d="M520 320C600 292 668 282 740 294" stroke="#F4D1D1" stroke-width="10" stroke-linecap="round"/>
      <path d="M864 300C934 278 1010 278 1080 294" stroke="#B8D8A8" stroke-width="10" stroke-linecap="round"/>
    </g>
  `);
}

function cassataCake() {
  return svgWrap(`
    ${petals()}
    <g filter="url(#shadow)">
      <ellipse cx="800" cy="940" rx="360" ry="86" fill="#3A2418" opacity="0.11" filter="url(#soft)"/>
      <path d="M520 340H1080L1030 860C1026 910 986 948 936 948H664C614 948 574 910 570 860L520 340Z" fill="#FFFDF9" stroke="#E8D8C6" stroke-width="10"/>
      <path d="M580 390H1020L982 786C978 830 942 862 898 862H702C658 862 622 830 618 786L580 390Z" fill="#F8E4C8"/>
      <path d="M612 410H988L958 672C954 714 922 744 882 744H718C678 744 646 714 642 672L612 410Z" fill="#F4D1D1"/>
      <path d="M648 430H952L930 558C926 588 902 610 872 610H728C698 610 674 588 670 558L648 430Z" fill="#B8D8A8"/>
      <path d="M646 612H954L932 736C928 764 904 784 874 784H726C696 784 672 764 668 736L646 612Z" fill="url(#saffron)"/>
      <path d="M680 464H920" stroke="#FFFDF9" stroke-width="16" stroke-linecap="round"/>
      <path d="M688 650H912" stroke="#FFFDF9" stroke-width="14" stroke-linecap="round"/>
      <path d="M610 338C662 288 732 264 800 264C868 264 938 288 990 338" fill="none" stroke="#FFFDF9" stroke-width="18" stroke-linecap="round"/>
      <path d="M650 328C716 298 884 298 950 328" fill="none" stroke="#F4D1D1" stroke-width="12" stroke-linecap="round"/>
    </g>
    <g>
      <circle cx="618" cy="360" r="24" fill="#F4D1D1"/>
      <circle cx="982" cy="360" r="24" fill="url(#pistachio)"/>
      <circle cx="622" cy="832" r="20" fill="url(#pistachio)"/>
      <circle cx="978" cy="832" r="20" fill="#F4D1D1"/>
    </g>
  `);
}

function sundaeBowl() {
  return svgWrap(`
    ${petals()}
    <g filter="url(#shadow)">
      <ellipse cx="800" cy="940" rx="360" ry="88" fill="#3A2418" opacity="0.11" filter="url(#soft)"/>
      <path d="M470 590C470 430 605 332 800 332C995 332 1130 430 1130 590C1130 762 1006 856 800 856C594 856 470 762 470 590Z" fill="#FFFDF9" stroke="#E8D8C6" stroke-width="10"/>
      <path d="M560 600C560 480 654 404 800 404C946 404 1040 480 1040 600C1040 716 952 782 800 782C648 782 560 716 560 600Z" fill="url(#rose)"/>
      <path d="M610 514C646 472 712 452 800 452C888 452 954 472 990 514C966 536 934 550 904 558C868 570 836 576 800 576C764 576 732 570 696 558C666 550 634 536 610 514Z" fill="url(#saffron)"/>
      <path d="M624 598C660 624 702 640 800 640C898 640 940 624 976 598" fill="none" stroke="#FFFDF9" stroke-width="20" stroke-linecap="round"/>
      <circle cx="678" cy="508" r="70" fill="#FFF6ED"/>
      <circle cx="824" cy="474" r="78" fill="url(#pistachio)"/>
      <circle cx="922" cy="520" r="68" fill="#F4D1D1"/>
      <path d="M556 468C610 412 690 392 760 388" stroke="#3A2418" stroke-width="12" stroke-linecap="round" opacity="0.38"/>
      <path d="M1020 420C1076 452 1112 492 1132 550" stroke="#3A2418" stroke-width="12" stroke-linecap="round" opacity="0.28"/>
      <path d="M700 724C750 694 850 694 900 724" stroke="#F6B73C" stroke-width="14" stroke-linecap="round"/>
    </g>
    <g>
      <circle cx="590" cy="650" r="20" fill="#F6B73C"/>
      <circle cx="1010" cy="660" r="20" fill="url(#pistachio)"/>
      <circle cx="680" cy="740" r="16" fill="#F4D1D1"/>
      <circle cx="920" cy="744" r="16" fill="#F6B73C"/>
      <path d="M560 370L530 300" stroke="#F4D1D1" stroke-width="14" stroke-linecap="round"/>
      <path d="M1040 380L1080 304" stroke="#B8D8A8" stroke-width="14" stroke-linecap="round"/>
    </g>
  `);
}

function birthdayCake() {
  return svgWrap(`
    ${petals()}
    <g filter="url(#shadow)">
      <ellipse cx="800" cy="968" rx="420" ry="94" fill="#3A2418" opacity="0.11" filter="url(#soft)"/>
      <path d="M520 410H1080L1050 900C1046 944 1010 980 966 980H634C590 980 554 944 550 900L520 410Z" fill="#FFFDF9" stroke="#E8D8C6" stroke-width="10"/>
      <path d="M570 460H1030L1006 848C1002 884 972 912 936 912H664C628 912 598 884 594 848L570 460Z" fill="#F4D1D1"/>
      <path d="M602 510H998L980 784C976 818 948 844 914 844H686C652 844 624 818 620 784L602 510Z" fill="url(#saffron)"/>
      <path d="M632 562H968L954 726C950 754 928 776 900 776H700C672 776 650 754 646 726L632 562Z" fill="#FFF1E0"/>
      <path d="M612 446C678 390 722 370 800 370C878 370 922 390 988 446" fill="none" stroke="#FFFDF9" stroke-width="16" stroke-linecap="round"/>
      <path d="M748 310V460" stroke="#3A2418" stroke-width="10" stroke-linecap="round"/>
      <path d="M800 292V460" stroke="#3A2418" stroke-width="10" stroke-linecap="round"/>
      <path d="M852 310V460" stroke="#3A2418" stroke-width="10" stroke-linecap="round"/>
      <path d="M736 294C746 270 770 252 792 248C784 268 784 290 798 314C772 320 752 316 736 294Z" fill="#F6B73C"/>
      <path d="M788 276C800 250 820 234 842 230C838 252 840 276 856 300C836 306 818 302 788 276Z" fill="#F4D1D1"/>
      <path d="M842 294C854 270 878 252 900 248C894 268 894 290 908 314C882 320 862 316 842 294Z" fill="#B8D8A8"/>
    </g>
    <g>
      <circle cx="586" cy="330" r="18" fill="#F6B73C"/>
      <circle cx="1020" cy="350" r="18" fill="url(#pistachio)"/>
      <circle cx="620" cy="876" r="18" fill="#F4D1D1"/>
      <circle cx="980" cy="876" r="18" fill="#F6B73C"/>
      <circle cx="420" cy="540" r="12" fill="#F4D1D1"/>
      <circle cx="1180" cy="590" r="12" fill="#B8D8A8"/>
      <circle cx="470" cy="760" r="10" fill="#F6B73C"/>
      <circle cx="1130" cy="760" r="10" fill="#F4D1D1"/>
    </g>
  `);
}

function ingredientsTexture() {
  return svgWrap(`
    <g opacity="0.95">
      <ellipse cx="430" cy="330" rx="112" ry="44" fill="url(#pistachio)" transform="rotate(-18 430 330)"/>
      <ellipse cx="520" cy="500" rx="90" ry="34" fill="url(#rose)" transform="rotate(22 520 500)"/>
      <ellipse cx="700" cy="280" rx="106" ry="34" fill="#F6B73C" transform="rotate(14 700 280)"/>
      <ellipse cx="880" cy="410" rx="120" ry="44" fill="url(#pistachio)" transform="rotate(-12 880 410)"/>
      <ellipse cx="1110" cy="300" rx="104" ry="36" fill="url(#rose)" transform="rotate(18 1110 300)"/>
      <ellipse cx="1220" cy="500" rx="104" ry="36" fill="#F6B73C" transform="rotate(-26 1220 500)"/>
      <ellipse cx="390" cy="730" rx="116" ry="42" fill="#F6B73C" transform="rotate(8 390 730)"/>
      <ellipse cx="620" cy="820" rx="98" ry="36" fill="url(#rose)" transform="rotate(-18 620 820)"/>
      <ellipse cx="980" cy="720" rx="126" ry="42" fill="url(#pistachio)" transform="rotate(18 980 720)"/>
      <ellipse cx="1250" cy="810" rx="106" ry="38" fill="url(#rose)" transform="rotate(6 1250 810)"/>
      <path d="M260 220C300 260 316 298 330 344" stroke="#F6B73C" stroke-width="12" stroke-linecap="round"/>
      <path d="M340 190C386 236 406 284 422 334" stroke="#B8D8A8" stroke-width="12" stroke-linecap="round"/>
      <path d="M1060 170C1114 210 1134 260 1148 306" stroke="#F4D1D1" stroke-width="12" stroke-linecap="round"/>
      <path d="M1290 240C1338 286 1352 334 1360 388" stroke="#F6B73C" stroke-width="12" stroke-linecap="round"/>
      <path d="M460 960C516 924 590 910 662 924" stroke="#F4D1D1" stroke-width="12" stroke-linecap="round"/>
      <path d="M1000 946C1058 920 1140 914 1220 930" stroke="#B8D8A8" stroke-width="12" stroke-linecap="round"/>
    </g>
    <g>
      <circle cx="152" cy="258" r="12" fill="#F4D1D1"/>
      <circle cx="1400" cy="234" r="14" fill="url(#pistachio)"/>
      <circle cx="1460" cy="692" r="12" fill="#F6B73C"/>
      <circle cx="180" cy="858" r="12" fill="#F6B73C"/>
      <circle cx="860" cy="940" r="18" fill="#F4D1D1"/>
    </g>
  `);
}

const assets = [
  { name: "hero-kulfi.png", svg: heroKulfi() },
  { name: "falooda-kulfi.png", svg: faloodaKulfi() },
  { name: "cassata-cake.png", svg: cassataCake() },
  { name: "sundae-nirvana.png", svg: sundaeBowl() },
  { name: "birthday-cake.png", svg: birthdayCake() },
  { name: "ingredients-texture.png", svg: ingredientsTexture() },
  { name: "badshahi-falooda.png", svg: faloodaKulfi() },
  { name: "shake-swirls.png", svg: sundaeBowl() }
];

for (const asset of assets) {
  const out = path.join(outDir, asset.name);
  await sharp(Buffer.from(asset.svg)).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(out);
  console.log(`wrote ${out}`);
}
