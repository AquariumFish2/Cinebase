import { useCallback } from "react"

export default function Pagination({ pageNumber, maxPages, onPageChange }:{pageNumber:number,maxPages:number,onPageChange:any}) {

    const getPageNumbers = useCallback(() => {
        const pages:number[] = [];
        const start = Math.max(1, pageNumber - 2);
        const end = Math.min(maxPages, start + 4);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }, [pageNumber]);

    return (
        <div className="flex flex-row items-center justify-center py-6 w-full gap-4 bg-bg-color ">
            <button
                disabled={pageNumber === 1}
                onClick={() => onPageChange(pageNumber - 1)}
                className="px-4 py-2 text-white/50 hover:text-primary disabled:opacity-20 transition-all cursor-pointer">
                PREV
            </button>
            <div className="flex gap-2">
                {getPageNumbers().map(num => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`w-12 h-12 rounded-full border transition-all duration-300 font-mono tracking-tighter cursor-pointer
                            ${pageNumber === num 
                                ? "border-primary text-primary shadow-[0_0_15px_rgba(var(--color-primary))] bg-primary/5" 
                                : "border-white/10 text-white/60 hover:border-white/40 hover:text-white"
                            }`}
                            >
                    {num.toString().padStart(2, '0')}
                    </button>
                ))}
        </div>
        <button 
                disabled={pageNumber === maxPages}
                onClick={() => onPageChange(pageNumber + 1)}
                className="px-4 py-2 text-white/50 hover:text-primary disabled:opacity-20 transition-all cursor-pointer"
            >
                NEXT
            </button>
        </div>
    )
}
