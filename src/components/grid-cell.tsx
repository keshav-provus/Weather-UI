import type { GridCellProps } from '../types/types';

export function GridCell({ label, value, sub, children }: GridCellProps) {
  return (
    /* Using 'stat-tile' to match the layout logic in style.css */
    <div className="bento-item stat-tile">
      <span className="stat-label">{label}</span>
      {value && <span className="stat-value">{value}</span>}
      {/* The sub text will now be grey and bold via the .stat-sub class */}
      {sub && <span className="stat-sub">{sub}</span>}
      {children}
    </div>
  );
}