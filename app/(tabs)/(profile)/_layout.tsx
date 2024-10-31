import { Stack } from "expo-router";

export default function StackLaout(){
    return (
        <Stack>
            <Stack.Screen name='profile'/>
            <Stack.Screen name='cards'/>
            <Stack.Screen name='setProfile'/>
        </Stack>
    );
}