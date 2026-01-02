import { useStore } from "../data/store";
import { RoleLabel } from "../app/rbac";

function pill(health: "OK" | "DEGRADED" | "OFFLINE") {
  if (health === "OK") return "border-[#1F7A43] bg-[#0B241F] text-[#9AF2B5]";
  if (health === "DEGRADED") return "border-[#8A6A19] bg-[#2A2108] text-[#FBD38D]";
  return "border-[#7F1D1D] bg-[#3B0A0A] text-[#FCA5A5]";
}

export default function TopBar() {
  const session = useStore((s) => s.session);
  const sync = useStore((s) => s.sync);
  const queueCount = useStore((s) => s.queueCount);
  const replayQueue = useStore((s) => s.replayQueue);

  return (
    <div className="bg-gradient-to-r from-[#0A3A32] via-[#0B2F2A] to-[#0A3A32] border-b border-np-border px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
  className="flex items-center justify-center rounded-2xl shadow-sm ring-1 ring-white/15 overflow-hidden"
  style={{
    height: "55px",
    width: "50px",
    backgroundColor: "rgba(255,255,255,0.12)"
  }}
>
  <img
    src="/images/police.png"
    alt="Police Logo"
    style={{
      height: "100%",
      width: "100%",
      objectFit: "cover",   // 🔑 fills frame completely
      display: "block"
    }}
  />
</div>

          <div className="min-w-0">
            <div className="text-lg font-extrabold tracking-wide truncate">
              NPODIAS <span className="font-semibold text-np-muted">— Lagos State Police Command</span>
            </div>

            <div className="mt-1 flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded-md border ${pill(sync.health)}`}>{sync.message}</span>
              <span className="text-xs text-np-muted">Federal Certification Authority Active</span>

              {queueCount > 0 && (
                <span className="text-xs px-2 py-1 rounded-md border border-[#8A6A19] bg-[#2A2108] text-[#FBD38D]">
                  {queueCount} queued
                </span>
              )}

              {queueCount > 0 && sync.health === "OK" && (
                <button
                  onClick={() => replayQueue()}
                  className="text-xs px-2 py-1 rounded-md border border-[#1E4C44] bg-[#0B241F] hover:bg-[#0E2F29] font-semibold"
                >
                  Replay now
                </button>
              )}
            </div>
          </div>
        </div>

        {session && (
          <div className="rounded-lg border border-np-border bg-np-panel2 px-3 py-2 text-sm shrink-0">
            <div className="font-semibold">{RoleLabel[session.role]}</div>
            <div className="text-xs text-np-muted">{session.userName}</div>
          </div>
        )}
      </div>
    </div>
  );
}
