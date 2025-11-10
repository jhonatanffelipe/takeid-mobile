import { StyleSheet, View } from "react-native";
import { Skeleton } from "../../../components/Skeleton";

export function SignatureItemSkeleton() {
  return (
    <View style={styles.signatureItem}>
      <View style={styles.signatureItemImage}>
        <Skeleton variant="rectangular" width={100} height={100} radius={4} />
      </View>
      <View style={styles.signatureItemContent}>
        <Skeleton variant="rectangular" width={200} height={20} radius={4} />
        <Skeleton
          variant="rectangular"
          width={150}
          height={15}
          radius={4}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signatureItem: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  signatureItemImage: {},
  signatureItemContent: {
    flex: 1,
  },
});
