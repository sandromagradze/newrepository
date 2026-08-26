import ProfileCard from "../ProfileCard/ProfileCard";

interface ProfileItem {
  image: string;
  name: string;
  status: string;
}

interface HomeProfileSectionProps {
  localizedProfileCards: ProfileItem[];
}

export default function HomeProfileSection({ localizedProfileCards }: HomeProfileSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
      {localizedProfileCards.map((profile, index) => (
        <ProfileCard
          key={index}
          image={profile.image}
          name={profile.name}
          status={profile.status}
        />
      ))}

      <div className="bg-[#1E5BA6] rounded-[3px] p-6 flex flex-col justify-center text-center text-white h-[332px] cursor-pointer hover:bg-[#184a87] transition-colors box-border">
        <div className="text-[62px] justify-center font-bold">212</div>
        <div className="flex items-center justify-center text-center text-[18px] font-medium">
          <span>სრულად</span>
        </div>
        <span className="text-[50px]">→</span>
      </div>
    </div>
  );
}