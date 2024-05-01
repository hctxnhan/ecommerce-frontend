import { z, ZodError } from 'zod';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed'
}

export enum DiscountApplyType {
  ALL = 'all',
  PRODUCTS = 'products',
  CATEGORIES = 'categories',
  BRANDS = 'brands'
}

export const DiscountSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required'
      })
      .min(3)
      .max(255),
    description: z
      .string({
        required_error: 'Description is required'
      })
      .min(3)
      .max(255),
    type: z.nativeEnum(DiscountType),
    value: z.coerce
      .number({
        required_error: 'Value is required'
      })
      .min(1),
    startDate: z.instanceof(Date, {
      message: 'Start date is required'
    }),
    endDate: z.instanceof(Date, {
      message: 'End date is required'
    }),
    minOrderValue: z.coerce
      .number({
        required_error: 'Minimum order value is required'
      })
      .min(1),
    usageLimit: z.coerce
      .number({
        required_error: 'Usage limit is required'
      })
      .min(1),
    usageLimitPerUser: z.coerce
      .number({
        required_error: 'Usage limit per user is required'
      })
      .min(1),
    code: z
      .string({
        required_error: 'Code is required'
      })
      .min(3)
      .max(255),
    isActive: z
      .boolean({
        required_error: 'Is active is required'
      })
      .default(true),
    applyType: z.nativeEnum(DiscountApplyType).default(DiscountApplyType.ALL),
    applyValue: z.array(z.string()).default([])
  })
  .strict()
  .refine((data) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      throw new ZodError([
        {
          code: 'invalid_date',
          message: 'Start date cannot be greater than end date',
          path: ['startDate', 'endDate']
        }
      ]);
    }

    if (data.type === DiscountType.PERCENTAGE && data.value > 100) {
      throw new ZodError([
        {
          code: 'invalid_value',
          message: 'Discount value cannot be greater than 100',
          path: ['value']
        }
      ]);
    }

    if (data.usageLimitPerUser > data.usageLimit) {
      throw new ZodError([
        {
          code: 'invalid_usage_limit',
          message: 'Usage limit per user cannot be greater than usage limit',
          path: ['usageLimit', 'usageLimitPerUser']
        }
      ]);
    }

    if (
      data.applyType !== DiscountApplyType.ALL &&
      data.applyValue.length === 0
    ) {
      throw new ZodError([
        {
          code: 'invalid_apply_value',
          message: 'Apply value cannot be empty',
          path: ['applyValue']
        }
      ]);
    }

    return true;
  });
