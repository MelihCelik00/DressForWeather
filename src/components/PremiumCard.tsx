import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const PremiumCard: React.FC = () => {
  return (
    <Card style={[styles.card, styles.premiumCard]}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.subtitle}>
          Premium Features
        </Text>
        <View style={styles.premiumFeature}>
          <Icon name="robot" size={24} color="#666" />
          <Text variant="bodyLarge" style={styles.premiumText}>
            AI Fashion Assistant
          </Text>
        </View>
        <Button 
          mode="contained" 
          onPress={() => {}} 
          style={styles.premiumButton}
        >
          Unlock Premium
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  premiumCard: {
    backgroundColor: '#f8f8f8',
  },
  subtitle: {
    marginBottom: 8,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  premiumText: {
    marginLeft: 12,
    flex: 1,
  },
  premiumButton: {
    marginTop: 16,
  },
}); 