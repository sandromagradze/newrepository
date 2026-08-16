
import "./CurencyTransfer.css"
interface CurrencyTransferProps {
    code:string;
    rate:string;
    isUp?:boolean;
}


const currencies:CurrencyTransferProps[] = [
    { code: "USD", rate: "1.00", isUp: true },
    { code: "EUR", rate: "0.85", isUp: false },
    { code: "GBP", rate: "0.75", isUp: true },
    { code: "JPY", rate: "110.00", isUp: false },
];


export default function CurrencyTransfer() {
    return (
    <div className=" curenncy w-[198px] bg-white border border-gray-200 p-2 text-xs flex flex-col gap-1.5 shadow-sm rounded-sm">
      <div className="font-bold text-gray-500 text-[10px] uppercase border-b border-gray-100 pb-1">
        ვალუტის კურსი
      </div>

      <div className="flex flex-col gap-1">
        {currencies.map((curr) => (
          <div key={curr.code} className="flex justify-between items-center">
            <span className="font-bold text-gray-700">{curr.code}</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-900 font-medium">{curr.rate}</span>
              <span
                className={`text-[9px] ${
                  curr.isUp ? "text-green-600" : "text-red-600"
                }`}
              >
                {curr.isUp ? "▲" : "▼"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}