import syles from "./filterBar.module.css";

type FilterPillProps = {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

const FilterPill = ({ label, icon, active, onClick }: FilterPillProps) => {
  return (
    <div
      className={`${syles["filter-pill"]} ${active ? syles["active"] : ""} inline-flex items-center text-sm font-medium px-3`}
      onClick={onClick}
      data-testid="filter-pill"
    >
      {icon && icon}
      {label}
    </div>
  );
};

export default FilterPill;
