type BrandMarkProps = {
  text?: string;
};

export const BrandMark = ({ text = "Starter" }: BrandMarkProps) => (
  <strong className="brand-mark">{text}</strong>
);
