import { Stack } from "expo-router";

export default function StackLaout() {
    return (
        <Stack>
            <Stack.Screen name="opcoes" />
            <Stack.Screen name="compra" />
            <Stack.Screen name="status" />
            <Stack.Screen name="pedidos" />
            <Stack.Screen name="carrinho" />
        </Stack>
    );
}