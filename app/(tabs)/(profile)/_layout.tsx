import { Stack } from "expo-router";

export default function StackLaout(){
    return (
        <Stack>
            <Stack.Screen name='profile'/>
            <Stack.Screen name='paymant'/>
            <Stack.Screen name='setProfile'/>
        </Stack>
    );
}