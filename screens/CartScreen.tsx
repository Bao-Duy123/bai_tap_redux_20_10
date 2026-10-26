import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { RootState } from '../store';

const MOCK_PRODUCTS = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 50 }
];

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddRandom = () => {
    const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    dispatch(addToCart(randomProduct));
  };

  return (
    <View>
      <Text>🛒 Giỏ Hàng</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price} x {item.quantity}</Text>
            <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
              <Text>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleAddRandom}>
        <Text>+ Thêm Sản Phẩm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(clearCart())}>
        <Text>🗑️ Xóa Giỏ</Text>
      </TouchableOpacity>
      <Text>Tổng: ${total}</Text>
    </View>
  );
}