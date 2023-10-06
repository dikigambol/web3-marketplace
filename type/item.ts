export type Item = {
  _id?: any;
  unit: string;
  metadata: { 
    image: any; 
    name: any; 
    description: any 
  };
  listing?: { 
    price: number; 
    seller: any 
  };
  owner: any;
};
