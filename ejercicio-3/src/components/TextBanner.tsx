type Props = {
  title: string;
  description: string;
};

export const TextBanner = ({ title, description }: Props) => (
  <div className="flex flex-col gap-4">
    <h1 className="text-5xl">{title}</h1>
    <p className="text-lg">{description}</p>
  </div>
);
