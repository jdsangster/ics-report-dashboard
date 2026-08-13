import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  href?: string;
}

export default function BrandLogo({ href = "/" }: BrandLogoProps) {
  return (
    <Link href={href} className="flex shrink-0 items-center" title="ColomboHurd">
      <Image
        src="/colombohurd-logo.png"
        alt="ColomboHurd"
        width={472}
        height={116}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}
