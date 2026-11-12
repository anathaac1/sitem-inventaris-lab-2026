import { Clock } from 'lucide-react';

interface DashboardGreetingProps {
    studentName: string;
    loginDateStr: string;
    loginTimeStr: string;
}

export function DashboardGreeting({
    studentName,
    loginDateStr,
    loginTimeStr
}: DashboardGreetingProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-lg font-bold tracking-tight text-zinc-900 truncate">
                    Hi, {studentName}!
                </h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                    Hari ini kamu mau pinjam apa?
                </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />

                <div className="leading-tight">
                    <p className="block text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Login terakhir
                    </p>
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-700 whitespace-nowrap">
                        {loginDateStr}
                        <span className="text-slate-400 font-normal mx-0.5 sm:mx-1"> </span>
                        {loginTimeStr}
                    </p>
                </div>
            </div>
        </div>
    );
}
