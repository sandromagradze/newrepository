import { useTranslation } from "react-i18next";

interface NewVideoCardProps {
  image: string;
}

export default function VideoCard({ image }: NewVideoCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded overflow-hidden shadow-sm flex flex-col items-center mt-[30px] p-4 text-center">
      <img
        src={image}
        className="w-full h-full object-cover rounded"
        alt={t("common.videoAlt")}
      />
    </div>
  );
}
