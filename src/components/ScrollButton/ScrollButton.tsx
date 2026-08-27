interface ScrollButtonProps {
  hasMoreMiniNews: boolean;
  showMoreButton: boolean;
  onLoadMore: () => void;
}

export default function ScrollButton({
  hasMoreMiniNews,
  showMoreButton,
  onLoadMore,
}: ScrollButtonProps) {
  if (!hasMoreMiniNews || !showMoreButton) return null;

  return (
    <div className="flex ml-[257px]">
      <div
        onClick={onLoadMore}
        className="bg-[#1E5BA6] p-[13px] mt-[30px] flex items-center cursor-pointer rounded-[3px]"
      >
        <h1 className="text-[14px] font-[400] text-[#FFFFFF] px-[14px] leading-[30px]">
          დღის სხვა სიახლეები
        </h1>
        <img className="ml-[43px]" src="/public/arrowup.svg" alt="" />
      </div>
    </div>
  );
}