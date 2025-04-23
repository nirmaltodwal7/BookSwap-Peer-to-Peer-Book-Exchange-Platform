import React from 'react';
import { BookCondition } from '../../types';
import Badge from '../ui/Badge';

type BookConditionBadgeProps = {
  condition: BookCondition;
};

export const BookConditionBadge: React.FC<BookConditionBadgeProps> = ({ condition }) => {
  // Define badge variants based on condition
  const conditionConfig: Record<BookCondition, { variant: 'default' | 'success' | 'warning' | 'error' }> = {
    [BookCondition.NEW]: { variant: 'success' },
    [BookCondition.LIKE_NEW]: { variant: 'success' },
    [BookCondition.VERY_GOOD]: { variant: 'success' },
    [BookCondition.GOOD]: { variant: 'default' },
    [BookCondition.ACCEPTABLE]: { variant: 'warning' },
    [BookCondition.POOR]: { variant: 'error' },
  };

  const config = conditionConfig[condition];

  return <Badge text={condition} variant={config.variant} />;
};