import z from 'zod';
export const ProductType = {
  ELECTRONICS: 'electronics',
  CLOTHES: 'clothes',
  FURNITURE: 'furniture'
};

const CommonProductSchema = z.object({
  name: z.string({
    required_error: 'Product name is required'
  }),
  thumbnail: z.string().optional(),
  price: z.coerce.number({
    required_error: 'Product price is required'
  }),
  description: z.string().optional(),
  isPublished: z.boolean().default(false),
  type: z.enum(Object.values(ProductType)),
  stock: z.coerce.number().default(0)
});

const ElectronicsProductSchema = CommonProductSchema.extend({
  type: z.enum([ProductType.ELECTRONICS]),
  attributes: z.object({
    manufacturer: z.string({
      required_error: 'Manufacturer is required for electronics product'
    }),
    model: z.string({
      required_error: 'Model is required for electronics product'
    }),
    color: z.string({
      required_error: 'Color is required for electronics product'
    }),
    dimensions: z.string({
      required_error: 'Dimensions are required for electronics product'
    }),
    weight: z.string({
      required_error: 'Weight is required for electronics product'
    })
  })
}).strict();

const ClothesProductSchema = CommonProductSchema.extend({
  type: z.enum([ProductType.CLOTHES]),
  attributes: z.object({
    brand: z.string({
      required_error: 'Brand is required for clothes product'
    }),
    size: z.string({
      required_error: 'Size is required for clothes product'
    }),
    color: z.string({
      required_error: 'Color is required for clothes product'
    }),
    material: z.string({
      required_error: 'Material is required for clothes product'
    })
  })
}).strict();

const FurnitureProductSchema = CommonProductSchema.extend({
  type: z.enum([ProductType.FURNITURE]),
  attributes: z.object({
    brand: z.string({
      required_error: 'Brand is required for furniture product'
    }),
    size: z.string({
      required_error: 'Size is required for furniture product'
    }),
    color: z.string({
      required_error: 'Color is required for furniture product'
    }),
    material: z.string({
      required_error: 'Material is required for furniture product'
    })
  })
}).strict();

export const ProductSchema = z.union([
  ElectronicsProductSchema,
  ClothesProductSchema,
  FurnitureProductSchema
]);
