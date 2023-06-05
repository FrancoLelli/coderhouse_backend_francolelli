import { Faker, en } from "@faker-js/faker";
const customFaker = new Faker({
  locale: [en],
});

const { database, commerce, datatype } = customFaker;

export const generateProduct = () => {
  return {
    id: database.mongodbObjectId(),
    title: commerce.productName(),
    description: commerce.productDescription(),
    price: parseFloat(commerce.price()),
    status: datatype.boolean(),
  };
};
