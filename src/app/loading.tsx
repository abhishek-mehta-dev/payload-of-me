export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full gap-1">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="border border-blue-400/30 animate-pulse"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-center z-10 relative">
        <div className="relative mb-8">
          {/* Server rack visualization */}
          <div className="w-32 h-40 mx-auto relative">
            {/* Server rack frame */}
            <div className="absolute inset-0 border-2 border-blue-400/50 rounded-lg bg-slate-800/30">
              {/* Server units */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 mx-2 my-1 rounded border border-blue-300/40 relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {/* Server activity indicator */}
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse"
                    style={{
                      width: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "1.5s",
                    }}
                  />
                  {/* Status lights */}
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <div
                      className="w-1 h-1 bg-green-400 rounded-full animate-ping"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                    <div
                      className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Data flow lines */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-0.5 bg-blue-400 animate-pulse" />
              <div
                className="w-4 h-0.5 bg-cyan-400 animate-pulse mt-1"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="w-5 h-0.5 bg-blue-300 animate-pulse mt-1"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-0.5 bg-blue-400 animate-pulse" />
              <div
                className="w-4 h-0.5 bg-cyan-400 animate-pulse mt-1"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-5 h-0.5 bg-blue-300 animate-pulse mt-1"
                style={{ animationDelay: "0.8s" }}
              />
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-blue-400 rounded animate-spin" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse" />
              <div className="w-4 h-4 border border-cyan-400 rounded-sm animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse w-full origin-left transform scale-x-0 animate-[scaleX_4s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-20 text-blue-500/30 text-lg font-mono animate-float">
        {"API"}
      </div>
      <div
        className="absolute top-32 right-32 text-blue-500/30 text-lg font-mono animate-float"
        style={{ animationDelay: "1s" }}
      >
        {"DB"}
      </div>
      <div
        className="absolute bottom-32 left-32 text-cyan-500/30 text-lg font-mono animate-float"
        style={{ animationDelay: "2s" }}
      >
        {"SQL"}
      </div>
      <div
        className="absolute bottom-20 right-20 text-blue-500/30 text-lg font-mono animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        {"REST"}
      </div>
      <div
        className="absolute top-1/2 left-10 text-cyan-500/30 text-sm font-mono animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        {"JSON"}
      </div>
      <div
        className="absolute top-1/2 right-10 text-blue-500/30 text-sm font-mono animate-float"
        style={{ animationDelay: "2.5s" }}
      >
        {"HTTP"}
      </div>
    </div>
  );
}
