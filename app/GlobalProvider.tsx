import { CartProvider } from "./_context/CartContext";

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
