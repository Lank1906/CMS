const Select = ({
  value,
  onClick,
  backgroundColor,
  iconLeft,
  iconRight,
  borderRadius,
  width,
  type,
  onChange,
  ref,
  children,
  name,
}) => {
  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        style={{
          width: width || '100%',
          height: '35px',
          backgroundColor: backgroundColor,
          border: '1px solid rgb(196, 200, 203)',
          outline: 'none',
          overflow: 'hidden',
          borderRadius: borderRadius,
          boxSizing: 'border-box',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        {iconLeft}
        <select
          style={{
            width: '100%',
            color: 'black',
            fontSize: '14px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
          }}
          name={name}
          type={type || 'text'}
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
        {iconRight}
      </div>
    </>
  );
};

export default Select;
