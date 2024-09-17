import { Stack } from "expo-router";

export default function StackLaout() {
    return (
        <Stack>
            <Stack.Screen name="bag" />
            <Stack.Screen name="buy" />
            <Stack.Screen name="status" />
        </Stack>
    );
}