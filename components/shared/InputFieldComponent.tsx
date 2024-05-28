import React, { InputHTMLAttributes } from 'react';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type Props = InputHTMLAttributes<any> & {
    label: string;
};

const InputFieldComponent: React.FC<Props> = (props: Props) => {
    const { label, ...rest } = props;
    return (
        <div {...styles.inputFieldContainer()}>
            <label htmlFor={label} {...styles.inputLabel()}>
                {label}
            </label>
            <input id={label} {...styles.inputField()} {...rest} />
        </div>
    );
};

const styles: ExtendedStyleProps = {
    inputFieldContainer: () => ({
        style: {
            display: 'grid',
            gap: '5px',
        },
    }),

    inputLabel: () => ({
        style: {
            fontSize: 'var(--font-normal-size)',
        },
    }),

    inputField: () => ({
        className: 'form-control',
        style: {
            padding: '10px 20px',
        },
    }),
};

export default InputFieldComponent;
