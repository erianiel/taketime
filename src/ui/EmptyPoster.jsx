function EmptyPoster({ size = "sm" }) {
  const classes = size === "sm" ? "h-20 w-14" : "h-28 w-20";
  return <div className={`${classes} bg-slate-200`}></div>;
}

export default EmptyPoster;
