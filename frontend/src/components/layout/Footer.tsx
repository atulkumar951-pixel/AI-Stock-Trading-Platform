export default function Footer() {

    return (

        <footer className="border-t border-slate-800 bg-[#111827]">

            <div className="px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

                <div>

                    <h3 className="text-white font-semibold">
                        AI Stock Trading Platform
                    </h3>

                    <p className="text-sm text-slate-400">
                        Version 1.0
                    </p>

                </div>

                <div className="text-center">

                    <p className="text-slate-400 text-sm">

                        Developed By

                    </p>

                    <p className="text-blue-400 font-semibold">

                        Atul Kumar Mishra

                    </p>

                </div>

                <div className="text-right text-sm text-slate-400">

                    <p>

                        React • FastAPI

                    </p>

                    <p>

                        Machine Learning • Upstox API

                    </p>

                </div>

            </div>

        </footer>

    );

}