export type TOccasion = 'birthdays' | 'anniversaries' | 'holidays';
export type TCategory = 'accessories' | 'gadgets' | 'home decor';
export type TTheme = 'romantic' | 'modern' | 'vintage';
export type TBrand = 'Nike' | 'Apple' | 'Amazon';

export type TGift = {
  name: string;
  price: number;
  quantity: number;
  occasion: TOccasion;
  recipient: string;
  category: TCategory;
  theme: TTheme;
  brand: TBrand;
};
