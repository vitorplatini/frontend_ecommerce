import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { usePurchase } from './context/PurchaseContext';
import { useCart } from './context/CartContext';



export default function PurchaseHistory() {
  const { purchases } = usePurchase();

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Histórico de Compras</Text>
      {purchases.length === 0 ? (
        <Text style={styles.empty}>Não há nenhuma compra registrada.</Text>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.purchaseItem}>
              <Text>Data: {item.date}</Text>
              <Text>Total: R$ {item.total.toFixed(2)}</Text>
              <Text>Itens:</Text>
              {item.items.map((produto, index) => (
                <Text key={index}>- {produto.name} (x{produto.quantity})</Text>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  purchaseItem: {
    padding: 15,
    backgroundColor: '#EEE',
    marginBottom: 10,
    borderRadius: 5,
  },
});
