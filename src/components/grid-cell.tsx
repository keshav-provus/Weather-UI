import type { GridCellProps } from "../config/types";

export function GridCell({ label, value, sub, children }: GridCellProps) {
  return (
    <div className="bento-item stat-tile">
      <span className="stat-label">{label}</span>
      {value && <span className="stat-value">{value}</span>}
      {sub && <span className="stat-sub">{sub}</span>}
      {children}
    </div>
  );
}
