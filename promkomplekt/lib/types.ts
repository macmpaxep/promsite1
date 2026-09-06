/**
 * Типы данных.
 * Payload CMS коллекции: "products", "blog-posts"
 * Supabase таблицы: products, blog_posts, categories
 * Схема совпадает с REST-ответами обоих источников.
 * При подключении реальной БД замените lib/data.ts — компоненты менять не нужно.
 */

export type Availability = "in-stock" | "limited" | "on-order";
export type Condition    = "new" | "refurbished";

export interface Product {
  id:           string;
  name:         string;
  article:      string;
  category:     string;
  subcategory:  string;
  brand:        string;
  country:      string;
  price:        number;
  priceOld?:    number;
  unit:         string;
  availability: Availability;
  condition:    Condition;
  deliveryDays: number;
  description:  string;
  specs:        Record<string, string>;
  equipment:    string[];
  isNew?:       boolean;
  isPopular?:   boolean;
  tags:         string[];
}

/** Payload: "categories" / Supabase: categories */
export interface Category {
  id:    string;
  label: string;
}

/** Payload: "blog-posts" / Supabase: blog_posts */
export interface BlogPost {
  id:         string;
  slug:       string;
  title:      string;
  excerpt:    string;
  content:    string;
  category:   string;
  tags:       string[];
  author:     string;
  authorRole: string;
  date:       string;
  readTime:   number;
}

export interface Office {
  city:    string;
  address: string;
  phone:   string;
  hours:   string;
}

/** Клиентское состояние фильтров каталога — не хранится в БД */
export interface FilterState {
  search:       string;
  category:     string;
  equipmentType: string;
  brands:       string[];
  countries:    string[];
  availability: Availability | "all";
  condition:    Condition | "all";
  priceMin:     string;
  priceMax:     string;
  isNew:        boolean;
  hasDiscount:  boolean;
}
