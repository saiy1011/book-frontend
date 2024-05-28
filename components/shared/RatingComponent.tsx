import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ExtendedStyleProps } from '@/theme/ExtendedStyleProps';

type PropsRating = {
    stars: number;
    maxValue: number;
};
export const RatingComponent: React.FC<PropsRating> = (props: PropsRating) => {
    const { stars, maxValue } = props;
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${maxValue}, 1fr)`,
            }}
        >
            {Array.from(Array(maxValue).keys()).map((v, index) => (
                <FontAwesomeIcon
                    key={v}
                    icon={faStar}
                    {...styles.star(index < stars)}
                />
            ))}
        </div>
    );
};

const styles: ExtendedStyleProps = {
    star: (isHighlighted: boolean) => ({
        style: {
            color: isHighlighted
                ? 'var(--color-warn)'
                : 'var(--color-darkgray-200)',
        },
    }),
};
