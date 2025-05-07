const TextField = ({
  value,
  onClick,
  backgroundColor,
  iconLeft,
  iconRight,
  borderRadius,
  placeholder,
  width,
  type,
  onChange,
  ref,
  error = false,
}) => {
  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        style={{
          width: width,
          height: '35px',
          backgroundColor: backgroundColor,
          border: '1px solid rgb(196, 200, 203)',
          boxShadow: 'none',
          outline: 'none',
          overflow: 'hidden',
          borderRadius: borderRadius,
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        {iconLeft}
        <input
          style={{
            width: '100%',
            color: 'black',
            fontSize: '14px',
            border: 'none',
            outline: 'none',
          }}
          onBlur={(e) => {
            if (error) {
              e.target.parentElement.style.border = ' 1px solid rgb(228, 0, 0) ';
              e.target.parentElement.style.boxShadow = ' 0px 0px 5px rgba(228, 0, 0, 0.39)';
            } else {
              e.target.parentElement.style.border = ' 1px solid rgb(196, 200, 203) ';
              e.target.parentElement.style.boxShadow = ' none';
            }
          }}
          type={type || 'text'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {iconRight}
      </div>
    </>
  );
};

export default TextField;
