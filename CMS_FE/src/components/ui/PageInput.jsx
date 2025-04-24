import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './Button';

const PageInput = ({ page, max, onChange }) => {
  const [p, setPage] = useState(page || 1);
  useEffect(() => {
    setPage(page);
  }, [page]);
  const updatePage = (newPage) => {
    if (newPage < 1 || newPage > max || newPage === p) return;
    setPage(newPage);
    onChange?.(newPage);
  };
  return (
    <>
      <Button
        onClick={() => updatePage(p - 1)}
        iconLeft={<ChevronLeft />}
        color={'#666'}
        border={'none'}
        disable={p === 1}
      />
      <input
        value={p}
        style={{
          width: '27px',
          height: '27px',
          display: 'flex',
          textAlign: 'center',
          fontSize: '12px',
          backgroundColor: 'var(--color-primary)',
          border: 'none',
          outline: 'none',
          borderRadius: '5px',
          color: 'white',
        }}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (isNaN(value)) return;
          if (value < 1) return;
          if (value > max) return setPage(max);
          updatePage(value);
        }}
      />
      <Button
        onClick={() => updatePage(p + 1)}
        iconLeft={<ChevronRight />}
        color={'#666'}
        border={'none'}
        disable={p === max}
      />
    </>
  );
};
export default PageInput;
