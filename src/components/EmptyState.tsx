import { View } from "react-native";

import type { SvgCustomProps } from "@/assets";
import { colors } from "@/utils";
import { Button } from "./Button";
import { Typography } from "./Typography";

type EmptyStateProps = {
  title?: string;
  subtitle: string;
  icon: React.ReactNode;
  actionLabel?: string;
  onSuggestedAction?: () => void;
};

export function EmptyState({
  icon: Icon,
  onSuggestedAction,
  title,
  subtitle,
  actionLabel,
}: EmptyStateProps) {
  return (
    <View className="items-center rounded-2xl border border-secondary-500 bg-secondary-300 px-5 py-6 dark:bg-secondary-500">
      {Icon}

      {title && (
        <Typography className="mb-2 mt-3 text-center text-tertiary-950 dark:text-tertiary-100">
          {title}
        </Typography>
      )}

      <Typography className="text-center text-tertiary-950 dark:text-tertiary-100">
        {subtitle}
      </Typography>
      {actionLabel && (
        <Button
          onPress={onSuggestedAction}
          className="mt-5 w-full bg-tertiary-950"
          // textStyle={{ color: "white" }}
          title={actionLabel}
        />
      )}
    </View>
  );
}
