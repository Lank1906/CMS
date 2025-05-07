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
  mutiline = false,
  name,
  error = false,
}) => {
  return (
    <>
      <div
        ref={ref}
        onClick={onClick}
        style={{
          width: width || '100%',
          backgroundColor: backgroundColor,
          border: `1px solid ${error ? 'rgb(228, 0, 0)' : 'rgb(196, 200, 203)'}`,
          boxShadow: error ? '0px 0px 5px rgba(228, 0, 0, 0.39)' : 'none',
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
        {mutiline ? (
          <textarea
            rows={4}
            maxLength={255}
            style={{
              maxHeight: '300px',
              width: '100%',
              color: 'black',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
            }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
          ></textarea>
        ) : (
          <input
            style={{
              width: '100%',
              color: 'black',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
            }}
            name={name}
            type={type || 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}

        {iconRight}
      </div>
    </>
  );
};

export default TextField;
