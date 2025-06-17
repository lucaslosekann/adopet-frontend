import React from 'react';

type SendDocumentsProgressProps = {
    stage: 1 | 2 | 3;
};

const steps = ['Envio', 'Análise', 'Resultado'];

export default function SendDocumentsProgress({ stage }: SendDocumentsProgressProps) {
    const progressTarget = ((stage - 1) / (steps.length - 1)) * 100;
    const nextProgressTarget = (stage / (steps.length - 1)) * 100;

    return (
        <div className="relative mt-10 mx-6">
            <div className="h-2 bg-slate-400 absolute top-1/2 -translate-y-1/2 left-[1px] w-[calc(100%-2px)] overflow-hidden">
                {stage < steps.length && (
                    <div
                        className="absolute top-0 left-0 h-full bg-[#ADD4FF] animate-progress"
                        style={
                            {
                                '--progress-target': `${nextProgressTarget}%`,
                                '--start-progress': `${progressTarget}%`,
                            } as React.CSSProperties
                        }
                    />
                )}

                {stage === steps.length && (
                    <div
                        className="absolute top-0 left-0 h-full bg-[#ADD4FF] transition-all duration-500"
                        style={{ width: `${progressTarget}%` }}
                    />
                )}
            </div>

            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center relative">
                        <div
                            className={`z-20 w-8 h-8 rounded-full flex items-center justify-center text-white ${
                                index < stage ? 'bg-[#ADD4FF]' : 'bg-gray-100 border-4 border-gray-300'
                            }`}
                        />
                        <span className="absolute -top-full text-background-secondary font-bold">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
