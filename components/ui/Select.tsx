import React, { forwardRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutSideClick';
import ArrowRight from '@/assets/icons/ArrowRight';
import CloseIcon from '@/assets/icons/CloseIcon';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  allowClear?: boolean;
  label?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(({
  options,
  value,
  placeholder = 'Select an option',
  onChange,
  className = '',
  defaultValue,
  allowClear = false,
  label
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(() => {
    if (value) {
      return options.find(opt => opt.value === value) || null;
    }
    if (defaultValue) {
      return options.find(opt => opt.value === defaultValue) || null;
    }
    return null;
  });

  const selectRef = useOutsideClick(() => setIsOpen(false));

  function useRefCallback<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (el: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref && typeof ref === 'object') {
          (ref as React.MutableRefObject<T | null>).current = el;
        }
      });
    };
  }

  const mergedRef = useRefCallback(selectRef, ref);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  const onClearValue = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setSelectedOption(null);
    onChange?.('');
  };

  return (
    <div className={`relative w-full flex items-center ${className}`} ref={mergedRef}>
      {label && <label className="px-1 text-blue-600 whitespace-nowrap">{label}</label>}
      <div
        className={`flex justify-between w-full items-center p-2 bg-white border rounded-xl cursor-pointer transition-all duration-200 ${isOpen ? 'border-gray-600 rounded-b-none' : 'border-gray-300 hover:border-gray-400'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        {selectedOption && allowClear ? (
          <CloseIcon title="clear" onClick={onClearValue} width={16} height={16} className="cursor-pointer" />
        ) : (
          <ArrowRight width={16} height={16} className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        )}
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg max-h-52 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-3 cursor-pointer transition-colors ${selectedOption?.value === option.value ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
