import syles from "./filterBar.module.css";

type FilterPillProps = {
  label: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  active?: boolean;
  testId?: string;
  onClick?: () => void;
};

const FilterPill = ({
  label,
  icon,
  iconPosition = "left",
  active,
  testId,
  onClick,
}: FilterPillProps) => {
  return (
    <div
      className={`${syles["filter-pill"]} ${active ? syles["active"] : ""} inline-flex items-center text-sm font-medium px-3`}
      onClick={onClick}
      data-testid={testId ?? "filter-pill"}
    >
      {icon && iconPosition === "left" && icon}
      {label}
      {icon && iconPosition === "right" && icon}
    </div>
  );
};

export default FilterPill;
