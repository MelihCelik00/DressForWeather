import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image as ExpoImage } from 'expo-image';
import { PexelsPhoto } from '../utils/imageApi';
import { getOutfitIcon } from '../utils/icons';

interface OutfitCardProps {
  outfits: string[];
  outfitImage: PexelsPhoto | null;
  imageLoading: boolean;
  onRefresh: () => void;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfits,
  outfitImage,
  imageLoading,
  onRefresh,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={styles.subtitle}>
            Today's Outfit Suggestion
          </Text>
          <IconButton
            icon="refresh"
            size={24}
            onPress={onRefresh}
            disabled={imageLoading}
          />
        </View>
        <View style={styles.imageContainer}>
          {imageLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#666" />
              <Text variant="bodyMedium" style={styles.loadingText}>
                Loading outfit image...
              </Text>
            </View>
          ) : outfitImage ? (
            <ExpoImage
              source={{ uri: outfitImage.src.original }}
              style={styles.outfitImage}
              contentFit="cover"
              transition={200}
            />
          ) : null}
        </View>
        <View style={styles.outfitList}>
          {outfits.map((outfit, index) => (
            <View key={index} style={styles.outfitRow}>
              <Icon name={getOutfitIcon(outfit)} size={24} color="#666" />
              <Text variant="bodyLarge" style={styles.outfitItem}>
                {outfit}
              </Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 500,
    borderRadius: 8,
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  outfitImage: {
    width: '100%',
    height: '100%',
  },
  outfitList: {
    marginTop: 16,
  },
  outfitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  outfitItem: {
    marginLeft: 12,
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
}); 