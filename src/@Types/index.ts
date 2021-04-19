export type CarouselItem = {
  id: number;
  image: string;
  text: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
};

//#Fauna types

export enum FaunaCollections {
  products = "products",
  stock = "stock",
  users = "users",
}

export enum StockIndex {
  id = "find_by_product_id",
}

export enum UserIndex {
  email = "find_user_by_email",
}

export type FaunaUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  stripe_customer_id: string;
};

export type FaunaStock = {
  id: string;
  quantity: number;
};

export type FaunaProduct = {
  id: string;
  name: string;
  image: string;
  price: {
    stripeId: string;
    value: number;
  };
  category: string;
};

export type FaunaCollectioData<T> = {
  ref: {
    id: string;
  };
  ts: string;
  data: T;
};

export type FaunaGetCollection<T> = {
  data: {
    ref: {
      id: string;
    };
    ts: string;
    data: T;
  }[];
};

///Profile types

export type Flags = "Visa" | "Mastercard";

export type Card = {
  id: number;
  flag: Flags;
  owner: string;
  expires: string;
};
