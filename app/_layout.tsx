// _layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center"
        }}
      />
      <Stack.Screen 
        name="details"
        options={{
          title: "", // Will be set dynamically
          presentation: "modal",
          headerTitleAlign: "center",
          headerShown: true,
          sheetAllowedDetents: [0.4, 0.6, 0.9],
          sheetCornerRadius: 30,
        }}
      />
    </Stack>
  );
}